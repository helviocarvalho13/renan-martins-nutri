import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments, user } from "@/lib/schema";
import { eq, and, gte, inArray } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";
import type { AppointmentType } from "@/lib/types";

export async function POST(request: Request) {
  const currentUser = await getServerUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const body = await request.json();
  const { date, start_time, end_time, type, modality } = body as {
    date: string;
    start_time: string;
    end_time: string;
    type: AppointmentType;
    modality?: string;
  };

  if (!date || !start_time || !end_time || !type) {
    return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
  }

  const validTypes: AppointmentType[] = ["FIRST_VISIT", "RETURN"];
  if (!validTypes.includes(type)) {
    return NextResponse.json({ error: "Tipo de consulta inválido" }, { status: 400 });
  }

  const validModalities = ["ONLINE", "PRESENCIAL"];
  const appointmentModality = validModalities.includes(modality ?? "") ? modality! : "PRESENCIAL";

  const appointmentDateTime = new Date(`${date}T${start_time}`);
  const minAdvance = Date.now() + 24 * 60 * 60 * 1000;
  if (appointmentDateTime.getTime() < minAdvance) {
    return NextResponse.json(
      { error: "Agendamentos devem ser feitos com pelo menos 24 horas de antecedência." },
      { status: 400 }
    );
  }

  // Validate patient has a phone
  const patientRows = await db
    .select({ phone: user.phone })
    .from(user)
    .where(eq(user.id, currentUser.id))
    .limit(1);

  const phone = patientRows[0]?.phone;
  if (!phone || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { error: "Número de WhatsApp obrigatório. Atualize seu perfil antes de agendar." },
      { status: 400 }
    );
  }

  const today = new Date().toISOString().split("T")[0];

  const futureAppts = await db
    .select({ id: appointments.id, type: appointments.type, status: appointments.status })
    .from(appointments)
    .where(
      and(
        eq(appointments.patientId, currentUser.id),
        gte(appointments.date, today),
        inArray(appointments.status, ["PENDING", "CONFIRMED"])
      )
    );

  const activeFirstVisits = futureAppts.filter((a) => a.type === "FIRST_VISIT").length;
  const activeReturns = futureAppts.filter((a) => a.type === "RETURN").length;

  if (type === "FIRST_VISIT" && activeFirstVisits >= 1) {
    return NextResponse.json(
      { error: "Você já possui uma consulta agendada. Cancele a existente antes de agendar outra." },
      { status: 409 }
    );
  }

  if (type === "RETURN" && activeReturns >= 1) {
    return NextResponse.json(
      { error: "Você já possui um retorno agendado. Cancele o existente antes de agendar outro." },
      { status: 409 }
    );
  }

  // Check slot availability
  const slotConflict = await db
    .select({ id: appointments.id })
    .from(appointments)
    .where(
      and(
        eq(appointments.date, date),
        eq(appointments.startTime, start_time),
        inArray(appointments.status, ["PENDING", "CONFIRMED"])
      )
    )
    .limit(1);

  if (slotConflict.length > 0) {
    return NextResponse.json(
      { error: "Este horário já está ocupado. Escolha outro horário." },
      { status: 409 }
    );
  }

  try {
    const [appointment] = await db
      .insert(appointments)
      .values({
        patientId: currentUser.id,
        date,
        startTime: start_time,
        endTime: end_time,
        type,
        status: "PENDING",
        modality: appointmentModality,
      })
      .returning();

    try {
      const { notifyNewAppointment, getAdminUserId } = await import("@/lib/notifications");
      const { addCalendarEvent } = await import("@/lib/google-calendar");
      const adminId = await getAdminUserId();
      if (adminId) {
        await notifyNewAppointment(
          currentUser.name,
          date,
          start_time.slice(0, 5),
          type,
          appointment.id,
          adminId,
          currentUser.id,
          appointmentModality
        );
      }
      await addCalendarEvent(appointment);
    } catch (notifError) {
      console.error("[patient/book] Notification error:", notifError);
    }

    return NextResponse.json({
      appointment: {
        id: appointment.id,
        patient_id: appointment.patientId,
        date: appointment.date,
        start_time: appointment.startTime,
        end_time: appointment.endTime,
        type: appointment.type,
        status: appointment.status,
        modality: appointment.modality,
      },
    }, { status: 201 });
  } catch (e: unknown) {
    const pgErr = e as { code?: string };
    if (pgErr?.code === "23505") {
      return NextResponse.json({ error: "Este horário já está ocupado. Escolha outro horário." }, { status: 409 });
    }
    console.error("[patient/book] Error:", e);
    return NextResponse.json({ error: "Erro ao agendar consulta. Tente novamente." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments } from "@/lib/schema";
import { eq, and, inArray } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";

export async function POST(request: Request) {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (currentUser.role !== "ADMIN") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const body = await request.json();
  const { patient_id, date, start_time, end_time, type } = body as {
    patient_id: string;
    date: string;
    start_time: string;
    end_time: string;
    type: string;
  };

  if (!patient_id || !date || !start_time || !end_time || !type) {
    return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
  }

  const existing = await db
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

  if (existing.length > 0) {
    return NextResponse.json({ error: "Este horário já está ocupado." }, { status: 409 });
  }

  try {
    const [appointment] = await db
      .insert(appointments)
      .values({ patientId: patient_id, date, startTime: start_time, endTime: end_time, type, status: "CONFIRMED" })
      .returning();

    try {
      const { notifyNewAppointment, getPatientName } = await import("@/lib/notifications");
      const { addCalendarEvent } = await import("@/lib/google-calendar");
      const patientName = await getPatientName(patient_id);
      await notifyNewAppointment(patientName, date, start_time.slice(0, 5), type, appointment.id, currentUser.id, patient_id);
      await addCalendarEvent(appointment);
    } catch (notifError) {
      console.error("[admin/appointments] Notification error:", notifError);
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
      },
    }, { status: 201 });
  } catch (e: unknown) {
    const pgErr = e as { code?: string };
    if (pgErr?.code === "23505") {
      return NextResponse.json({ error: "Este horário já está ocupado." }, { status: 409 });
    }
    return NextResponse.json({ error: "Erro ao criar agendamento." }, { status: 500 });
  }
}

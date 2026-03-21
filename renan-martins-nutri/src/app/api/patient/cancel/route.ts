import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";
import { notifyAppointmentCancelledByPatient } from "@/lib/notifications";
import { deleteCalendarEvent } from "@/lib/google-calendar";

export async function POST(request: Request) {
  const currentUser = await getServerUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const body = await request.json();
  const { appointment_id } = body as { appointment_id: string };

  if (!appointment_id) {
    return NextResponse.json({ error: "ID da consulta obrigatório" }, { status: 400 });
  }

  const rows = await db
    .select()
    .from(appointments)
    .where(eq(appointments.id, appointment_id))
    .limit(1);

  const appointment = rows[0];
  if (!appointment) {
    return NextResponse.json({ error: "Consulta não encontrada" }, { status: 404 });
  }

  if (appointment.patientId !== currentUser.id) {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }

  if (!["PENDING", "CONFIRMED"].includes(appointment.status)) {
    return NextResponse.json({ error: "Esta consulta não pode ser cancelada" }, { status: 400 });
  }

  const appointmentDateTime = new Date(`${appointment.date}T${appointment.startTime}`);
  const minAdvance = Date.now() + 12 * 60 * 60 * 1000;
  if (appointmentDateTime.getTime() < minAdvance) {
    return NextResponse.json(
      { error: "Cancelamentos devem ser feitos com pelo menos 12 horas de antecedência." },
      { status: 400 }
    );
  }

  await db
    .update(appointments)
    .set({ status: "CANCELLED" })
    .where(eq(appointments.id, appointment_id));

  try {
    await notifyAppointmentCancelledByPatient(
      currentUser.id,
      appointment.date,
      appointment.startTime?.slice(0, 5),
      appointment_id
    );
    await deleteCalendarEvent(appointment_id);
  } catch (notifError) {
    console.error("[patient/cancel] Notification error:", notifError);
  }

  return NextResponse.json({ success: true });
}

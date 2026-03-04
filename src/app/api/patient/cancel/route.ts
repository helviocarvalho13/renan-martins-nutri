import { NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { notifyAppointmentCancelledByPatient } from "@/lib/notifications";
import { deleteCalendarEvent } from "@/lib/google-calendar";

export async function POST(request: Request) {
  const serverClient = await createServerSupabaseClient();
  const { data: { user } } = await serverClient.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const body = await request.json();
  const { appointment_id } = body;

  if (!appointment_id) {
    return NextResponse.json({ error: "ID da consulta obrigatório" }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  const { data: appointment, error: fetchError } = await supabase
    .from("appointments")
    .select("*")
    .eq("id", appointment_id)
    .single();

  if (fetchError || !appointment) {
    return NextResponse.json({ error: "Consulta não encontrada" }, { status: 404 });
  }

  if (appointment.patient_id !== user.id) {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }

  if (!["PENDING", "CONFIRMED"].includes(appointment.status)) {
    return NextResponse.json({ error: "Esta consulta não pode ser cancelada" }, { status: 400 });
  }

  const appointmentDateTime = new Date(`${appointment.date}T${appointment.start_time}`);
  const minAdvance = Date.now() + 12 * 60 * 60 * 1000;
  if (appointmentDateTime.getTime() < minAdvance) {
    return NextResponse.json(
      { error: "Cancelamentos devem ser feitos com pelo menos 12 horas de antecedência." },
      { status: 400 }
    );
  }

  const { error: updateError } = await supabase
    .from("appointments")
    .update({ status: "CANCELLED" })
    .eq("id", appointment_id);

  if (updateError) {
    return NextResponse.json({ error: "Erro ao cancelar consulta." }, { status: 500 });
  }

  try {
    const dateFormatted = appointment.date;
    const timeFormatted = appointment.start_time?.slice(0, 5);
    await notifyAppointmentCancelledByPatient(user.id, dateFormatted, timeFormatted, appointment_id);
    await deleteCalendarEvent(appointment_id);
  } catch (notifError) {
    console.error("[patient/cancel] Notification error:", notifError);
  }

  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const serverSupabase = await createServerSupabaseClient();
  const { data: { user } } = await serverSupabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  if (user.user_metadata?.role !== "ADMIN" && user.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  const body = await request.json();
  const { patient_id, date, start_time, end_time, type } = body;

  if (!patient_id || !date || !start_time || !end_time || !type) {
    return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  const { data: existing } = await supabase
    .from("appointments")
    .select("id, status")
    .eq("date", date)
    .eq("start_time", start_time)
    .in("status", ["PENDING", "CONFIRMED"])
    .limit(1);

  if (existing && existing.length > 0) {
    return NextResponse.json({ error: "Este horário já está ocupado." }, { status: 409 });
  }

  const { data: appointment, error } = await supabase
    .from("appointments")
    .insert({
      patient_id,
      date,
      start_time,
      end_time,
      type,
      status: "CONFIRMED",
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Este horário já está ocupado." }, { status: 409 });
    }
    return NextResponse.json({ error: "Erro ao criar agendamento." }, { status: 500 });
  }

  try {
    const { notifyNewAppointment, getPatientName } = await import("@/lib/notifications");
    const { addCalendarEvent } = await import("@/lib/google-calendar");

    const patientName = await getPatientName(patient_id);
    await notifyNewAppointment(patientName, date, start_time.slice(0, 5), type, appointment.id, user.id, patient_id);
    await addCalendarEvent(appointment);
  } catch (notifError) {
    console.error("[admin/appointments] Notification/calendar error:", notifError);
  }

  return NextResponse.json({ appointment }, { status: 201 });
}

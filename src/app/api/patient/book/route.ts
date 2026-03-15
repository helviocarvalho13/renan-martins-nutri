import { NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { AppointmentType } from "@/lib/types";

export async function POST(request: Request) {
  let user = null;

  const serverClient = await createServerSupabaseClient();
  const { data: cookieAuth } = await serverClient.auth.getUser();
  user = cookieAuth?.user || null;

  if (!user) {
    const authHeader = request.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      const supabaseWithToken = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { global: { headers: { Authorization: `Bearer ${token}` } } }
      );
      const { data: tokenAuth } = await supabaseWithToken.auth.getUser(token);
      user = tokenAuth?.user || null;
    }
  }

  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const body = await request.json();
  const { date, start_time, end_time, type } = body;

  if (!date || !start_time || !end_time || !type) {
    return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
  }

  const validTypes: AppointmentType[] = ["FIRST_VISIT", "RETURN"];
  if (!validTypes.includes(type)) {
    return NextResponse.json({ error: "Tipo de consulta inválido" }, { status: 400 });
  }

  const appointmentDateTime = new Date(`${date}T${start_time}`);
  const minAdvance = Date.now() + 24 * 60 * 60 * 1000;
  if (appointmentDateTime.getTime() < minAdvance) {
    return NextResponse.json(
      { error: "Agendamentos devem ser feitos com pelo menos 24 horas de antecedência." },
      { status: 400 }
    );
  }

  const supabase = createServiceRoleClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, phone")
    .eq("id", user.id)
    .single();

  if (!profile) {
    const phone = user.user_metadata?.phone || null;
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json(
        { error: "Número de WhatsApp obrigatório. Atualize seu perfil antes de agendar." },
        { status: 400 }
      );
    }
    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      role: "PATIENT",
      full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || null,
      phone,
      is_active: true,
    });
    if (profileError) {
      console.error("[patient/book] Profile creation error:", profileError.message);
      return NextResponse.json({ error: "Erro ao preparar perfil do paciente." }, { status: 500 });
    }
  } else if (!profile.phone || profile.phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { error: "Número de WhatsApp obrigatório. Atualize seu perfil antes de agendar." },
      { status: 400 }
    );
  }

  const today = new Date().toISOString().split("T")[0];

  const { data: futureAppts } = await supabase
    .from("appointments")
    .select("id, type, status")
    .eq("patient_id", user.id)
    .gte("date", today)
    .in("status", ["PENDING", "CONFIRMED"]);

  const activeAppts = futureAppts || [];
  const activeFirstVisits = activeAppts.filter((a) => a.type === "FIRST_VISIT").length;
  const activeReturns = activeAppts.filter((a) => a.type === "RETURN").length;

  if (type === "FIRST_VISIT" && activeFirstVisits >= 1) {
    return NextResponse.json(
      { error: "Você já possui uma consulta agendada. Cancele a existente antes de agendar outra." },
      { status: 409 }
    );
  }

  if (type === "RETURN" && activeReturns >= 1) {
    return NextResponse.json(
      { error: "Você já possui um retorno agendado." },
      { status: 409 }
    );
  }

  if (type === "RETURN") {
    const { data: completed } = await supabase
      .from("appointments")
      .select("id, date, return_suggested_date")
      .eq("patient_id", user.id)
      .eq("status", "COMPLETED")
      .order("date", { ascending: false })
      .limit(1);

    if (!completed || completed.length === 0) {
      return NextResponse.json(
        { error: "Retornos só estão disponíveis após uma consulta concluída." },
        { status: 403 }
      );
    }

    let returnWindowDays = 30;
    try {
      const { data: settings } = await supabase
        .from("site_content")
        .select("content")
        .eq("section", "settings")
        .eq("title", "return_window")
        .single();
      if (settings?.content?.return_window_days) {
        returnWindowDays = settings.content.return_window_days;
      }
    } catch {}

    const lastCompleted = completed[0];
    const completedDate = new Date(lastCompleted.date + "T12:00:00");
    const daysSinceCompleted = Math.floor((Date.now() - completedDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSinceCompleted > returnWindowDays) {
      return NextResponse.json(
        { error: `A janela de retorno de ${returnWindowDays} dias expirou. Agende uma consulta regular.` },
        { status: 403 }
      );
    }
  }

  const { data: existing } = await supabase
    .from("appointments")
    .select("id, status")
    .eq("date", date)
    .eq("start_time", start_time)
    .limit(1);

  if (existing && existing.length > 0) {
    const existingAppt = existing[0];
    if (existingAppt.status === "PENDING" || existingAppt.status === "CONFIRMED") {
      return NextResponse.json(
        { error: "Este horário já está ocupado. Escolha outro horário." },
        { status: 409 }
      );
    }
    if (existingAppt.status === "CANCELLED" || existingAppt.status === "NO_SHOW") {
      await supabase.from("appointments").delete().eq("id", existingAppt.id);
    }
  }

  const { data: appointment, error } = await supabase
    .from("appointments")
    .insert({
      patient_id: user.id,
      date,
      start_time,
      end_time,
      type,
      status: "PENDING",
    })
    .select()
    .single();

  if (error) {
    console.error("[patient/book] Insert error:", error.code, error.message, error.details);
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Este horário já está ocupado. Escolha outro horário." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Erro ao criar agendamento." }, { status: 500 });
  }

  try {
    const { notifyNewAppointment, getAdminUserId, getPatientName } = await import("@/lib/notifications");
    const { addCalendarEvent } = await import("@/lib/google-calendar");

    const adminId = await getAdminUserId();
    if (adminId) {
      const patientName = await getPatientName(user.id);
      await notifyNewAppointment(patientName, date, start_time.slice(0, 5), type, appointment.id, adminId, user.id);
    }

    await addCalendarEvent(appointment);
  } catch (notifError) {
    console.error("[patient/book] Notification/calendar error:", notifError);
  }

  return NextResponse.json({ appointment }, { status: 201 });
}

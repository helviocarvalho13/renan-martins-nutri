import { NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import type { AppointmentType } from "@/lib/types";

export async function POST(request: Request) {
  const serverClient = await createServerSupabaseClient();
  const { data: { user } } = await serverClient.auth.getUser();

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
    .select("id")
    .eq("id", user.id)
    .single();

  if (!profile) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      role: "PATIENT",
      full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || null,
      is_active: true,
    });
    if (profileError) {
      console.error("[patient/book] Profile creation error:", profileError.message);
      return NextResponse.json({ error: "Erro ao preparar perfil do paciente." }, { status: 500 });
    }
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
      .select("id, return_suggested_date")
      .eq("patient_id", user.id)
      .eq("status", "COMPLETED")
      .not("return_suggested_date", "is", null)
      .limit(1);

    if (!completed || completed.length === 0) {
      return NextResponse.json(
        { error: "Retornos só estão disponíveis após uma consulta concluída com sugestão de data." },
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

  const { data: admins } = await supabase
    .from("profiles")
    .select("id")
    .eq("role", "ADMIN")
    .limit(1);

  if (admins && admins.length > 0) {
    const { data: patientProfile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();

    const patientName = patientProfile?.full_name || user.email || "Paciente";
    const typeLabel = type === "FIRST_VISIT" ? "Primeira Consulta" : "Retorno";

    await supabase.from("notifications").insert({
      user_id: admins[0].id,
      type: "APPOINTMENT_CREATED",
      title: "Nova consulta agendada",
      message: `${patientName} agendou ${typeLabel} para ${date} as ${start_time.slice(0, 5)}`,
      appointment_id: appointment.id,
    });
  }

  return NextResponse.json({ appointment }, { status: 201 });
}

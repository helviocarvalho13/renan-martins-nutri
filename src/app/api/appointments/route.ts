import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import type { AppointmentType } from "@/lib/types";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { date, start_time, end_time, type, patient_name, patient_email, patient_phone, notes } = body;

  if (!date || !start_time || !end_time || !patient_name || !patient_email || !patient_phone) {
    return NextResponse.json(
      { error: "Todos os campos obrigatórios devem ser preenchidos" },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(patient_email)) {
    return NextResponse.json(
      { error: "Email inválido" },
      { status: 400 }
    );
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return NextResponse.json(
      { error: "Data invalida" },
      { status: 400 }
    );
  }

  const appointmentDate = new Date(date + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (appointmentDate < today) {
    return NextResponse.json(
      { error: "A data deve ser futura" },
      { status: 400 }
    );
  }

  const validTypes: AppointmentType[] = ["FIRST_VISIT", "RETURN"];
  const appointmentType: AppointmentType = validTypes.includes(type) ? type : "FIRST_VISIT";

  const supabase = createServiceRoleClient();

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
        { error: "Este horário já está ocupado. Por favor, escolha outro horário." },
        { status: 409 }
      );
    }
    if (existingAppt.status === "CANCELLED" || existingAppt.status === "NO_SHOW") {
      await supabase.from("appointments").delete().eq("id", existingAppt.id);
    }
  }

  let patientId: string | null = null;

  const { data: existingUser } = await supabase
    .from("profiles")
    .select("id")
    .ilike("id", `%`)
    .limit(1);

  const { data: authUsers } = await supabase.auth.admin.listUsers();
  const matchingUser = authUsers?.users?.find(
    (u) => u.email?.toLowerCase() === patient_email.trim().toLowerCase()
  );
  if (matchingUser) {
    patientId = matchingUser.id;
  }

  if (!patientId) {
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: patient_email.trim().toLowerCase(),
      email_confirm: true,
      user_metadata: {
        name: patient_name.trim(),
        full_name: patient_name.trim(),
        phone: patient_phone.trim(),
        role: "PATIENT",
      },
    });

    if (createError || !newUser.user) {
      return NextResponse.json(
        { error: "Erro ao processar cadastro. Tente novamente." },
        { status: 500 }
      );
    }
    patientId = newUser.user.id;
  }

  const { data: appointment, error } = await supabase
    .from("appointments")
    .insert({
      patient_id: patientId,
      date,
      start_time,
      end_time,
      type: appointmentType,
      status: "PENDING",
      notes: notes?.trim() || null,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Este horário já está ocupado. Por favor, escolha outro horário." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Erro ao criar agendamento. Tente novamente." },
      { status: 500 }
    );
  }

  return NextResponse.json({ appointment }, { status: 201 });
}

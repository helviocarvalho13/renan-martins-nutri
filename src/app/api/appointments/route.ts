import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { service_id, date, start_time, end_time, patient_name, patient_email, patient_phone, notes } = body;

  if (!service_id || !date || !start_time || !end_time || !patient_name || !patient_email || !patient_phone) {
    return NextResponse.json(
      { error: "Todos os campos obrigatorios devem ser preenchidos" },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(patient_email)) {
    return NextResponse.json(
      { error: "Email invalido" },
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

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: service } = await supabase
    .from("services")
    .select("id, is_active")
    .eq("id", service_id)
    .eq("is_active", true)
    .single();

  if (!service) {
    return NextResponse.json(
      { error: "Servico nao encontrado ou inativo" },
      { status: 400 }
    );
  }

  const dayOfWeek = appointmentDate.getDay();
  const { data: validSlot } = await supabase
    .from("time_slots")
    .select("id")
    .eq("day_of_week", dayOfWeek)
    .eq("start_time", start_time)
    .eq("end_time", end_time)
    .eq("is_active", true)
    .single();

  if (!validSlot) {
    return NextResponse.json(
      { error: "Horario nao disponivel" },
      { status: 400 }
    );
  }

  const { data: existing } = await supabase
    .from("appointments")
    .select("id")
    .eq("date", date)
    .eq("start_time", start_time)
    .in("status", ["pending", "confirmed"])
    .limit(1);

  if (existing && existing.length > 0) {
    return NextResponse.json(
      { error: "Este horario ja esta ocupado. Por favor, escolha outro horario." },
      { status: 409 }
    );
  }

  const { data: appointment, error } = await supabase
    .from("appointments")
    .insert({
      service_id,
      date,
      start_time,
      end_time,
      patient_name: patient_name.trim(),
      patient_email: patient_email.trim().toLowerCase(),
      patient_phone: patient_phone.trim(),
      notes: notes?.trim() || null,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Erro ao criar agendamento. Tente novamente." },
      { status: 500 }
    );
  }

  return NextResponse.json({ appointment }, { status: 201 });
}

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: existingServices } = await supabase
    .from("services")
    .select("id")
    .limit(1);

  if (existingServices && existingServices.length > 0) {
    return NextResponse.json({ message: "Database already seeded" });
  }

  const { error: servicesError } = await supabase.from("services").insert([
    {
      name: "Consulta Inicial",
      description:
        "Avaliacao completa do estado nutricional, anamnese detalhada, definicao de objetivos e elaboracao do plano alimentar personalizado.",
      duration_minutes: 60,
      price: 25000,
      is_active: true,
      icon: "apple",
    },
    {
      name: "Retorno",
      description:
        "Acompanhamento da evolucao, ajustes no plano alimentar e orientacoes complementares para manter seus resultados.",
      duration_minutes: 40,
      price: 15000,
      is_active: true,
      icon: "target",
    },
    {
      name: "Nutricao Esportiva",
      description:
        "Plano alimentar focado em performance esportiva, com estrategias de periodizacao nutricional e suplementacao.",
      duration_minutes: 60,
      price: 30000,
      is_active: true,
      icon: "activity",
    },
    {
      name: "Reeducacao Alimentar",
      description:
        "Programa completo para transformar sua relacao com a comida, com acompanhamento semanal e suporte continuo.",
      duration_minutes: 50,
      price: 20000,
      is_active: true,
      icon: "heart",
    },
  ]);

  if (servicesError) {
    return NextResponse.json({ error: servicesError.message }, { status: 500 });
  }

  const timeSlotEntries = [];
  for (let dayOfWeek = 1; dayOfWeek <= 5; dayOfWeek++) {
    const slots = [
      { start: "08:00:00", end: "09:00:00" },
      { start: "09:00:00", end: "10:00:00" },
      { start: "10:00:00", end: "11:00:00" },
      { start: "11:00:00", end: "12:00:00" },
      { start: "14:00:00", end: "15:00:00" },
      { start: "15:00:00", end: "16:00:00" },
      { start: "16:00:00", end: "17:00:00" },
      { start: "17:00:00", end: "18:00:00" },
    ];
    for (const slot of slots) {
      timeSlotEntries.push({
        day_of_week: dayOfWeek,
        start_time: slot.start,
        end_time: slot.end,
        is_active: true,
      });
    }
  }

  const { error: slotsError } = await supabase
    .from("time_slots")
    .insert(timeSlotEntries);

  if (slotsError) {
    return NextResponse.json({ error: slotsError.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Database seeded successfully" });
}

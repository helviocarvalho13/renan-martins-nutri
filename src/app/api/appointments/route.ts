import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments, user } from "@/lib/schema";
import { eq, and, inArray } from "drizzle-orm";
import type { AppointmentType } from "@/lib/types";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { date, start_time, end_time, type, patient_name, patient_email, patient_phone, notes } = body as {
    date: string;
    start_time: string;
    end_time: string;
    type: AppointmentType;
    patient_name: string;
    patient_email: string;
    patient_phone: string;
    notes?: string;
  };

  if (!date || !start_time || !end_time || !patient_name || !patient_email || !patient_phone) {
    return NextResponse.json({ error: "Todos os campos obrigatórios devem ser preenchidos" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(patient_email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return NextResponse.json({ error: "Data inválida" }, { status: 400 });
  }

  const appointmentDate = new Date(date + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (appointmentDate < today) {
    return NextResponse.json({ error: "A data deve ser futura" }, { status: 400 });
  }

  const validTypes: AppointmentType[] = ["FIRST_VISIT", "RETURN"];
  const appointmentType: AppointmentType = validTypes.includes(type) ? type : "FIRST_VISIT";

  const existing = await db
    .select({ id: appointments.id, status: appointments.status })
    .from(appointments)
    .where(and(eq(appointments.date, date), eq(appointments.startTime, start_time)))
    .limit(1);

  if (existing.length > 0) {
    const ex = existing[0];
    if (ex.status === "PENDING" || ex.status === "CONFIRMED") {
      return NextResponse.json({ error: "Este horário já está ocupado. Por favor, escolha outro horário." }, { status: 409 });
    }
    if (ex.status === "CANCELLED" || ex.status === "NO_SHOW") {
      await db.delete(appointments).where(eq(appointments.id, ex.id));
    }
  }

  // Find or create patient user account
  const existingUser = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, patient_email.trim().toLowerCase()))
    .limit(1);

  let patientId: string;

  if (existingUser.length > 0) {
    patientId = existingUser[0].id;
  } else {
    // Create a new user account using better-auth API
    const { auth } = await import("@/lib/auth");
    const signUpResponse = await auth.api.signUpEmail({
      body: {
        name: patient_name.trim(),
        email: patient_email.trim().toLowerCase(),
        password: Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2),
        phone: patient_phone.trim(),
      },
    });
    if (!signUpResponse?.user?.id) {
      return NextResponse.json({ error: "Erro ao processar cadastro. Tente novamente." }, { status: 500 });
    }
    patientId = signUpResponse.user.id;
  }

  try {
    const [appointment] = await db
      .insert(appointments)
      .values({
        patientId,
        date,
        startTime: start_time,
        endTime: end_time,
        type: appointmentType,
        status: "PENDING",
        notes: notes?.trim() || null,
      })
      .returning();

    return NextResponse.json({
      appointment: {
        id: appointment.id,
        patient_id: appointment.patientId,
        date: appointment.date,
        start_time: appointment.startTime,
        end_time: appointment.endTime,
        type: appointment.type,
        status: appointment.status,
        notes: appointment.notes,
      },
    }, { status: 201 });
  } catch (e: unknown) {
    const pgErr = e as { code?: string };
    if (pgErr?.code === "23505") {
      return NextResponse.json({ error: "Este horário já está ocupado. Por favor, escolha outro horário." }, { status: 409 });
    }
    return NextResponse.json({ error: "Erro ao criar agendamento. Tente novamente." }, { status: 500 });
  }
}

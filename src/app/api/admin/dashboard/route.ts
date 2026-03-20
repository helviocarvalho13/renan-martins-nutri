import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments, user } from "@/lib/schema";
import { eq, and, ne } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";

export async function GET() {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (currentUser.role !== "ADMIN") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const today = new Date().toISOString().split("T")[0];

  const [todayAppts, pendingCount, confirmedCount, totalPatients] = await Promise.all([
    db
      .select({
        id: appointments.id,
        patient_id: appointments.patientId,
        date: appointments.date,
        start_time: appointments.startTime,
        end_time: appointments.endTime,
        type: appointments.type,
        status: appointments.status,
        modality: appointments.modality,
        notes: appointments.notes,
        patient_name: user.name,
        patient_phone: user.phone,
      })
      .from(appointments)
      .leftJoin(user, eq(appointments.patientId, user.id))
      .where(and(eq(appointments.date, today), ne(appointments.status, "CANCELLED")))
      .orderBy(appointments.startTime),

    db
      .select({ id: appointments.id })
      .from(appointments)
      .where(eq(appointments.status, "PENDING")),

    db
      .select({ id: appointments.id })
      .from(appointments)
      .where(eq(appointments.status, "CONFIRMED")),

    db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.role, "PATIENT")),
  ]);

  return NextResponse.json({
    today_appointments: todayAppts,
    pending_count: pendingCount.length,
    confirmed_count: confirmedCount.length,
    total_patients: totalPatients.length,
  });
}

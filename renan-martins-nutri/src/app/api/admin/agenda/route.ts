import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments, user } from "@/lib/schema";
import { eq, and, gte, lte } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";

export async function GET(request: NextRequest) {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (currentUser.role !== "ADMIN") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from") || new Date().toISOString().split("T")[0];
  const to = searchParams.get("to") || from;

  const rows = await db
    .select({
      id: appointments.id,
      patient_id: appointments.patientId,
      date: appointments.date,
      start_time: appointments.startTime,
      end_time: appointments.endTime,
      type: appointments.type,
      status: appointments.status,
      notes: appointments.notes,
      modality: appointments.modality,
      return_suggested_date: appointments.returnSuggestedDate,
      patient_name: user.name,
      patient_phone: user.phone,
      patient_email: user.email,
    })
    .from(appointments)
    .leftJoin(user, eq(appointments.patientId, user.id))
    .where(and(gte(appointments.date, from), lte(appointments.date, to)))
    .orderBy(appointments.date, appointments.startTime);

  return NextResponse.json({ appointments: rows });
}

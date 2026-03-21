import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";

export async function GET() {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const rows = await db
    .select()
    .from(appointments)
    .where(eq(appointments.patientId, currentUser.id))
    .orderBy(appointments.date);

  const mapped = rows.map((r) => ({
    id: r.id,
    patient_id: r.patientId,
    date: r.date,
    start_time: r.startTime,
    end_time: r.endTime,
    type: r.type,
    status: r.status,
    notes: r.notes,
    return_suggested_date: r.returnSuggestedDate,
    modality: r.modality,
    created_at: r.createdAt,
  }));

  return NextResponse.json({ appointments: mapped });
}

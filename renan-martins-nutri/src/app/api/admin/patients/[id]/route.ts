import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { user, appointments } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (currentUser.role !== "ADMIN") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const { id } = await params;

  const [patientRows, apptRows] = await Promise.all([
    db
      .select({
        id: user.id,
        full_name: user.name,
        email: user.email,
        phone: user.phone,
        cpf: user.cpf,
        date_of_birth: user.dateOfBirth,
        is_active: user.isActive,
        created_at: user.createdAt,
      })
      .from(user)
      .where(eq(user.id, id))
      .limit(1),

    db
      .select({
        id: appointments.id,
        date: appointments.date,
        start_time: appointments.startTime,
        end_time: appointments.endTime,
        type: appointments.type,
        status: appointments.status,
        modality: appointments.modality,
        notes: appointments.notes,
        return_suggested_date: appointments.returnSuggestedDate,
        created_at: appointments.createdAt,
      })
      .from(appointments)
      .where(eq(appointments.patientId, id))
      .orderBy(appointments.date),
  ]);

  if (patientRows.length === 0) {
    return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
  }

  return NextResponse.json({ profile: patientRows[0], appointments: apptRows });
}

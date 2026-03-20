import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments } from "@/lib/schema";
import { eq, and, ne, inArray } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";
import type { AppointmentStatus } from "@/lib/types";
import {
  notifyAppointmentConfirmed,
  notifyAppointmentCancelledByAdmin,
  notifyAppointmentCompleted,
  notifyNoShow,
  notifyReturnSuggestion,
  notifyAppointmentRescheduled,
} from "@/lib/notifications";
import { addCalendarEvent, updateCalendarEvent, deleteCalendarEvent } from "@/lib/google-calendar";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const currentUser = await getServerUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }
  if (currentUser.role !== "ADMIN") {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  const body = await request.json();
  const { status, notes, return_suggested_date, date, start_time, end_time } = body as {
    status?: AppointmentStatus;
    notes?: string;
    return_suggested_date?: string;
    date?: string;
    start_time?: string;
    end_time?: string;
  };

  const validStatuses: AppointmentStatus[] = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"];
  if (status && !validStatuses.includes(status)) {
    return NextResponse.json({ error: "Status inválido" }, { status: 400 });
  }

  if (date && start_time && end_time) {
    const conflict = await db
      .select({ id: appointments.id })
      .from(appointments)
      .where(
        and(
          eq(appointments.date, date),
          eq(appointments.startTime, start_time),
          inArray(appointments.status, ["PENDING", "CONFIRMED"]),
          ne(appointments.id, id)
        )
      )
      .limit(1);

    if (conflict.length > 0) {
      return NextResponse.json({ error: "Este horário já está ocupado." }, { status: 409 });
    }
  }

  const updateFields: Partial<typeof appointments.$inferInsert> = {};
  if (status) updateFields.status = status;
  if (notes !== undefined) updateFields.notes = notes;
  if (return_suggested_date !== undefined) updateFields.returnSuggestedDate = return_suggested_date;
  if (date) updateFields.date = date;
  if (start_time) updateFields.startTime = start_time;
  if (end_time) updateFields.endTime = end_time;

  if (Object.keys(updateFields).length === 0) {
    return NextResponse.json({ error: "Nenhum campo para atualizar" }, { status: 400 });
  }

  const [updated] = await db
    .update(appointments)
    .set(updateFields)
    .where(eq(appointments.id, id))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "Consulta não encontrada" }, { status: 404 });
  }

  try {
    const patientId = updated.patientId;
    const dateFormatted = updated.date;
    const timeFormatted = updated.startTime?.slice(0, 5);
    const appointmentType = updated.type || "FIRST_VISIT";

    if (status === "CONFIRMED") {
      await notifyAppointmentConfirmed(patientId, dateFormatted, timeFormatted, appointmentType, id);
      await addCalendarEvent(updated);
    } else if (status === "CANCELLED") {
      await notifyAppointmentCancelledByAdmin(patientId, dateFormatted, timeFormatted, id);
      await deleteCalendarEvent(id);
    } else if (status === "COMPLETED") {
      await notifyAppointmentCompleted(patientId, dateFormatted, timeFormatted, appointmentType, id);
      await updateCalendarEvent(updated);
      if (return_suggested_date) {
        await notifyReturnSuggestion(patientId, return_suggested_date);
      }
    } else if (status === "NO_SHOW") {
      await notifyNoShow(patientId, dateFormatted, timeFormatted, id);
      await deleteCalendarEvent(id);
    }

    if (date && start_time && !status) {
      await notifyAppointmentRescheduled(patientId, updated.date, updated.startTime?.slice(0, 5), id);
      await updateCalendarEvent(updated);
    }

    if (!status && return_suggested_date) {
      await notifyReturnSuggestion(updated.patientId, return_suggested_date);
    }
  } catch (notifError) {
    console.error("[appointments/PATCH] Notification error:", notifError);
  }

  return NextResponse.json({
    appointment: {
      id: updated.id,
      patient_id: updated.patientId,
      date: updated.date,
      start_time: updated.startTime,
      end_time: updated.endTime,
      type: updated.type,
      status: updated.status,
      notes: updated.notes,
      return_suggested_date: updated.returnSuggestedDate,
    },
  });
}

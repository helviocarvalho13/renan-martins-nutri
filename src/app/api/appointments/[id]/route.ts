import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import type { AppointmentStatus } from "@/lib/types";
import {
  notifyAppointmentConfirmed,
  notifyAppointmentCancelledByAdmin,
  notifyAppointmentCompleted,
  notifyNoShow,
  notifyReturnSuggestion,
} from "@/lib/notifications";
import { addCalendarEvent, updateCalendarEvent, deleteCalendarEvent } from "@/lib/google-calendar";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const serverSupabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await serverSupabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  if (user.user_metadata?.role !== "ADMIN" && user.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  const body = await request.json();
  const { status, notes, return_suggested_date } = body;

  const validStatuses: AppointmentStatus[] = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"];
  if (status && !validStatuses.includes(status)) {
    return NextResponse.json(
      { error: "Status inválido" },
      { status: 400 }
    );
  }

  const supabase = createServiceRoleClient();

  const updateFields: Record<string, unknown> = {};
  if (status) updateFields.status = status;
  if (notes !== undefined) updateFields.notes = notes;
  if (return_suggested_date !== undefined) updateFields.return_suggested_date = return_suggested_date;

  if (Object.keys(updateFields).length === 0) {
    return NextResponse.json({ error: "Nenhum campo para atualizar" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("appointments")
    .update(updateFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar agendamento" },
      { status: 500 }
    );
  }

  try {
    const patientId = data.patient_id;
    const dateFormatted = data.date;
    const timeFormatted = data.start_time?.slice(0, 5);
    const appointmentType = data.type || "FIRST_VISIT";

    if (status === "CONFIRMED") {
      await notifyAppointmentConfirmed(patientId, dateFormatted, timeFormatted, appointmentType, id);
      await addCalendarEvent(data);
    } else if (status === "CANCELLED") {
      await notifyAppointmentCancelledByAdmin(patientId, dateFormatted, timeFormatted, id);
      await deleteCalendarEvent(id);
    } else if (status === "COMPLETED") {
      await notifyAppointmentCompleted(patientId, dateFormatted, timeFormatted, appointmentType, id);
      await updateCalendarEvent(data);
      if (return_suggested_date) {
        await notifyReturnSuggestion(patientId, return_suggested_date);
      }
    } else if (status === "NO_SHOW") {
      await notifyNoShow(patientId, dateFormatted, timeFormatted, id);
      await deleteCalendarEvent(id);
    }

    if (!status && return_suggested_date) {
      await notifyReturnSuggestion(data.patient_id, return_suggested_date);
    }
  } catch (notifError) {
    console.error("[appointments/PATCH] Notification error:", notifError);
  }

  return NextResponse.json({ appointment: data });
}

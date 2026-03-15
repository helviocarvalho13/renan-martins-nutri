import { createServiceRoleClient } from "@/lib/supabase/server";
import type { NotificationType } from "@/lib/types/database";
import { sendEmail, getPatientEmail, getAdminEmail } from "@/lib/email/sender";
import * as templates from "@/lib/email/templates";

function formatDateBR(date: string): string {
  if (!date) return date;
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) return match[3] + "/" + match[2] + "/" + match[1];
  return date;
}

interface CreateNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  appointmentId?: string;
}

export async function createNotification({
  userId,
  type,
  title,
  message,
  appointmentId,
}: CreateNotificationParams) {
  const supabase = createServiceRoleClient();

  const { error } = await supabase.from("notifications").insert({
    user_id: userId,
    type,
    title,
    message,
    appointment_id: appointmentId ?? null,
  });

  if (error) {
    console.error("[createNotification] Error:", error.message);
  }
}

export async function getAdminUserId(): Promise<string | null> {
  const supabase = createServiceRoleClient();
  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("role", "ADMIN")
    .limit(1);

  return data && data.length > 0 ? data[0].id : null;
}

export async function getPatientName(patientId: string): Promise<string> {
  const supabase = createServiceRoleClient();
  const { data } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", patientId)
    .single();

  return data?.full_name || "Paciente";
}

export async function notifyNewAppointment(
  patientName: string,
  date: string,
  time: string,
  type: string,
  appointmentId: string,
  adminId: string,
  patientId?: string
) {
  await createNotification({
    userId: adminId,
    type: "APPOINTMENT_CREATED",
    title: "Nova consulta agendada",
    message: `${patientName} agendou ${type === "FIRST_VISIT" ? "Consulta" : "Retorno"} para ${formatDateBR(date)} às ${time}`,
    appointmentId,
  });

  try {
    const adminEmail = await getAdminEmail();
    if (adminEmail) {
      const { subject, html } = templates.newAppointmentAdmin(patientName, formatDateBR(date), time, type);
      await sendEmail(adminEmail, subject, html);
    }
  } catch (e) {
    console.error("[notifyNewAppointment] Email error:", e);
  }

  if (patientId) {
    try {
      const { sendWhatsApp, getPatientPhone } = await import("@/lib/whatsapp/sender");
      const phone = await getPatientPhone(patientId);
      if (!phone) {
        console.warn("[notifyNewAppointment] Patient has no phone saved, skipping WhatsApp:", patientId);
      } else if (phone) {
        const typeLabel = type === "FIRST_VISIT" ? "Consulta" : "Retorno";
        const msg = `Olá, ${patientName}! Sua ${typeLabel} com o nutricionista Renan Martins foi agendada para ${formatDateBR(date)} às ${time}. Aguardamos você!`;
        await sendWhatsApp(phone, msg);
      }
    } catch (e) {
      console.error("[notifyNewAppointment] WhatsApp error:", e);
    }
  }
}

export async function notifyAppointmentConfirmed(
  patientId: string,
  date: string,
  time: string,
  type: string,
  appointmentId: string
) {
  const patientName = await getPatientName(patientId);

  await createNotification({
    userId: patientId,
    type: "APPOINTMENT_CONFIRMED",
    title: "Consulta confirmada",
    message: `Sua consulta do dia ${formatDateBR(date)} às ${time} foi confirmada!`,
    appointmentId,
  });

  try {
    const email = await getPatientEmail(patientId);
    if (email) {
      const { subject, html } = templates.appointmentConfirmedPatient(patientName, formatDateBR(date), time, type);
      await sendEmail(email, subject, html);
    }
  } catch (e) {
    console.error("[notifyAppointmentConfirmed] Email error:", e);
  }
}

export async function notifyAppointmentCancelledByAdmin(
  patientId: string,
  date: string,
  time: string,
  appointmentId: string
) {
  const patientName = await getPatientName(patientId);

  await createNotification({
    userId: patientId,
    type: "APPOINTMENT_CANCELLED",
    title: "Consulta cancelada",
    message: `Sua consulta do dia ${formatDateBR(date)} às ${time} foi cancelada.`,
    appointmentId,
  });

  try {
    const email = await getPatientEmail(patientId);
    if (email) {
      const { subject, html } = templates.appointmentCancelledPatient(patientName, formatDateBR(date), time);
      await sendEmail(email, subject, html);
    }
  } catch (e) {
    console.error("[notifyAppointmentCancelledByAdmin] Email error:", e);
  }
}

export async function notifyAppointmentCancelledByPatient(
  patientId: string,
  date: string,
  time: string,
  appointmentId: string
) {
  const patientName = await getPatientName(patientId);
  const adminId = await getAdminUserId();

  if (adminId) {
    await createNotification({
      userId: adminId,
      type: "APPOINTMENT_CANCELLED",
      title: "Consulta cancelada pelo paciente",
      message: `${patientName} cancelou a consulta do dia ${formatDateBR(date)} às ${time}.`,
      appointmentId,
    });
  }

  try {
    const adminEmail = await getAdminEmail();
    if (adminEmail) {
      const { subject, html } = templates.appointmentCancelledAdmin(patientName, formatDateBR(date), time);
      await sendEmail(adminEmail, subject, html);
    }

    const patientEmail = await getPatientEmail(patientId);
    if (patientEmail) {
      const { subject, html } = templates.appointmentCancelledPatient(patientName, formatDateBR(date), time);
      await sendEmail(patientEmail, subject, html);
    }
  } catch (e) {
    console.error("[notifyAppointmentCancelledByPatient] Email error:", e);
  }
}

export async function notifyAppointmentCompleted(
  patientId: string,
  date: string,
  time: string,
  type: string,
  appointmentId: string
) {
  await createNotification({
    userId: patientId,
    type: "APPOINTMENT_COMPLETED",
    title: "Consulta concluída",
    message: `Sua consulta do dia ${formatDateBR(date)} às ${time} foi concluída. Obrigado!`,
    appointmentId,
  });
}

export async function notifyNoShow(
  patientId: string,
  date: string,
  time: string,
  appointmentId: string
) {
  await createNotification({
    userId: patientId,
    type: "GENERAL",
    title: "Falta registrada",
    message: `Você não compareceu à consulta do dia ${formatDateBR(date)} às ${time}.`,
    appointmentId,
  });
}

export async function notifyReturnSuggestion(
  patientId: string,
  suggestedDate: string
) {
  const patientName = await getPatientName(patientId);

  await createNotification({
    userId: patientId,
    type: "APPOINTMENT_REMINDER",
    title: "Sugestão de retorno",
    message: `O nutricionista sugeriu um retorno para ${formatDateBR(suggestedDate)}. Agende pelo painel do paciente.`,
  });

  try {
    const email = await getPatientEmail(patientId);
    if (email) {
      const { subject, html } = templates.returnSuggestion(patientName, formatDateBR(suggestedDate));
      await sendEmail(email, subject, html);
    }
  } catch (e) {
    console.error("[notifyReturnSuggestion] Email error:", e);
  }
}

export async function notifyAppointmentRescheduled(
  patientId: string,
  newDate: string,
  newTime: string,
  appointmentId: string
) {
  await createNotification({
    userId: patientId,
    type: "APPOINTMENT_CONFIRMED",
    title: "Consulta remarcada",
    message: `Sua consulta foi remarcada para ${formatDateBR(newDate)} às ${newTime}.`,
    appointmentId,
  });
}

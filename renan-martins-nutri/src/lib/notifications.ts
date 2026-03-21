import { db } from "@/lib/db";
import { notifications, user } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { sendEmail, getPatientEmail, getAdminEmail } from "@/lib/email/sender";
import * as templates from "@/lib/email/templates";

function formatDateBR(dateStr: string): string {
  if (!dateStr) return dateStr;
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) return `${match[3]}/${match[2]}/${match[1]}`;
  return dateStr;
}

type NotificationType =
  | "APPOINTMENT_CREATED"
  | "APPOINTMENT_CONFIRMED"
  | "APPOINTMENT_CANCELLED"
  | "APPOINTMENT_REMINDER"
  | "APPOINTMENT_COMPLETED"
  | "GENERAL";

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
  try {
    await db.insert(notifications).values({
      userId,
      type,
      title,
      message,
      appointmentId: appointmentId ?? null,
    });
  } catch (e) {
    console.error("[createNotification] Error:", e);
  }
}

export async function getAdminUserId(): Promise<string | null> {
  const rows = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.role, "ADMIN"))
    .limit(1);
  return rows[0]?.id ?? null;
}

export async function getPatientName(patientId: string): Promise<string> {
  const rows = await db
    .select({ name: user.name })
    .from(user)
    .where(eq(user.id, patientId))
    .limit(1);
  return rows[0]?.name || "Paciente";
}

export async function notifyNewAppointment(
  patientName: string,
  date: string,
  time: string,
  type: string,
  appointmentId: string,
  adminId: string,
  patientId?: string,
  modality = "PRESENCIAL"
) {
  const modalidadeLabel = modality === "ONLINE" ? "Online" : "Presencial";
  await createNotification({
    userId: adminId,
    type: "APPOINTMENT_CREATED",
    title: "Nova consulta agendada",
    message: `${patientName} agendou uma consulta para ${formatDateBR(date)} às ${time} (${modalidadeLabel}).`,
    appointmentId,
  });
  if (patientId) {
    await createNotification({
      userId: patientId,
      type: "APPOINTMENT_CREATED",
      title: "Consulta agendada",
      message: `Sua consulta foi agendada para ${formatDateBR(date)} às ${time}. Aguardando confirmação.`,
      appointmentId,
    });
    const email = await getPatientEmail(patientId);
    if (email) {
      const { subject, html } = templates.newAppointment(patientName, date, time, type);
      await sendEmail(email, subject, html);
    }
    // Send WhatsApp confirmation to patient immediately after booking
    try {
      const { sendWhatsApp, buildWhatsAppMessage, getPatientPhone } = await import("@/lib/whatsapp/sender");
      const phone = await getPatientPhone(patientId);
      if (phone) {
        const msg = await buildWhatsAppMessage(patientName, type, formatDateBR(date), time, modality);
        await sendWhatsApp(phone, msg);
      }
    } catch (e) {
      console.error("[notifyNewAppointment] WhatsApp error:", e);
    }
  }
  const adminEmail = await getAdminEmail();
  if (adminEmail) {
    const { subject, html } = templates.newAppointmentAdmin(patientName, date, time, type);
    await sendEmail(adminEmail, subject, html);
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
    message: `Sua consulta para ${formatDateBR(date)} às ${time} foi confirmada.`,
    appointmentId,
  });
  const email = await getPatientEmail(patientId);
  if (email) {
    const { subject, html } = templates.appointmentConfirmedPatient(patientName, date, time, type);
    await sendEmail(email, subject, html);
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
    message: `Sua consulta para ${formatDateBR(date)} às ${time} foi cancelada pela clínica.`,
    appointmentId,
  });
  const email = await getPatientEmail(patientId);
  if (email) {
    const { subject, html } = templates.appointmentCancelledPatient(patientName, date, time);
    await sendEmail(email, subject, html);
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
      message: `${patientName} cancelou a consulta de ${formatDateBR(date)} às ${time}.`,
      appointmentId,
    });
  }
  await createNotification({
    userId: patientId,
    type: "APPOINTMENT_CANCELLED",
    title: "Consulta cancelada",
    message: `Sua consulta para ${formatDateBR(date)} às ${time} foi cancelada.`,
    appointmentId,
  });
  const adminEmail = await getAdminEmail();
  if (adminEmail) {
    const { subject, html } = templates.appointmentCancelledAdmin(patientName, date, time);
    await sendEmail(adminEmail, subject, html);
  }
}

export async function notifyAppointmentCompleted(
  patientId: string,
  date: string,
  time: string,
  type: string,
  appointmentId: string
) {
  const patientName = await getPatientName(patientId);
  await createNotification({
    userId: patientId,
    type: "APPOINTMENT_COMPLETED",
    title: "Consulta concluída",
    message: `Sua consulta de ${formatDateBR(date)} foi marcada como concluída. Obrigado!`,
    appointmentId,
  });
  const email = await getPatientEmail(patientId);
  if (email) {
    const { subject, html } = templates.appointmentCompleted(patientName, date, time, type);
    await sendEmail(email, subject, html);
  }
}

export async function notifyReturnSuggestion(patientId: string, returnDate: string) {
  const patientName = await getPatientName(patientId);
  await createNotification({
    userId: patientId,
    type: "GENERAL",
    title: "Sugestão de retorno",
    message: `O Renan sugeriu seu retorno para ${formatDateBR(returnDate)}.`,
  });
  const email = await getPatientEmail(patientId);
  if (email) {
    const { subject, html } = templates.returnSuggestion(patientName, returnDate);
    await sendEmail(email, subject, html);
  }
}

export async function notifyNoShow(
  patientId: string,
  date: string,
  time: string,
  appointmentId: string
) {
  const patientName = await getPatientName(patientId);
  await createNotification({
    userId: patientId,
    type: "GENERAL",
    title: "Ausência registrada",
    message: `Sua consulta de ${formatDateBR(date)} às ${time} foi marcada como ausência.`,
    appointmentId,
  });
  const email = await getPatientEmail(patientId);
  if (email) {
    const { subject, html } = templates.noShow(patientName, date, time);
    await sendEmail(email, subject, html);
  }
}

export async function notifyAppointmentRescheduled(
  patientId: string,
  date: string,
  time: string,
  appointmentId: string
) {
  const patientName = await getPatientName(patientId);
  await createNotification({
    userId: patientId,
    type: "APPOINTMENT_CONFIRMED",
    title: "Consulta reagendada",
    message: `Sua consulta foi reagendada para ${formatDateBR(date)} às ${time}.`,
    appointmentId,
  });
  const email = await getPatientEmail(patientId);
  if (email) {
    const { subject, html } = templates.appointmentRescheduled(patientName, date, time);
    await sendEmail(email, subject, html);
  }
}

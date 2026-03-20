import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { sendEmail, getPatientEmail } from "@/lib/email/sender";
import { reminder24h } from "@/lib/email/templates";
import { createNotification, getPatientName } from "@/lib/notifications";

const SAO_PAULO_TZ = "America/Sao_Paulo";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 403 });
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const tomorrowBrazil = new Date(now.toLocaleString("en-US", { timeZone: SAO_PAULO_TZ }));
  tomorrowBrazil.setDate(tomorrowBrazil.getDate() + 1);
  const tomorrowDate = tomorrowBrazil.toISOString().split("T")[0];

  const appts = await db
    .select()
    .from(appointments)
    .where(
      and(
        eq(appointments.date, tomorrowDate),
        eq(appointments.status, "CONFIRMED")
      )
    );

  if (appts.length === 0) {
    return NextResponse.json({ message: "No reminders to send", count: 0 });
  }

  let sentCount = 0;

  for (const appointment of appts) {
    try {
      const patientName = await getPatientName(appointment.patientId);
      const timeFormatted = appointment.startTime?.slice(0, 5);

      await createNotification({
        userId: appointment.patientId,
        type: "APPOINTMENT_REMINDER",
        title: "Lembrete: consulta amanhã",
        message: `Sua consulta está marcada para amanhã, ${tomorrowDate}, às ${timeFormatted}.`,
        appointmentId: appointment.id,
      });

      const email = await getPatientEmail(appointment.patientId);
      if (email) {
        const { subject, html } = reminder24h(patientName, tomorrowDate, timeFormatted, appointment.type || "FIRST_VISIT");
        await sendEmail(email, subject, html);
      }

      sentCount++;
    } catch (e) {
      console.error(`[cron/reminders] Error for appointment ${appointment.id}:`, e);
    }
  }

  return NextResponse.json({ message: "Reminders sent", count: sentCount });
}

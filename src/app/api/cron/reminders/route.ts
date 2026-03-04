import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
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

  const supabase = createServiceRoleClient();

  const now = new Date();
  const tomorrowBrazil = new Date(now.toLocaleString("en-US", { timeZone: SAO_PAULO_TZ }));
  tomorrowBrazil.setDate(tomorrowBrazil.getDate() + 1);
  const tomorrowDate = tomorrowBrazil.toISOString().split("T")[0];

  const { data: appointments, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("date", tomorrowDate)
    .in("status", ["PENDING", "CONFIRMED"]);

  if (error) {
    console.error("[cron/reminders] Query error:", error.message);
    return NextResponse.json({ error: "Failed to query appointments" }, { status: 500 });
  }

  if (!appointments || appointments.length === 0) {
    return NextResponse.json({ message: "No reminders to send", count: 0 });
  }

  let sentCount = 0;

  for (const appointment of appointments) {
    try {
      const patientName = await getPatientName(appointment.patient_id);
      const timeFormatted = appointment.start_time?.slice(0, 5);

      await createNotification({
        userId: appointment.patient_id,
        type: "APPOINTMENT_REMINDER",
        title: "Lembrete: consulta amanhã",
        message: `Sua consulta está marcada para amanhã, ${tomorrowDate}, às ${timeFormatted}.`,
        appointmentId: appointment.id,
      });

      const email = await getPatientEmail(appointment.patient_id);
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

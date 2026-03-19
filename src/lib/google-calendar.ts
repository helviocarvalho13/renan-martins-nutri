// Google Calendar integration via standard Google OAuth2 (compatible with Vercel)
import { google } from "googleapis";

interface AppointmentData {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  type?: string;
  status?: string;
  patient_id?: string;
}

let cachedClient: ReturnType<typeof google.calendar> | null = null;
let tokenExpiry = 0;

function isConfigured(): boolean {
  return !!(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN
  );
}

async function getCalendarClient() {
  if (cachedClient && Date.now() < tokenExpiry - 60_000) {
    return cachedClient;
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  // Listen for token refresh so we can update the expiry
  oauth2Client.on("tokens", (tokens) => {
    if (tokens.expiry_date) tokenExpiry = tokens.expiry_date;
  });

  cachedClient = google.calendar({ version: "v3", auth: oauth2Client });
  return cachedClient;
}

async function getPatientNameForEvent(patientId: string): Promise<string> {
  try {
    const { getPatientName } = await import("@/lib/notifications");
    return await getPatientName(patientId);
  } catch {
    return "Paciente";
  }
}

export async function addCalendarEvent(
  appointment: AppointmentData
): Promise<string | null> {
  if (!isConfigured()) {
    console.warn("[google-calendar] Credentials not configured. Skipping.");
    return null;
  }

  try {
    const calendar = await getCalendarClient();

    const patientName = appointment.patient_id
      ? await getPatientNameForEvent(appointment.patient_id)
      : "Paciente";

    const typeLabel =
      appointment.type === "FIRST_VISIT" ? "Consulta" : "Retorno";

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: `${typeLabel} - ${patientName}`,
        description: `Consulta com ${patientName}\nTipo: ${typeLabel}\nID: ${appointment.id}`,
        start: {
          dateTime: `${appointment.date}T${appointment.start_time}`,
          timeZone: "America/Sao_Paulo",
        },
        end: {
          dateTime: `${appointment.date}T${appointment.end_time}`,
          timeZone: "America/Sao_Paulo",
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: "popup", minutes: 60 },
            { method: "popup", minutes: 15 },
          ],
        },
      },
    });

    const eventId = response.data.id;
    console.log("[google-calendar] Event created:", eventId);

    if (eventId) {
      try {
        const { createServiceRoleClient } = await import(
          "@/lib/supabase/server"
        );
        const supabase = createServiceRoleClient();
        await supabase
          .from("appointments")
          .update({ google_calendar_event_id: eventId } as Record<string, unknown>)
          .eq("id", appointment.id);
      } catch {
        console.warn("[google-calendar] Could not save event ID to database.");
      }
    }

    return eventId || null;
  } catch (error: any) {
    console.error("[google-calendar] Create event error:", error?.message || error);
    return null;
  }
}

export async function updateCalendarEvent(
  appointment: AppointmentData
): Promise<boolean> {
  if (!isConfigured()) return false;

  try {
    const { createServiceRoleClient } = await import("@/lib/supabase/server");
    const supabase = createServiceRoleClient();
    const { data } = await supabase
      .from("appointments")
      .select("google_calendar_event_id")
      .eq("id", appointment.id)
      .single();

    const eventId = (data as Record<string, unknown>)
      ?.google_calendar_event_id as string;
    if (!eventId) return false;

    const calendar = await getCalendarClient();

    const statusLabel =
      appointment.status === "COMPLETED" ? " [CONCLUÍDA]" : "";
    const patientName = appointment.patient_id
      ? await getPatientNameForEvent(appointment.patient_id)
      : "Paciente";
    const typeLabel =
      appointment.type === "FIRST_VISIT" ? "Consulta" : "Retorno";

    await calendar.events.patch({
      calendarId: "primary",
      eventId,
      requestBody: {
        summary: `${typeLabel} - ${patientName}${statusLabel}`,
      },
    });

    console.log("[google-calendar] Event updated:", eventId);
    return true;
  } catch (error: any) {
    console.error("[google-calendar] Update event error:", error?.message || error);
    return false;
  }
}

export async function deleteCalendarEvent(
  appointmentId: string
): Promise<boolean> {
  if (!isConfigured()) return false;

  try {
    const { createServiceRoleClient } = await import("@/lib/supabase/server");
    const supabase = createServiceRoleClient();
    const { data } = await supabase
      .from("appointments")
      .select("google_calendar_event_id")
      .eq("id", appointmentId)
      .single();

    const eventId = (data as Record<string, unknown>)
      ?.google_calendar_event_id as string;
    if (!eventId) return false;

    const calendar = await getCalendarClient();

    await calendar.events.delete({
      calendarId: "primary",
      eventId,
    });

    console.log("[google-calendar] Event deleted:", eventId);
    return true;
  } catch (error: any) {
    if (error?.code === 410) return false;
    console.error("[google-calendar] Delete event error:", error?.message || error);
    return false;
  }
}

// Google Calendar integration via Replit Connector
import { google } from "googleapis";
import { db } from "@/lib/db";
import { appointments } from "@/lib/schema";
import { eq } from "drizzle-orm";

export interface AppointmentData {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  type?: string;
  status?: string;
  patientId?: string;
}

let connectionSettings: any;

async function getAccessToken(): Promise<string> {
  if (
    connectionSettings &&
    connectionSettings.settings.expires_at &&
    new Date(connectionSettings.settings.expires_at).getTime() > Date.now()
  ) {
    return connectionSettings.settings.access_token;
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? "depl " + process.env.WEB_REPL_RENEWAL
      : null;

  if (!xReplitToken || !hostname) {
    throw new Error("Replit connector environment not available");
  }

  connectionSettings = await fetch(
    "https://" +
      hostname +
      "/api/v2/connection?include_secrets=true&connector_names=google-calendar",
    {
      headers: {
        Accept: "application/json",
        "X-Replit-Token": xReplitToken,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data.items?.[0]);

  const accessToken =
    connectionSettings?.settings?.access_token ||
    connectionSettings?.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error("Google Calendar not connected");
  }
  return accessToken;
}

async function getCalendarClient() {
  const accessToken = await getAccessToken();
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  return google.calendar({ version: "v3", auth: oauth2Client });
}

function isConfigured(): boolean {
  return !!(
    process.env.REPLIT_CONNECTORS_HOSTNAME &&
    (process.env.REPL_IDENTITY || process.env.WEB_REPL_RENEWAL)
  );
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
    console.warn("[google-calendar] Connector not available. Skipping.");
    return null;
  }

  try {
    const calendar = await getCalendarClient();

    const patientName = appointment.patientId
      ? await getPatientNameForEvent(appointment.patientId)
      : "Paciente";

    const typeLabel =
      appointment.type === "FIRST_VISIT" ? "Consulta" : "Retorno";

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: `${typeLabel} - ${patientName}`,
        description: `Consulta com ${patientName}\nTipo: ${typeLabel}\nID: ${appointment.id}`,
        start: {
          dateTime: `${appointment.date}T${appointment.startTime}`,
          timeZone: "America/Sao_Paulo",
        },
        end: {
          dateTime: `${appointment.date}T${appointment.endTime}`,
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
        await db
          .update(appointments)
          .set({ googleCalendarEventId: eventId })
          .where(eq(appointments.id, appointment.id));
      } catch {
        console.warn(
          "[google-calendar] Could not save event ID to database (column may not exist yet)"
        );
      }
    }

    return eventId || null;
  } catch (error: any) {
    if (error?.message?.includes("not connected")) {
      console.warn("[google-calendar] Not connected. Skipping event creation.");
    } else {
      console.error("[google-calendar] Create event error:", error?.message || error);
    }
    return null;
  }
}

export async function updateCalendarEvent(
  appointment: AppointmentData
): Promise<boolean> {
  if (!isConfigured()) return false;

  try {
    const rows = await db
      .select({ googleCalendarEventId: appointments.googleCalendarEventId })
      .from(appointments)
      .where(eq(appointments.id, appointment.id))
      .limit(1);

    const eventId = rows[0]?.googleCalendarEventId;
    if (!eventId) return false;

    const calendar = await getCalendarClient();

    const statusLabel =
      appointment.status === "COMPLETED" ? " [CONCLUÍDA]" : "";
    const patientName = appointment.patientId
      ? await getPatientNameForEvent(appointment.patientId)
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
    if (error?.message?.includes("not connected")) {
      console.warn("[google-calendar] Not connected. Skipping event update.");
    } else {
      console.error("[google-calendar] Update event error:", error?.message || error);
    }
    return false;
  }
}

export async function deleteCalendarEvent(
  appointmentId: string
): Promise<boolean> {
  if (!isConfigured()) return false;

  try {
    const rows = await db
      .select({ googleCalendarEventId: appointments.googleCalendarEventId })
      .from(appointments)
      .where(eq(appointments.id, appointmentId))
      .limit(1);

    const eventId = rows[0]?.googleCalendarEventId;
    if (!eventId) return false;

    const calendar = await getCalendarClient();

    await calendar.events.delete({
      calendarId: "primary",
      eventId,
    });

    console.log("[google-calendar] Event deleted:", eventId);
    return true;
  } catch (error: any) {
    if (
      error?.message?.includes("not connected") ||
      error?.code === 410
    ) {
      return false;
    }
    console.error("[google-calendar] Delete event error:", error?.message || error);
    return false;
  }
}

interface AppointmentData {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  type?: string;
  status?: string;
  patient_id?: string;
}

function isConfigured(): boolean {
  return !!(
    process.env.GOOGLE_CALENDAR_CLIENT_ID &&
    process.env.GOOGLE_CALENDAR_CLIENT_SECRET &&
    process.env.GOOGLE_CALENDAR_REFRESH_TOKEN &&
    process.env.GOOGLE_CALENDAR_ID
  );
}

async function getAccessToken(): Promise<string | null> {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CALENDAR_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET!,
        refresh_token: process.env.GOOGLE_CALENDAR_REFRESH_TOKEN!,
        grant_type: "refresh_token",
      }),
    });

    if (!response.ok) {
      console.error("[google-calendar] Token refresh failed:", response.status);
      return null;
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("[google-calendar] Token refresh error:", error);
    return null;
  }
}

async function getPatientNameForEvent(patientId: string): Promise<string> {
  try {
    const { getPatientName } = await import("@/lib/notifications");
    return await getPatientName(patientId);
  } catch {
    return "Paciente";
  }
}

export async function addCalendarEvent(appointment: AppointmentData): Promise<string | null> {
  if (!isConfigured()) {
    console.warn("[google-calendar] Not configured. Skipping event creation.");
    return null;
  }

  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  const patientName = appointment.patient_id
    ? await getPatientNameForEvent(appointment.patient_id)
    : "Paciente";

  const typeLabel = appointment.type === "FIRST_VISIT" ? "Primeira Consulta" : "Retorno";
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;

  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("[google-calendar] Create event failed:", response.status, errorBody);
      return null;
    }

    const data = await response.json();
    console.log("[google-calendar] Event created:", data.id);

    try {
      const { createServiceRoleClient } = await import("@/lib/supabase/server");
      const supabase = createServiceRoleClient();
      await supabase
        .from("appointments")
        .update({ google_calendar_event_id: data.id } as Record<string, unknown>)
        .eq("id", appointment.id);
    } catch {
    }

    return data.id;
  } catch (error) {
    console.error("[google-calendar] Create event error:", error);
    return null;
  }
}

export async function updateCalendarEvent(appointment: AppointmentData): Promise<boolean> {
  if (!isConfigured()) return false;

  const accessToken = await getAccessToken();
  if (!accessToken) return false;

  try {
    const { createServiceRoleClient } = await import("@/lib/supabase/server");
    const supabase = createServiceRoleClient();
    const { data } = await supabase
      .from("appointments")
      .select("google_calendar_event_id")
      .eq("id", appointment.id)
      .single();

    const eventId = (data as Record<string, unknown>)?.google_calendar_event_id;
    if (!eventId) return false;

    const calendarId = process.env.GOOGLE_CALENDAR_ID!;
    const statusLabel = appointment.status === "COMPLETED" ? " [CONCLUÍDA]" : "";
    const patientName = appointment.patient_id
      ? await getPatientNameForEvent(appointment.patient_id)
      : "Paciente";
    const typeLabel = appointment.type === "FIRST_VISIT" ? "Primeira Consulta" : "Retorno";

    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId as string)}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: `${typeLabel} - ${patientName}${statusLabel}`,
        }),
      }
    );

    if (!response.ok) {
      console.error("[google-calendar] Update event failed:", response.status);
      return false;
    }

    console.log("[google-calendar] Event updated:", eventId);
    return true;
  } catch (error) {
    console.error("[google-calendar] Update event error:", error);
    return false;
  }
}

export async function deleteCalendarEvent(appointmentId: string): Promise<boolean> {
  if (!isConfigured()) return false;

  const accessToken = await getAccessToken();
  if (!accessToken) return false;

  try {
    const { createServiceRoleClient } = await import("@/lib/supabase/server");
    const supabase = createServiceRoleClient();
    const { data } = await supabase
      .from("appointments")
      .select("google_calendar_event_id")
      .eq("id", appointmentId)
      .single();

    const eventId = (data as Record<string, unknown>)?.google_calendar_event_id;
    if (!eventId) return false;

    const calendarId = process.env.GOOGLE_CALENDAR_ID!;

    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId as string)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok && response.status !== 410) {
      console.error("[google-calendar] Delete event failed:", response.status);
      return false;
    }

    console.log("[google-calendar] Event deleted:", eventId);
    return true;
  } catch (error) {
    console.error("[google-calendar] Delete event error:", error);
    return false;
  }
}

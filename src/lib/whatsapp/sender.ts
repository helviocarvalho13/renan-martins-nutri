function normalizePhoneToE164(phone: string): string | null {
  let digits = phone.replace(/\D/g, "");

  if (digits.length === 0) return null;

  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  if (!digits.startsWith("55")) {
    digits = "55" + digits;
  }

  if (digits.length < 12 || digits.length > 13) return null;

  return "+" + digits;
}

export async function sendWhatsApp(phone: string, message: string): Promise<boolean> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_WHATSAPP_FROM;

  if (!accountSid || !authToken || !fromNumber) {
    console.warn("[whatsapp/sender] Twilio credentials not configured. Skipping WhatsApp.");
    return false;
  }

  const normalizedPhone = normalizePhoneToE164(phone);
  if (!normalizedPhone) {
    console.warn("[whatsapp/sender] Invalid phone number:", phone);
    return false;
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const credentials = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

  const fromFormatted = fromNumber.startsWith("whatsapp:") ? fromNumber : `whatsapp:${fromNumber}`;

  const body = new URLSearchParams({
    From: fromFormatted,
    To: `whatsapp:${normalizedPhone}`,
    Body: message,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("[whatsapp/sender] Twilio API error:", response.status, errorBody);
      return false;
    }

    const data = await response.json();
    console.log("[whatsapp/sender] WhatsApp sent successfully:", data.sid);
    return true;
  } catch (error) {
    console.error("[whatsapp/sender] Failed to send WhatsApp:", error);
    return false;
  }
}

export async function getPatientPhone(patientId: string): Promise<string | null> {
  const { createServiceRoleClient } = await import("@/lib/supabase/server");
  const supabase = createServiceRoleClient();

  const { data } = await supabase
    .from("profiles")
    .select("phone")
    .eq("id", patientId)
    .single();

  return data?.phone || null;
}

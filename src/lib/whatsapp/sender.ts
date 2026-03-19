const DEFAULT_TEMPLATE = `Olá, {nome}! Tudo bem?

Equipe do nutricionista Renan Martins passando para confirmar seu horário:

📅 {data} às {horário}
📍 {modalidade}

Seu horário está reservado. Em caso de imprevisto, informe com antecedência.

Será um prazer recebê-lo(a).`;

export async function buildWhatsAppMessage(
  patientName: string,
  type: string,
  date: string,
  time: string,
  modality: string = "PRESENCIAL"
): Promise<string> {
  let template = DEFAULT_TEMPLATE;

  try {
    const { createServiceRoleClient } = await import("@/lib/supabase/server");
    const supabase = createServiceRoleClient();
    const { data } = await supabase
      .from("site_content")
      .select("content")
      .eq("section", "settings")
      .eq("title", "whatsapp_template")
      .maybeSingle();
    if (data?.content?.template) {
      template = data.content.template;
    }
  } catch {
    // Fall back to default template
  }

  const modalidadeLabel = modality === "ONLINE" ? "Online" : "Presencial";

  return template
    .replace(/\{nome\}/g, patientName)
    .replace(/\{tipo\}/g, type === "FIRST_VISIT" ? "Consulta" : "Retorno")
    .replace(/\{data\}/g, date)
    .replace(/\{horário\}/g, time)
    .replace(/\{horario\}/g, time)
    .replace(/\{modalidade\}/g, modalidadeLabel);
}

function normalizePhone(phone: string): string | null {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 0) return null;
  if (digits.startsWith("0")) digits = digits.slice(1);
  if (!digits.startsWith("55")) digits = "55" + digits;

  // Brazilian mobile numbers: 55 + 2-digit area + 9-digit mobile (starting with 9)
  // Remove the leading 9 from the local number to match 8-digit format expected by WhatsApp API
  // e.g. 5598984050086 (13 digits) → 559884050086 (12 digits)
  if (digits.length === 13) {
    const areaCode = digits.slice(2, 4);
    const localNumber = digits.slice(4);
    if (localNumber.startsWith("9") && localNumber.length === 9) {
      digits = "55" + areaCode + localNumber.slice(1);
    }
  }

  if (digits.length < 12 || digits.length > 13) return null;
  return digits;
}

export async function sendWhatsApp(phone: string, message: string): Promise<boolean> {
  const token = process.env.WHAPI_TOKEN;

  if (!token) {
    console.warn("[whatsapp/sender] WHAPI_TOKEN not configured. Skipping WhatsApp.");
    return false;
  }

  const digits = normalizePhone(phone);
  if (!digits) {
    console.warn("[whatsapp/sender] Invalid phone number:", phone);
    return false;
  }

  const to = `${digits}@s.whatsapp.net`;

  try {
    const response = await fetch("https://gate.whapi.cloud/messages/text", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, body: message }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[whatsapp/sender] Whapi error:", response.status, JSON.stringify(data));
      return false;
    }

    console.log("[whatsapp/sender] WhatsApp sent via Whapi:", data?.message?.id || "ok", "to:", to);
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

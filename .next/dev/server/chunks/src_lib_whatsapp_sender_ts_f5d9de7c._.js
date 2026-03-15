module.exports = [
"[project]/src/lib/whatsapp/sender.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildWhatsAppMessage",
    ()=>buildWhatsAppMessage,
    "getPatientPhone",
    ()=>getPatientPhone,
    "sendWhatsApp",
    ()=>sendWhatsApp
]);
const DEFAULT_TEMPLATE = "Olá, {nome}! Sua {tipo} com o nutricionista Renan Martins foi agendada para {data} às {horário}. Aguardamos você!";
async function buildWhatsAppMessage(patientName, type, date, time) {
    let template = DEFAULT_TEMPLATE;
    try {
        const { createServiceRoleClient } = await __turbopack_context__.A("[project]/src/lib/supabase/server.ts [app-route] (ecmascript, async loader)");
        const supabase = createServiceRoleClient();
        const { data } = await supabase.from("site_content").select("content").eq("section", "settings").eq("title", "whatsapp_template").maybeSingle();
        if (data?.content?.template) {
            template = data.content.template;
        }
    } catch  {
    // Fall back to default template
    }
    const typeLabel = type === "FIRST_VISIT" ? "Consulta" : "Retorno";
    return template.replace(/\{nome\}/g, patientName).replace(/\{tipo\}/g, typeLabel).replace(/\{data\}/g, date).replace(/\{horário\}/g, time).replace(/\{horario\}/g, time);
}
function normalizePhoneToE164(phone) {
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
async function sendWhatsApp(phone, message) {
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
        Body: message
    });
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Basic ${credentials}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: body.toString()
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
async function getPatientPhone(patientId) {
    const { createServiceRoleClient } = await __turbopack_context__.A("[project]/src/lib/supabase/server.ts [app-route] (ecmascript, async loader)");
    const supabase = createServiceRoleClient();
    const { data } = await supabase.from("profiles").select("phone").eq("id", patientId).single();
    return data?.phone || null;
}
}),
];

//# sourceMappingURL=src_lib_whatsapp_sender_ts_f5d9de7c._.js.map
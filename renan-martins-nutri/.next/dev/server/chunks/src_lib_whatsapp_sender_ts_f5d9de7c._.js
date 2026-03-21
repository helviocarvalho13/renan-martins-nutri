module.exports = [
"[project]/src/lib/whatsapp/sender.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "buildWhatsAppMessage",
    ()=>buildWhatsAppMessage,
    "getPatientPhone",
    ()=>getPatientPhone,
    "sendWhatsApp",
    ()=>sendWhatsApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const DEFAULT_TEMPLATE = `Olá, {nome}! Tudo bem?

Equipe do nutricionista Renan Martins passando para confirmar seu horário:

📅 {data} às {horário}
📍 {modalidade}

Seu horário está reservado. Em caso de imprevisto, informe com antecedência.

Será um prazer recebê-lo(a).`;
async function buildWhatsAppMessage(patientName, type, date, time, modality = "PRESENCIAL") {
    let template = DEFAULT_TEMPLATE;
    try {
        const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].select({
            content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["siteContent"].content
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["siteContent"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["siteContent"].section, "settings"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["siteContent"].title, "whatsapp_template"))).limit(1);
        const tmpl = rows[0]?.content;
        if (tmpl?.value) {
            template = tmpl.value;
        }
    } catch  {
    // Fall back to default template
    }
    const modalidadeLabel = modality === "ONLINE" ? "Online" : "Presencial";
    return template.replace(/\{nome\}/g, patientName).replace(/\{tipo\}/g, type === "FIRST_VISIT" ? "Consulta" : "Retorno").replace(/\{data\}/g, date).replace(/\{horário\}/g, time).replace(/\{horario\}/g, time).replace(/\{modalidade\}/g, modalidadeLabel);
}
function normalizePhone(phone) {
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
async function sendWhatsApp(phone, message) {
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
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                to,
                body: message
            })
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
async function getPatientPhone(patientId) {
    const { user: userTable } = await __turbopack_context__.A("[project]/src/lib/schema.ts [app-route] (ecmascript, async loader)");
    const { eq: drizzleEq } = await __turbopack_context__.A("[project]/node_modules/drizzle-orm/index.js [app-route] (ecmascript, async loader)");
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].select({
        phone: userTable.phone
    }).from(userTable).where(drizzleEq(userTable.id, patientId)).limit(1);
    return rows[0]?.phone ?? null;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=src_lib_whatsapp_sender_ts_f5d9de7c._.js.map
module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/supabase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createServerSupabaseClient",
    ()=>createServerSupabaseClient,
    "createServiceRoleClient",
    ()=>createServiceRoleClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
;
async function createServerSupabaseClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://smvdxecclhlvzuzebhwm.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtdmR4ZWNjbGhsdnp1emViaHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NDAwNTgsImV4cCI6MjA4ODIxNjA1OH0.1YucSYgB3MYTNxT7FxxNdO8GMeYiwOMKjUkxOuGoZl0"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {}
            }
        }
    });
}
function createServiceRoleClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://smvdxecclhlvzuzebhwm.supabase.co"), process.env.SUPABASE_SERVICE_ROLE_KEY);
}
}),
"[project]/src/lib/email/sender.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAdminEmail",
    ()=>getAdminEmail,
    "getPatientEmail",
    ()=>getPatientEmail,
    "sendEmail",
    ()=>sendEmail
]);
const RESEND_API_URL = "https://api.resend.com/emails";
const FROM_EMAIL = "Renan Martins Nutricionista <noreply@renanmartins.com.br>";
async function sendEmail(to, subject, html) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.warn("[email/sender] RESEND_API_KEY not configured. Skipping email.");
        return false;
    }
    try {
        const response = await fetch(RESEND_API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: FROM_EMAIL,
                to: [
                    to
                ],
                subject,
                html
            })
        });
        if (!response.ok) {
            const errorBody = await response.text();
            console.error("[email/sender] Resend API error:", response.status, errorBody);
            return false;
        }
        const data = await response.json();
        console.log("[email/sender] Email sent successfully:", data.id);
        return true;
    } catch (error) {
        console.error("[email/sender] Failed to send email:", error);
        return false;
    }
}
async function getPatientEmail(patientId) {
    const { createServiceRoleClient } = await __turbopack_context__.A("[project]/src/lib/supabase/server.ts [app-route] (ecmascript, async loader)");
    const supabase = createServiceRoleClient();
    const { data } = await supabase.auth.admin.getUserById(patientId);
    return data?.user?.email || null;
}
async function getAdminEmail() {
    const { createServiceRoleClient } = await __turbopack_context__.A("[project]/src/lib/supabase/server.ts [app-route] (ecmascript, async loader)");
    const supabase = createServiceRoleClient();
    const { data: admins } = await supabase.from("profiles").select("id").eq("role", "ADMIN").limit(1);
    if (!admins || admins.length === 0) return null;
    const { data } = await supabase.auth.admin.getUserById(admins[0].id);
    return data?.user?.email || null;
}
}),
"[project]/src/lib/email/templates.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appointmentCancelledAdmin",
    ()=>appointmentCancelledAdmin,
    "appointmentCancelledPatient",
    ()=>appointmentCancelledPatient,
    "appointmentConfirmedPatient",
    ()=>appointmentConfirmedPatient,
    "newAppointmentAdmin",
    ()=>newAppointmentAdmin,
    "reminder24h",
    ()=>reminder24h,
    "returnSuggestion",
    ()=>returnSuggestion
]);
const BRAND_COLOR = "#1a1a1a";
const ACCENT_COLOR = "#2563eb";
const BG_COLOR = "#f5f5f5";
function baseTemplate(content) {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Renan Martins Nutricionista</title>
</head>
<body style="margin:0;padding:0;background-color:${BG_COLOR};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${BG_COLOR};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <tr>
            <td style="background-color:${BRAND_COLOR};padding:24px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.5px;">Renan Martins</h1>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">Nutricionista</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 24px;border-top:1px solid #eee;text-align:center;">
              <p style="margin:0;color:#999;font-size:12px;">Renan Martins Nutricionista &bull; CRN: XXXXX</p>
              <p style="margin:4px 0 0;color:#bbb;font-size:11px;">Este é um email automático. Não responda diretamente.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
function appointmentBlock(date, time, type) {
    const typeLabel = type === "FIRST_VISIT" ? "Primeira Consulta" : "Retorno";
    return `
    <div style="background-color:#f8f9fa;border-radius:8px;padding:16px;margin:16px 0;border-left:4px solid ${ACCENT_COLOR};">
      <p style="margin:0 0 4px;font-size:14px;color:#666;">📅 <strong>${date}</strong> às <strong>${time}</strong></p>
      <p style="margin:0;font-size:13px;color:#888;">Tipo: ${typeLabel}</p>
    </div>
  `;
}
function newAppointmentAdmin(patientName, date, time, type) {
    return {
        subject: `Nova consulta agendada - ${patientName}`,
        html: baseTemplate(`
      <h2 style="margin:0 0 8px;color:${BRAND_COLOR};font-size:18px;">Nova consulta agendada</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        <strong>${patientName}</strong> agendou uma nova consulta.
      </p>
      ${appointmentBlock(date, time, type)}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Acesse o painel administrativo para confirmar ou gerenciar este agendamento.
      </p>
    `)
    };
}
function appointmentConfirmedPatient(patientName, date, time, type) {
    return {
        subject: "Sua consulta foi confirmada!",
        html: baseTemplate(`
      <h2 style="margin:0 0 8px;color:${BRAND_COLOR};font-size:18px;">Consulta confirmada ✅</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Olá, <strong>${patientName}</strong>! Sua consulta foi confirmada.
      </p>
      ${appointmentBlock(date, time, type)}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Lembre-se de comparecer no horário agendado. Caso precise cancelar, faça com pelo menos 12 horas de antecedência.
      </p>
    `)
    };
}
function appointmentCancelledPatient(patientName, date, time) {
    return {
        subject: "Consulta cancelada",
        html: baseTemplate(`
      <h2 style="margin:0 0 8px;color:${BRAND_COLOR};font-size:18px;">Consulta cancelada</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Olá, <strong>${patientName}</strong>. Sua consulta foi cancelada.
      </p>
      ${appointmentBlock(date, time, "FIRST_VISIT")}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Se desejar, você pode agendar uma nova consulta a qualquer momento.
      </p>
    `)
    };
}
function appointmentCancelledAdmin(patientName, date, time) {
    return {
        subject: `Consulta cancelada por ${patientName}`,
        html: baseTemplate(`
      <h2 style="margin:0 0 8px;color:${BRAND_COLOR};font-size:18px;">Consulta cancelada pelo paciente</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        <strong>${patientName}</strong> cancelou a consulta agendada.
      </p>
      ${appointmentBlock(date, time, "FIRST_VISIT")}
    `)
    };
}
function reminder24h(patientName, date, time, type) {
    return {
        subject: "Lembrete: sua consulta é amanhã!",
        html: baseTemplate(`
      <h2 style="margin:0 0 8px;color:${BRAND_COLOR};font-size:18px;">Lembrete de consulta 🔔</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Olá, <strong>${patientName}</strong>! Este é um lembrete de que sua consulta é <strong>amanhã</strong>.
      </p>
      ${appointmentBlock(date, time, type)}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Caso precise cancelar, faça com pelo menos 12 horas de antecedência.
      </p>
    `)
    };
}
function returnSuggestion(patientName, suggestedDate) {
    return {
        subject: "Hora de agendar seu retorno!",
        html: baseTemplate(`
      <h2 style="margin:0 0 8px;color:${BRAND_COLOR};font-size:18px;">Sugestão de retorno 📋</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Olá, <strong>${patientName}</strong>! O nutricionista Renan Martins sugeriu uma data de retorno para você.
      </p>
      <div style="background-color:#f0f7ff;border-radius:8px;padding:16px;margin:16px 0;border-left:4px solid ${ACCENT_COLOR};text-align:center;">
        <p style="margin:0;font-size:16px;color:${BRAND_COLOR};font-weight:600;">📅 Data sugerida: ${suggestedDate}</p>
      </div>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Acesse a área do paciente para agendar seu retorno.
      </p>
    `)
    };
}
}),
"[project]/src/lib/notifications.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createNotification",
    ()=>createNotification,
    "getAdminUserId",
    ()=>getAdminUserId,
    "getPatientName",
    ()=>getPatientName,
    "notifyAppointmentCancelledByAdmin",
    ()=>notifyAppointmentCancelledByAdmin,
    "notifyAppointmentCancelledByPatient",
    ()=>notifyAppointmentCancelledByPatient,
    "notifyAppointmentCompleted",
    ()=>notifyAppointmentCompleted,
    "notifyAppointmentConfirmed",
    ()=>notifyAppointmentConfirmed,
    "notifyNewAppointment",
    ()=>notifyNewAppointment,
    "notifyNoShow",
    ()=>notifyNoShow,
    "notifyReturnSuggestion",
    ()=>notifyReturnSuggestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/email/sender.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/email/templates.ts [app-route] (ecmascript)");
;
;
;
async function createNotification({ userId, type, title, message, appointmentId }) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceRoleClient"])();
    const { error } = await supabase.from("notifications").insert({
        user_id: userId,
        type,
        title,
        message,
        appointment_id: appointmentId ?? null
    });
    if (error) {
        console.error("[createNotification] Error:", error.message);
    }
}
async function getAdminUserId() {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceRoleClient"])();
    const { data } = await supabase.from("profiles").select("id").eq("role", "ADMIN").limit(1);
    return data && data.length > 0 ? data[0].id : null;
}
async function getPatientName(patientId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceRoleClient"])();
    const { data } = await supabase.from("profiles").select("full_name").eq("id", patientId).single();
    return data?.full_name || "Paciente";
}
async function notifyNewAppointment(patientName, date, time, type, appointmentId, adminId) {
    await createNotification({
        userId: adminId,
        type: "APPOINTMENT_CREATED",
        title: "Nova consulta agendada",
        message: `${patientName} agendou ${type === "FIRST_VISIT" ? "Primeira Consulta" : "Retorno"} para ${date} às ${time}`,
        appointmentId
    });
    try {
        const adminEmail = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminEmail"])();
        if (adminEmail) {
            const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["newAppointmentAdmin"](patientName, date, time, type);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(adminEmail, subject, html);
        }
    } catch (e) {
        console.error("[notifyNewAppointment] Email error:", e);
    }
}
async function notifyAppointmentConfirmed(patientId, date, time, type, appointmentId) {
    const patientName = await getPatientName(patientId);
    await createNotification({
        userId: patientId,
        type: "APPOINTMENT_CONFIRMED",
        title: "Consulta confirmada",
        message: `Sua consulta do dia ${date} às ${time} foi confirmada!`,
        appointmentId
    });
    try {
        const email = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPatientEmail"])(patientId);
        if (email) {
            const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointmentConfirmedPatient"](patientName, date, time, type);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(email, subject, html);
        }
    } catch (e) {
        console.error("[notifyAppointmentConfirmed] Email error:", e);
    }
}
async function notifyAppointmentCancelledByAdmin(patientId, date, time, appointmentId) {
    const patientName = await getPatientName(patientId);
    await createNotification({
        userId: patientId,
        type: "APPOINTMENT_CANCELLED",
        title: "Consulta cancelada",
        message: `Sua consulta do dia ${date} às ${time} foi cancelada.`,
        appointmentId
    });
    try {
        const email = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPatientEmail"])(patientId);
        if (email) {
            const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointmentCancelledPatient"](patientName, date, time);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(email, subject, html);
        }
    } catch (e) {
        console.error("[notifyAppointmentCancelledByAdmin] Email error:", e);
    }
}
async function notifyAppointmentCancelledByPatient(patientId, date, time, appointmentId) {
    const patientName = await getPatientName(patientId);
    const adminId = await getAdminUserId();
    if (adminId) {
        await createNotification({
            userId: adminId,
            type: "APPOINTMENT_CANCELLED",
            title: "Consulta cancelada pelo paciente",
            message: `${patientName} cancelou a consulta do dia ${date} às ${time}.`,
            appointmentId
        });
    }
    try {
        const adminEmail = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminEmail"])();
        if (adminEmail) {
            const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointmentCancelledAdmin"](patientName, date, time);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(adminEmail, subject, html);
        }
        const patientEmail = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPatientEmail"])(patientId);
        if (patientEmail) {
            const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointmentCancelledPatient"](patientName, date, time);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(patientEmail, subject, html);
        }
    } catch (e) {
        console.error("[notifyAppointmentCancelledByPatient] Email error:", e);
    }
}
async function notifyAppointmentCompleted(patientId, date, time, type, appointmentId) {
    await createNotification({
        userId: patientId,
        type: "APPOINTMENT_COMPLETED",
        title: "Consulta concluída",
        message: `Sua consulta do dia ${date} às ${time} foi concluída. Obrigado!`,
        appointmentId
    });
}
async function notifyNoShow(patientId, date, time, appointmentId) {
    await createNotification({
        userId: patientId,
        type: "GENERAL",
        title: "Falta registrada",
        message: `Você não compareceu à consulta do dia ${date} às ${time}.`,
        appointmentId
    });
}
async function notifyReturnSuggestion(patientId, suggestedDate) {
    const patientName = await getPatientName(patientId);
    await createNotification({
        userId: patientId,
        type: "APPOINTMENT_REMINDER",
        title: "Sugestão de retorno",
        message: `O nutricionista sugeriu um retorno para ${suggestedDate}. Agende pelo painel do paciente.`
    });
    try {
        const email = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPatientEmail"])(patientId);
        if (email) {
            const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["returnSuggestion"](patientName, suggestedDate);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(email, subject, html);
        }
    } catch (e) {
        console.error("[notifyReturnSuggestion] Email error:", e);
    }
}
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/punycode [external] (punycode, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("punycode", () => require("punycode"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/node:events [external] (node:events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:events", () => require("node:events"));

module.exports = mod;
}),
"[externals]/node:process [external] (node:process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:process", () => require("node:process"));

module.exports = mod;
}),
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[project]/src/lib/google-calendar.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addCalendarEvent",
    ()=>addCalendarEvent,
    "deleteCalendarEvent",
    ()=>deleteCalendarEvent,
    "updateCalendarEvent",
    ()=>updateCalendarEvent
]);
// Google Calendar integration via Replit Connector
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$googleapis$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/googleapis/build/src/index.js [app-route] (ecmascript)");
;
let connectionSettings;
async function getAccessToken() {
    if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
        return connectionSettings.settings.access_token;
    }
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    const xReplitToken = process.env.REPL_IDENTITY ? "repl " + process.env.REPL_IDENTITY : process.env.WEB_REPL_RENEWAL ? "depl " + process.env.WEB_REPL_RENEWAL : null;
    if (!xReplitToken || !hostname) {
        throw new Error("Replit connector environment not available");
    }
    connectionSettings = await fetch("https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=google-calendar", {
        headers: {
            Accept: "application/json",
            "X-Replit-Token": xReplitToken
        }
    }).then((res)=>res.json()).then((data)=>data.items?.[0]);
    const accessToken = connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;
    if (!connectionSettings || !accessToken) {
        throw new Error("Google Calendar not connected");
    }
    return accessToken;
}
async function getCalendarClient() {
    const accessToken = await getAccessToken();
    const oauth2Client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$googleapis$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["google"].auth.OAuth2();
    oauth2Client.setCredentials({
        access_token: accessToken
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$googleapis$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["google"].calendar({
        version: "v3",
        auth: oauth2Client
    });
}
function isConfigured() {
    return !!(process.env.REPLIT_CONNECTORS_HOSTNAME && (process.env.REPL_IDENTITY || process.env.WEB_REPL_RENEWAL));
}
async function getPatientNameForEvent(patientId) {
    try {
        const { getPatientName } = await __turbopack_context__.A("[project]/src/lib/notifications.ts [app-route] (ecmascript, async loader)");
        return await getPatientName(patientId);
    } catch  {
        return "Paciente";
    }
}
async function addCalendarEvent(appointment) {
    if (!isConfigured()) {
        console.warn("[google-calendar] Connector not available. Skipping.");
        return null;
    }
    try {
        const calendar = await getCalendarClient();
        const patientName = appointment.patient_id ? await getPatientNameForEvent(appointment.patient_id) : "Paciente";
        const typeLabel = appointment.type === "FIRST_VISIT" ? "Primeira Consulta" : "Retorno";
        const response = await calendar.events.insert({
            calendarId: "primary",
            requestBody: {
                summary: `${typeLabel} - ${patientName}`,
                description: `Consulta com ${patientName}\nTipo: ${typeLabel}\nID: ${appointment.id}`,
                start: {
                    dateTime: `${appointment.date}T${appointment.start_time}`,
                    timeZone: "America/Sao_Paulo"
                },
                end: {
                    dateTime: `${appointment.date}T${appointment.end_time}`,
                    timeZone: "America/Sao_Paulo"
                },
                reminders: {
                    useDefault: false,
                    overrides: [
                        {
                            method: "popup",
                            minutes: 60
                        },
                        {
                            method: "popup",
                            minutes: 15
                        }
                    ]
                }
            }
        });
        const eventId = response.data.id;
        console.log("[google-calendar] Event created:", eventId);
        if (eventId) {
            try {
                const { createServiceRoleClient } = await __turbopack_context__.A("[project]/src/lib/supabase/server.ts [app-route] (ecmascript, async loader)");
                const supabase = createServiceRoleClient();
                await supabase.from("appointments").update({
                    google_calendar_event_id: eventId
                }).eq("id", appointment.id);
            } catch  {
                console.warn("[google-calendar] Could not save event ID to database (column may not exist yet)");
            }
        }
        return eventId || null;
    } catch (error) {
        if (error?.message?.includes("not connected")) {
            console.warn("[google-calendar] Not connected. Skipping event creation.");
        } else {
            console.error("[google-calendar] Create event error:", error?.message || error);
        }
        return null;
    }
}
async function updateCalendarEvent(appointment) {
    if (!isConfigured()) return false;
    try {
        const { createServiceRoleClient } = await __turbopack_context__.A("[project]/src/lib/supabase/server.ts [app-route] (ecmascript, async loader)");
        const supabase = createServiceRoleClient();
        const { data } = await supabase.from("appointments").select("google_calendar_event_id").eq("id", appointment.id).single();
        const eventId = data?.google_calendar_event_id;
        if (!eventId) return false;
        const calendar = await getCalendarClient();
        const statusLabel = appointment.status === "COMPLETED" ? " [CONCLUÍDA]" : "";
        const patientName = appointment.patient_id ? await getPatientNameForEvent(appointment.patient_id) : "Paciente";
        const typeLabel = appointment.type === "FIRST_VISIT" ? "Primeira Consulta" : "Retorno";
        await calendar.events.patch({
            calendarId: "primary",
            eventId,
            requestBody: {
                summary: `${typeLabel} - ${patientName}${statusLabel}`
            }
        });
        console.log("[google-calendar] Event updated:", eventId);
        return true;
    } catch (error) {
        if (error?.message?.includes("not connected")) {
            console.warn("[google-calendar] Not connected. Skipping event update.");
        } else {
            console.error("[google-calendar] Update event error:", error?.message || error);
        }
        return false;
    }
}
async function deleteCalendarEvent(appointmentId) {
    if (!isConfigured()) return false;
    try {
        const { createServiceRoleClient } = await __turbopack_context__.A("[project]/src/lib/supabase/server.ts [app-route] (ecmascript, async loader)");
        const supabase = createServiceRoleClient();
        const { data } = await supabase.from("appointments").select("google_calendar_event_id").eq("id", appointmentId).single();
        const eventId = data?.google_calendar_event_id;
        if (!eventId) return false;
        const calendar = await getCalendarClient();
        await calendar.events.delete({
            calendarId: "primary",
            eventId
        });
        console.log("[google-calendar] Event deleted:", eventId);
        return true;
    } catch (error) {
        if (error?.message?.includes("not connected") || error?.code === 410) {
            return false;
        }
        console.error("[google-calendar] Delete event error:", error?.message || error);
        return false;
    }
}
}),
"[project]/src/app/api/appointments/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PATCH",
    ()=>PATCH
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notifications$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/notifications.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$google$2d$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/google-calendar.ts [app-route] (ecmascript)");
;
;
;
;
async function PATCH(request, { params }) {
    const { id } = await params;
    const serverSupabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerSupabaseClient"])();
    const { data: { user } } = await serverSupabase.auth.getUser();
    if (!user) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Não autenticado"
        }, {
            status: 401
        });
    }
    if (user.user_metadata?.role !== "ADMIN" && user.user_metadata?.role !== "admin") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Acesso negado"
        }, {
            status: 403
        });
    }
    const body = await request.json();
    const { status, notes, return_suggested_date } = body;
    const validStatuses = [
        "PENDING",
        "CONFIRMED",
        "CANCELLED",
        "COMPLETED",
        "NO_SHOW"
    ];
    if (status && !validStatuses.includes(status)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Status inválido"
        }, {
            status: 400
        });
    }
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServiceRoleClient"])();
    const updateFields = {};
    if (status) updateFields.status = status;
    if (notes !== undefined) updateFields.notes = notes;
    if (return_suggested_date !== undefined) updateFields.return_suggested_date = return_suggested_date;
    if (Object.keys(updateFields).length === 0) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Nenhum campo para atualizar"
        }, {
            status: 400
        });
    }
    const { data, error } = await supabase.from("appointments").update(updateFields).eq("id", id).select().single();
    if (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Erro ao atualizar agendamento"
        }, {
            status: 500
        });
    }
    try {
        const patientId = data.patient_id;
        const dateFormatted = data.date;
        const timeFormatted = data.start_time?.slice(0, 5);
        const appointmentType = data.type || "FIRST_VISIT";
        if (status === "CONFIRMED") {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notifications$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["notifyAppointmentConfirmed"])(patientId, dateFormatted, timeFormatted, appointmentType, id);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$google$2d$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addCalendarEvent"])(data);
        } else if (status === "CANCELLED") {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notifications$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["notifyAppointmentCancelledByAdmin"])(patientId, dateFormatted, timeFormatted, id);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$google$2d$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteCalendarEvent"])(id);
        } else if (status === "COMPLETED") {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notifications$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["notifyAppointmentCompleted"])(patientId, dateFormatted, timeFormatted, appointmentType, id);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$google$2d$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateCalendarEvent"])(data);
            if (return_suggested_date) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notifications$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["notifyReturnSuggestion"])(patientId, return_suggested_date);
            }
        } else if (status === "NO_SHOW") {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notifications$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["notifyNoShow"])(patientId, dateFormatted, timeFormatted, id);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$google$2d$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteCalendarEvent"])(id);
        }
        if (!status && return_suggested_date) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notifications$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["notifyReturnSuggestion"])(data.patient_id, return_suggested_date);
        }
    } catch (notifError) {
        console.error("[appointments/PATCH] Notification error:", notifError);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        appointment: data
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f3c52496._.js.map
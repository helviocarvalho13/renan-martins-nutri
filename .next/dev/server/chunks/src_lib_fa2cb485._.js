module.exports = [
"[project]/src/lib/email/sender.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getAdminEmail",
    ()=>getAdminEmail,
    "getPatientEmail",
    ()=>getPatientEmail,
    "sendEmail",
    ()=>sendEmail
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
        console.log("[email/sender] Email sent:", data.id);
        return true;
    } catch (error) {
        console.error("[email/sender] Failed to send email:", error);
        return false;
    }
}
async function getPatientEmail(patientId) {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].select({
        email: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["user"].email
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["user"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["user"].id, patientId)).limit(1);
    return rows[0]?.email ?? null;
}
async function getAdminEmail() {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].select({
        email: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["user"].email
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["user"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["user"].role, "ADMIN")).limit(1);
    return rows[0]?.email ?? null;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/email/templates.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appointmentCancelledAdmin",
    ()=>appointmentCancelledAdmin,
    "appointmentCancelledPatient",
    ()=>appointmentCancelledPatient,
    "appointmentCompleted",
    ()=>appointmentCompleted,
    "appointmentConfirmedPatient",
    ()=>appointmentConfirmedPatient,
    "appointmentRescheduled",
    ()=>appointmentRescheduled,
    "newAppointment",
    ()=>newAppointment,
    "newAppointmentAdmin",
    ()=>newAppointmentAdmin,
    "noShow",
    ()=>noShow,
    "passwordReset",
    ()=>passwordReset,
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
    const typeLabel = type === "FIRST_VISIT" ? "Consulta" : "Retorno";
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
function passwordReset(userName, resetUrl) {
    return {
        subject: "Redefinição de senha - Renan Martins Nutricionista",
        html: baseTemplate(`
      <h2 style="margin:0 0 8px;color:${BRAND_COLOR};font-size:18px;">Redefinição de senha 🔐</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Olá, <strong>${userName}</strong>! Recebemos uma solicitação para redefinir a senha da sua conta.
      </p>
      <div style="text-align:center;margin:24px 0;">
        <a href="${resetUrl}" style="display:inline-block;background-color:${ACCENT_COLOR};color:#ffffff;text-decoration:none;padding:12px 32px;border-radius:8px;font-size:15px;font-weight:600;">
          Redefinir minha senha
        </a>
      </div>
      <p style="color:#777;font-size:13px;line-height:1.6;">
        Se você não solicitou a redefinição de senha, ignore este email. Seu acesso permanece seguro.
      </p>
      <p style="color:#aaa;font-size:12px;line-height:1.6;">
        Este link é válido por 1 hora. Caso expire, solicite um novo na tela de login.
      </p>
    `)
    };
}
function newAppointment(patientName, date, time, type) {
    return {
        subject: "Consulta agendada - Aguardando confirmação",
        html: baseTemplate(`
      <h2 style="margin:0 0 8px;color:${BRAND_COLOR};font-size:18px;">Consulta agendada! ✅</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Olá, <strong>${patientName}</strong>! Sua consulta foi agendada e está aguardando confirmação.
      </p>
      ${appointmentBlock(date, time, type)}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Em breve você receberá a confirmação do seu horário. Caso precise cancelar, faça com pelo menos 12 horas de antecedência.
      </p>
    `)
    };
}
function appointmentCompleted(patientName, date, time, type) {
    return {
        subject: "Consulta concluída - Obrigado!",
        html: baseTemplate(`
      <h2 style="margin:0 0 8px;color:${BRAND_COLOR};font-size:18px;">Consulta concluída 🎉</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Olá, <strong>${patientName}</strong>! Sua consulta foi marcada como concluída.
      </p>
      ${appointmentBlock(date, time, type)}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Obrigado por confiar no trabalho do nutricionista Renan Martins. Acesse a área do paciente para acompanhar seu progresso.
      </p>
    `)
    };
}
function noShow(patientName, date, time) {
    return {
        subject: "Ausência registrada na sua consulta",
        html: baseTemplate(`
      <h2 style="margin:0 0 8px;color:${BRAND_COLOR};font-size:18px;">Ausência registrada</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Olá, <strong>${patientName}</strong>. Sua presença não foi registrada na consulta agendada.
      </p>
      ${appointmentBlock(date, time, "FIRST_VISIT")}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Se isso foi um engano, entre em contato. Você pode agendar uma nova consulta a qualquer momento.
      </p>
    `)
    };
}
function appointmentRescheduled(patientName, date, time) {
    return {
        subject: "Sua consulta foi reagendada",
        html: baseTemplate(`
      <h2 style="margin:0 0 8px;color:${BRAND_COLOR};font-size:18px;">Consulta reagendada 📅</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Olá, <strong>${patientName}</strong>! Sua consulta foi reagendada.
      </p>
      ${appointmentBlock(date, time, "FIRST_VISIT")}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Verifique o novo horário na área do paciente. Qualquer dúvida, entre em contato.
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

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

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
    "notifyAppointmentRescheduled",
    ()=>notifyAppointmentRescheduled,
    "notifyNewAppointment",
    ()=>notifyNewAppointment,
    "notifyNoShow",
    ()=>notifyNoShow,
    "notifyReturnSuggestion",
    ()=>notifyReturnSuggestion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/email/sender.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/email/templates.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function formatDateBR(dateStr) {
    if (!dateStr) return dateStr;
    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) return `${match[3]}/${match[2]}/${match[1]}`;
    return dateStr;
}
async function createNotification({ userId, type, title, message, appointmentId }) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["notifications"]).values({
            userId,
            type,
            title,
            message,
            appointmentId: appointmentId ?? null
        });
    } catch (e) {
        console.error("[createNotification] Error:", e);
    }
}
async function getAdminUserId() {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].select({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["user"].id
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["user"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["user"].role, "ADMIN")).limit(1);
    return rows[0]?.id ?? null;
}
async function getPatientName(patientId) {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].select({
        name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["user"].name
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["user"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["user"].id, patientId)).limit(1);
    return rows[0]?.name || "Paciente";
}
async function notifyNewAppointment(patientName, date, time, type, appointmentId, adminId, patientId, modality = "PRESENCIAL") {
    const modalidadeLabel = modality === "ONLINE" ? "Online" : "Presencial";
    await createNotification({
        userId: adminId,
        type: "APPOINTMENT_CREATED",
        title: "Nova consulta agendada",
        message: `${patientName} agendou uma consulta para ${formatDateBR(date)} às ${time} (${modalidadeLabel}).`,
        appointmentId
    });
    if (patientId) {
        await createNotification({
            userId: patientId,
            type: "APPOINTMENT_CREATED",
            title: "Consulta agendada",
            message: `Sua consulta foi agendada para ${formatDateBR(date)} às ${time}. Aguardando confirmação.`,
            appointmentId
        });
        const email = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPatientEmail"])(patientId);
        if (email) {
            const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["newAppointment"](patientName, date, time, type);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(email, subject, html);
        }
        // Send WhatsApp confirmation to patient immediately after booking
        try {
            const { sendWhatsApp, buildWhatsAppMessage, getPatientPhone } = await __turbopack_context__.A("[project]/src/lib/whatsapp/sender.ts [app-route] (ecmascript, async loader)");
            const phone = await getPatientPhone(patientId);
            if (phone) {
                const msg = await buildWhatsAppMessage(patientName, type, formatDateBR(date), time, modality);
                await sendWhatsApp(phone, msg);
            }
        } catch (e) {
            console.error("[notifyNewAppointment] WhatsApp error:", e);
        }
    }
    const adminEmail = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminEmail"])();
    if (adminEmail) {
        const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["newAppointmentAdmin"](patientName, date, time, type);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(adminEmail, subject, html);
    }
}
async function notifyAppointmentConfirmed(patientId, date, time, type, appointmentId) {
    const patientName = await getPatientName(patientId);
    await createNotification({
        userId: patientId,
        type: "APPOINTMENT_CONFIRMED",
        title: "Consulta confirmada",
        message: `Sua consulta para ${formatDateBR(date)} às ${time} foi confirmada.`,
        appointmentId
    });
    const email = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPatientEmail"])(patientId);
    if (email) {
        const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointmentConfirmedPatient"](patientName, date, time, type);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(email, subject, html);
    }
    try {
        const { sendWhatsApp, buildWhatsAppMessage } = await __turbopack_context__.A("[project]/src/lib/whatsapp/sender.ts [app-route] (ecmascript, async loader)");
        const patientRows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].select({
            phone: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["user"].phone
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["user"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["user"].id, patientId)).limit(1);
        const phone = patientRows[0]?.phone;
        if (phone) {
            const msg = await buildWhatsAppMessage(patientName, type, formatDateBR(date), time);
            await sendWhatsApp(phone, msg);
        }
    } catch (e) {
        console.error("[notifyAppointmentConfirmed] WhatsApp error:", e);
    }
}
async function notifyAppointmentCancelledByAdmin(patientId, date, time, appointmentId) {
    const patientName = await getPatientName(patientId);
    await createNotification({
        userId: patientId,
        type: "APPOINTMENT_CANCELLED",
        title: "Consulta cancelada",
        message: `Sua consulta para ${formatDateBR(date)} às ${time} foi cancelada pela clínica.`,
        appointmentId
    });
    const email = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPatientEmail"])(patientId);
    if (email) {
        const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointmentCancelledPatient"](patientName, date, time);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(email, subject, html);
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
            message: `${patientName} cancelou a consulta de ${formatDateBR(date)} às ${time}.`,
            appointmentId
        });
    }
    await createNotification({
        userId: patientId,
        type: "APPOINTMENT_CANCELLED",
        title: "Consulta cancelada",
        message: `Sua consulta para ${formatDateBR(date)} às ${time} foi cancelada.`,
        appointmentId
    });
    const adminEmail = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminEmail"])();
    if (adminEmail) {
        const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointmentCancelledAdmin"](patientName, date, time);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(adminEmail, subject, html);
    }
}
async function notifyAppointmentCompleted(patientId, date, time, type, appointmentId) {
    const patientName = await getPatientName(patientId);
    await createNotification({
        userId: patientId,
        type: "APPOINTMENT_COMPLETED",
        title: "Consulta concluída",
        message: `Sua consulta de ${formatDateBR(date)} foi marcada como concluída. Obrigado!`,
        appointmentId
    });
    const email = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPatientEmail"])(patientId);
    if (email) {
        const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointmentCompleted"](patientName, date, time, type);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(email, subject, html);
    }
}
async function notifyReturnSuggestion(patientId, returnDate) {
    const patientName = await getPatientName(patientId);
    await createNotification({
        userId: patientId,
        type: "GENERAL",
        title: "Sugestão de retorno",
        message: `O Renan sugeriu seu retorno para ${formatDateBR(returnDate)}.`
    });
    const email = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPatientEmail"])(patientId);
    if (email) {
        const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["returnSuggestion"](patientName, returnDate);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(email, subject, html);
    }
}
async function notifyNoShow(patientId, date, time, appointmentId) {
    const patientName = await getPatientName(patientId);
    await createNotification({
        userId: patientId,
        type: "GENERAL",
        title: "Ausência registrada",
        message: `Sua consulta de ${formatDateBR(date)} às ${time} foi marcada como ausência.`,
        appointmentId
    });
    const email = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPatientEmail"])(patientId);
    if (email) {
        const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["noShow"](patientName, date, time);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(email, subject, html);
    }
}
async function notifyAppointmentRescheduled(patientId, date, time, appointmentId) {
    const patientName = await getPatientName(patientId);
    await createNotification({
        userId: patientId,
        type: "APPOINTMENT_CONFIRMED",
        title: "Consulta reagendada",
        message: `Sua consulta foi reagendada para ${formatDateBR(date)} às ${time}.`,
        appointmentId
    });
    const email = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPatientEmail"])(patientId);
    if (email) {
        const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointmentRescheduled"](patientName, date, time);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(email, subject, html);
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=src_lib_fa2cb485._.js.map
module.exports = [
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
    "notifyAppointmentRescheduled",
    ()=>notifyAppointmentRescheduled,
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
function formatDateBR(date) {
    if (!date) return date;
    const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) return match[3] + "/" + match[2] + "/" + match[1];
    return date;
}
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
        message: `${patientName} agendou ${type === "FIRST_VISIT" ? "Consulta" : "Retorno"} para ${formatDateBR(date)} às ${time}`,
        appointmentId
    });
    try {
        const adminEmail = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminEmail"])();
        if (adminEmail) {
            const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["newAppointmentAdmin"](patientName, formatDateBR(date), time, type);
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
        message: `Sua consulta do dia ${formatDateBR(date)} às ${time} foi confirmada!`,
        appointmentId
    });
    try {
        const email = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPatientEmail"])(patientId);
        if (email) {
            const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointmentConfirmedPatient"](patientName, formatDateBR(date), time, type);
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
        message: `Sua consulta do dia ${formatDateBR(date)} às ${time} foi cancelada.`,
        appointmentId
    });
    try {
        const email = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPatientEmail"])(patientId);
        if (email) {
            const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointmentCancelledPatient"](patientName, formatDateBR(date), time);
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
            message: `${patientName} cancelou a consulta do dia ${formatDateBR(date)} às ${time}.`,
            appointmentId
        });
    }
    try {
        const adminEmail = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminEmail"])();
        if (adminEmail) {
            const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointmentCancelledAdmin"](patientName, formatDateBR(date), time);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(adminEmail, subject, html);
        }
        const patientEmail = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPatientEmail"])(patientId);
        if (patientEmail) {
            const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointmentCancelledPatient"](patientName, formatDateBR(date), time);
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
        message: `Sua consulta do dia ${formatDateBR(date)} às ${time} foi concluída. Obrigado!`,
        appointmentId
    });
}
async function notifyNoShow(patientId, date, time, appointmentId) {
    await createNotification({
        userId: patientId,
        type: "GENERAL",
        title: "Falta registrada",
        message: `Você não compareceu à consulta do dia ${formatDateBR(date)} às ${time}.`,
        appointmentId
    });
}
async function notifyReturnSuggestion(patientId, suggestedDate) {
    const patientName = await getPatientName(patientId);
    await createNotification({
        userId: patientId,
        type: "APPOINTMENT_REMINDER",
        title: "Sugestão de retorno",
        message: `O nutricionista sugeriu um retorno para ${formatDateBR(suggestedDate)}. Agende pelo painel do paciente.`
    });
    try {
        const email = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPatientEmail"])(patientId);
        if (email) {
            const { subject, html } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$templates$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["returnSuggestion"](patientName, formatDateBR(suggestedDate));
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2f$sender$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendEmail"])(email, subject, html);
        }
    } catch (e) {
        console.error("[notifyReturnSuggestion] Email error:", e);
    }
}
async function notifyAppointmentRescheduled(patientId, newDate, newTime, appointmentId) {
    await createNotification({
        userId: patientId,
        type: "APPOINTMENT_CONFIRMED",
        title: "Consulta remarcada",
        message: `Sua consulta foi remarcada para ${formatDateBR(newDate)} às ${newTime}.`,
        appointmentId
    });
}
}),
];

//# sourceMappingURL=src_lib_fa2cb485._.js.map
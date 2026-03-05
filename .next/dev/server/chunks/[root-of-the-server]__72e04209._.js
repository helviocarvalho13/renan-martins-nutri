module.exports = [
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
        const typeLabel = appointment.type === "FIRST_VISIT" ? "Consulta" : "Retorno";
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
        const typeLabel = appointment.type === "FIRST_VISIT" ? "Consulta" : "Retorno";
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
];

//# sourceMappingURL=%5Broot-of-the-server%5D__72e04209._.js.map
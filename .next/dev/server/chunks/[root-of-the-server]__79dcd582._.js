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
"[project]/src/lib/schema.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "account",
    ()=>account,
    "appointmentRelations",
    ()=>appointmentRelations,
    "appointments",
    ()=>appointments,
    "blockedSlots",
    ()=>blockedSlots,
    "chatbotSessions",
    ()=>chatbotSessions,
    "notifications",
    ()=>notifications,
    "scheduleConfig",
    ()=>scheduleConfig,
    "session",
    ()=>session,
    "siteContent",
    ()=>siteContent,
    "testimonials",
    ()=>testimonials,
    "user",
    ()=>user,
    "userRelations",
    ()=>userRelations,
    "verification",
    ()=>verification
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/table.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/text.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/boolean.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/integer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/timestamp.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/date.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$time$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/time.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/jsonb.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/indexes.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/relations.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/sql.js [app-route] (ecmascript)");
;
;
const genId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`gen_random_uuid()`;
const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("user", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().default(genId),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("name").notNull(),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("email").notNull().unique(),
    emailVerified: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("email_verified").notNull().default(false),
    image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("image"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow(),
    role: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("role").notNull().default("PATIENT"),
    phone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("phone"),
    cpf: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("cpf"),
    dateOfBirth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("date_of_birth"),
    isActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("is_active").notNull().default(true)
});
const session = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("session", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().default(genId),
    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("expires_at").notNull(),
    token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("token").notNull().unique(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow(),
    ipAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("ip_address"),
    userAgent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("user_agent"),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("user_id").notNull().references(()=>user.id, {
        onDelete: "cascade"
    })
});
const account = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("account", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().default(genId),
    accountId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("account_id").notNull(),
    providerId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("provider_id").notNull(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("user_id").notNull().references(()=>user.id, {
        onDelete: "cascade"
    }),
    accessToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("access_token"),
    refreshToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("refresh_token"),
    idToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id_token"),
    accessTokenExpiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("access_token_expires_at"),
    refreshTokenExpiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("refresh_token_expires_at"),
    scope: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("scope"),
    password: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("password"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow()
});
const verification = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("verification", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().default(genId),
    identifier: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("identifier").notNull(),
    value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("value").notNull(),
    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("expires_at").notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow()
});
const appointments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("appointments", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().default(genId),
    patientId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("patient_id").notNull().references(()=>user.id, {
        onDelete: "cascade"
    }),
    date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["date"])("date").notNull(),
    startTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$time$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["time"])("start_time").notNull(),
    endTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$time$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["time"])("end_time").notNull(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("type").notNull().default("FIRST_VISIT"),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("status").notNull().default("PENDING"),
    notes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("notes"),
    returnSuggestedDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["date"])("return_suggested_date"),
    googleCalendarEventId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("google_calendar_event_id"),
    modality: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("modality").notNull().default("PRESENCIAL"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uniqueIndex"])("appointments_active_slot_key").on(t.date, t.startTime).where(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`status IN ('PENDING', 'CONFIRMED')`)
    ]);
const scheduleConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("schedule_config", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().default(genId),
    adminId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("admin_id").notNull().references(()=>user.id, {
        onDelete: "cascade"
    }),
    dayOfWeek: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("day_of_week").notNull(),
    startTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$time$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["time"])("start_time").notNull(),
    endTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$time$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["time"])("end_time").notNull(),
    slotDurationMin: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("slot_duration_min").notNull().default(50),
    breakDurationMin: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("break_duration_min").notNull().default(10),
    isActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("is_active").notNull().default(true),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uniqueIndex"])("unique_admin_day").on(t.adminId, t.dayOfWeek)
    ]);
const blockedSlots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("blocked_slots", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().default(genId),
    adminId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("admin_id").notNull().references(()=>user.id, {
        onDelete: "cascade"
    }),
    date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["date"])("date").notNull(),
    startTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$time$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["time"])("start_time"),
    endTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$time$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["time"])("end_time"),
    allDay: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("all_day").notNull().default(false),
    reason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("reason"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow()
});
const testimonials = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("testimonials", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().default(genId),
    patientId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("patient_id").references(()=>user.id, {
        onDelete: "set null"
    }),
    content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("content").notNull(),
    rating: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("rating").notNull().default(5),
    isApproved: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("is_approved").notNull().default(false),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow()
});
const siteContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("site_content", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().default(genId),
    section: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("section").notNull(),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("title").notNull().default(""),
    content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("content").notNull().default({}),
    isActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("is_active").notNull().default(true),
    sortOrder: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("sort_order").notNull().default(0),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow()
});
const notifications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("notifications", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().default(genId),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("user_id").notNull().references(()=>user.id, {
        onDelete: "cascade"
    }),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("type").notNull().default("GENERAL"),
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("title").notNull(),
    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("message").notNull(),
    isRead: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("is_read").notNull().default(false),
    appointmentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("appointment_id").references(()=>appointments.id, {
        onDelete: "set null"
    }),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow()
});
const chatbotSessions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("chatbot_sessions", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey().default(genId),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("user_id").references(()=>user.id, {
        onDelete: "set null"
    }),
    sessionToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("session_token").notNull().unique(),
    currentState: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("current_state").notNull().default("WELCOME"),
    context: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("context").notNull().default({}),
    messages: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("messages").notNull().default([]),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow()
});
const userRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(user, ({ many })=>({
        appointments: many(appointments),
        scheduleConfigs: many(scheduleConfig),
        blockedSlots: many(blockedSlots),
        notifications: many(notifications)
    }));
const appointmentRelations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$relations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["relations"])(appointments, ({ one })=>({
        patient: one(user, {
            fields: [
                appointments.patientId
            ],
            references: [
                user.id
            ]
        })
    }));
}),
"[project]/src/lib/db.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/node-postgres/driver.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/schema.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["Pool"]({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes("sslmode=require") ? {
        rejectUnauthorized: false
    } : false
});
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["drizzle"])(pool, {
    schema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
});
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/node:os [external] (node:os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:os", () => require("node:os"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[project]/src/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "auth",
    ()=>auth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$auth$2f$full$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/auth/full.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$adapters$2f$drizzle$2d$adapter$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/better-auth/dist/adapters/drizzle-adapter/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$node_modules$2f40$better$2d$auth$2f$drizzle$2d$adapter$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-auth/node_modules/@better-auth/drizzle-adapter/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/schema.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const replitDomain = process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS}` : null;
const appBaseUrl = process.env.BETTER_AUTH_URL || replitDomain || "http://localhost:5000";
const trustedOrigins = [
    "http://localhost:5000",
    ...replitDomain ? [
        replitDomain
    ] : []
];
const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$dist$2f$auth$2f$full$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["betterAuth"])({
    baseURL: appBaseUrl,
    secret: process.env.SESSION_SECRET,
    trustedOrigins,
    database: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$auth$2f$node_modules$2f40$better$2d$auth$2f$drizzle$2d$adapter$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["drizzleAdapter"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"], {
        provider: "pg",
        schema: {
            user: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["user"],
            session: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["session"],
            account: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["account"],
            verification: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verification"]
        }
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        autoSignIn: true,
        minPasswordLength: 6,
        sendResetPasswordToken: async ({ user, url })=>{
            try {
                const { sendEmail } = await __turbopack_context__.A("[project]/src/lib/email/sender.ts [app-route] (ecmascript, async loader)");
                const { passwordReset } = await __turbopack_context__.A("[project]/src/lib/email/templates.ts [app-route] (ecmascript, async loader)");
                const { subject, html } = passwordReset(user.name, url);
                await sendEmail(user.email, subject, html);
                console.log(`[forgot-password] Reset email sent to ${user.email}`);
            } catch (err) {
                console.error("[forgot-password] Failed to send reset email:", err);
            }
        }
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "PATIENT",
                required: true,
                input: false
            },
            phone: {
                type: "string",
                required: false,
                input: true
            },
            cpf: {
                type: "string",
                required: false,
                input: true
            },
            dateOfBirth: {
                type: "string",
                required: false,
                input: true
            },
            isActive: {
                type: "boolean",
                defaultValue: true,
                required: true,
                input: false
            }
        }
    }
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/server-auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "forbiddenResponse",
    ()=>forbiddenResponse,
    "getServerUser",
    ()=>getServerUser,
    "unauthorizedResponse",
    ()=>unauthorizedResponse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function getServerUser() {
    try {
        const session = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["auth"].api.getSession({
            headers: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["headers"])()
        });
        if (!session?.user) return null;
        const u = session.user;
        return {
            id: u.id,
            email: u.email,
            name: u.name,
            emailVerified: u.emailVerified ?? false,
            image: u.image ?? null,
            createdAt: u.createdAt,
            updatedAt: u.updatedAt,
            role: u.role ?? "PATIENT",
            phone: u.phone ?? null,
            cpf: u.cpf ?? null,
            dateOfBirth: u.dateOfBirth ?? null,
            isActive: u.isActive ?? true
        };
    } catch  {
        return null;
    }
}
function unauthorizedResponse() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Não autenticado"
    }, {
        status: 401
    });
}
function forbiddenResponse() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Acesso negado"
    }, {
        status: 403
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
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

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

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
        const patientName = appointment.patientId ? await getPatientNameForEvent(appointment.patientId) : "Paciente";
        const typeLabel = appointment.type === "FIRST_VISIT" ? "Consulta" : "Retorno";
        const response = await calendar.events.insert({
            calendarId: "primary",
            requestBody: {
                summary: `${typeLabel} - ${patientName}`,
                description: `Consulta com ${patientName}\nTipo: ${typeLabel}\nID: ${appointment.id}`,
                start: {
                    dateTime: `${appointment.date}T${appointment.startTime}`,
                    timeZone: "America/Sao_Paulo"
                },
                end: {
                    dateTime: `${appointment.date}T${appointment.endTime}`,
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
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointments"]).set({
                    googleCalendarEventId: eventId
                }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointments"].id, appointment.id));
            } catch  {
                console.warn("[google-calendar] Could not save event ID to database (column may not exist yet)");
            }
        }
        return eventId || null;
    } catch (error) {
        if (error instanceof Error && error.message.includes("not connected")) {
            console.warn("[google-calendar] Not connected. Skipping event creation.");
        } else {
            console.error("[google-calendar] Create event error:", error instanceof Error ? error.message : String(error));
        }
        return null;
    }
}
async function updateCalendarEvent(appointment) {
    if (!isConfigured()) return false;
    try {
        const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].select({
            googleCalendarEventId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointments"].googleCalendarEventId
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointments"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointments"].id, appointment.id)).limit(1);
        const eventId = rows[0]?.googleCalendarEventId;
        if (!eventId) return false;
        const calendar = await getCalendarClient();
        const statusLabel = appointment.status === "COMPLETED" ? " [CONCLUÍDA]" : "";
        const patientName = appointment.patientId ? await getPatientNameForEvent(appointment.patientId) : "Paciente";
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
        if (error instanceof Error && error.message.includes("not connected")) {
            console.warn("[google-calendar] Not connected. Skipping event update.");
        } else {
            console.error("[google-calendar] Update event error:", error instanceof Error ? error.message : String(error));
        }
        return false;
    }
}
async function deleteCalendarEvent(appointmentId) {
    if (!isConfigured()) return false;
    try {
        const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].select({
            googleCalendarEventId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointments"].googleCalendarEventId
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointments"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointments"].id, appointmentId)).limit(1);
        const eventId = rows[0]?.googleCalendarEventId;
        if (!eventId) return false;
        const calendar = await getCalendarClient();
        await calendar.events.delete({
            calendarId: "primary",
            eventId
        });
        console.log("[google-calendar] Event deleted:", eventId);
        return true;
    } catch (error) {
        if (error instanceof Error && error.message.includes("not connected")) {
            return false;
        }
        const apiError = error;
        if (apiError?.code === 410) {
            return false;
        }
        console.error("[google-calendar] Delete event error:", error instanceof Error ? error.message : String(error));
        return false;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/api/patient/cancel/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/server-auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notifications$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/notifications.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$google$2d$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/google-calendar.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notifications$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$google$2d$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notifications$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$google$2d$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
async function POST(request) {
    const currentUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerUser"])();
    if (!currentUser) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Não autenticado"
        }, {
            status: 401
        });
    }
    const body = await request.json();
    const { appointment_id } = body;
    if (!appointment_id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "ID da consulta obrigatório"
        }, {
            status: 400
        });
    }
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointments"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointments"].id, appointment_id)).limit(1);
    const appointment = rows[0];
    if (!appointment) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Consulta não encontrada"
        }, {
            status: 404
        });
    }
    if (appointment.patientId !== currentUser.id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Sem permissão"
        }, {
            status: 403
        });
    }
    if (![
        "PENDING",
        "CONFIRMED"
    ].includes(appointment.status)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Esta consulta não pode ser cancelada"
        }, {
            status: 400
        });
    }
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.startTime}`);
    const minAdvance = Date.now() + 12 * 60 * 60 * 1000;
    if (appointmentDateTime.getTime() < minAdvance) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Cancelamentos devem ser feitos com pelo menos 12 horas de antecedência."
        }, {
            status: 400
        });
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointments"]).set({
        status: "CANCELLED"
    }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appointments"].id, appointment_id));
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notifications$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["notifyAppointmentCancelledByPatient"])(currentUser.id, appointment.date, appointment.startTime?.slice(0, 5), appointment_id);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$google$2d$calendar$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteCalendarEvent"])(appointment_id);
    } catch (notifError) {
        console.error("[patient/cancel] Notification error:", notifError);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__79dcd582._.js.map
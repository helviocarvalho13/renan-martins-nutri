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
"[project]/src/app/api/setup/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function executeSql(sql) {
    const supabaseUrl = ("TURBOPACK compile-time value", "https://dvrwltbunfwnymoqrqzg.supabase.co");
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const res = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`
        },
        body: JSON.stringify({
            sql_string: sql
        })
    });
    return {
        status: res.status,
        body: await res.text()
    };
}
async function POST() {
    const supabaseUrl = ("TURBOPACK compile-time value", "https://dvrwltbunfwnymoqrqzg.supabase.co");
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const createFnRes = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`
        },
        body: JSON.stringify({
            sql_string: "SELECT 1"
        })
    });
    if (createFnRes.status === 404) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "exec_sql function not found",
            instructions: "Please run the following SQL in your Supabase SQL Editor (Dashboard > SQL Editor > New Query):",
            sql: getSetupSQL()
        });
    }
    const statements = getSetupSQL().split(";\n\n").filter((s)=>s.trim());
    const results = [];
    for (const stmt of statements){
        const r = await executeSql(stmt);
        results.push({
            sql: stmt.substring(0, 60),
            ...r
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        results
    });
}
async function GET() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        instructions: "Run a POST request to this endpoint, or copy the SQL below and run it in your Supabase SQL Editor:",
        sql: getSetupSQL()
    });
}
function getSetupSQL() {
    return `CREATE TABLE IF NOT EXISTS services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 60,
  price integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  icon text DEFAULT 'leaf',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS time_slots (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  day_of_week integer NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS appointments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id uuid,
  service_id uuid REFERENCES services(id),
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  patient_name text NOT NULL,
  patient_email text NOT NULL,
  patient_phone text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY,
  email text NOT NULL,
  name text NOT NULL,
  phone text,
  role text NOT NULL DEFAULT 'patient',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Services are viewable by everyone" ON services FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can manage services" ON services FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Time slots are viewable by everyone" ON time_slots FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can manage time slots" ON time_slots FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Anyone can insert appointments" ON appointments FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Anyone can view own appointments" ON appointments FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Authenticated users can update appointments" ON appointments FOR UPDATE USING (auth.role() = 'authenticated');

INSERT INTO services (name, description, duration_minutes, price, is_active, icon) VALUES
  ('Consulta Inicial', 'Avaliacao completa do estado nutricional, anamnese detalhada, definicao de objetivos e elaboracao do plano alimentar personalizado.', 60, 25000, true, 'apple'),
  ('Retorno', 'Acompanhamento da evolucao, ajustes no plano alimentar e orientacoes complementares para manter seus resultados.', 40, 15000, true, 'target'),
  ('Nutricao Esportiva', 'Plano alimentar focado em performance esportiva, com estrategias de periodizacao nutricional e suplementacao.', 60, 30000, true, 'activity'),
  ('Reeducacao Alimentar', 'Programa completo para transformar sua relacao com a comida, com acompanhamento semanal e suporte continuo.', 50, 20000, true, 'heart')
ON CONFLICT DO NOTHING;

INSERT INTO time_slots (day_of_week, start_time, end_time, is_active)
SELECT d, t.start_time, t.end_time, true
FROM generate_series(1, 5) AS d,
(VALUES
  ('08:00:00'::time, '09:00:00'::time),
  ('09:00:00'::time, '10:00:00'::time),
  ('10:00:00'::time, '11:00:00'::time),
  ('11:00:00'::time, '12:00:00'::time),
  ('14:00:00'::time, '15:00:00'::time),
  ('15:00:00'::time, '16:00:00'::time),
  ('16:00:00'::time, '17:00:00'::time),
  ('17:00:00'::time, '18:00:00'::time)
) AS t(start_time, end_time)
WHERE NOT EXISTS (SELECT 1 FROM time_slots LIMIT 1)`;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1e9a1b82._.js.map
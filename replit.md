# Renan Martins Nutricionista

## Overview
This project is a comprehensive platform for nutritionist Renan Martins. It streamlines operations by offering an institutional website, a patient area, an admin dashboard for managing appointments and content, and an intelligent chatbot for scheduling. The primary goal is to enhance patient engagement, simplify appointment booking, and provide Renan Martins with robust tools for practice management.

## User Preferences
Simple language and direct instructions. Iterative development with frequent, small updates. Always ask for approval before making significant changes to the database schema or core business logic.

## System Architecture

**Stack**: Next.js 16 (App Router + Turbopack), TypeScript, Tailwind CSS, Shadcn/UI, Drizzle ORM

**Authentication** (better-auth — fully migrated from Supabase):
- `better-auth` v1.5.5 for session management (email/password, cookie-based sessions)
- Session stored in better-auth's own cookie (`better-auth.session_token`)
- Route protection via `src/proxy.ts` (Next.js 16 renamed middleware to proxy)
- `src/lib/auth.ts` — betterAuth config with drizzleAdapter + additionalFields (role, phone, cpf, dateOfBirth, isActive)
- `src/lib/auth-client.ts` — browser client (createAuthClient, useSession, signIn, signOut, signUp)
- `src/app/api/auth/[...all]/route.ts` — catch-all handler (toNextJsHandler)
- `src/lib/server-auth.ts` — `getServerUser()` helper for API routes (uses auth.api.getSession)
- `src/lib/session.ts` — `getCurrentUser()` helper for server components
- `src/hooks/useAuth.ts` — React hook returning `{ user, profile, role, loading, signOut }` via better-auth useSession()

**Database**: Replit PostgreSQL via `DATABASE_URL`
- Schema defined in `src/lib/schema.ts` (Drizzle ORM), re-exported from `shared/schema.ts`
- Tables: `user` (TEXT PK), `session`, `account`, `verification` (better-auth tables) + `appointments`, `schedule_config`, `blocked_slots`, `testimonials`, `site_content`, `notifications`, `chatbot_sessions`
- Drizzle config: `drizzle.config.ts` → `./src/lib/schema.ts`
- DB client: `src/lib/db.ts`
- Data access helpers: `src/lib/data/` — reusable Drizzle query functions (appointments, patients, schedule, content)
- Admin account: `renanmartinsnutri@gmail.com` / `123456` (ADMIN role) — seeded via `/api/seed-admin?secret=<SESSION_SECRET>&password=<pass>`

**Auth Helpers**:
- `src/lib/auth-helpers.ts` — `hashPassword()`, `verifyPassword()`, `getUserByEmail()` utilities (retained for data migration use)

**Notifications**: `src/components/NotificationBell.tsx` polls `/api/notifications` (better-auth session)

**Chatbot**: `src/hooks/useMageBot.ts` uses `authClient` (better-auth) — no Supabase dependency

**Agenda**: `src/hooks/useRealtimeAgenda.ts` uses polling (setInterval 30s) — no Supabase Realtime

**Email**: Resend API via `RESEND_API_KEY` — `src/lib/email/sender.ts` + `src/lib/email/templates.ts`
- Password reset emails sent via better-auth `sendResetPasswordToken` callback in `src/lib/auth.ts`

**Dashboard Layouts**:
- Admin: `src/app/(dashboard)/admin/layout.tsx` — logout via `authClient.signOut()`
- Patient: `src/app/(dashboard)/paciente/layout.tsx` — uses `useAuth()` for user name + logout

## Important File Conventions
- Next.js 16 renamed `middleware.ts` → `proxy.ts` and `middleware()` → `proxy()` export
- Button + Link: always `<Button asChild><Link>` — never wrap Button with Link/a
- Fonts: Plus Jakarta Sans + Playfair Display
- Port: 5000, `reactStrictMode: false`
- API responses use snake_case JSON (e.g. `patient_id`, `start_time`) for consistency with client types

## External Dependencies
- **Replit PostgreSQL** (`DATABASE_URL`): Primary database for all app data
- **better-auth**: Authentication (sessions, accounts in DB)
- **Resend** (`RESEND_API_KEY`): Transactional email (appointment notifications, password reset)
- **Whapi Cloud** (`WHAPI_TOKEN`): WhatsApp notifications
- **Google Calendar** (Replit connector): Appointment calendar events
- **Twilio** (`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM`): SMS/WhatsApp fallback

## Migration Status
- ✅ Task #2 complete: better-auth fully replaces Supabase auth
- ✅ Task #3 complete: All API routes and dashboard pages migrated to Drizzle ORM; @supabase/* packages removed

## Environment Variables Required
- `DATABASE_URL` — Replit PostgreSQL connection string (auto-provided)
- `SESSION_SECRET` — Secret for better-auth sessions (must be 32+ chars)
- `REPLIT_DOMAINS` — Auto-provided by Replit; used for better-auth trusted origins
- `WHAPI_TOKEN` — Whapi Cloud channel token for WhatsApp
- `RESEND_API_KEY` — Resend API key for transactional email (optional — emails skipped if absent)
- `CRON_SECRET` — Auth token for cron job routes (`/api/cron/reminders`)
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM` — Twilio (optional, fallback WhatsApp)
- `BETTER_AUTH_URL` — Override for better-auth base URL (optional; defaults to REPLIT_DOMAINS)

## No Longer Required
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase removed
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase removed
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase removed

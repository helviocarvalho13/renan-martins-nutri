# Renan Martins Nutricionista

## Overview
This project is a comprehensive platform for nutritionist Renan Martins. It streamlines operations by offering an institutional website, a patient area, an admin dashboard for managing appointments and content, and an intelligent chatbot for scheduling. The primary goal is to enhance patient engagement, simplify appointment booking, and provide Renan Martins with robust tools for practice management.

## User Preferences
Simple language and direct instructions. Iterative development with frequent, small updates. Always ask for approval before making significant changes to the database schema or core business logic.

## System Architecture
**Stack**: Next.js 16 (App Router + Turbopack), TypeScript, Tailwind CSS, Shadcn/UI, Drizzle ORM.

**Authentication** (better-auth — fully migrated from Supabase):
- `better-auth` v1.5.5 for session management (email/password, cookie-based sessions)
- Session stored in better-auth's own cookie (`better-auth.session_token`)
- Route protection via `src/proxy.ts` (Next.js 16 renamed middleware to proxy)
- `src/lib/auth.ts` — betterAuth config with drizzleAdapter + additionalFields (role, phone, cpf, dateOfBirth, isActive)
- `src/lib/auth-client.ts` — browser client (createAuthClient, useSession, signIn, signOut, signUp)
- `src/app/api/auth/[...all]/route.ts` — catch-all handler (toNextJsHandler)
- `src/lib/session.ts` — `getCurrentUser()` helper for server API routes (uses auth.api.getSession)
- `src/hooks/useAuth.ts` — React hook returning `{ user, profile, role, loading, signOut }` via better-auth useSession()

**Database**: Replit PostgreSQL via `DATABASE_URL`
- Schema defined in `src/lib/schema.ts` (Drizzle ORM)
- Tables: `user` (TEXT PK), `session`, `account`, `verification` (better-auth tables) + `appointments`, `schedule_config`, `blocked_slots`, `testimonials`, `site_content`, `notifications`, `chatbot_sessions`
- Drizzle config: `drizzle.config.ts` → `./src/lib/schema.ts`
- DB client: `src/lib/db.ts`
- Admin account: `renanmartinsnutri@gmail.com` / `123456` (ADMIN role) — seeded via `/api/seed-admin?secret=<SESSION_SECRET>&password=<pass>`
- Seed-admin security: requires SESSION_SECRET in query param + explicit password param (no host bypass)

**Auth Helpers**:
- `src/lib/auth-helpers.ts` — `hashPassword()`, `verifyPassword()`, `getUserByEmail()`, utility functions (NOT used for auth anymore — kept for potential data migration use)

**Notifications**: `src/components/NotificationBell.tsx` polls `/api/notifications` (better-auth session via getCurrentUser)

**Dashboard Layouts**:
- Admin: `src/app/(dashboard)/admin/layout.tsx` — logout via `authClient.signOut()`
- Patient: `src/app/(dashboard)/paciente/layout.tsx` — uses `useAuth()` for user name + logout

## Important File Conventions
- Next.js 16 renamed `middleware.ts` → `proxy.ts` and `middleware()` → `proxy()` export
- Button + Link: always `<Button asChild><Link>` — never wrap Button with Link/a
- Fonts: Plus Jakarta Sans + Playfair Display
- Port: 5000, `reactStrictMode: false`

## External Dependencies
- **Replit PostgreSQL** (`DATABASE_URL`): Primary database for all app data
- **better-auth**: Authentication (sessions, accounts in DB)
- **Whapi Cloud** (`WHAPI_TOKEN`): WhatsApp notifications
- **Google Calendar** (Replit connector): Appointment calendar events
- **Twilio** (`TWILIO_*`): SMS/WhatsApp fallback

## Migration Status
- ✅ Task #2 complete: better-auth fully replaces Supabase auth (iron-session removed)
- ⏳ Task #3 pending: Dashboard API routes and pages still use Supabase client for data fetching (appointments, patients, etc.) — will be migrated to Drizzle ORM direct queries

## Environment Variables
- `DATABASE_URL` — Replit PostgreSQL connection string (auto-provided)
- `SESSION_SECRET` — Secret for better-auth sessions (must be 32+ chars)
- `REPLIT_DOMAINS` — Auto-provided by Replit; used for better-auth trusted origins
- `BETTER_AUTH_URL` — Override for better-auth base URL (optional; defaults to REPLIT_DOMAINS)
- `WHAPI_TOKEN` — Whapi Cloud channel token for WhatsApp
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM` — Twilio config
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` — Still present for Task #3 migration; will be removed after Task #3

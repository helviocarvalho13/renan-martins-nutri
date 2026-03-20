# Renan Martins Nutricionista

## Overview
This project is a comprehensive platform for nutritionist Renan Martins. It streamlines operations by offering an institutional website, a patient area, an admin dashboard for managing appointments and content, and an intelligent chatbot for scheduling. The primary goal is to enhance patient engagement, simplify appointment booking, and provide Renan Martins with robust tools for practice management.

## User Preferences
Simple language and direct instructions. Iterative development with frequent, small updates. Always ask for approval before making significant changes to the database schema or core business logic.

## System Architecture
**Stack**: Next.js 16 (App Router + Turbopack), TypeScript, Tailwind CSS, Shadcn/UI, Drizzle ORM.

**Authentication** (migrated from Supabase → Replit infra):
- `iron-session` for encrypted session cookies (httpOnly, secure)
- `bcryptjs` for password hashing
- Route protection via `src/proxy.ts` (Next.js 16 renamed middleware to proxy)
- Session stored in `renan-session` cookie
- Auth endpoints: `/api/auth/login`, `/api/auth/register`, `/api/auth/logout`, `/api/auth/session`, `/api/auth/forgot-password`, `/api/auth/reset-password`

**Database**: Replit PostgreSQL via `DATABASE_URL`
- Schema defined in `src/lib/schema.ts` (Drizzle ORM)
- Tables: `user`, `password_reset_token`, `appointments`, `schedule_config`, `blocked_slots`, `testimonials`, `site_content`, `notifications`, `chatbot_sessions`
- Drizzle config: `drizzle.config.ts` → `./src/lib/schema.ts`
- DB client: `src/lib/db.ts`
- Admin account seeded: `renanmartinsnutri@gmail.com` / `123456` (ADMIN role)

**Auth Hooks/Helpers**:
- `src/lib/session.ts` — iron-session options + `getSession()`, `getCurrentUser()`
- `src/lib/auth-helpers.ts` — `hashPassword()`, `verifyPassword()`, `getUserByEmail()`, `generateToken()`
- `src/hooks/useAuth.ts` — React hook using `/api/auth/session` via TanStack Query

**Notifications**: `src/components/NotificationBell.tsx` polls `/api/notifications` (no Supabase realtime)

**Dashboard Layouts**:
- Admin: `src/app/(dashboard)/admin/layout.tsx` — logout via `POST /api/auth/logout`
- Patient: `src/app/(dashboard)/paciente/layout.tsx` — uses `useAuth()` for user name + logout

## Important File Conventions
- Next.js 16 renamed `middleware.ts` → `proxy.ts` and `middleware()` → `proxy()` export
- Button + Link: always `<Button asChild><Link>` — never wrap Button with Link/a
- Fonts: Plus Jakarta Sans + Playfair Display
- Port: 5000, `reactStrictMode: false`

## External Dependencies
- **Replit PostgreSQL** (`DATABASE_URL`): Primary database for all app data
- **Whapi Cloud** (`WHAPI_TOKEN`): WhatsApp notifications
- **Google Calendar** (Replit connector): Appointment calendar events
- **Twilio** (`TWILIO_*`): SMS/WhatsApp fallback

> NOTE: Supabase is no longer used for auth (Task #2 complete). Many dashboard API routes and data-fetching pages still reference Supabase client — these will be migrated in Task #3.

## Environment Variables
- `DATABASE_URL` — Replit PostgreSQL connection string (auto-provided)
- `SESSION_SECRET` — Secret for encrypting iron-session cookies (must be 32+ chars)
- `WHAPI_TOKEN` — Whapi Cloud channel token for WhatsApp
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM` — Twilio config
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` — Still present for Task #3 migration; will be removed after Task #3

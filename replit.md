# Renan Martins Nutricionista

## Overview
Platform for nutritionist Renan Martins with appointment scheduling, institutional website, admin dashboard, and future MageBot chatbot.

## Architecture
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI components
- **Auth**: Supabase Auth (signInWithPassword, signUp) with role-based access (ADMIN/PATIENT)
- **Database**: Supabase (PostgreSQL) with RLS policies
- **Route Protection**: Middleware using @supabase/ssr with role-based routing

## Database (Supabase)
Migrations in `supabase/migrations/` (10 files). Seed data in `supabase/seed.sql`.
Run SQL via Supabase Dashboard SQL Editor (or use `/setup` page to copy SQL).

### Tables
- `profiles` - Extends auth.users: role (ENUM: ADMIN/PATIENT), full_name, phone, cpf (UNIQUE), date_of_birth, avatar_url, is_active. Auto-created via `handle_new_user()` trigger.
- `appointments` - patient_id (FK profiles), date, start_time, end_time, type (ENUM: FIRST_VISIT/RETURN), status (ENUM: PENDING/CONFIRMED/CANCELLED/COMPLETED/NO_SHOW), notes, return_suggested_date. UNIQUE(date, start_time).
- `schedule_config` - admin_id, day_of_week (0-6), start_time, end_time, slot_duration_min (default 50), break_duration_min (default 10), is_active. UNIQUE(admin_id, day_of_week).
- `blocked_slots` - admin_id, date, start_time, end_time, all_day, reason.
- `testimonials` - patient_id, content, rating (1-5), is_approved.
- `site_content` - section, title, content (JSONB), is_active, sort_order. Stores service definitions, hero content, about, contact info.
- `notifications` - user_id, type (ENUM), title, message, is_read, appointment_id.
- `chatbot_sessions` - user_id, session_token, current_state, context (JSONB), messages (JSONB[]).

### RLS Policies
- Patients see only their own data (profiles, appointments, notifications)
- Admin (is_admin() helper function) sees everything
- site_content (active) and testimonials (approved) are public
- schedule_config and blocked_slots visible to authenticated users
- Chatbot sessions: public create, owner read/update

### Enums
user_role, appointment_type, appointment_status, notification_type

## Pages (Next.js App Router)
- `/` - Landing page (hero, about, services from site_content, testimonials, contact)
- `/agendar` - Multi-step booking (service > date/time from schedule_config > patient info > confirmation)
- `/login` - Login with email/password, role-based redirect (ADMIN→/admin, PATIENT→/paciente), "Esqueci minha senha" link
- `/register` - Registration with full_name, email, phone, CPF (formatted/validated), date_of_birth, password + confirmation
- `/cadastro` - Redirects to /register (backward compat)
- `/forgot-password` - Password recovery email via Supabase Auth
- `/update-password` - Set new password after reset link (requires valid session/token)
- `/admin` - Admin dashboard (stats, appointment management, role-gated via profiles table)
- `/paciente` - Patient dashboard (own appointments, role-gated)
- `/setup` - Database setup helper (copy SQL for Supabase)

## API Routes
- `GET /api/setup` - Returns combined migration + seed SQL
- `POST /api/appointments` - Server-side booking with validation, double-booking prevention, auto-creates patient profile
- `PATCH /api/appointments/[id]` - Admin-only status update with role verification

## Key Files
- `supabase/migrations/` - 10 migration files (enums, tables, RLS)
- `supabase/seed.sql` - Initial site_content and testimonials
- `src/lib/types/database.ts` - Full TypeScript types for all tables, inserts, updates, and Database interface
- `src/lib/types/index.ts` - Re-exports from database.ts
- `src/lib/supabase/client.ts` - Typed browser Supabase client
- `src/lib/supabase/server.ts` - Typed server Supabase client + service role client
- `src/lib/supabase/middleware.ts` - Auth + role-based routing middleware (checks profiles table for role)
- `src/hooks/useAuth.ts` - Client-side auth hook (user, profile, role, loading, signOut)
- `src/components/ui/` - Shadcn UI components
- `src/components/site/` - Landing page sections

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key

## Theme
Green primary (hue 142), health/nutrition focused. Fonts: Plus Jakarta Sans (sans), Playfair Display (serif).

## Port
Runs on port 5000 (required for Replit webview).

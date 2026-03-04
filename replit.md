# Renan Martins Nutricionista

## Overview
Platform for nutritionist Renan Martins with appointment scheduling, institutional website, admin dashboard, and future MageBot chatbot.

## Architecture
- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI components
- **Auth**: Supabase Auth (signInWithPassword, signUp) with role-based access (ADMIN/PATIENT)
- **Database**: Supabase (PostgreSQL) with RLS policies
- **Route Protection**: Middleware using @supabase/ssr with role-based routing

## Design
- **Style**: Clean, minimal, neutral tones (neutral-900/500/400 palette). Inspired by modern SaaS landing pages.
- **Hero**: Full-screen background image with white overlay, bold centered text, rounded pill buttons (outline + dark filled).
- **Sections**: Light backgrounds (white/neutral-50), minimal borders, generous whitespace.
- **Buttons**: Rounded-full pill style, neutral-900 bg for primary, outline for secondary.
- **Fonts**: Plus Jakarta Sans (sans-serif body). No serif font used in redesign.
- **Colors**: Primary green (hue 142) for theme variables, but landing page uses neutral palette for cleaner look.

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
- `/` - Clean landing page (hero with bg image, about, services grid, testimonials, contact, footer)
- `/agendar` - 3-step booking: Data e Horário → Seus Dados → Confirmação (no service selection step)
- `/agenda` - Public calendar showing availability per day (available/limited/unavailable) without patient data
- `/login` - Login with email/password, role-based redirect (ADMIN→/admin, PATIENT→/paciente)
- `/register` - Registration with full_name, email, phone, CPF (formatted/validated), date_of_birth, password
- `/cadastro` - Redirects to /register
- `/forgot-password` - Password recovery email via Supabase Auth
- `/update-password` - Set new password after reset link
- `/admin` - Admin dashboard (role-gated)
- `/paciente` - Patient dashboard (role-gated)
- `/setup` - Database setup helper (copy SQL for Supabase)

## API Routes
- `GET /api/setup` - Returns combined migration + seed SQL
- `POST /api/appointments` - Server-side booking with validation, double-booking prevention
- `PATCH /api/appointments/[id]` - Admin-only status update

## Key Files
- `supabase/migrations/` - 10 migration files (enums, tables, RLS)
- `supabase/seed.sql` - Initial site_content and testimonials
- `src/lib/types/database.ts` - Full TypeScript types
- `src/lib/supabase/client.ts` - Typed browser Supabase client
- `src/lib/supabase/server.ts` - Typed server Supabase client
- `src/lib/supabase/middleware.ts` - Auth + role-based routing middleware
- `src/hooks/useAuth.ts` - Client-side auth hook
- `src/components/site/` - Landing page sections (clean/minimal design)

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key

## Port
Runs on port 5000 (required for Replit webview).

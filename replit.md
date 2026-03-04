# Renan Martins Nutricionista

## Overview
Platform for nutritionist Renan Martins with appointment scheduling, institutional website, admin dashboard, MageBot chatbot, and patient area.

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
Versioned SQL scripts in `/db` folder (11 migration files + seed). Also mirrored in `supabase/migrations/`.
Run SQL via Supabase Dashboard SQL Editor (or use `/api/setup` to get combined SQL).
Admin user: admin@admin.com / 123456 (created via `/api/seed-admin` POST endpoint).

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
- `/admin` - Admin dashboard with sidebar layout (role-gated)
- `/admin/agenda` - Full agenda: daily/weekly/monthly views, color-coded by status, appointment actions
- `/admin/pacientes` - Patient list with search by name/CPF, pagination
- `/admin/pacientes/[id]` - Individual patient profile + appointment history
- `/admin/disponibilidade` - Schedule config per weekday + blocked slots management
- `/admin/site` - Site content editor + testimonials management (approve/reject)
- `/paciente` - Single-page patient panel: booking card, upcoming appointments (with cancel), return suggestions, appointment history
- `/paciente/agendar` - 4-step booking wizard: Tipo → Data → Horário → Confirmação
- `/setup` - Database setup helper (copy SQL for Supabase)

## Admin Dashboard
- Layout: fixed sidebar (desktop) / sheet drawer (mobile) with nav items
- Header: page title, notification bell with real-time count, Renan's name
- Sidebar items: Dashboard, Agenda, Pacientes, Disponibilidade
- Uses Supabase Realtime for live appointment and notification updates
- Color coding: blue=confirmed, yellow=pending, red=cancelled, green=completed, gray=no-show

## Patient Area
- Layout: simple top header (no sidebar) with Team Mago logo, user name, logout button
- Single page: booking card, upcoming appointments (with cancel), return suggestions per completed first visit, appointment history
- Business rules:
  - 24h minimum advance for booking
  - 12h minimum advance for cancellation
  - Max 1 first visit + 1 return with PENDING/CONFIRMED status per patient
  - Returns only available after a COMPLETED appointment with return_suggested_date set
- Booking wizard: 4-step flow (Tipo → Data → Horário → Confirmação)
- APIs use service role client for database operations, server client for auth
- Auto-creates profile if missing (handles cases where trigger didn't fire)

## MageBot Chatbot
- Floating widget (bottom-right) on ALL pages via root layout dynamic import
- State machine engine: GREETING → MENU → AUTH_CHECK → SELECT_TYPE → SELECT_DATE → VALIDATE_DATE → SHOW_SLOTS → CONFIRM → BOOKING → ANYTHING_ELSE → FAREWELL
- PT-BR date parser: handles "amanha", "proxima segunda", "dia 15", "15/03", "15 de marco", etc.
- Conversational booking flow: checks auth → selects type → parses date → fetches slots → confirms → books via /api/patient/book
- Menu options: Agendar consulta, Ver agendamentos, Servicos, Contato
- Session persistence: sessionStorage for guests
- Files: src/lib/chatbot/ (engine.ts, dateParser.ts, types.ts), src/hooks/useMageBot.ts, src/components/chatbot/ (MageBotWidget.tsx, ChatWindow.tsx, MageBotLoader.tsx)

## Auth Pages Design
All auth pages (login, register, forgot-password, update-password) use split-screen layout:
- Left half: Team Mago logo (hidden on mobile) on dark neutral-900 background
- Right half: Clean form on white background with neutral palette
- Pill buttons (rounded-full, bg-neutral-900), neutral-200 borders on inputs
- Admin sidebar also shows Team Mago logo (small, rounded)

## API Routes
- `GET /api/setup` - Returns combined SQL from /db folder
- `POST /api/seed-admin` - Creates admin user (admin@admin.com / 123456) + seeds schedule_config defaults
- `GET /api/available-slots?date=YYYY-MM-DD` - Public API returning available time slots (bypasses RLS via service role)
- `POST /api/appointments` - Server-side booking with validation, double-booking prevention
- `PATCH /api/appointments/[id]` - Admin-only status update
- `POST /api/patient/book` - Authenticated patient booking (24h advance, max 1+1, return requires completed)
- `POST /api/patient/cancel` - Authenticated patient cancellation (12h advance)

## Key Files
- `db/` - Versioned SQL scripts (00001-00011 + seed.sql + README.md)
- `supabase/migrations/` - 10 migration files (enums, tables, RLS)
- `supabase/seed.sql` - Initial site_content and testimonials
- `src/lib/types/database.ts` - Full TypeScript types
- `src/lib/supabase/client.ts` - Typed browser Supabase client
- `src/lib/supabase/server.ts` - Typed server Supabase client
- `src/lib/supabase/middleware.ts` - Auth + role-based routing middleware
- `src/hooks/useAuth.ts` - Client-side auth hook
- `src/hooks/useAvailableSlots.ts` - Hook to fetch available time slots for a date
- `src/hooks/useMageBot.ts` - MageBot conversation state management hook
- `src/lib/chatbot/engine.ts` - MageBot state machine engine
- `src/lib/chatbot/dateParser.ts` - PT-BR date parser
- `src/lib/chatbot/types.ts` - Chatbot shared types
- `src/components/chatbot/` - MageBot widget, chat window, loader
- `src/components/site/` - Landing page sections (clean/minimal design)

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key

## Port
Runs on port 5000 (required for Replit webview).

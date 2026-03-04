# Renan Martins Nutricionista

## Overview
Platform for nutritionist Renan Martins with appointment scheduling, institutional website, and admin dashboard.

## Architecture
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI components
- **Auth**: Supabase Auth (signInWithPassword, signUp)
- **Database**: Supabase (PostgreSQL) - tables: services, time_slots, appointments, profiles
- **Route Protection**: Middleware using @supabase/ssr

## Database (Supabase)
Tables created via SQL in Supabase Dashboard (see /api/setup for SQL):
- `services` - Consultation types (name, description, duration_minutes, price in cents, icon, is_active)
- `time_slots` - Weekly available slots (day_of_week 0-6, start_time, end_time, is_active)
- `appointments` - Booked appointments (service_id, date, start/end_time, status, patient info)
- `profiles` - User profiles linked to Supabase Auth (id, email, name, phone, role)

RLS policies: services/time_slots readable by all, appointments insertable by all, viewable/updatable by authenticated users.

## Pages (Next.js App Router)
- `/` - Landing page (hero, about, services, testimonials, contact)
- `/agendar` - Multi-step booking flow (service > date/time > patient info > confirmation)
- `/login` - Login page (Supabase Auth)
- `/cadastro` - Patient registration page
- `/admin` - Admin dashboard (stats, appointment management with tabs: today/upcoming/all)
- `/paciente` - Patient dashboard (view own appointments)
- `/setup` - Database setup helper page

## Key Files
- `src/app/page.tsx` - Landing page
- `src/app/(auth)/login/page.tsx` - Login
- `src/app/(auth)/cadastro/page.tsx` - Registration
- `src/app/(public)/agendar/page.tsx` - Booking flow
- `src/app/(dashboard)/admin/page.tsx` - Admin dashboard
- `src/app/(dashboard)/paciente/page.tsx` - Patient dashboard
- `src/app/api/setup/route.ts` - Database setup API (GET for SQL, POST to attempt auto-setup)
- `src/app/api/seed/route.ts` - Seed data API
- `src/lib/supabase/client.ts` - Browser Supabase client
- `src/lib/supabase/server.ts` - Server Supabase client
- `src/lib/supabase/middleware.ts` - Auth middleware helper
- `src/middleware.ts` - Next.js middleware (route protection)
- `src/lib/types/index.ts` - TypeScript types
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

# Renan Martins Nutricionista

## Overview
Platform for nutritionist Renan Martins with appointment scheduling, institutional website, and admin dashboard.

## Architecture
- **Frontend**: React + Vite + Tailwind CSS + Shadcn/UI + wouter (routing)
- **Backend**: Express.js + PostgreSQL + Drizzle ORM
- **Auth**: Passport.js with local strategy + express-session (pg-backed)

## Database
PostgreSQL via Drizzle ORM. Tables:
- `users` - Admin and patient accounts (role enum: admin/patient)
- `services` - Consultation types (name, description, duration, price)
- `time_slots` - Weekly available time slots (day_of_week, start/end time)
- `appointments` - Booked appointments with status tracking

## Pages
- `/` - Landing page (hero, about, services, testimonials, contact)
- `/agendar` - Multi-step booking flow (service > date/time > patient info > confirmation)
- `/admin/login` - Admin login
- `/admin` - Admin dashboard (stats, appointment management with tabs)

## Key Files
- `shared/schema.ts` - Drizzle schema + Zod validation
- `server/routes.ts` - API routes
- `server/auth.ts` - Passport authentication setup
- `server/storage.ts` - Database storage interface
- `server/seed.ts` - Seeds admin user, services, time slots
- `server/db.ts` - Database connection

## Admin Credentials
- Username: `admin`
- Password: `admin123`

## API Endpoints
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Current user
- `GET /api/services` - List services (public)
- `GET /api/time-slots` - List available time slots (public)
- `GET /api/appointments/booked/:date` - Get booked slots for date (public)
- `POST /api/appointments` - Create appointment (public)
- `GET /api/appointments` - List all appointments (admin)
- `PATCH /api/appointments/:id` - Update appointment status (admin)

## Theme
Green-based color scheme (hue 142) suited for health/nutrition. Fonts: Plus Jakarta Sans (sans), Playfair Display (serif).

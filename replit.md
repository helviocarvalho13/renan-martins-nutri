# Renan Martins Nutricionista

## Overview
This project is a comprehensive platform for nutritionist Renan Martins. It streamlines operations by offering an institutional website, a patient area, an admin dashboard for managing appointments and content, and an intelligent chatbot for scheduling. The primary goal is to enhance patient engagement, simplify appointment booking, and provide Renan Martins with robust tools for practice management. The platform aims to be a leading digital solution in the nutrition sector, focusing on user-friendly interfaces and efficient backend processes.

## User Preferences
I prefer simple language and direct instructions. I want iterative development with frequent, small updates rather than large, infrequent ones. Always ask for my approval before making any significant changes to the database schema or core business logic. I value detailed explanations for complex technical decisions but prefer concise updates for routine progress.

## System Architecture
The platform is built using Next.js 16 with the App Router and TypeScript, ensuring a modern, scalable, and type-safe application. Styling is managed with Tailwind CSS and Shadcn/UI components for a consistent and responsive design. Authentication and database management are handled by Supabase, utilizing its Auth service for user authentication with role-based access (ADMIN/PATIENT) and PostgreSQL for data storage, protected by Row Level Security (RLS) policies. Route protection is implemented via Next.js middleware using `@supabase/ssr`.

The UI/UX adheres to a clean, minimal design aesthetic with a neutral color palette (neutral-900/500/400) and Plus Jakarta Sans font, inspired by modern SaaS landing pages. Key design elements include full-screen hero sections with subtle overlays, generous whitespace, and rounded pill-style buttons.

Core features include:
- **Appointment Scheduling**: A 3-step booking wizard for patients and comprehensive daily/weekly/monthly views for admins.
- **Admin Dashboard**: Gated access for managing patients, schedules, site content, and testimonials. Features real-time updates via Supabase Realtime.
- **Patient Area**: A personalized panel for patients to manage bookings, view upcoming appointments, and access their history.
- **Team Mago Chatbot**: A floating widget that facilitates in-chat appointment booking, including an in-chat login flow.
- **Notification System**: In-app notifications, email (via Resend API), and WhatsApp (via Twilio API) for various appointment lifecycle events and reminders.
- **Google Calendar Integration**: Automatic event creation and management for appointments.
- **SEO & Accessibility**: Comprehensive meta tags, SVG favicons, skip-to-content links, ARIA labels, and full responsiveness across devices.
- **Error Handling & Loading States**: Robust error handling with toast notifications and skeleton screens for a smooth user experience.

## External Dependencies
- **Supabase**: Used for authentication (Auth), database (PostgreSQL), and real-time functionalities.
- **Resend API**: For sending professional HTML email notifications.
- **Twilio API**: For sending WhatsApp notifications, including appointment confirmations.
- **Google Calendar API**: Integrated via Replit Google Calendar Connector for managing calendar events related to appointments.

## Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `RESEND_API_KEY` - (Optional) Resend API key for email notifications
- `TWILIO_ACCOUNT_SID` - (Optional) Twilio Account SID for WhatsApp notifications
- `TWILIO_AUTH_TOKEN` - (Optional) Twilio Auth Token for WhatsApp notifications
- `TWILIO_WHATSAPP_FROM` - (Optional) Twilio WhatsApp sender number (e.g. +14155238886 for sandbox, or whatsapp:+14155238886)
- `CRON_SECRET` - (Optional) Secret for cron endpoint authentication
- `REPLIT_CONNECTORS_HOSTNAME` - (Auto) Replit connector host for Google Calendar OAuth
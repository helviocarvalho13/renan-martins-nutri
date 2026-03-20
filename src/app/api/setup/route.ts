import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message:
      "This project uses Replit PostgreSQL with Drizzle ORM. The database schema is managed via Drizzle migrations. Run `npm run db:push` to sync the schema, or use the seed endpoint at /api/seed-admin to initialize the admin account.",
    database: "Replit PostgreSQL (DATABASE_URL environment variable)",
    orm: "Drizzle ORM (src/lib/schema.ts)",
  });
}

export async function POST() {
  return NextResponse.json({
    message:
      "This project uses Replit PostgreSQL with Drizzle ORM. Automatic setup is handled via Drizzle migrations. Run `npm run db:push` to sync the schema.",
    database: "Replit PostgreSQL (DATABASE_URL environment variable)",
    orm: "Drizzle ORM (src/lib/schema.ts)",
  });
}

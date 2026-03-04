import { NextResponse } from "next/server";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

function loadMigrations(): string {
  const migrationsDir = join(process.cwd(), "supabase", "migrations");
  try {
    const files = readdirSync(migrationsDir)
      .filter((f) => f.endsWith(".sql"))
      .sort();
    return files
      .map((f) => {
        const content = readFileSync(join(migrationsDir, f), "utf-8");
        return `-- ========================================\n-- ${f}\n-- ========================================\n${content}`;
      })
      .join("\n\n");
  } catch {
    return "";
  }
}

function loadSeed(): string {
  try {
    return readFileSync(join(process.cwd(), "supabase", "seed.sql"), "utf-8");
  } catch {
    return "";
  }
}

export async function GET() {
  const migrations = loadMigrations();
  const seed = loadSeed();
  const fullSql = `${migrations}\n\n-- ========================================\n-- SEED DATA\n-- ========================================\n${seed}`;

  return NextResponse.json({
    instructions:
      "Copy the SQL below and run it in your Supabase SQL Editor (Dashboard > SQL Editor > New Query).",
    sql: fullSql,
  });
}

export async function POST() {
  return NextResponse.json({
    instructions:
      "Automatic setup is not supported. Please copy the SQL from GET /api/setup and run it in the Supabase SQL Editor.",
    sql_endpoint: "/api/setup",
  });
}

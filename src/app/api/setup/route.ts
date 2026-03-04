import { NextResponse } from "next/server";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

function loadScripts(dir: string): string {
  try {
    const files = readdirSync(dir)
      .filter((f) => f.endsWith(".sql"))
      .sort();
    return files
      .map((f) => {
        const content = readFileSync(join(dir, f), "utf-8");
        return `-- ========================================\n-- ${f}\n-- ========================================\n${content}`;
      })
      .join("\n\n");
  } catch {
    return "";
  }
}

export async function GET() {
  const dbDir = join(process.cwd(), "db");
  const allScripts = loadScripts(dbDir);

  return NextResponse.json({
    instructions:
      "Copy the SQL below and run it in your Supabase SQL Editor (Dashboard > SQL Editor > New Query). Execute in order.",
    sql: allScripts,
  });
}

export async function POST() {
  return NextResponse.json({
    instructions:
      "Automatic setup is not supported. Please copy the SQL from GET /api/setup and run it in the Supabase SQL Editor.",
    sql_endpoint: "/api/setup",
  });
}

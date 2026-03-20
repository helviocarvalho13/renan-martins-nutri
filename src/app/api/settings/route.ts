import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteContent } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";

export async function GET() {
  const rows = await db
    .select()
    .from(siteContent)
    .where(eq(siteContent.section, "settings"));
  return NextResponse.json({ settings: rows });
}

export async function PUT(request: Request) {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (currentUser.role !== "ADMIN") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const body = await request.json();
  const { section, title, content } = body as {
    section: string;
    title: string;
    content: Record<string, unknown>;
  };

  if (!section || content === undefined) {
    return NextResponse.json({ error: "section e content são obrigatórios" }, { status: 400 });
  }

  const existing = await db
    .select({ id: siteContent.id })
    .from(siteContent)
    .where(and(eq(siteContent.section, section), eq(siteContent.title, title || "")))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(siteContent)
      .set({ content, updatedAt: new Date() })
      .where(eq(siteContent.id, existing[0].id));
  } else {
    await db.insert(siteContent).values({ section, title: title || "", content });
  }

  return NextResponse.json({ success: true });
}

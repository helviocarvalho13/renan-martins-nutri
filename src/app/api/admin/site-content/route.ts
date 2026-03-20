import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteContent } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";

export async function GET() {
  const rows = await db.select().from(siteContent).orderBy(siteContent.sortOrder);
  const mapped = rows.map((r) => ({
    id: r.id,
    section: r.section,
    title: r.title,
    content: r.content,
    is_active: r.isActive,
    sort_order: r.sortOrder,
  }));
  return NextResponse.json({ content: mapped });
}

export async function PUT(request: NextRequest) {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (currentUser.role !== "ADMIN") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const body = await request.json();
  const { id, content } = body as { id: string; content: unknown };

  if (!id) return NextResponse.json({ error: "id é obrigatório" }, { status: 400 });

  await db.update(siteContent).set({ content, updatedAt: new Date() }).where(eq(siteContent.id, id));
  return NextResponse.json({ success: true });
}

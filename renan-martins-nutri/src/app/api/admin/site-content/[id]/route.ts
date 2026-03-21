import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteContent } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (currentUser.role !== "ADMIN") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const { id } = await params;
  const body = await request.json() as { content: unknown };

  await db.update(siteContent)
    .set({ content: body.content, updatedAt: new Date() })
    .where(eq(siteContent.id, id));

  return NextResponse.json({ success: true });
}

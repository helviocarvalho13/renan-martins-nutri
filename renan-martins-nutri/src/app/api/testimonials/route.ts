import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";

export async function GET() {
  const rows = await db
    .select({
      id: testimonials.id,
      content: testimonials.content,
      rating: testimonials.rating,
      created_at: testimonials.createdAt,
    })
    .from(testimonials)
    .where(eq(testimonials.isApproved, true))
    .orderBy(testimonials.createdAt);

  return NextResponse.json({ testimonials: rows });
}

export async function POST(request: Request) {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const body = await request.json();
  const { content, rating } = body as { content: string; rating?: number };

  if (!content?.trim()) {
    return NextResponse.json({ error: "Depoimento não pode ser vazio" }, { status: 400 });
  }

  await db.insert(testimonials).values({
    patientId: currentUser.id,
    content: content.trim(),
    rating: rating ?? 5,
    isApproved: false,
  });

  return NextResponse.json({ success: true, message: "Depoimento enviado para aprovação." }, { status: 201 });
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials, user } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";

export async function GET() {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (currentUser.role !== "ADMIN") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const rows = await db
    .select({
      id: testimonials.id,
      content: testimonials.content,
      rating: testimonials.rating,
      is_approved: testimonials.isApproved,
      created_at: testimonials.createdAt,
      patient_id: testimonials.patientId,
      patient_name: user.name,
    })
    .from(testimonials)
    .leftJoin(user, eq(testimonials.patientId, user.id))
    .orderBy(testimonials.createdAt);

  const mapped = rows.map((r) => ({
    ...r,
    profiles: r.patient_name ? { full_name: r.patient_name } : null,
  }));
  return NextResponse.json({ testimonials: mapped });
}

export async function PATCH(request: NextRequest) {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (currentUser.role !== "ADMIN") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const body = await request.json();
  const { id, is_approved } = body as { id: string; is_approved: boolean };

  if (!id) return NextResponse.json({ error: "id é obrigatório" }, { status: 400 });

  await db.update(testimonials).set({ isApproved: is_approved }).where(eq(testimonials.id, id));
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (currentUser.role !== "ADMIN") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const body = await request.json();
  const { id } = body as { id: string };
  if (!id) return NextResponse.json({ error: "id é obrigatório" }, { status: 400 });

  await db.delete(testimonials).where(eq(testimonials.id, id));
  return NextResponse.json({ success: true });
}

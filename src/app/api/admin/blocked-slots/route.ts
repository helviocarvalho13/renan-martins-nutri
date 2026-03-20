import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blockedSlots } from "@/lib/schema";
import { eq, and, gte } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";

export async function GET(request: NextRequest) {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (currentUser.role !== "ADMIN") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from") || new Date().toISOString().split("T")[0];

  const rows = await db
    .select()
    .from(blockedSlots)
    .where(and(eq(blockedSlots.adminId, currentUser.id), gte(blockedSlots.date, from)));

  const mapped = rows.map((r) => ({
    id: r.id,
    admin_id: r.adminId,
    date: r.date,
    start_time: r.startTime,
    end_time: r.endTime,
    all_day: r.allDay,
    reason: r.reason,
  }));

  return NextResponse.json({ blocked_slots: mapped });
}

export async function POST(request: Request) {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (currentUser.role !== "ADMIN") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const body = await request.json();
  const { date, start_time, end_time, all_day, reason } = body as {
    date: string;
    start_time?: string;
    end_time?: string;
    all_day?: boolean;
    reason?: string;
  };

  if (!date) return NextResponse.json({ error: "date é obrigatório" }, { status: 400 });

  const [slot] = await db
    .insert(blockedSlots)
    .values({
      adminId: currentUser.id,
      date,
      startTime: start_time || null,
      endTime: end_time || null,
      allDay: all_day ?? false,
      reason: reason || null,
    })
    .returning();

  return NextResponse.json({
    blocked_slot: {
      id: slot.id,
      date: slot.date,
      start_time: slot.startTime,
      end_time: slot.endTime,
      all_day: slot.allDay,
      reason: slot.reason,
    },
  }, { status: 201 });
}

export async function DELETE(request: Request) {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (currentUser.role !== "ADMIN") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const body = await request.json();
  const { id } = body as { id: string };
  if (!id) return NextResponse.json({ error: "id é obrigatório" }, { status: 400 });

  await db.delete(blockedSlots).where(and(eq(blockedSlots.id, id), eq(blockedSlots.adminId, currentUser.id)));
  return NextResponse.json({ success: true });
}

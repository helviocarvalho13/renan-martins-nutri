import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { scheduleConfig } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";

export async function GET() {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (currentUser.role !== "ADMIN") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const rows = await db.select().from(scheduleConfig).where(eq(scheduleConfig.adminId, currentUser.id));

  const mapped = rows.map((r) => ({
    id: r.id,
    admin_id: r.adminId,
    day_of_week: r.dayOfWeek,
    start_time: r.startTime,
    end_time: r.endTime,
    slot_duration_min: r.slotDurationMin,
    break_duration_min: r.breakDurationMin,
    is_active: r.isActive,
  }));

  return NextResponse.json({ configs: mapped });
}

export async function PUT(request: Request) {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (currentUser.role !== "ADMIN") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const body = await request.json();
  const { day_of_week, start_time, end_time, slot_duration_min, break_duration_min, is_active } = body as {
    day_of_week: number;
    start_time: string;
    end_time: string;
    slot_duration_min: number;
    break_duration_min: number;
    is_active: boolean;
  };

  const existing = await db
    .select({ id: scheduleConfig.id })
    .from(scheduleConfig)
    .where(and(eq(scheduleConfig.adminId, currentUser.id), eq(scheduleConfig.dayOfWeek, day_of_week)))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(scheduleConfig)
      .set({ startTime: start_time, endTime: end_time, slotDurationMin: slot_duration_min, breakDurationMin: break_duration_min, isActive: is_active })
      .where(eq(scheduleConfig.id, existing[0].id));
  } else {
    await db.insert(scheduleConfig).values({
      adminId: currentUser.id,
      dayOfWeek: day_of_week,
      startTime: start_time,
      endTime: end_time,
      slotDurationMin: slot_duration_min,
      breakDurationMin: break_duration_min,
      isActive: is_active,
    });
  }

  return NextResponse.json({ success: true });
}

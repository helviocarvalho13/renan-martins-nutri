import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { scheduleConfig, blockedSlots, appointments } from "@/lib/schema";
import { eq, and, gte, lte, inArray } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const [schedRows, blockedRows, apptRows] = await Promise.all([
    db.select({
      day_of_week: scheduleConfig.dayOfWeek,
      start_time: scheduleConfig.startTime,
      end_time: scheduleConfig.endTime,
      slot_duration_min: scheduleConfig.slotDurationMin,
      break_duration_min: scheduleConfig.breakDurationMin,
      is_active: scheduleConfig.isActive,
    }).from(scheduleConfig).where(eq(scheduleConfig.isActive, true)),

    from && to
      ? db.select({
          date: blockedSlots.date,
          start_time: blockedSlots.startTime,
          end_time: blockedSlots.endTime,
          all_day: blockedSlots.allDay,
        }).from(blockedSlots).where(and(gte(blockedSlots.date, from), lte(blockedSlots.date, to)))
      : Promise.resolve([]),

    from && to
      ? db.select({ date: appointments.date }).from(appointments)
          .where(and(
            gte(appointments.date, from),
            lte(appointments.date, to),
            inArray(appointments.status, ["PENDING", "CONFIRMED"]),
          ))
      : Promise.resolve([]),
  ]);

  const appointmentCounts: Record<string, number> = {};
  apptRows.forEach((a) => {
    appointmentCounts[a.date] = (appointmentCounts[a.date] || 0) + 1;
  });

  return NextResponse.json({
    schedule: schedRows,
    blocked_slots: blockedRows,
    appointment_counts: appointmentCounts,
  });
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { scheduleConfig, appointments, blockedSlots } from "@/lib/schema";
import { eq, and, inArray } from "drizzle-orm";

interface GeneratedSlot {
  start_time: string;
  end_time: string;
}

function generateSlots(config: {
  start_time: string;
  end_time: string;
  slot_duration_min: number;
  break_duration_min: number;
}): GeneratedSlot[] {
  const slots: GeneratedSlot[] = [];
  const [startH, startM] = config.start_time.split(":").map(Number);
  const [endH, endM] = config.end_time.split(":").map(Number);
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;
  const totalSlotMinutes = config.slot_duration_min + config.break_duration_min;

  let current = startMinutes;
  while (current + config.slot_duration_min <= endMinutes) {
    const slotEnd = current + config.slot_duration_min;
    const sh = Math.floor(current / 60);
    const sm = current % 60;
    const eh = Math.floor(slotEnd / 60);
    const em = slotEnd % 60;
    slots.push({
      start_time: `${String(sh).padStart(2, "0")}:${String(sm).padStart(2, "0")}:00`,
      end_time: `${String(eh).padStart(2, "0")}:${String(em).padStart(2, "0")}:00`,
    });
    current += totalSlotMinutes;
  }
  return slots;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "date parameter required" }, { status: 400 });
  }

  const dateObj = new Date(date + "T12:00:00");
  const dayOfWeek = dateObj.getDay();

  const configs = await db
    .select()
    .from(scheduleConfig)
    .where(and(eq(scheduleConfig.dayOfWeek, dayOfWeek), eq(scheduleConfig.isActive, true)));

  if (configs.length === 0) {
    return NextResponse.json({ slots: [] });
  }

  const config = configs[0];
  const generated = generateSlots({
    start_time: config.startTime,
    end_time: config.endTime,
    slot_duration_min: config.slotDurationMin,
    break_duration_min: config.breakDurationMin,
  });

  const [appts, blocked] = await Promise.all([
    db
      .select({ startTime: appointments.startTime })
      .from(appointments)
      .where(and(eq(appointments.date, date), inArray(appointments.status, ["PENDING", "CONFIRMED"]))),
    db
      .select()
      .from(blockedSlots)
      .where(eq(blockedSlots.date, date)),
  ]);

  const bookedTimes = appts.map((a) => a.startTime);

  const available = generated.filter((slot) => {
    if (bookedTimes.includes(slot.start_time)) return false;
    for (const b of blocked) {
      if (b.allDay) return false;
      if (b.startTime && b.endTime) {
        if (slot.start_time >= b.startTime && slot.start_time < b.endTime) return false;
      }
    }
    return true;
  });

  return NextResponse.json({ slots: available });
}

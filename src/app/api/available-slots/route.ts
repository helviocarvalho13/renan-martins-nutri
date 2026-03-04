import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

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

  const supabase = createServiceRoleClient();

  const { data: configs } = await supabase
    .from("schedule_config")
    .select("*")
    .eq("day_of_week", dayOfWeek)
    .eq("is_active", true);

  if (!configs || configs.length === 0) {
    return NextResponse.json({ slots: [] });
  }

  const config = configs[0];
  const generated = generateSlots(config);

  const [apptRes, blockedRes] = await Promise.all([
    supabase
      .from("appointments")
      .select("start_time")
      .eq("date", date)
      .in("status", ["PENDING", "CONFIRMED"]),
    supabase
      .from("blocked_slots")
      .select("*")
      .eq("date", date),
  ]);

  const bookedTimes = (apptRes.data || []).map((d) => d.start_time);
  const blockedSlots = blockedRes.data || [];

  const available = generated.filter((slot) => {
    if (bookedTimes.includes(slot.start_time)) return false;
    for (const blocked of blockedSlots) {
      if (blocked.all_day) return false;
      if (blocked.start_time && blocked.end_time) {
        if (slot.start_time >= blocked.start_time && slot.start_time < blocked.end_time) return false;
      }
    }
    return true;
  });

  return NextResponse.json({ slots: available });
}

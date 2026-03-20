import { db } from "@/lib/db";
import { scheduleConfig, blockedSlots } from "@/lib/schema";
import { eq, and, gte } from "drizzle-orm";

export async function getScheduleConfig(adminId: string) {
  return db
    .select()
    .from(scheduleConfig)
    .where(eq(scheduleConfig.adminId, adminId))
    .orderBy(scheduleConfig.dayOfWeek);
}

export async function getScheduleConfigForDay(adminId: string, dayOfWeek: number) {
  const rows = await db
    .select()
    .from(scheduleConfig)
    .where(
      and(
        eq(scheduleConfig.adminId, adminId),
        eq(scheduleConfig.dayOfWeek, dayOfWeek),
        eq(scheduleConfig.isActive, true)
      )
    )
    .limit(1);
  return rows[0] ?? null;
}

export async function getBlockedSlots(adminId: string, fromDate?: string) {
  const conditions = [eq(blockedSlots.adminId, adminId)];
  if (fromDate) {
    conditions.push(gte(blockedSlots.date, fromDate));
  }
  return db
    .select()
    .from(blockedSlots)
    .where(and(...conditions))
    .orderBy(blockedSlots.date);
}

export async function getBlockedSlotsForDate(adminId: string, date: string) {
  return db
    .select()
    .from(blockedSlots)
    .where(and(eq(blockedSlots.adminId, adminId), eq(blockedSlots.date, date)));
}

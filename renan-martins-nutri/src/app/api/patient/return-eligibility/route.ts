import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments, siteContent } from "@/lib/schema";
import { eq, and, gte, inArray, desc } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";

export async function GET() {
  const currentUser = await getServerUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  let returnWindowDays = 30;
  try {
    const settingsRows = await db
      .select({ content: siteContent.content })
      .from(siteContent)
      .where(and(eq(siteContent.section, "settings"), eq(siteContent.title, "return_window_days")))
      .limit(1);
    const content = settingsRows[0]?.content as Record<string, number> | undefined;
    if (typeof content?.value === "number" && content.value > 0) {
      returnWindowDays = content.value;
    }
  } catch {}

  const completed = await db
    .select({ id: appointments.id, date: appointments.date, returnSuggestedDate: appointments.returnSuggestedDate })
    .from(appointments)
    .where(
      and(
        eq(appointments.patientId, currentUser.id),
        eq(appointments.status, "COMPLETED")
      )
    )
    .orderBy(desc(appointments.date), desc(appointments.startTime))
    .limit(1);

  if (completed.length === 0) {
    return NextResponse.json({ eligible: false, reason: "no_completed", return_window_days: returnWindowDays });
  }

  const lastCompleted = completed[0];
  const completedDate = new Date(lastCompleted.date + "T12:00:00");
  const daysSinceCompleted = Math.floor((Date.now() - completedDate.getTime()) / (1000 * 60 * 60 * 24));

  if (daysSinceCompleted > returnWindowDays) {
    return NextResponse.json({
      eligible: false,
      reason: "window_expired",
      return_window_days: returnWindowDays,
      days_since_completed: daysSinceCompleted,
    });
  }

  const today = new Date().toISOString().split("T")[0];
  const activeReturns = await db
    .select({ id: appointments.id })
    .from(appointments)
    .where(
      and(
        eq(appointments.patientId, currentUser.id),
        eq(appointments.type, "RETURN"),
        gte(appointments.date, today),
        inArray(appointments.status, ["PENDING", "CONFIRMED"])
      )
    )
    .limit(1);

  if (activeReturns.length > 0) {
    return NextResponse.json({ eligible: false, reason: "active_return_exists", return_window_days: returnWindowDays });
  }

  return NextResponse.json({
    eligible: true,
    return_window_days: returnWindowDays,
    days_remaining: returnWindowDays - daysSinceCompleted,
    return_suggested_date: lastCompleted.returnSuggestedDate,
  });
}

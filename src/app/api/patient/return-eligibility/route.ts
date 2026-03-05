import { NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";

export async function GET() {
  const serverSupabase = await createServerSupabaseClient();
  const { data: { user } } = await serverSupabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const supabase = createServiceRoleClient();

  let returnWindowDays = 30;
  try {
    const { data: settings } = await supabase
      .from("site_content")
      .select("content")
      .eq("section", "settings")
      .eq("title", "return_window")
      .single();
    if (settings?.content?.return_window_days) {
      returnWindowDays = settings.content.return_window_days;
    }
  } catch {}

  const { data: completed } = await supabase
    .from("appointments")
    .select("id, date, return_suggested_date")
    .eq("patient_id", user.id)
    .eq("status", "COMPLETED")
    .order("date", { ascending: false })
    .limit(1);

  if (!completed || completed.length === 0) {
    return NextResponse.json({
      eligible: false,
      reason: "no_completed",
      return_window_days: returnWindowDays,
    });
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
  const { data: activeReturns } = await supabase
    .from("appointments")
    .select("id")
    .eq("patient_id", user.id)
    .eq("type", "RETURN")
    .gte("date", today)
    .in("status", ["PENDING", "CONFIRMED"])
    .limit(1);

  if (activeReturns && activeReturns.length > 0) {
    return NextResponse.json({
      eligible: false,
      reason: "active_return_exists",
      return_window_days: returnWindowDays,
    });
  }

  return NextResponse.json({
    eligible: true,
    return_window_days: returnWindowDays,
    days_remaining: returnWindowDays - daysSinceCompleted,
    return_suggested_date: lastCompleted.return_suggested_date,
  });
}

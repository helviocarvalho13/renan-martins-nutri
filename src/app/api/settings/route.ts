import { NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createServiceRoleClient();

  const { data } = await supabase
    .from("site_content")
    .select("content")
    .eq("section", "settings")
    .eq("title", "return_window")
    .maybeSingle();

  const returnWindowDays = data?.content?.return_window_days ?? 30;

  return NextResponse.json({ return_window_days: returnWindowDays });
}

export async function PUT(request: Request) {
  const serverSupabase = await createServerSupabaseClient();
  const { data: { user } } = await serverSupabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  if (user.user_metadata?.role !== "ADMIN" && user.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  const body = await request.json();
  const { return_window_days } = body;

  if (typeof return_window_days !== "number" || return_window_days < 1 || return_window_days > 365) {
    return NextResponse.json({ error: "Valor inválido (1-365 dias)" }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  const { data: existing } = await supabase
    .from("site_content")
    .select("id")
    .eq("section", "settings")
    .eq("title", "return_window")
    .maybeSingle();

  if (existing) {
    await supabase
      .from("site_content")
      .update({ content: { return_window_days } })
      .eq("id", existing.id);
  } else {
    await supabase.from("site_content").insert({
      section: "settings",
      title: "return_window",
      content: { return_window_days },
      is_active: true,
      sort_order: 0,
    });
  }

  return NextResponse.json({ return_window_days });
}

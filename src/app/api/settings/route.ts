import { NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";

export const DEFAULT_WHATSAPP_TEMPLATE =
  "Olá, {nome}! Sua {tipo} com o nutricionista Renan Martins foi agendada para {data} às {horário}. Aguardamos você!";

async function getSettingsRow(supabase: ReturnType<typeof createServiceRoleClient>, title: string) {
  const { data } = await supabase
    .from("site_content")
    .select("id, content")
    .eq("section", "settings")
    .eq("title", title)
    .maybeSingle();
  return data;
}

async function upsertSettingsRow(
  supabase: ReturnType<typeof createServiceRoleClient>,
  title: string,
  content: Record<string, unknown>
) {
  const existing = await getSettingsRow(supabase, title);
  if (existing) {
    await supabase.from("site_content").update({ content }).eq("id", existing.id);
  } else {
    await supabase.from("site_content").insert({
      section: "settings",
      title,
      content,
      is_active: true,
      sort_order: 0,
    });
  }
}

export async function GET() {
  const supabase = createServiceRoleClient();

  const [returnWindowRow, whatsappRow] = await Promise.all([
    getSettingsRow(supabase, "return_window"),
    getSettingsRow(supabase, "whatsapp_template"),
  ]);

  return NextResponse.json({
    return_window_days: returnWindowRow?.content?.return_window_days ?? 30,
    whatsapp_template: whatsappRow?.content?.template ?? DEFAULT_WHATSAPP_TEMPLATE,
  });
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
  const supabase = createServiceRoleClient();

  if ("return_window_days" in body) {
    const { return_window_days } = body;
    if (typeof return_window_days !== "number" || return_window_days < 1 || return_window_days > 365) {
      return NextResponse.json({ error: "Valor inválido (1-365 dias)" }, { status: 400 });
    }
    await upsertSettingsRow(supabase, "return_window", { return_window_days });
    return NextResponse.json({ return_window_days });
  }

  if ("whatsapp_template" in body) {
    const { whatsapp_template } = body;
    if (typeof whatsapp_template !== "string" || whatsapp_template.trim().length < 10) {
      return NextResponse.json({ error: "Template muito curto (mínimo 10 caracteres)" }, { status: 400 });
    }
    await upsertSettingsRow(supabase, "whatsapp_template", { template: whatsapp_template.trim() });
    return NextResponse.json({ whatsapp_template: whatsapp_template.trim() });
  }

  return NextResponse.json({ error: "Campo não reconhecido" }, { status: 400 });
}

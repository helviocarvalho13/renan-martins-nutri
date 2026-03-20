import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteContent } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";

const SETTINGS_SECTION = "settings";

const KNOWN_KEYS = ["return_window_days", "whatsapp_template"] as const;
type SettingKey = (typeof KNOWN_KEYS)[number];

async function getSettingValue(key: SettingKey) {
  const rows = await db
    .select({ content: siteContent.content })
    .from(siteContent)
    .where(and(eq(siteContent.section, SETTINGS_SECTION), eq(siteContent.title, key)))
    .limit(1);
  const content = rows[0]?.content as Record<string, unknown> | undefined;
  return content?.value;
}

async function upsertSettingValue(key: SettingKey, value: unknown) {
  const existing = await db
    .select({ id: siteContent.id })
    .from(siteContent)
    .where(and(eq(siteContent.section, SETTINGS_SECTION), eq(siteContent.title, key)))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(siteContent)
      .set({ content: { value }, updatedAt: new Date() })
      .where(eq(siteContent.id, existing[0].id));
  } else {
    await db
      .insert(siteContent)
      .values({ section: SETTINGS_SECTION, title: key, content: { value } });
  }
}

export async function GET() {
  const [returnWindowRow, whatsappTemplateRow] = await Promise.all([
    getSettingValue("return_window_days"),
    getSettingValue("whatsapp_template"),
  ]);

  return NextResponse.json({
    return_window_days: typeof returnWindowRow === "number" ? returnWindowRow : 30,
    whatsapp_template:
      typeof whatsappTemplateRow === "string" ? whatsappTemplateRow : null,
  });
}

export async function PUT(request: Request) {
  const currentUser = await getServerUser();
  if (!currentUser)
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (currentUser.role !== "ADMIN")
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const body = await request.json().catch(() => ({}));

  const updates: Partial<Record<SettingKey, unknown>> = {};
  for (const key of KNOWN_KEYS) {
    if (key in body) {
      updates[key] = body[key];
    }
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: "Nenhuma configuração válida fornecida" },
      { status: 400 }
    );
  }

  await Promise.all(
    (Object.entries(updates) as [SettingKey, unknown][]).map(([key, value]) =>
      upsertSettingValue(key, value)
    )
  );

  return NextResponse.json({ success: true });
}

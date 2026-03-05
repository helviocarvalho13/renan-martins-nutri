import { NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const serverSupabase = await createServerSupabaseClient();
  const { data: { user } } = await serverSupabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  if (user.user_metadata?.role !== "ADMIN" && user.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ patients: [] });
  }

  const supabase = createServiceRoleClient();

  const cpfDigits = q.replace(/\D/g, "");
  const isCpfSearch = cpfDigits.length >= 3;

  let query = supabase
    .from("profiles")
    .select("id, full_name, email, phone, cpf")
    .eq("role", "PATIENT")
    .eq("is_active", true)
    .limit(10);

  if (isCpfSearch) {
    query = query.or(`full_name.ilike.%${q}%,cpf.ilike.%${cpfDigits}%`);
  } else {
    query = query.ilike("full_name", `%${q}%`);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "Erro ao buscar pacientes" }, { status: 500 });
  }

  return NextResponse.json({ patients: data || [] });
}

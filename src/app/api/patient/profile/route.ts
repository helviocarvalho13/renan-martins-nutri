import { NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";

export async function GET() {
  const serverClient = await createServerSupabaseClient();
  const { data: { user } } = await serverClient.auth.getUser();
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const supabase = createServiceRoleClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, cpf, date_of_birth")
    .eq("id", user.id)
    .single();

  return NextResponse.json({
    full_name: profile?.full_name || user.user_metadata?.full_name || "",
    phone: profile?.phone || user.user_metadata?.phone || "",
    cpf: profile?.cpf || user.user_metadata?.cpf || "",
    date_of_birth: profile?.date_of_birth || user.user_metadata?.date_of_birth || "",
    email: user.email || "",
  });
}

export async function PUT(request: Request) {
  const serverClient = await createServerSupabaseClient();
  const { data: { user } } = await serverClient.auth.getUser();
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const body = await request.json();
  const { full_name, phone, cpf, date_of_birth, new_password, confirm_password } = body;

  if (!full_name || full_name.trim().split(" ").length < 2) {
    return NextResponse.json({ error: "Informe seu nome completo (nome e sobrenome)." }, { status: 400 });
  }

  const phoneDigits = (phone || "").replace(/\D/g, "");
  if (phoneDigits.length < 10) {
    return NextResponse.json({ error: "Informe um WhatsApp válido com DDD." }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  const profileUpdate: Record<string, string | null> = {
    full_name: full_name.trim(),
    phone: phoneDigits,
    cpf: cpf ? cpf.replace(/\D/g, "") || null : null,
    date_of_birth: date_of_birth || null,
  };

  const { error: profileError } = await supabase
    .from("profiles")
    .update(profileUpdate)
    .eq("id", user.id);

  if (profileError) {
    return NextResponse.json({ error: "Erro ao atualizar perfil." }, { status: 500 });
  }

  await supabase.auth.admin.updateUserById(user.id, {
    user_metadata: {
      ...user.user_metadata,
      full_name: full_name.trim(),
      phone: phoneDigits,
      cpf: cpf ? cpf.replace(/\D/g, "") || null : null,
      date_of_birth: date_of_birth || null,
    },
  });

  if (new_password) {
    if (new_password.length < 6) {
      return NextResponse.json({ error: "A nova senha deve ter pelo menos 6 caracteres." }, { status: 400 });
    }
    if (new_password !== confirm_password) {
      return NextResponse.json({ error: "As senhas não coincidem." }, { status: 400 });
    }
    const { error: pwError } = await supabase.auth.admin.updateUserById(user.id, { password: new_password });
    if (pwError) {
      return NextResponse.json({ error: "Erro ao atualizar senha." }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}

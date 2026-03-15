import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function formatPhone(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11);
}

function validateCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11) return false;
  if (/^(\d)\1+$/.test(digits)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(digits[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  return remainder === parseInt(digits[10]);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { fullName, email, phone, cpf, dateOfBirth, password } = body;

  if (!fullName || !email || !phone || !password) {
    return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
  }

  if (fullName.trim().split(" ").length < 2) {
    return NextResponse.json({ error: "Informe seu nome completo (nome e sobrenome)." }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "A senha deve ter pelo menos 6 caracteres." }, { status: 400 });
  }

  const phoneDigits = formatPhone(phone);
  if (phoneDigits.length < 10) {
    return NextResponse.json({ error: "Informe um número de WhatsApp válido com DDD (mínimo 10 dígitos)." }, { status: 400 });
  }

  const cpfDigits = cpf ? cpf.replace(/\D/g, "") : "";
  if (cpfDigits && !validateCPF(cpf)) {
    return NextResponse.json({ error: "CPF inválido." }, { status: 400 });
  }

  const adminClient = createServiceRoleClient();

  const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
    email: email.trim().toLowerCase(),
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName.trim(),
      phone: phoneDigits,
      cpf: cpfDigits || null,
      date_of_birth: dateOfBirth || null,
      role: "PATIENT",
    },
  });

  if (createError) {
    if (createError.message.includes("already registered") || createError.message.includes("already been registered")) {
      return NextResponse.json({ error: "Este email já está cadastrado. Tente fazer login." }, { status: 409 });
    }
    return NextResponse.json({ error: createError.message }, { status: 400 });
  }

  // Update profile with cpf and date_of_birth (not set by the trigger)
  if (newUser?.user?.id && (cpfDigits || dateOfBirth)) {
    await adminClient
      .from("profiles")
      .update({
        cpf: cpfDigits || null,
        date_of_birth: dateOfBirth || null,
      })
      .eq("id", newUser.user.id);
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        },
      },
    }
  );

  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (signInError || !signInData?.session) {
    return NextResponse.json({ success: true, autoLogin: false });
  }

  return NextResponse.json({ success: true, autoLogin: true, destination: "/paciente" });
}

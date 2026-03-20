import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getUserByEmail, hashPassword, generateId, validateCPF } from "@/lib/auth-helpers";
import { db, user } from "@/lib/db";

function formatPhone(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, cpf, dateOfBirth, password } = body;

    if (!fullName || !email || !phone || !password) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
    }

    if (fullName.trim().split(" ").length < 2) {
      return NextResponse.json(
        { error: "Informe seu nome completo (nome e sobrenome)." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "A senha deve ter pelo menos 6 caracteres." },
        { status: 400 }
      );
    }

    const phoneDigits = formatPhone(phone);
    if (phoneDigits.length < 10) {
      return NextResponse.json(
        { error: "Informe um número de WhatsApp válido com DDD (mínimo 10 dígitos)." },
        { status: 400 }
      );
    }

    const cpfDigits = cpf ? cpf.replace(/\D/g, "") : "";
    if (cpfDigits && !validateCPF(cpf)) {
      return NextResponse.json({ error: "CPF inválido." }, { status: 400 });
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "Este email já está cadastrado. Tente fazer login." },
        { status: 409 }
      );
    }

    const hashed = await hashPassword(password);
    const newUser = await db
      .insert(user)
      .values({
        id: generateId(),
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        password: hashed,
        role: "PATIENT",
        phone: phoneDigits,
        cpf: cpfDigits || null,
        dateOfBirth: dateOfBirth || null,
        isActive: true,
      })
      .returning();

    const createdUser = newUser[0];

    const session = await getSession();
    session.userId = createdUser.id;
    session.email = createdUser.email;
    session.name = createdUser.name;
    session.role = "PATIENT";
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.json({ success: true, autoLogin: true, destination: "/paciente" });
  } catch (err) {
    console.error("[register]", err);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";
import { auth } from "@/lib/auth";

export async function GET() {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  return NextResponse.json({
    full_name: currentUser.name,
    phone: currentUser.phone ?? "",
    cpf: currentUser.cpf ?? "",
    date_of_birth: currentUser.dateOfBirth ?? "",
    email: currentUser.email,
  });
}

export async function PUT(request: Request) {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const body = await request.json();
  const { full_name, phone, cpf, date_of_birth, new_password, confirm_password } = body as {
    full_name?: string;
    phone?: string;
    cpf?: string;
    date_of_birth?: string;
    new_password?: string;
    confirm_password?: string;
  };

  if (!full_name || full_name.trim().split(" ").length < 2) {
    return NextResponse.json({ error: "Informe seu nome completo (nome e sobrenome)." }, { status: 400 });
  }

  const phoneDigits = (phone || "").replace(/\D/g, "");
  if (phoneDigits.length < 10) {
    return NextResponse.json({ error: "Informe um WhatsApp válido com DDD." }, { status: 400 });
  }

  await db
    .update(user)
    .set({
      name: full_name.trim(),
      phone: phoneDigits,
      cpf: cpf ? cpf.replace(/\D/g, "") || null : null,
      dateOfBirth: date_of_birth || null,
      updatedAt: new Date(),
    })
    .where(eq(user.id, currentUser.id));

  if (new_password) {
    if (new_password.length < 6) {
      return NextResponse.json({ error: "A nova senha deve ter pelo menos 6 caracteres." }, { status: 400 });
    }
    if (new_password !== confirm_password) {
      return NextResponse.json({ error: "As senhas não coincidem." }, { status: 400 });
    }
    try {
      await auth.api.changePassword({
        body: { newPassword: new_password, currentPassword: "" },
        headers: new Headers(),
      });
    } catch {
      // changePassword requires current password; use updateUser instead
      const { account } = await import("@/lib/schema");
      const { hashPassword } = await import("better-auth/crypto");
      const hashed = await hashPassword(new_password);
      await db
        .update(account)
        .set({ password: hashed })
        .where(eq(account.userId, currentUser.id));
    }
  }

  return NextResponse.json({ success: true });
}

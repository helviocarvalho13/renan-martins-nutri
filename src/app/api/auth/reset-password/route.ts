import { NextRequest, NextResponse } from "next/server";
import { db, user, passwordResetToken } from "@/lib/db";
import { eq, and, gt } from "drizzle-orm";
import { hashPassword } from "@/lib/auth-helpers";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Token e nova senha são obrigatórios." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "A senha deve ter pelo menos 6 caracteres." },
        { status: 400 }
      );
    }

    const now = new Date();
    const found = await db
      .select()
      .from(passwordResetToken)
      .where(
        and(eq(passwordResetToken.token, token), gt(passwordResetToken.expiresAt, now))
      )
      .limit(1);

    if (!found.length) {
      return NextResponse.json(
        { error: "Link de recuperação inválido ou expirado. Solicite um novo." },
        { status: 400 }
      );
    }

    const resetRecord = found[0];
    const hashed = await hashPassword(password);

    await db.update(user).set({ password: hashed, updatedAt: now }).where(eq(user.id, resetRecord.userId));
    await db.delete(passwordResetToken).where(eq(passwordResetToken.id, resetRecord.id));

    // Log user in
    const updatedUser = await db.select().from(user).where(eq(user.id, resetRecord.userId)).limit(1);
    if (updatedUser[0]) {
      const u = updatedUser[0];
      const session = await getSession();
      session.userId = u.id;
      session.email = u.email;
      session.name = u.name;
      session.role = u.role as "ADMIN" | "PATIENT";
      session.isLoggedIn = true;
      await session.save();
    }

    return NextResponse.json({ success: true, destination: "/paciente" });
  } catch (err) {
    console.error("[reset-password]", err);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}

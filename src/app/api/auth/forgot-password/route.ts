import { NextRequest, NextResponse } from "next/server";
import { db, user, passwordResetToken } from "@/lib/db";
import { eq } from "drizzle-orm";
import { generateToken, generateId } from "@/lib/auth-helpers";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email é obrigatório." }, { status: 400 });
    }

    const found = await db
      .select({ id: user.id, email: user.email, name: user.name })
      .from(user)
      .where(eq(user.email, email.trim().toLowerCase()))
      .limit(1);

    // Always return success to avoid user enumeration
    if (!found.length) {
      return NextResponse.json({ success: true });
    }

    const foundUser = found[0];

    // Delete any existing tokens for this user
    await db.delete(passwordResetToken).where(eq(passwordResetToken.userId, foundUser.id));

    const token = generateToken();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await db.insert(passwordResetToken).values({
      id: generateId(),
      userId: foundUser.id,
      token,
      expiresAt,
    });

    // In production, send email with the reset link
    // For now, log the link for development purposes
    const resetUrl = `${req.nextUrl.origin}/update-password?token=${token}`;
    console.log(`[forgot-password] Reset link for ${foundUser.email}: ${resetUrl}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[forgot-password]", err);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { user, account } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "better-auth/crypto";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-setup-token");
  const expectedToken = process.env.ADMIN_SEED_TOKEN;

  if (!expectedToken || token !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const adminEmail = "renanmartinsnutri@gmail.com";
    const adminPassword = "123456";
    const adminName = "Renan Martins";

    const existing = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.email, adminEmail))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ message: "Admin já cadastrado", id: existing[0].id });
    }

    const userId = nanoid();
    const now = new Date();
    const hashed = await hashPassword(adminPassword);

    await db.insert(user).values({
      id: userId,
      email: adminEmail,
      name: adminName,
      emailVerified: true,
      role: "ADMIN",
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    await db.insert(account).values({
      id: nanoid(),
      userId,
      accountId: userId,
      providerId: "credential",
      password: hashed,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ success: true, message: "Admin cadastrado com sucesso!", id: userId });
  } catch (err) {
    console.error("[setup] Error:", err);
    return NextResponse.json({ error: "Erro interno", detail: String(err) }, { status: 500 });
  }
}

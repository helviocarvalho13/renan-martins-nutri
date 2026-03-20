import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user, account, scheduleConfig } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

const ADMIN_EMAIL = "renanmartinsnutri@gmail.com";
const ADMIN_NAME = "Renan Martins";

const DEFAULT_SCHEDULE = [
  { dayOfWeek: 1, startTime: "08:00:00", endTime: "18:00:00", isActive: true },
  { dayOfWeek: 2, startTime: "08:00:00", endTime: "18:00:00", isActive: true },
  { dayOfWeek: 3, startTime: "08:00:00", endTime: "18:00:00", isActive: true },
  { dayOfWeek: 4, startTime: "08:00:00", endTime: "18:00:00", isActive: true },
  { dayOfWeek: 5, startTime: "08:00:00", endTime: "18:00:00", isActive: true },
  { dayOfWeek: 6, startTime: "08:00:00", endTime: "12:00:00", isActive: true },
  { dayOfWeek: 0, startTime: "08:00:00", endTime: "12:00:00", isActive: false },
];

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const sessionSecret = process.env.SESSION_SECRET;

  if (!sessionSecret || secret !== sessionSecret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
  }

  const adminPassword = searchParams.get("password") || "123456";

  try {
    const existing = await db
      .select()
      .from(user)
      .where(eq(user.email, ADMIN_EMAIL))
      .limit(1);

    let adminId: string;

    if (existing.length > 0) {
      adminId = existing[0].id;
      await db
        .update(user)
        .set({ role: "ADMIN", isActive: true, updatedAt: new Date() })
        .where(eq(user.id, adminId));

      const existingAccount = await db
        .select()
        .from(account)
        .where(eq(account.userId, adminId))
        .limit(1);

      if (existingAccount.length === 0) {
        const signUpResult = await auth.api.signUpEmail({
          body: {
            name: ADMIN_NAME,
            email: `_tmp_${Date.now()}@replace.invalid`,
            password: adminPassword,
          },
        });
        if (signUpResult?.user?.id) {
          const tmpAccount = await db
            .select()
            .from(account)
            .where(eq(account.userId, signUpResult.user.id))
            .limit(1);
          if (tmpAccount.length > 0) {
            await db
              .update(account)
              .set({ userId: adminId, accountId: ADMIN_EMAIL })
              .where(eq(account.id, tmpAccount[0].id));
            await db.delete(user).where(eq(user.id, signUpResult.user.id));
          }
        }
      }
    } else {
      const signUpResult = await auth.api.signUpEmail({
        body: {
          name: ADMIN_NAME,
          email: ADMIN_EMAIL,
          password: adminPassword,
        },
      });

      if (!signUpResult?.user?.id) {
        return NextResponse.json({ error: "Falha ao criar usuário admin." }, { status: 500 });
      }

      adminId = signUpResult.user.id;
      await db
        .update(user)
        .set({ role: "ADMIN", isActive: true, updatedAt: new Date() })
        .where(eq(user.id, adminId));
    }

    const existingSchedule = await db
      .select()
      .from(scheduleConfig)
      .where(eq(scheduleConfig.adminId, adminId))
      .limit(1);

    if (existingSchedule.length === 0) {
      await db.insert(scheduleConfig).values(
        DEFAULT_SCHEDULE.map((s) => ({
          id: randomUUID(),
          adminId,
          dayOfWeek: s.dayOfWeek,
          startTime: s.startTime,
          endTime: s.endTime,
          slotDurationMin: 50,
          breakDurationMin: 10,
          isActive: s.isActive,
        }))
      );
    }

    return NextResponse.json({
      message: `Admin ${existing.length > 0 ? "updated" : "created"} successfully.`,
      adminId,
      email: ADMIN_EMAIL,
    });
  } catch (err) {
    console.error("[seed-admin]", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}

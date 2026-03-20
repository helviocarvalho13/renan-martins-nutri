import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { db, user, scheduleConfig } from "@/lib/db";
import { eq } from "drizzle-orm";
import { hashPassword, generateId } from "@/lib/auth-helpers";

const ADMIN_EMAIL = "renanmartinsnutri@gmail.com";
const ADMIN_PASSWORD = "123456";

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
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const isLocalhost =
    host.includes("localhost") ||
    host.includes("127.0.0.1") ||
    host.includes("replit");

  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const sessionSecret = process.env.SESSION_SECRET;

  if (!isLocalhost && secret !== sessionSecret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
  }

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
        .set({ role: "ADMIN", isActive: true })
        .where(eq(user.id, adminId));
    } else {
      const hashed = await hashPassword(ADMIN_PASSWORD);
      adminId = generateId();
      await db.insert(user).values({
        id: adminId,
        name: "Renan Martins",
        email: ADMIN_EMAIL,
        password: hashed,
        role: "ADMIN",
        isActive: true,
      });
    }

    const existingSchedule = await db
      .select()
      .from(scheduleConfig)
      .where(eq(scheduleConfig.adminId, adminId))
      .limit(1);

    if (existingSchedule.length === 0) {
      await db.insert(scheduleConfig).values(
        DEFAULT_SCHEDULE.map((s) => ({
          id: generateId(),
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
    });
  } catch (err) {
    console.error("[seed-admin]", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1");

  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const sessionSecret = process.env.SESSION_SECRET;

  if (!isLocalhost && secret !== sessionSecret) {
    return NextResponse.json(
      { error: "Unauthorized. This endpoint is restricted." },
      { status: 403 }
    );
  }

  const supabase = createServiceRoleClient();

  const { data: existingUsers } = await supabase.auth.admin.listUsers();
  const adminExists = existingUsers?.users?.some(
    (u) => u.email === "renanmartinsnutri@gmail.com"
  );

  if (adminExists) {
    const adminUser = existingUsers?.users?.find(
      (u) => u.email === "renanmartinsnutri@gmail.com"
    );
    if (adminUser) {
      await supabase
        .from("profiles")
        .update({ role: "ADMIN" })
        .eq("id", adminUser.id);
      await seedScheduleConfig(supabase, adminUser.id);
    }
    return NextResponse.json({
      message: "Admin user already exists. Role updated to ADMIN. Schedule config seeded.",
    });
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email: "renanmartinsnutri@gmail.com",
    password: "123456",
    email_confirm: true,
    user_metadata: {
      full_name: "Renan Martins",
      role: "ADMIN",
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (data.user) {
    await supabase
      .from("profiles")
      .update({ role: "ADMIN", full_name: "Renan Martins" })
      .eq("id", data.user.id);

    await seedScheduleConfig(supabase, data.user.id);
  }

  return NextResponse.json({
    message: "Admin user created successfully.",
    userId: data.user?.id,
  });
}

async function seedScheduleConfig(supabase: any, adminId: string) {
  const { data: existing } = await supabase
    .from("schedule_config")
    .select("id")
    .limit(1);

  if (existing && existing.length > 0) return;

  const configs = [
    { admin_id: adminId, day_of_week: 1, start_time: "08:00:00", end_time: "18:00:00", slot_duration_min: 50, break_duration_min: 10, is_active: true },
    { admin_id: adminId, day_of_week: 2, start_time: "08:00:00", end_time: "18:00:00", slot_duration_min: 50, break_duration_min: 10, is_active: true },
    { admin_id: adminId, day_of_week: 3, start_time: "08:00:00", end_time: "18:00:00", slot_duration_min: 50, break_duration_min: 10, is_active: true },
    { admin_id: adminId, day_of_week: 4, start_time: "08:00:00", end_time: "18:00:00", slot_duration_min: 50, break_duration_min: 10, is_active: true },
    { admin_id: adminId, day_of_week: 5, start_time: "08:00:00", end_time: "18:00:00", slot_duration_min: 50, break_duration_min: 10, is_active: true },
    { admin_id: adminId, day_of_week: 6, start_time: "08:00:00", end_time: "12:00:00", slot_duration_min: 50, break_duration_min: 10, is_active: true },
    { admin_id: adminId, day_of_week: 0, start_time: "08:00:00", end_time: "12:00:00", slot_duration_min: 50, break_duration_min: 10, is_active: false },
  ];

  await supabase.from("schedule_config").insert(configs);
}

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
    (u) => u.email === "admin@admin.com"
  );

  if (adminExists) {
    const adminUser = existingUsers?.users?.find(
      (u) => u.email === "admin@admin.com"
    );
    if (adminUser) {
      await supabase
        .from("profiles")
        .update({ role: "ADMIN" })
        .eq("id", adminUser.id);
    }
    return NextResponse.json({
      message: "Admin user already exists. Role updated to ADMIN.",
    });
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email: "admin@admin.com",
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
  }

  return NextResponse.json({
    message: "Admin user created successfully.",
    userId: data.user?.id,
  });
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { user, appointments } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";

export async function GET(request: NextRequest) {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (currentUser.role !== "ADMIN") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const rows = await db
    .select({
      id: user.id,
      full_name: user.name,
      email: user.email,
      phone: user.phone,
      cpf: user.cpf,
      date_of_birth: user.dateOfBirth,
      is_active: user.isActive,
      created_at: user.createdAt,
    })
    .from(user)
    .where(eq(user.role, "PATIENT"))
    .orderBy(desc(user.createdAt));

  return NextResponse.json({ patients: rows });
}

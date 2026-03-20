import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { eq, and, or, ilike } from "drizzle-orm";
import { getServerUser } from "@/lib/server-auth";

export async function GET(request: NextRequest) {
  const currentUser = await getServerUser();
  if (!currentUser) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  if (currentUser.role !== "ADMIN") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ patients: [] });
  }

  const cpfDigits = q.replace(/\D/g, "");
  const isCpfSearch = cpfDigits.length >= 3;

  const rows = await db
    .select({
      id: user.id,
      full_name: user.name,
      email: user.email,
      phone: user.phone,
      cpf: user.cpf,
    })
    .from(user)
    .where(
      and(
        eq(user.role, "PATIENT"),
        eq(user.isActive, true),
        isCpfSearch
          ? or(ilike(user.name, `%${q}%`), ilike(user.cpf, `%${cpfDigits}%`))
          : ilike(user.name, `%${q}%`)
      )
    )
    .limit(10);

  return NextResponse.json({ patients: rows });
}

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getUserByEmail, verifyPassword } from "@/lib/auth-helpers";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios." }, { status: 400 });
    }

    const foundUser = await getUserByEmail(email);
    if (!foundUser) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
    }

    if (!foundUser.isActive) {
      return NextResponse.json(
        { error: "Conta desativada. Entre em contato com o suporte." },
        { status: 403 }
      );
    }

    const valid = await verifyPassword(password, foundUser.password);
    if (!valid) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
    }

    const session = await getSession();
    session.userId = foundUser.id;
    session.email = foundUser.email;
    session.name = foundUser.name;
    session.role = foundUser.role as "ADMIN" | "PATIENT";
    session.isLoggedIn = true;
    await session.save();

    const destination = foundUser.role === "ADMIN" ? "/admin" : "/paciente";

    return NextResponse.json({
      success: true,
      destination,
      user: { id: foundUser.id, email: foundUser.email, name: foundUser.name, role: foundUser.role },
    });
  } catch (err) {
    console.error("[login]", err);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}

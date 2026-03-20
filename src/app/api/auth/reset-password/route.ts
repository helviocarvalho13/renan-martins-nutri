import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

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

    await auth.api.resetPassword({ body: { token, newPassword: password } });
    return NextResponse.json({ success: true, destination: "/login" });
  } catch (err: any) {
    console.error("[reset-password]", err);
    const msg = err?.message || "";
    if (msg.includes("invalid") || msg.includes("expired")) {
      return NextResponse.json(
        { error: "Link de recuperação inválido ou expirado. Solicite um novo." },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}

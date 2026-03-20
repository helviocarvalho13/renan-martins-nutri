import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Rota removida. Use o cliente de autenticação diretamente." },
    { status: 410 }
  );
}

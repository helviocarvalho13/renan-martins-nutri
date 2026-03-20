import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    session.destroy();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[logout]", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}

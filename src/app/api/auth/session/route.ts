import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ user: null }, { status: 200 });
    }
    return NextResponse.json({ user: currentUser });
  } catch (err) {
    console.error("[session]", err);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}

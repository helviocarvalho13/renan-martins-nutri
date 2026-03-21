import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const appBaseUrl = process.env.BETTER_AUTH_URL
  || (process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS.split(",")[0].trim()}` : null)
  || "http://localhost:5000";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email é obrigatório." }, { status: 400 });
    }

    const redirectTo = `${appBaseUrl}/update-password`;

    const result = await auth.api.requestPasswordReset({
      body: { email: email.trim().toLowerCase(), redirectTo },
    });

    console.log("[forgot-password] requestPasswordReset result:", result);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[forgot-password] Error:", err);
    // Always return success for security (prevent email enumeration)
    return NextResponse.json({ success: true });
  }
}

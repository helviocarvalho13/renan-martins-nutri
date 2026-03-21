import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Compatibility wrapper: delegates to better-auth sign-in.
 * The login page uses authClient.signIn.email() directly, but
 * this route is kept for any legacy clients.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body as { email: string; password: string };

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    // Proxy to better-auth's internal sign-in handler
    const authReq = new Request(
      new URL("/api/auth/sign-in/email", req.url),
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          origin: req.headers.get("origin") ?? new URL(req.url).origin,
          cookie: req.headers.get("cookie") ?? "",
        },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      }
    );

    return auth.handler(authReq);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro interno.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

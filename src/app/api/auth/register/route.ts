import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Compatibility wrapper: delegates to better-auth sign-up.
 * The register page uses authClient.signUp.email() directly, but
 * this route is kept for any legacy clients.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, name, email, password, phone, cpf, dateOfBirth } =
      body as {
        fullName?: string;
        name?: string;
        email: string;
        password: string;
        phone?: string;
        cpf?: string;
        dateOfBirth?: string;
      };

    const displayName = (fullName ?? name ?? "").trim();
    if (!displayName || !email || !password) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando." },
        { status: 400 }
      );
    }

    // Proxy to better-auth's internal sign-up handler
    const authReq = new Request(
      new URL("/api/auth/sign-up/email", req.url),
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          origin: req.headers.get("origin") ?? new URL(req.url).origin,
          cookie: req.headers.get("cookie") ?? "",
        },
        body: JSON.stringify({
          name: displayName,
          email: email.trim().toLowerCase(),
          password,
          phone: phone?.replace(/\D/g, ""),
          cpf: cpf?.replace(/\D/g, ""),
          dateOfBirth: dateOfBirth ?? undefined,
        }),
      }
    );

    return auth.handler(authReq);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro interno.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

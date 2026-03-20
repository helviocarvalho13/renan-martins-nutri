import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

interface ExtendedSessionUser {
  id: string;
  role?: string;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isPatientRoute = pathname.startsWith("/paciente");

  if (!isAdminRoute && !isPatientRoute) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const sessionUser = session.user as ExtendedSessionUser;

  if (isAdminRoute && sessionUser.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/paciente", request.url));
  }

  if (isPatientRoute && sessionUser.role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

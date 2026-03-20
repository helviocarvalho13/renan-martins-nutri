import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
  phone?: string | null;
  cpf?: string | null;
  dateOfBirth?: string | null;
  isActive?: boolean;
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return null;
    const u = session.user as any;
    return {
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role ?? "PATIENT",
      phone: u.phone ?? null,
      cpf: u.cpf ?? null,
      dateOfBirth: u.dateOfBirth ?? null,
      isActive: u.isActive ?? true,
    };
  } catch {
    return null;
  }
}

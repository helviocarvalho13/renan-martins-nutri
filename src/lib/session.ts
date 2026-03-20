import { auth, type AppUser } from "@/lib/auth";
import { headers } from "next/headers";

export type { AppUser };

export async function getCurrentUser(): Promise<AppUser | null> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return null;
    const u = session.user as unknown as AppUser;
    return {
      id: u.id,
      email: u.email,
      name: u.name,
      emailVerified: u.emailVerified ?? false,
      image: u.image ?? null,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
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

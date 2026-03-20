"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import type { AppUser } from "@/lib/auth";

export type UserRole = "ADMIN" | "PATIENT";

export interface Profile {
  id: string;
  role: UserRole;
  full_name?: string;
  phone?: string | null;
  cpf?: string | null;
  date_of_birth?: string | null;
  is_active?: boolean;
}

interface UseAuthReturn {
  user: AppUser | null;
  profile: Profile | null;
  role: UserRole | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const sessionUser = session?.user as unknown as AppUser | undefined;

  const user: AppUser | null = sessionUser
    ? {
        id: sessionUser.id,
        email: sessionUser.email,
        name: sessionUser.name,
        emailVerified: sessionUser.emailVerified ?? false,
        image: sessionUser.image ?? null,
        createdAt: sessionUser.createdAt,
        updatedAt: sessionUser.updatedAt,
        role: sessionUser.role ?? "PATIENT",
        phone: sessionUser.phone ?? null,
        cpf: sessionUser.cpf ?? null,
        dateOfBirth: sessionUser.dateOfBirth ?? null,
        isActive: sessionUser.isActive ?? true,
      }
    : null;

  const profile: Profile | null = user
    ? {
        id: user.id,
        role: (user.role as UserRole) ?? "PATIENT",
        full_name: user.name,
        phone: user.phone,
        cpf: user.cpf,
        date_of_birth: user.dateOfBirth,
        is_active: user.isActive,
      }
    : null;

  const role = user ? ((user.role as UserRole) ?? null) : null;

  const signOut = async () => {
    try {
      await authClient.signOut();
    } finally {
      router.push("/login");
      router.refresh();
    }
  };

  return { user, profile, role, loading: isPending, signOut };
}

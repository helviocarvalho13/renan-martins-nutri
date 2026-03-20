"use client";

import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
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

interface ExtendedSessionUser {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  role?: string;
  phone?: string | null;
  cpf?: string | null;
  dateOfBirth?: string | null;
  isActive?: boolean;
}

export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const rawUser = session?.user as ExtendedSessionUser | undefined;

  const user: AppUser | null = rawUser
    ? {
        id: rawUser.id,
        email: rawUser.email,
        name: rawUser.name,
        emailVerified: rawUser.emailVerified ?? false,
        image: rawUser.image ?? null,
        createdAt: rawUser.createdAt,
        updatedAt: rawUser.updatedAt,
        role: rawUser.role ?? "PATIENT",
        phone: rawUser.phone ?? null,
        cpf: rawUser.cpf ?? null,
        dateOfBirth: rawUser.dateOfBirth ?? null,
        isActive: rawUser.isActive ?? true,
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

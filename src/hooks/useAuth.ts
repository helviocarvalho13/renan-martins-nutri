"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";

export type UserRole = "ADMIN" | "PATIENT";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role?: string;
  phone?: string | null;
  cpf?: string | null;
  dateOfBirth?: string | null;
  isActive?: boolean;
}

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
  user: AuthUser | null;
  profile: Profile | null;
  role: UserRole | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const sessionUser = session?.user as any;

  const user: AuthUser | null = sessionUser
    ? {
        id: sessionUser.id,
        email: sessionUser.email,
        name: sessionUser.name,
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

  const role = (user?.role as UserRole) ?? null;

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

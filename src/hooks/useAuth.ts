"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { SessionData } from "@/lib/session";

interface UseAuthReturn {
  user: SessionData | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery<{ user: SessionData | null }>({
    queryKey: ["/api/auth/session"],
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const signOut = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      queryClient.clear();
      router.push("/login");
      router.refresh();
    } catch {
      window.location.href = "/login";
    }
  }, [router, queryClient]);

  return {
    user: data?.user ?? null,
    loading: isPending,
    signOut,
  };
}

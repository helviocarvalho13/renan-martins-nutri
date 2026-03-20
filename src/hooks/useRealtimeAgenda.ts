"use client";

import { useQuery } from "@tanstack/react-query";

interface UseRealtimeAgendaOptions {
  date: string;
  refetchIntervalMs?: number;
}

interface AgendaData {
  appointments: unknown[];
  [key: string]: unknown;
}

export function useRealtimeAgenda({
  date,
  refetchIntervalMs = 30000,
}: UseRealtimeAgendaOptions) {
  return useQuery<AgendaData>({
    queryKey: ["/api/admin/appointments", date],
    refetchInterval: refetchIntervalMs,
    staleTime: 0,
  });
}

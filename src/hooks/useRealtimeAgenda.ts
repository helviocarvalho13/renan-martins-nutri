"use client";

import { useQuery } from "@tanstack/react-query";

interface AppointmentRow {
  id: string;
  patient_id: string;
  date: string;
  start_time: string;
  end_time: string;
  type: string;
  status: string;
  notes: string | null;
  modality: string | null;
  return_suggested_date: string | null;
  patient_name: string | null;
  patient_email: string | null;
  patient_phone: string | null;
  [key: string]: unknown;
}

interface AgendaResponse {
  appointments: AppointmentRow[];
}

interface UseRealtimeAgendaOptions {
  from: string;
  to: string;
  refetchIntervalMs?: number;
}

export function useRealtimeAgenda({
  from,
  to,
  refetchIntervalMs = 30000,
}: UseRealtimeAgendaOptions) {
  return useQuery<AgendaResponse>({
    queryKey: ["/api/admin/agenda", from, to],
    queryFn: async () => {
      const res = await fetch(`/api/admin/agenda?from=${from}&to=${to}`);
      if (!res.ok) throw new Error("Falha ao carregar agenda");
      return res.json() as Promise<AgendaResponse>;
    },
    refetchInterval: refetchIntervalMs,
    staleTime: 0,
    enabled: Boolean(from && to),
  });
}

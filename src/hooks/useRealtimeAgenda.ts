"use client";

import { useEffect } from "react";

export function useRealtimeAgenda(refetch: () => void) {
  useEffect(() => {
    const interval = setInterval(refetch, 30000);
    return () => clearInterval(interval);
  }, [refetch]);
}

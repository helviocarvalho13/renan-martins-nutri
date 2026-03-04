"use client";

import { useState, useEffect } from "react";

export interface Slot {
  start_time: string;
  end_time: string;
}

export function useAvailableSlots(date: string | null) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) {
      setSlots([]);
      return;
    }
    setLoading(true);
    fetch(`/api/available-slots?date=${date}`)
      .then((r) => r.json())
      .then((d) => {
        setSlots(d.slots || []);
        setLoading(false);
      })
      .catch(() => {
        setSlots([]);
        setLoading(false);
      });
  }, [date]);

  return { slots, loading };
}

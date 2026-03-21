"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";

const MageBotWidget = lazy(() => import("@/components/chatbot/MageBotWidget"));
const PoweredByBanner = lazy(() => import("@/components/site/PoweredByBanner"));

export function ClientProviders() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Toaster />
      <Suspense fallback={null}>
        <MageBotWidget />
        <PoweredByBanner />
      </Suspense>
    </>
  );
}

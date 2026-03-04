"use client";

import { useEffect, useState, lazy, Suspense } from "react";

const MageBotWidget = lazy(() => import("@/components/chatbot/MageBotWidget"));
const PoweredByBanner = lazy(() => import("@/components/site/PoweredByBanner"));

export default function MageBotLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <MageBotWidget />
      <PoweredByBanner />
    </Suspense>
  );
}

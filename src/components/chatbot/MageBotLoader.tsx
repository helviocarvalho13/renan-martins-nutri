"use client";

import dynamic from "next/dynamic";

const MageBotWidget = dynamic(
  () => import("@/components/chatbot/MageBotWidget"),
  { ssr: false }
);

const PoweredByBanner = dynamic(
  () => import("@/components/site/PoweredByBanner"),
  { ssr: false }
);

export default function MageBotLoader() {
  return (
    <>
      <MageBotWidget />
      <PoweredByBanner />
    </>
  );
}

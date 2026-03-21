"use client";

import Image from "next/image";
import { useMageBot } from "@/hooks/useMageBot";
import ChatWindow from "./ChatWindow";

export default function MageBotWidget() {
  const {
    messages,
    quickReplies,
    isTyping,
    isOpen,
    unreadCount,
    isPasswordMode,
    chatState,
    sendMessage,
    toggleOpen,
    setOpen,
  } = useMageBot();

  return (
    <>
      {isOpen && (
        <ChatWindow
          messages={messages}
          quickReplies={quickReplies}
          isTyping={isTyping}
          isPasswordMode={isPasswordMode}
          chatState={chatState}
          onSend={sendMessage}
          onClose={() => setOpen(false)}
        />
      )}

      <button
        onClick={toggleOpen}
        className="fixed bottom-12 right-4 z-50 w-14 h-14 rounded-full bg-neutral-900 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        data-testid="button-magebot-widget"
        aria-label="Abrir chat"
      >
        <Image src="/images/team-mago-circle.png" alt="Team Mago" width={36} height={36} className="rounded-full" />
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center"
            data-testid="badge-unread-count"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
    </>
  );
}

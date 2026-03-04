"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMageBot } from "@/hooks/useMageBot";
import ChatWindow from "./ChatWindow";

export default function MageBotWidget() {
  const {
    messages,
    quickReplies,
    isTyping,
    isOpen,
    unreadCount,
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
          onSend={sendMessage}
          onClose={() => setOpen(false)}
        />
      )}

      <button
        onClick={toggleOpen}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        data-testid="button-magebot-widget"
        aria-label="Abrir chat"
      >
        <MessageCircle className="w-6 h-6" />
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[11px] font-bold flex items-center justify-center"
            data-testid="badge-unread-count"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
    </>
  );
}

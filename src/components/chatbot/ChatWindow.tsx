"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ChatMessage, QuickReply } from "@/lib/chatbot/types";

interface ChatWindowProps {
  messages: ChatMessage[];
  quickReplies: QuickReply[];
  isTyping: boolean;
  isPasswordMode?: boolean;
  onSend: (text: string) => void;
  onClose: () => void;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-2" data-testid="typing-indicator">
      <div className="flex items-center gap-1 bg-muted rounded-md px-3 py-2">
        <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isBot = message.role === "bot";
  const time = message.timestamp instanceof Date
    ? message.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <div
      className={`flex ${isBot ? "justify-start" : "justify-end"} px-3 py-0.5`}
      data-testid={`message-${message.role}-${message.id}`}
    >
      <div
        className={`max-w-[85%] rounded-md px-3 py-2 text-sm ${
          isBot
            ? "bg-muted text-foreground"
            : "bg-primary text-primary-foreground"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
        <span
          className={`text-[10px] mt-1 block ${
            isBot ? "text-muted-foreground" : "text-primary-foreground/70"
          }`}
        >
          {time}
        </span>
      </div>
    </div>
  );
}

export default function ChatWindow({
  messages,
  quickReplies,
  isTyping,
  isPasswordMode,
  onSend,
  onClose,
}: ChatWindowProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  const handleQuickReply = (reply: QuickReply) => {
    onSend(reply.value);
  };

  return (
    <div
      className="fixed bottom-28 right-4 z-50 flex flex-col bg-background border border-border rounded-md shadow-lg w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[70vh]"
      data-testid="chat-window"
    >
      <div className="flex items-center justify-between gap-2 px-4 py-3 bg-neutral-900 text-white rounded-t-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
            M
          </div>
          <div>
            <h3 className="text-sm font-semibold" data-testid="text-chatbot-name">MageBot</h3>
            <p className="text-[11px] text-white/70">Assistente Virtual</p>
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="text-white hover:bg-white/10"
          onClick={onClose}
          data-testid="button-close-chat"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-3 space-y-1">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {quickReplies.length > 0 && !isTyping && (
        <div className="flex flex-wrap gap-1.5 px-3 py-2 border-t border-border" data-testid="quick-replies">
          {quickReplies.map((reply) => (
            <Button
              key={reply.value}
              variant="outline"
              size="sm"
              onClick={() => handleQuickReply(reply)}
              data-testid={`button-quick-reply-${reply.value}`}
            >
              {reply.label}
            </Button>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-3 py-2 border-t border-border"
        data-testid="chat-input-form"
      >
        <input
          ref={inputRef}
          type={isPasswordMode ? "password" : "text"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isPasswordMode ? "Digite sua senha..." : "Digite sua mensagem..."}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none h-9 px-3 border border-input rounded-md"
          data-testid="input-chat-message"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim()}
          data-testid="button-send-message"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}

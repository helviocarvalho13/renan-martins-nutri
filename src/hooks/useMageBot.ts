"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { ChatMessage, ChatContext, QuickReply } from "@/lib/chatbot/types";
import { createInitialContext } from "@/lib/chatbot/types";
import { processMessage, getGreetingResponse } from "@/lib/chatbot/engine";
import { createClient } from "@/lib/supabase/client";

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

const SESSION_KEY = "magebot_session";
const TYPING_DELAY = 600;

interface UseMageBotReturn {
  messages: ChatMessage[];
  quickReplies: QuickReply[];
  isTyping: boolean;
  isOpen: boolean;
  unreadCount: number;
  sendMessage: (text: string) => void;
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;
}

function loadGuestSession(): { messages: ChatMessage[]; context: ChatContext } | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.messages && parsed.context) {
      parsed.messages = parsed.messages.map((m: ChatMessage) => ({
        ...m,
        timestamp: new Date(m.timestamp),
      }));
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function saveGuestSession(messages: ChatMessage[], context: ChatContext) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ messages, context }));
  } catch {}
}

export function useMageBot(): UseMageBotReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [context, setContext] = useState<ChatContext>(createInitialContext());
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const hasGreeted = useRef(false);
  const authChecked = useRef(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (authChecked.current) return;
      authChecked.current = true;

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      let newContext = createInitialContext();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single();

        const profileName = (profile as { full_name: string } | null)?.full_name;

        newContext = {
          ...newContext,
          isAuthenticated: true,
          userId: user.id,
          userName: profileName || user.email?.split("@")[0] || null,
        };
      }

      const saved = loadGuestSession();
      if (saved && saved.messages.length > 0) {
        setMessages(saved.messages);
        setContext({
          ...saved.context,
          isAuthenticated: newContext.isAuthenticated,
          userId: newContext.userId,
          userName: newContext.userName,
        });
        hasGreeted.current = true;
      } else {
        setContext(newContext);
      }
    };

    checkAuth();
  }, []);

  const addBotMessages = useCallback(
    (texts: string[], newContext: ChatContext, newReplies: QuickReply[]) => {
      setIsTyping(true);

      const botMessages: ChatMessage[] = texts.map((text) => ({
        id: generateId(),
        role: "bot" as const,
        text,
        timestamp: new Date(),
      }));

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => {
          const updated = [...prev, ...botMessages];
          saveGuestSession(updated, newContext);
          return updated;
        });
        setContext(newContext);
        setQuickReplies(newReplies);
        if (!isOpen) {
          setUnreadCount((c) => c + botMessages.length);
        }
      }, TYPING_DELAY);
    },
    [isOpen]
  );

  const greet = useCallback(() => {
    if (hasGreeted.current) return;
    hasGreeted.current = true;

    const response = getGreetingResponse(context);
    addBotMessages(response.messages, response.context, response.quickReplies);
  }, [context, addBotMessages]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setUnreadCount(0);
        if (!hasGreeted.current) {
          setTimeout(() => greet(), 100);
        }
      }
      return next;
    });
  }, [greet]);

  const setOpen = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      if (open) {
        setUnreadCount(0);
        if (!hasGreeted.current) {
          setTimeout(() => greet(), 100);
        }
      }
    },
    [greet]
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const userMsg: ChatMessage = {
        id: generateId(),
        role: "user",
        text: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setQuickReplies([]);
      setIsTyping(true);

      try {
        const response = await processMessage(trimmed, context);
        addBotMessages(response.messages, response.context, response.quickReplies);
      } catch {
        addBotMessages(
          ["Desculpe, ocorreu um erro. Tente novamente."],
          { ...context, state: "MENU" },
          [{ label: "Voltar ao menu", value: "menu" }]
        );
      }
    },
    [context, addBotMessages]
  );

  return {
    messages,
    quickReplies,
    isTyping,
    isOpen,
    unreadCount,
    sendMessage,
    toggleOpen,
    setOpen,
  };
}

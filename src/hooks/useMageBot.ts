"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { ChatMessage, ChatContext, QuickReply } from "@/lib/chatbot/types";
import { createInitialContext } from "@/lib/chatbot/types";
import {
  processMessage,
  getGreetingResponse,
  getLoginSuccessResponse,
  getLoginFailureResponse,
  getBookingSuccessResponse,
  getBookingErrorResponse,
} from "@/lib/chatbot/engine";
import { authClient } from "@/lib/auth-client";

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

const TYPING_DELAY = 600;

interface UseMageBotReturn {
  messages: ChatMessage[];
  quickReplies: QuickReply[];
  isTyping: boolean;
  isOpen: boolean;
  unreadCount: number;
  isPasswordMode: boolean;
  chatState: string;
  sendMessage: (text: string) => void;
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;
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

      try {
        const session = await authClient.getSession();
        const user = session.data?.user as { id?: string; name?: string; email?: string } | undefined;

        if (user) {
          setContext((prev) => ({
            ...prev,
            isAuthenticated: true,
            userId: user.id || null,
            userName: user.name || user.email?.split("@")[0] || null,
            accessToken: null,
          }));
        }
      } catch {
        // not authenticated
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
        setMessages((prev) => [...prev, ...botMessages]);
        setContext(newContext);
        setQuickReplies(newReplies);
        if (!isOpen) {
          setUnreadCount((c) => c + botMessages.length);
        }
      }, TYPING_DELAY);
    },
    [isOpen]
  );

  const performBooking = useCallback(
    async (ctx: ChatContext) => {
      if (!ctx.selectedDate || !ctx.selectedSlot || !ctx.appointmentType) {
        const errorResponse = getBookingErrorResponse(ctx, "Dados incompletos.");
        addBotMessages(errorResponse.messages, errorResponse.context, errorResponse.quickReplies);
        return;
      }

      try {
        const res = await fetch("/api/patient/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: ctx.selectedDate,
            start_time: ctx.selectedSlot.start_time,
            end_time: ctx.selectedSlot.end_time,
            type: ctx.appointmentType,
          }),
        });

        if (res.ok) {
          const successResponse = getBookingSuccessResponse(ctx);
          addBotMessages(successResponse.messages, successResponse.context, successResponse.quickReplies);
        } else {
          let errorMsg = "Erro ao agendar.";
          try {
            const data = await res.json();
            errorMsg = data.error || errorMsg;
          } catch {}
          const errorResponse = getBookingErrorResponse(ctx, errorMsg);
          addBotMessages(errorResponse.messages, errorResponse.context, errorResponse.quickReplies);
        }
      } catch {
        const errorResponse = getBookingErrorResponse(ctx, "Erro de conexão. Verifique sua internet e tente novamente.");
        addBotMessages(errorResponse.messages, errorResponse.context, errorResponse.quickReplies);
      }
    },
    [addBotMessages]
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

  const setOpenFn = useCallback(
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

      const isPasswordInput = context.state === "LOGIN_PASSWORD";

      const userMsg: ChatMessage = {
        id: generateId(),
        role: "user",
        text: isPasswordInput ? "••••••••" : trimmed,
        timestamp: new Date(),
        isPassword: isPasswordInput,
      };

      setMessages((prev) => [...prev, userMsg]);
      setQuickReplies([]);
      setIsTyping(true);

      if (isPasswordInput && context.loginEmail) {
        try {
          const result = await authClient.signIn.email({
            email: context.loginEmail,
            password: trimmed,
          });

          if (result.error || !result.data?.user) {
            const failResponse = getLoginFailureResponse(context, result.error?.message);
            addBotMessages(failResponse.messages, failResponse.context, failResponse.quickReplies);
            return;
          }

          const user = result.data.user as { id?: string; name?: string; email?: string };

          const updatedContext: ChatContext = {
            ...context,
            isAuthenticated: true,
            userId: user.id || null,
            userName: user.name || user.email?.split("@")[0] || null,
            accessToken: null,
            loginEmail: null,
          };

          const successResponse = getLoginSuccessResponse(updatedContext);
          addBotMessages(successResponse.messages, successResponse.context, successResponse.quickReplies);
          return;
        } catch {
          const failResponse = getLoginFailureResponse(context, "Erro de conexão. Tente novamente.");
          addBotMessages(failResponse.messages, failResponse.context, failResponse.quickReplies);
          return;
        }
      }

      try {
        const response = await processMessage(trimmed, context);

        if (response.needsBooking) {
          addBotMessages(response.messages, response.context, response.quickReplies);
          setTimeout(() => {
            performBooking(response.context);
          }, TYPING_DELAY + 100);
          return;
        }

        addBotMessages(response.messages, response.context, response.quickReplies);
      } catch {
        addBotMessages(
          ["Desculpe, ocorreu um erro. Tente novamente."],
          { ...context, state: "MENU" },
          [{ label: "Voltar ao menu", value: "menu" }]
        );
      }
    },
    [context, addBotMessages, performBooking]
  );

  return {
    messages,
    quickReplies,
    isTyping,
    isOpen,
    unreadCount,
    isPasswordMode: context.state === "LOGIN_PASSWORD",
    chatState: context.state,
    sendMessage,
    toggleOpen,
    setOpen: setOpenFn,
  };
}

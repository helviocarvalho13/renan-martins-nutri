"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell } from "lucide-react";
import type { Notification } from "@/lib/types/database";

export function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const userIdRef = useRef<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function loadNotifications() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        userIdRef.current = user.id;

        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) {
          console.error("[NotificationBell] Load error:", error.message);
          return;
        }

        if (data) {
          setNotifications(data);
          setUnreadCount(data.filter((n: Notification) => !n.is_read).length);
        }
      } catch (e) {
        console.error("[NotificationBell] Load error:", e);
      }
    }

    loadNotifications();

    const channel = supabase
      .channel("user-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        (payload) => {
          const newNotification = payload.new as Notification;
          if (userIdRef.current && newNotification.user_id === userIdRef.current) {
            setNotifications((prev) => [newNotification, ...prev].slice(0, 10));
            setUnreadCount((prev) => prev + 1);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const markOneRead = async (notificationId: string) => {
    try {
      const supabase = createClient();
      const { error } = await (supabase
        .from("notifications") as any)
        .update({ is_read: true })
        .eq("id", notificationId);

      if (error) {
        console.error("[NotificationBell] Mark read error:", error.message);
        return;
      }

      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (e) {
      console.error("[NotificationBell] Mark read error:", e);
    }
  };

  const markAllRead = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await (supabase
        .from("notifications") as any)
        .update({ is_read: true })
        .eq("user_id", user.id)
        .eq("is_read", false);

      if (error) {
        console.error("[NotificationBell] Mark all read error:", error.message);
        return;
      }

      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (e) {
      console.error("[NotificationBell] Mark all read error:", e);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setShowNotifications(!showNotifications)}
        aria-label="Notificações"
        data-testid="button-notifications"
      >
        <Bell className="w-5 h-5 text-neutral-600" />
        {unreadCount > 0 && (
          <span aria-live="polite" className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center" data-testid="text-unread-count">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {showNotifications && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg border border-neutral-200 shadow-lg z-50">
            <div className="flex items-center justify-between gap-2 p-3 border-b border-neutral-100">
              <span className="text-sm font-semibold text-neutral-900">Notificações</span>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
                  data-testid="button-mark-all-read"
                >
                  Marcar todas como lidas
                </button>
              )}
            </div>
            <ScrollArea className="max-h-72">
              {notifications.length === 0 ? (
                <p className="p-4 text-sm text-neutral-400 text-center" data-testid="text-no-notifications">Nenhuma notificação</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      if (!n.is_read) markOneRead(n.id);
                    }}
                    className={`p-3 border-b border-neutral-50 last:border-0 cursor-pointer transition-colors ${
                      !n.is_read ? "bg-blue-50/50 hover:bg-blue-50" : "hover:bg-neutral-50"
                    }`}
                    data-testid={`notification-item-${n.id}`}
                  >
                    <p className="text-sm font-medium text-neutral-800">{n.title}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{n.message}</p>
                    <p className="text-[10px] text-neutral-400 mt-1">
                      {new Date(n.created_at).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ))
              )}
            </ScrollArea>
          </div>
        </>
      )}
    </div>
  );
}

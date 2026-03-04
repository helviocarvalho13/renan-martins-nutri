"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Globe,
  Settings,
  Bell,
  Menu,
  LogOut,
  ChevronRight,
} from "lucide-react";
import type { Notification } from "@/lib/types/database";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/agenda", label: "Agenda", icon: CalendarDays },
  { href: "/admin/pacientes", label: "Pacientes", icon: Users },
  { href: "/admin/site", label: "Site", icon: Globe },
  { href: "/admin/disponibilidade", label: "Disponibilidade", icon: Settings },
];

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <Link href="/admin" onClick={onNavigate} className="block">
          <h2 className="font-bold text-lg text-neutral-900" data-testid="text-admin-brand">Renan Martins</h2>
          <p className="text-xs text-neutral-400 mt-0.5">Painel Administrativo</p>
        </Link>
      </div>
      <Separator />
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              data-testid={`link-nav-${item.label.toLowerCase()}`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
            </Link>
          );
        })}
      </nav>
      <Separator />
      <div className="p-3">
        <button
          onClick={() => {
            const supabase = createClient();
            supabase.auth.signOut().then(() => {
              window.location.href = "/login";
            });
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-500 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
          data-testid="button-logout"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function loadNotifications() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, count } = await supabase
        .from("notifications")
        .select("*", { count: "exact" })
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (data) {
        setNotifications(data);
        setUnreadCount(data.filter((n: Notification) => !n.is_read).length);
      }
    }

    loadNotifications();

    const channel = supabase
      .channel("admin-notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        (payload) => {
          setNotifications((prev) => [payload.new as Notification, ...prev].slice(0, 10));
          setUnreadCount((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const markAllRead = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("is_read", false);
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnreadCount(0);
  };

  const currentTitle = navItems.find(
    (item) => item.href === pathname || (item.href !== "/admin" && pathname.startsWith(item.href))
  )?.label || "Dashboard";

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-white border-r border-neutral-200">
        <SidebarContent pathname={pathname} />
      </aside>

      <div className="flex-1 lg:pl-64">
        <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <div className="flex items-center gap-3">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden" data-testid="button-mobile-menu">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <SheetTitle className="sr-only">Menu de Navegacao</SheetTitle>
                  <SidebarContent pathname={pathname} onNavigate={() => setMobileOpen(false)} />
                </SheetContent>
              </Sheet>
              <h1 className="text-lg font-semibold text-neutral-900" data-testid="text-page-title">{currentTitle}</h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                  data-testid="button-notifications"
                >
                  <Bell className="w-5 h-5 text-neutral-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </Button>

                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg border border-neutral-200 shadow-lg z-50">
                      <div className="flex items-center justify-between p-3 border-b border-neutral-100">
                        <span className="text-sm font-semibold text-neutral-900">Notificacoes</span>
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
                          <p className="p-4 text-sm text-neutral-400 text-center">Nenhuma notificacao</p>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              className={`p-3 border-b border-neutral-50 last:border-0 ${
                                !n.is_read ? "bg-blue-50/50" : ""
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

              <Separator orientation="vertical" className="h-6 mx-1 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xs font-bold">
                  RM
                </div>
                <span className="text-sm font-medium text-neutral-700" data-testid="text-admin-name">Renan Martins</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NotificationBell } from "@/components/NotificationBell";
import { authClient } from "@/lib/auth-client";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Clock,
  Settings,
  Menu,
  LogOut,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/agenda", label: "Agenda", icon: CalendarDays },
  { href: "/admin/pacientes", label: "Pacientes", icon: Users },
  { href: "/admin/disponibilidade", label: "Disponibilidade", icon: Clock },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <Link href="/admin" onClick={onNavigate} className="flex items-center gap-3" data-testid="text-admin-brand">
          <Image
            src="/images/renan-martins-logo.png"
            alt="Renan Martins"
            width={40}
            height={40}
            className="object-contain"
          />
          <div>
            <h2 className="font-bold text-sm text-neutral-900">Renan Martins</h2>
            <p className="text-xs text-neutral-400">Painel Administrativo</p>
          </div>
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
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentTitle =
    navItems.find(
      (item) => item.href === pathname || (item.href !== "/admin" && pathname.startsWith(item.href))
    )?.label || "Dashboard";

  const handleLogout = async () => {
    try {
      await authClient.signOut();
    } finally {
      router.push("/login");
      router.refresh();
    }
  };

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
                  <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
                  <SidebarContent pathname={pathname} onNavigate={() => setMobileOpen(false)} />
                </SheetContent>
              </Sheet>
              <h1 className="text-lg font-semibold text-neutral-900" data-testid="text-page-title">
                {currentTitle}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <NotificationBell />
              <Separator orientation="vertical" className="h-6 mx-1 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xs font-bold">
                  RM
                </div>
                <span className="text-sm font-medium text-neutral-700" data-testid="text-admin-name">
                  Renan Martins
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Sair da conta"
                  onClick={handleLogout}
                  data-testid="button-logout"
                >
                  <LogOut className="w-4 h-4 text-neutral-500" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main id="main-content" className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

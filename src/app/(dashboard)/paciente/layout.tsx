"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  CalendarDays,
  CalendarPlus,
  UserCircle,
  LogOut,
  Menu,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/paciente", label: "Painel", icon: LayoutDashboard },
  { href: "/paciente/agendar", label: "Agendar", icon: CalendarPlus },
  { href: "/paciente/consultas", label: "Consultas", icon: CalendarDays },
  { href: "/paciente/perfil", label: "Perfil", icon: UserCircle },
];

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <Link href="/paciente" onClick={onNavigate} className="flex items-center gap-3" data-testid="text-patient-brand">
          <Image
            src="/images/team-mago.jpg"
            alt="Team Mago"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h2 className="font-bold text-sm text-neutral-900">Renan Martins</h2>
            <p className="text-xs text-neutral-400">Area do Paciente</p>
          </div>
        </Link>
      </div>
      <Separator />
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/paciente" && pathname.startsWith(item.href));
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

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserName(user.user_metadata?.full_name || user.user_metadata?.name || user.email || "Paciente");
      }
    });
  }, []);

  const currentTitle = navItems.find(
    (item) => item.href === pathname || (item.href !== "/paciente" && pathname.startsWith(item.href))
  )?.label || "Painel";

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
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xs font-bold">
                  {userName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "P"}
                </div>
                <span className="text-sm font-medium text-neutral-700" data-testid="text-user-name">{userName}</span>
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

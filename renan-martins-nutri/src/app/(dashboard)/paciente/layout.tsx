"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NotificationBell } from "@/components/NotificationBell";
import { LogOut, UserCog } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "P";

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
        <div className="flex items-center justify-between gap-3 h-16 px-4 lg:px-6 max-w-5xl mx-auto w-full">
          <Link href="/" className="flex items-center gap-3" data-testid="link-patient-home">
            <Image
              src="/images/renan-martins-logo.png"
              alt="Renan Martins"
              width={36}
              height={36}
              className="rounded-full"
            />
            <div className="hidden sm:block">
              <p className="font-bold text-sm text-neutral-900 leading-tight">Renan Martins</p>
              <p className="text-xs text-neutral-400 leading-tight">Área do Paciente</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <NotificationBell />
            <Link
              href="/paciente/perfil"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              data-testid="link-my-profile"
              title="Meu Perfil"
            >
              <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xs font-bold">
                {initials}
              </div>
              <span className="text-sm font-medium text-neutral-700 hidden sm:inline" data-testid="text-user-name">
                {user?.name ?? ""}
              </span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Meu Perfil"
              asChild
              className="hidden sm:inline-flex"
              data-testid="button-my-profile"
            >
              <Link href="/paciente/perfil">
                <UserCog className="w-4 h-4 text-neutral-500" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Sair da conta"
              onClick={signOut}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 text-neutral-500" />
            </Button>
          </div>
        </div>
      </header>

      <main id="main-content" className="p-4 lg:p-6 max-w-5xl mx-auto">
        {children}
      </main>
    </div>
  );
}

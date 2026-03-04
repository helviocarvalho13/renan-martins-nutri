"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { NotificationBell } from "@/components/NotificationBell";
import { LogOut } from "lucide-react";

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserName(user.user_metadata?.full_name || user.user_metadata?.name || user.email || "Paciente");
      }
    });
  }, []);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "P";

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
        <div className="flex items-center justify-between gap-3 h-16 px-4 lg:px-6 max-w-5xl mx-auto w-full">
          <Link href="/" className="flex items-center gap-3" data-testid="link-patient-home">
            <Image
              src="/images/team-mago.jpg"
              alt="Team Mago"
              width={36}
              height={36}
              className="rounded-full"
            />
            <div className="hidden sm:block">
              <p className="font-bold text-sm text-neutral-900 leading-tight">Renan Martins</p>
              <p className="text-xs text-neutral-400 leading-tight">Área do Paciente</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <NotificationBell />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xs font-bold">
                {initials}
              </div>
              <span className="text-sm font-medium text-neutral-700 hidden sm:inline" data-testid="text-user-name">
                {userName}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const supabase = createClient();
                supabase.auth.signOut().then(() => {
                  window.location.href = "/login";
                });
              }}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 text-neutral-500" />
            </Button>
          </div>
        </div>
      </header>

      <main className="p-4 lg:p-6 max-w-5xl mx-auto">
        {children}
      </main>
    </div>
  );
}

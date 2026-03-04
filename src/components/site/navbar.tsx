"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, Calendar, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm leading-tight" data-testid="text-brand-name">
                Renan Martins
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest leading-tight">
                Nutricionista
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a href="#sobre" className="text-sm text-muted-foreground transition-colors hover:text-foreground" data-testid="link-about">Sobre</a>
            <a href="#servicos" className="text-sm text-muted-foreground transition-colors hover:text-foreground" data-testid="link-services">Servicos</a>
            <a href="#depoimentos" className="text-sm text-muted-foreground transition-colors hover:text-foreground" data-testid="link-testimonials">Depoimentos</a>
            <a href="#contato" className="text-sm text-muted-foreground transition-colors hover:text-foreground" data-testid="link-contact">Contato</a>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm" data-testid="button-admin-login">
                Admin
              </Button>
            </Link>
            <Link href="/agendar">
              <Button size="sm" data-testid="button-schedule-cta">
                <Calendar className="w-4 h-4 mr-1" />
                Agendar
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a href="#sobre" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-muted-foreground rounded-md hover:bg-accent">Sobre</a>
            <a href="#servicos" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-muted-foreground rounded-md hover:bg-accent">Servicos</a>
            <a href="#depoimentos" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-muted-foreground rounded-md hover:bg-accent">Depoimentos</a>
            <a href="#contato" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-muted-foreground rounded-md hover:bg-accent">Contato</a>
          </div>
        )}
      </div>
    </nav>
  );
}

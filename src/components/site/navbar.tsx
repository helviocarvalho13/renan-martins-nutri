"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, Calendar, Menu, X, LogIn } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Quem Sou Eu", href: "#sobre" },
    { label: "Servicos", href: "#servicos" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Agenda", href: "/agenda" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
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

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary font-medium"
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary font-medium"
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" data-testid="button-admin-login">
                <LogIn className="w-4 h-4 mr-1.5" />
                Login
              </Button>
            </Link>
            <Link href="/agendar">
              <Button size="sm" data-testid="button-schedule-cta">
                <Calendar className="w-4 h-4 mr-1.5" />
                Agendar
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-4 space-y-1 bg-background/95 backdrop-blur-md rounded-b-lg">
            {navLinks.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-sm text-muted-foreground rounded-md hover:bg-accent hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-sm text-muted-foreground rounded-md hover:bg-accent hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 text-sm text-muted-foreground rounded-md hover:bg-accent hover:text-foreground transition-colors"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

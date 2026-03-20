"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, isPending } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Sobre", href: "#sobre" },
    { label: "Serviços", href: "#servicos" },
    { label: "Contato", href: "#contato" },
  ];

  const userRole = (session?.user as { role?: string } | undefined)?.role;
  const dashboardHref = userRole === "ADMIN" ? "/admin" : "/paciente";
  const isLoggedIn = Boolean(session?.user);

  return (
    <nav
      role="navigation"
      aria-label="Menu principal"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-neutral-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2" data-testid="link-brand">
            <span className="font-semibold text-base tracking-tight text-neutral-900">
              Renan Martins
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                data-testid={`link-nav-${link.label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "-")}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {!isPending && (
              isLoggedIn ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
                  data-testid="button-my-area"
                  asChild
                >
                  <Link href={dashboardHref}>
                    <LayoutDashboard className="w-4 h-4" />
                    {userRole === "ADMIN" ? "Painel Admin" : "Minha área"}
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:inline-flex text-neutral-500 hover:text-neutral-900"
                  data-testid="button-admin-login"
                  asChild
                >
                  <Link href="/login">Entrar</Link>
                </Button>
              )
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
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
          <div className="md:hidden pb-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
            {isLoggedIn ? (
              <Link
                href={dashboardHref}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-50 transition-colors"
                data-testid="link-my-area-mobile"
              >
                {userRole === "ADMIN" ? "Painel Admin" : "Minha área"}
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-50 transition-colors"
              >
                Entrar
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

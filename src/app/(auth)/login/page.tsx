"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError("Email ou senha incorretos. Verifique suas credenciais.");
        setLoading(false);
        return;
      }

      window.location.href = data.destination || "/admin";
    } catch {
      setError("Erro ao fazer login. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative bg-neutral-900 items-center justify-center">
        <Image
          src="/images/team-mago.jpg"
          alt="Team Mago - Renan Martins Nutricionista"
          width={400}
          height={400}
          className="object-contain"
          priority
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-sm space-y-8">
          <div>
            <Link href="/" className="inline-block mb-8">
              <span className="font-semibold text-neutral-900">Renan Martins</span>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900" data-testid="text-login-title">
              Bem-vindo de volta
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Entre com suas credenciais para acessar
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 rounded-xl p-3 border border-red-100" data-testid="text-login-error">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-700 text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="border-neutral-200 focus:border-neutral-400 rounded-lg"
                data-testid="input-email"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-neutral-700 text-sm">Senha</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors"
                  data-testid="link-forgot-password"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="pr-10 border-neutral-200 focus:border-neutral-400 rounded-lg"
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
                  data-testid="button-toggle-password"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
              disabled={loading}
              data-testid="button-login"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando...
                </span>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          <div className="text-center space-y-3">
            <p className="text-sm text-neutral-500">
              Ainda nao tem conta?{" "}
              <Link href="/register" className="text-neutral-900 font-medium hover:underline" data-testid="link-register">
                Criar conta
              </Link>
            </p>
            <Link href="/" className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors block" data-testid="link-back-home">
              Voltar ao site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

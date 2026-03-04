"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setHasSession(!!session);
      setChecking(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          setHasSession(true);
          setChecking(false);
        } else if (session) {
          setHasSession(true);
          setChecking(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas nao coincidem.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setError("Erro ao atualizar a senha. Tente novamente.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    setTimeout(() => {
      router.push("/login");
      router.refresh();
    }, 3000);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!hasSession) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-sm text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-red-50 flex items-center justify-center">
            <Lock className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900" data-testid="text-invalid-link">Link invalido ou expirado</h2>
          <p className="text-sm text-neutral-500">
            O link de recuperacao de senha e invalido ou ja expirou.
          </p>
          <Button
            asChild
            className="w-full rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
            data-testid="link-request-new"
          >
            <Link href="/forgot-password">Solicitar novo link</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-sm text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900" data-testid="text-password-updated">Senha atualizada!</h2>
          <p className="text-sm text-neutral-500">
            Sua senha foi alterada com sucesso. Redirecionando para o login...
          </p>
        </div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900" data-testid="text-update-password-title">
              Nova Senha
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Defina sua nova senha de acesso
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 rounded-xl p-3 border border-red-100" data-testid="text-update-error">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-neutral-700 text-sm">Nova senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="pr-10 border-neutral-200 focus:border-neutral-400 rounded-lg"
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
                  tabIndex={-1}
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-neutral-700 text-sm">Confirmar nova senha</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Repita a nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                className="border-neutral-200 focus:border-neutral-400 rounded-lg"
                data-testid="input-confirm-password"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
              disabled={loading}
              data-testid="button-update-password"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Atualizando...
                </span>
              ) : (
                "Atualizar senha"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

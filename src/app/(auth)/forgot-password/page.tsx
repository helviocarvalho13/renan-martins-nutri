"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: `${window.location.origin}/update-password`,
      }
    );

    if (resetError) {
      setError("Erro ao enviar email de recuperação. Tente novamente.");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900" data-testid="text-email-sent-title">Email enviado!</h2>
          <p className="text-sm text-neutral-500">
            Se existe uma conta com o email <strong className="text-neutral-700">{email}</strong>, você receberá um link para redefinir sua senha.
          </p>
          <p className="text-xs text-neutral-400">
            Verifique também sua caixa de spam.
          </p>
          <Button
            variant="outline"
            className="w-full rounded-full border-neutral-200"
            asChild
            data-testid="link-back-login"
          >
            <Link href="/login">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao login
            </Link>
          </Button>
          <button
            onClick={() => { setSent(false); setEmail(""); }}
            className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors"
            data-testid="button-try-another-email"
          >
            Tentar outro email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative bg-neutral-900 items-center justify-center">
        <Image
          src="/images/team-mago-circle.png"
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
              <Image src="/images/renan-martins-logo.png" alt="Renan Martins" width={120} height={40} className="object-contain" />
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900" data-testid="text-forgot-password-title">
              Recuperar Senha
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Informe seu email para receber o link de recuperação
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 rounded-xl p-3 border border-red-100" data-testid="text-forgot-error">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-700 text-sm">Email cadastrado</Label>
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

            <Button
              type="submit"
              className="w-full rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
              disabled={loading}
              data-testid="button-send-reset"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enviando...
                </span>
              ) : (
                "Enviar link de recuperação"
              )}
            </Button>
          </form>

          <div className="text-center">
            <Link href="/login" className="text-sm text-neutral-500 hover:text-neutral-900 inline-flex items-center gap-1 transition-colors" data-testid="link-back-login-bottom">
              <ArrowLeft className="w-3 h-3" />
              Voltar ao login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

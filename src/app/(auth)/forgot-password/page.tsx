"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
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
      setError("Erro ao enviar email de recuperacao. Tente novamente.");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-emerald-50 dark:from-background dark:via-background dark:to-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold" data-testid="text-email-sent-title">Email enviado!</h2>
            <p className="text-sm text-muted-foreground">
              Se existe uma conta com o email <strong>{email}</strong>, voce recebera um link para redefinir sua senha.
            </p>
            <p className="text-xs text-muted-foreground">
              Verifique tambem sua caixa de spam.
            </p>
          </div>

          <div className="text-center space-y-3">
            <Button variant="outline" className="w-full" asChild data-testid="link-back-login">
              <Link href="/login">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao login
              </Link>
            </Button>
            <button
              onClick={() => { setSent(false); setEmail(""); }}
              className="text-xs text-muted-foreground hover:underline"
              data-testid="button-try-another-email"
            >
              Tentar outro email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-emerald-50 dark:from-background dark:via-background dark:to-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Link href="/">
            <div className="w-14 h-14 mx-auto rounded-xl bg-primary flex items-center justify-center mb-4 cursor-pointer shadow-md hover:shadow-lg transition-shadow">
              <Leaf className="w-8 h-8 text-primary-foreground" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-forgot-password-title">
            Recuperar Senha
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Informe seu email para receber o link de recuperacao
          </p>
        </div>

        <Card className="shadow-lg border-border/50">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="text-sm text-destructive bg-destructive/10 rounded-lg p-3 border border-destructive/20" data-testid="text-forgot-error">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email cadastrado</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  data-testid="input-email"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading} data-testid="button-send-reset">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Enviar link de recuperacao
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center space-y-3">
          <Link href="/login" className="text-sm text-primary font-medium hover:underline inline-flex items-center gap-1" data-testid="link-back-login-bottom">
            <ArrowLeft className="w-3 h-3" />
            Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  );
}

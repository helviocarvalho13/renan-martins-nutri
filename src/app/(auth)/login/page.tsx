"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Email ou senha incorretos");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Link href="/">
            <div className="w-12 h-12 mx-auto rounded-md bg-primary flex items-center justify-center mb-4 cursor-pointer">
              <Leaf className="w-7 h-7 text-primary-foreground" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-login-title">
            Painel Administrativo
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Entre com suas credenciais para acessar
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="text-sm text-destructive bg-destructive/10 rounded-md p-3" data-testid="text-login-error">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@renanmartins.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-testid="input-password"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading} data-testid="button-login">
                {loading ? "Entrando..." : "Entrar"}
                <LogIn className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center space-y-2">
          <Link href="/cadastro" className="text-xs text-muted-foreground underline" data-testid="link-register">
            Criar conta de paciente
          </Link>
          <br />
          <Link href="/" className="text-xs text-muted-foreground underline" data-testid="link-back-home">
            Voltar ao site
          </Link>
        </div>
      </div>
    </div>
  );
}

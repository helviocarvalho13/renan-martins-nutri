"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, UserPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone,
          role: "patient",
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/paciente");
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
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-register-title">
            Criar Conta
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Cadastre-se para agendar consultas
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleRegister} className="space-y-4">
              {error && (
                <div className="text-sm text-destructive bg-destructive/10 rounded-md p-3" data-testid="text-register-error">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  data-testid="input-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone / WhatsApp</Label>
                <Input
                  id="phone"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  data-testid="input-phone"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  data-testid="input-password"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading} data-testid="button-register">
                {loading ? "Criando conta..." : "Criar Conta"}
                <UserPlus className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Ja tem uma conta?{" "}
          <Link href="/login" className="underline" data-testid="link-login">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

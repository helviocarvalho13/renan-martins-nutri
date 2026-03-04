"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function formatCPF(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function validateCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11) return false;
  if (/^(\d)\1+$/.test(digits)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(digits[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  return remainder === parseInt(digits[10]);
}

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (fullName.trim().split(" ").length < 2) {
      setError("Informe seu nome completo (nome e sobrenome).");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas nao coincidem.");
      return;
    }

    const cpfDigits = cpf.replace(/\D/g, "");
    if (cpfDigits.length > 0 && !validateCPF(cpf)) {
      setError("CPF invalido. Verifique o numero informado.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          phone: phone.replace(/\D/g, "") || null,
          cpf: cpfDigits || null,
          date_of_birth: dateOfBirth || null,
          role: "PATIENT",
        },
      },
    });

    if (authError) {
      if (authError.message.includes("already registered")) {
        setError("Este email ja esta cadastrado. Tente fazer login.");
      } else {
        setError(authError.message);
      }
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-sm text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900" data-testid="text-register-success">Conta criada com sucesso!</h2>
          <p className="text-sm text-neutral-500">
            Verifique seu email para confirmar o cadastro antes de fazer login.
          </p>
          <Button
            variant="outline"
            className="w-full rounded-full border-neutral-200"
            asChild
            data-testid="link-go-to-login"
          >
            <Link href="/login">Ir para o login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/images/renan-martins.jpg"
          alt="Renan Martins - Nutricionista"
          fill
          className="object-cover object-top"
          priority
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-white/30" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="text-2xl font-bold text-neutral-900 leading-tight">
            Comece sua jornada para uma vida mais saudavel
          </p>
          <p className="text-sm text-neutral-600 mt-2">Renan Martins — Nutricionista</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-sm space-y-8">
          <div>
            <Link href="/" className="inline-block mb-8">
              <span className="font-semibold text-neutral-900">Renan Martins</span>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900" data-testid="text-register-title">
              Criar Conta
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Cadastre-se para agendar suas consultas
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 rounded-xl p-3 border border-red-100" data-testid="text-register-error">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-neutral-700 text-sm">Nome completo *</Label>
              <Input
                id="fullName"
                placeholder="Maria da Silva"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                autoComplete="name"
                className="border-neutral-200 focus:border-neutral-400 rounded-lg"
                data-testid="input-fullname"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-700 text-sm">Email *</Label>
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

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-neutral-700 text-sm">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  autoComplete="tel"
                  className="border-neutral-200 focus:border-neutral-400 rounded-lg"
                  data-testid="input-phone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-neutral-700 text-sm">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(formatCPF(e.target.value))}
                  className="border-neutral-200 focus:border-neutral-400 rounded-lg"
                  data-testid="input-cpf"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-neutral-700 text-sm">Data de nascimento</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="border-neutral-200 focus:border-neutral-400 rounded-lg"
                data-testid="input-date-of-birth"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-neutral-700 text-sm">Senha *</Label>
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
                  data-testid="button-toggle-password"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-neutral-700 text-sm">Confirmar senha *</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Repita a senha"
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
              data-testid="button-register"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Criando conta...
                </span>
              ) : (
                "Criar Conta"
              )}
            </Button>

            <p className="text-xs text-center text-neutral-400">
              Campos marcados com * sao obrigatorios
            </p>
          </form>

          <div className="text-center space-y-3">
            <p className="text-sm text-neutral-500">
              Ja tem uma conta?{" "}
              <Link href="/login" className="text-neutral-900 font-medium hover:underline" data-testid="link-login">
                Entrar
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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, CheckCircle2, ChevronDown } from "lucide-react";
import { signUpWithProfile } from "@/lib/auth-client";

const COUNTRY_CODES = [
  { code: "+55", flag: "🇧🇷", name: "Brasil" },
  { code: "+1", flag: "🇺🇸", name: "EUA/Canadá" },
  { code: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "+598", flag: "🇺🇾", name: "Uruguai" },
  { code: "+595", flag: "🇵🇾", name: "Paraguai" },
  { code: "+56", flag: "🇨🇱", name: "Chile" },
];

function formatLocalPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatCPF(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+55");
  const [localPhone, setLocalPhone] = useState("");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [cpf, setCpf] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === countryCode) ?? COUNTRY_CODES[0];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (fullName.trim().split(" ").filter(Boolean).length < 2) {
      setError("Informe seu nome completo (nome e sobrenome).");
      return;
    }

    const localDigits = localPhone.replace(/\D/g, "");
    if (localDigits.length < 8) {
      setError("Informe um número de WhatsApp válido com DDD.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const countryDigits = countryCode.replace(/\D/g, "");
    const fullPhone = countryDigits + localDigits;

    setLoading(true);

    try {
      const { data, error: signUpError } = await signUpWithProfile({
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        phone: fullPhone,
        cpf: cpf.replace(/\D/g, "") || undefined,
        dateOfBirth: dateOfBirth || undefined,
      });

      if (signUpError) {
        const errMsg =
          typeof signUpError === "object" &&
          signUpError !== null &&
          "message" in signUpError
            ? String((signUpError as { message: string }).message)
            : JSON.stringify(signUpError);

        if (
          errMsg.toLowerCase().includes("already exists") ||
          errMsg.toLowerCase().includes("duplicate") ||
          errMsg.toLowerCase().includes("user already exists")
        ) {
          setError("Este email já está cadastrado. Tente fazer login.");
        } else if (errMsg.toLowerCase().includes("password")) {
          setError("Senha inválida. Use pelo menos 6 caracteres.");
        } else {
          setError(`Erro ao criar conta: ${errMsg}`);
        }
        setLoading(false);
        return;
      }

      if (data?.user) {
        router.push("/paciente");
        router.refresh();
      } else {
        setSuccess(true);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      setError(`Erro de conexão: ${msg}`);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-sm text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-green-600" />
          </div>
          <h2
            className="text-xl font-bold text-neutral-900"
            data-testid="text-register-success"
          >
            Conta criada com sucesso!
          </h2>
          <p className="text-sm text-neutral-500">
            Sua conta foi criada. Agora você já pode fazer login.
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
              <Image
                src="/images/renan-martins-logo.png"
                alt="Renan Martins"
                width={120}
                height={40}
                className="object-contain"
              />
            </Link>
            <h1
              className="text-2xl font-bold tracking-tight text-neutral-900"
              data-testid="text-register-title"
            >
              Criar Conta
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Cadastre-se para agendar suas consultas
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div
                className="text-sm text-red-600 bg-red-50 rounded-xl p-3 border border-red-100"
                data-testid="text-register-error"
              >
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-neutral-700 text-sm">
                Nome completo *
              </Label>
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
              <Label htmlFor="email" className="text-neutral-700 text-sm">
                Email *
              </Label>
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
              <Label htmlFor="localPhone" className="text-neutral-700 text-sm">
                WhatsApp *
              </Label>
              <div className="flex gap-2 relative">
                <button
                  type="button"
                  onClick={() => setShowCountryPicker((v) => !v)}
                  className="flex items-center gap-1.5 px-3 py-2 border border-neutral-200 rounded-lg bg-white hover:bg-neutral-50 transition-colors text-sm font-medium text-neutral-700 shrink-0"
                  data-testid="button-country-code"
                >
                  <span>{selectedCountry.flag}</span>
                  <span>{countryCode}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {showCountryPicker && (
                  <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-neutral-200 rounded-lg shadow-lg py-1 min-w-[180px]">
                    {COUNTRY_CODES.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setCountryCode(c.code);
                          setShowCountryPicker(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-50 transition-colors text-left ${
                          c.code === countryCode
                            ? "text-neutral-900 font-medium"
                            : "text-neutral-700"
                        }`}
                        data-testid={`option-country-${c.code.replace("+", "")}`}
                      >
                        <span>{c.flag}</span>
                        <span>{c.name}</span>
                        <span className="ml-auto text-neutral-400">{c.code}</span>
                      </button>
                    ))}
                  </div>
                )}

                <Input
                  id="localPhone"
                  placeholder={countryCode === "+55" ? "(11) 99999-9999" : "Número com DDD"}
                  value={localPhone}
                  onChange={(e) =>
                    setLocalPhone(
                      countryCode === "+55"
                        ? formatLocalPhone(e.target.value)
                        : e.target.value.replace(/[^\d\s\-\(\)]/g, "")
                    )
                  }
                  required
                  autoComplete="tel-national"
                  inputMode="tel"
                  className="border-neutral-200 focus:border-neutral-400 rounded-lg flex-1"
                  data-testid="input-phone"
                />
              </div>
              <p className="text-xs text-neutral-400">
                Número que você usa no WhatsApp (com DDD)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-neutral-700 text-sm">
                CPF
              </Label>
              <Input
                id="cpf"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(formatCPF(e.target.value))}
                className="border-neutral-200 focus:border-neutral-400 rounded-lg"
                data-testid="input-cpf"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-neutral-700 text-sm">
                Data de nascimento
              </Label>
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
              <Label htmlFor="password" className="text-neutral-700 text-sm">
                Senha *
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 6 caracteres"
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
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-neutral-700 text-sm">
                Confirmar senha *
              </Label>
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
              Campos marcados com * são obrigatórios
            </p>
          </form>

          <div className="text-center space-y-3">
            <p className="text-sm text-neutral-500">
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="text-neutral-900 font-medium hover:underline"
                data-testid="link-login"
              >
                Entrar
              </Link>
            </p>
            <Link
              href="/"
              className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors block"
              data-testid="link-back-home"
            >
              Voltar ao site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/types/database";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function formatPhone(value: string): string {
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

export default function PerfilPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setEmail(user.email || "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setFullName(profile.full_name || "");
        setPhone(profile.phone ? formatPhone(profile.phone) : "");
        setCpf(profile.cpf ? formatCPF(profile.cpf) : "");
        setDateOfBirth(profile.date_of_birth || "");
      }

      setLoading(false);
    };
    load();
  }, []);

  const handleCpfChange = (value: string) => {
    const formatted = formatCPF(value);
    setCpf(formatted);
    const digits = formatted.replace(/\D/g, "");
    if (digits.length === 11 && !validateCPF(formatted)) {
      setCpfError("CPF invalido");
    } else {
      setCpfError("");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const cpfDigits = cpf.replace(/\D/g, "");
    if (cpfDigits.length > 0 && !validateCPF(cpf)) {
      setCpfError("CPF invalido. Verifique o numero informado.");
      return;
    }

    setSaving(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setMessage({ type: "error", text: "Sessao expirada. Faca login novamente." });
        setSaving(false);
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName.trim(),
          phone: phone.replace(/\D/g, "") || null,
          cpf: cpfDigits || null,
          date_of_birth: dateOfBirth || null,
        })
        .eq("id", user.id);

      if (error) {
        setMessage({ type: "error", text: "Erro ao atualizar perfil. Tente novamente." });
      } else {
        setMessage({ type: "success", text: "Perfil atualizado com sucesso" });
      }
    } catch {
      setMessage({ type: "error", text: "Erro ao atualizar perfil." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-lg mx-auto">
        <Skeleton className="h-8 w-48" />
        <Card>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div>
        <h2 className="text-xl font-bold text-neutral-900" data-testid="text-perfil-title">
          Meu Perfil
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          Atualize suas informacoes pessoais
        </p>
      </div>

      {message && (
        <div
          className={`text-sm rounded-lg p-3 border ${
            message.type === "success"
              ? "text-green-700 bg-green-50 border-green-200"
              : "text-red-600 bg-red-50 border-red-200"
          }`}
          data-testid="text-profile-message"
        >
          {message.text}
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSave} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-700 text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                className="border-neutral-200 bg-neutral-50 text-neutral-500"
                data-testid="input-email"
              />
              <p className="text-xs text-neutral-400">O email nao pode ser alterado</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-neutral-700 text-sm">
                Nome completo
              </Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Seu nome completo"
                className="border-neutral-200 focus:border-neutral-400 rounded-lg"
                data-testid="input-fullname"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-neutral-700 text-sm">
                Telefone
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="(11) 99999-9999"
                className="border-neutral-200 focus:border-neutral-400 rounded-lg"
                data-testid="input-phone"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-neutral-700 text-sm">
                CPF
              </Label>
              <Input
                id="cpf"
                value={cpf}
                onChange={(e) => handleCpfChange(e.target.value)}
                placeholder="000.000.000-00"
                className={`border-neutral-200 focus:border-neutral-400 rounded-lg ${
                  cpfError ? "border-red-300 focus:border-red-400" : ""
                }`}
                data-testid="input-cpf"
              />
              {cpfError && (
                <p className="text-xs text-red-600" data-testid="text-cpf-error">
                  {cpfError}
                </p>
              )}
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

            <Button
              type="submit"
              className="w-full rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
              disabled={saving || !!cpfError}
              data-testid="button-save-profile"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Salvando...
                </span>
              ) : (
                "Salvar"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

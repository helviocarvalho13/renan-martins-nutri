"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Eye, EyeOff, Save, User, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

function displayPhone(stored: string): string {
  if (!stored) return "";
  let d = stored.replace(/\D/g, "");
  // Strip Brazil country code (+55) for local display
  if (d.startsWith("55") && d.length >= 11) {
    d = d.slice(2);
  }
  d = d.slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function displayCPF(digits: string): string {
  if (!digits) return "";
  const clean = digits.replace(/\D/g, "").slice(0, 11);
  if (clean.length <= 3) return clean;
  if (clean.length <= 6) return `${clean.slice(0, 3)}.${clean.slice(3)}`;
  if (clean.length <= 9) return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6)}`;
  return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6, 9)}-${clean.slice(9)}`;
}

export default function PatientProfilePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    fetch("/api/patient/profile")
      .then((r) => r.json())
      .then((data) => {
        setEmail(data.email || "");
        setFullName(data.full_name || "");
        setPhone(displayPhone(data.phone || ""));
        setCpf(displayCPF(data.cpf || ""));
        setDateOfBirth(data.date_of_birth || "");
      })
      .catch(() => {
        toast({ title: "Erro ao carregar perfil", variant: "destructive" });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload: Record<string, string> = { full_name: fullName, phone, cpf, date_of_birth: dateOfBirth };
    if (changingPassword) {
      payload.new_password = newPassword;
      payload.confirm_password = confirmPassword;
    }

    try {
      const res = await fetch("/api/patient/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({ title: "Erro ao salvar", description: data.error || "Tente novamente.", variant: "destructive" });
      } else {
        toast({ title: "Perfil atualizado!", description: "Suas informações foram salvas com sucesso." });
        setNewPassword("");
        setConfirmPassword("");
        setChangingPassword(false);
      }
    } catch {
      toast({ title: "Erro de conexão", description: "Tente novamente.", variant: "destructive" });
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild data-testid="button-back">
          <Link href="/paciente">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold text-neutral-900" data-testid="text-profile-title">Meu Perfil</h1>
          <p className="text-sm text-neutral-500">Edite suas informações cadastrais</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="w-4 h-4" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm text-neutral-700">Email</Label>
              <Input
                value={email}
                disabled
                className="bg-neutral-50 text-neutral-500 border-neutral-200 rounded-lg cursor-not-allowed"
                data-testid="input-email"
              />
              <p className="text-xs text-neutral-400">O email não pode ser alterado.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm text-neutral-700">Nome completo *</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Seu nome completo"
                required
                className="border-neutral-200 focus:border-neutral-400 rounded-lg"
                data-testid="input-fullname"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm text-neutral-700">WhatsApp *</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="(11) 99999-9999"
                required
                className="border-neutral-200 focus:border-neutral-400 rounded-lg"
                data-testid="input-phone"
              />
              <p className="text-xs text-neutral-400">Número que você usa no WhatsApp</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-sm text-neutral-700">CPF</Label>
                <Input
                  id="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(formatCPF(e.target.value))}
                  placeholder="000.000.000-00"
                  className="border-neutral-200 focus:border-neutral-400 rounded-lg"
                  data-testid="input-cpf"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-sm text-neutral-700">Nascimento</Label>
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lock className="w-4 h-4" />
              Alterar Senha
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!changingPassword ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setChangingPassword(true)}
                className="w-full rounded-full border-neutral-200"
                data-testid="button-change-password"
              >
                Alterar senha
              </Button>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm text-neutral-700">Nova senha *</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      minLength={6}
                      className="pr-10 border-neutral-200 focus:border-neutral-400 rounded-lg"
                      data-testid="input-new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                      tabIndex={-1}
                      data-testid="button-toggle-password"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm text-neutral-700">Confirmar nova senha *</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repita a nova senha"
                    className="border-neutral-200 focus:border-neutral-400 rounded-lg"
                    data-testid="input-confirm-password"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => { setChangingPassword(false); setNewPassword(""); setConfirmPassword(""); }}
                  className="text-neutral-400 hover:text-neutral-700 p-0"
                  data-testid="button-cancel-password"
                >
                  Cancelar alteração de senha
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
          disabled={saving}
          data-testid="button-save-profile"
        >
          {saving ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Salvando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Salvar alterações
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}

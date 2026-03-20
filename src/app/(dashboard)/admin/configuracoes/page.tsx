"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Save, RotateCcw, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Settings {
  return_window_days: number;
  whatsapp_template: string | null;
}

export default function ConfiguracoesPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Settings>({ return_window_days: 30, whatsapp_template: null });
  const [returnWindowDays, setReturnWindowDays] = useState("30");

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings");
      if (!res.ok) throw new Error("Falha ao carregar configurações");
      const data = await res.json() as Settings;
      setSettings(data);
      setReturnWindowDays(String(data.return_window_days ?? 30));
    } catch {
      toast({ title: "Erro ao carregar configurações", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSave = async () => {
    const days = parseInt(returnWindowDays, 10);
    if (isNaN(days) || days < 1 || days > 365) {
      toast({
        title: "Valor inválido",
        description: "O período de retorno deve ser entre 1 e 365 dias.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ return_window_days: days }),
      });
      if (!res.ok) throw new Error("Falha ao salvar");
      setSettings((prev) => ({ ...prev, return_window_days: days }));
      toast({ title: "Configurações salvas com sucesso!" });
    } catch {
      toast({ title: "Erro ao salvar configurações", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setReturnWindowDays(String(settings.return_window_days));
  };

  const hasChanges = returnWindowDays !== String(settings.return_window_days);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900" data-testid="text-page-title">
          Configurações
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Ajuste as regras de agendamento da plataforma.
        </p>
      </div>

      <Separator />

      {loading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-72 mt-1" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-9 w-24" />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-base" data-testid="text-card-return-title">
              Janela de Retorno
            </CardTitle>
            <CardDescription>
              Define o prazo (em dias) após uma consulta concluída em que o paciente pode agendar um retorno.
              Após esse período, o paciente deverá agendar uma nova consulta.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="return-window-days">Período de retorno (dias)</Label>
              <div className="flex items-center gap-3 max-w-xs">
                <Input
                  id="return-window-days"
                  type="number"
                  min={1}
                  max={365}
                  value={returnWindowDays}
                  onChange={(e) => setReturnWindowDays(e.target.value)}
                  className="w-28"
                  data-testid="input-return-window-days"
                />
                <span className="text-sm text-neutral-500">dias após a consulta</span>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 border border-blue-100">
              <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-700">
                Exemplo: se configurado como <strong>30 dias</strong>, um paciente que realizou consulta no dia 01/03
                poderá agendar retorno até o dia 31/03. Após isso, deverá agendar uma nova consulta.
                Essa regra se aplica tanto ao sistema web quanto ao chatbot.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <Button
                onClick={handleSave}
                disabled={saving || !hasChanges}
                className="bg-neutral-900 text-white hover:bg-neutral-800"
                data-testid="button-save-settings"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Salvando..." : "Salvar configurações"}
              </Button>
              {hasChanges && (
                <Button
                  variant="ghost"
                  onClick={handleReset}
                  disabled={saving}
                  data-testid="button-reset-settings"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Desfazer
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

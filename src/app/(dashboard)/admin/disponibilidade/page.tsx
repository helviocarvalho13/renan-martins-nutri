"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ScheduleConfig, BlockedSlot } from "@/lib/types/database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Trash2, Plus, Save, CalendarOff, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DAYS_OF_WEEK = [
  "Domingo",
  "Segunda",
  "Terca",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sabado",
];

interface DayConfig {
  day_of_week: number;
  is_active: boolean;
  start_time: string;
  end_time: string;
  slot_duration_min: number;
  break_duration_min: number;
  id?: string;
}

const DEFAULT_CONFIG: Omit<DayConfig, "day_of_week"> = {
  is_active: false,
  start_time: "08:00",
  end_time: "18:00",
  slot_duration_min: 50,
  break_duration_min: 10,
};

export default function DisponibilidadePage() {
  const supabase = createClient();
  const { toast } = useToast();

  const [configs, setConfigs] = useState<DayConfig[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addingBlock, setAddingBlock] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [returnWindowDays, setReturnWindowDays] = useState(30);
  const [savingReturnWindow, setSavingReturnWindow] = useState(false);

  const [newBlock, setNewBlock] = useState({
    date: "",
    start_time: "",
    end_time: "",
    all_day: true,
    reason: "",
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [configRes, blockedRes, settingsRes] = await Promise.all([
        supabase
          .from("schedule_config")
          .select("*")
          .order("day_of_week", { ascending: true }),
        supabase
          .from("blocked_slots")
          .select("*")
          .order("date", { ascending: true }),
        fetch("/api/settings").then(r => r.json()).catch(() => null),
      ]);

      if (settingsRes?.return_window_days) {
        setReturnWindowDays(settingsRes.return_window_days);
      }

      const existingConfigs = (configRes.data || []) as ScheduleConfig[];
      const dayConfigs: DayConfig[] = DAYS_OF_WEEK.map((_, index) => {
        const existing = existingConfigs.find((c) => c.day_of_week === index);
        if (existing) {
          return {
            day_of_week: existing.day_of_week,
            is_active: existing.is_active,
            start_time: existing.start_time,
            end_time: existing.end_time,
            slot_duration_min: existing.slot_duration_min,
            break_duration_min: existing.break_duration_min,
            id: existing.id,
          };
        }
        return { ...DEFAULT_CONFIG, day_of_week: index };
      });

      if (configRes.error) {
        toast({ title: "Erro ao carregar configurações", description: configRes.error.message, variant: "destructive" });
      }
      if (blockedRes.error) {
        toast({ title: "Erro ao carregar bloqueios", description: blockedRes.error.message, variant: "destructive" });
      }

      setConfigs(dayConfigs);
      setBlockedSlots((blockedRes.data || []) as BlockedSlot[]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateConfig = (index: number, updates: Partial<DayConfig>) => {
    setConfigs((prev) =>
      prev.map((c, i) => (i === index ? { ...c, ...updates } : c))
    );
  };

  const handleSaveConfigs = async () => {
    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      let hasError = false;
      for (const config of configs) {
        const payload = {
          admin_id: user.id,
          day_of_week: config.day_of_week,
          start_time: config.start_time,
          end_time: config.end_time,
          slot_duration_min: config.slot_duration_min,
          break_duration_min: config.break_duration_min,
          is_active: config.is_active,
        };

        if (config.id) {
          const { error } = await supabase
            .from("schedule_config")
            .update(payload)
            .eq("id", config.id);
          if (error) hasError = true;
        } else {
          const { error } = await supabase.from("schedule_config").insert(payload);
          if (error) hasError = true;
        }
      }

      await loadData();

      if (hasError) {
        toast({ title: "Erro ao salvar", description: "Alguns horários não puderam ser salvos.", variant: "destructive" });
      } else {
        toast({ title: "Horários salvos", description: "Configurações de disponibilidade atualizadas com sucesso." });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleAddBlock = async () => {
    if (!newBlock.date) return;
    setAddingBlock(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from("blocked_slots").insert({
        admin_id: user.id,
        date: newBlock.date,
        start_time: newBlock.all_day ? null : newBlock.start_time || null,
        end_time: newBlock.all_day ? null : newBlock.end_time || null,
        all_day: newBlock.all_day,
        reason: newBlock.reason || null,
      });

      if (error) {
        toast({ title: "Erro ao adicionar bloqueio", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Bloqueio adicionado", description: "Data bloqueada com sucesso." });
        setNewBlock({
          date: "",
          start_time: "",
          end_time: "",
          all_day: true,
          reason: "",
        });
      }
      await loadData();
    } finally {
      setAddingBlock(false);
    }
  };

  const handleSaveReturnWindow = async () => {
    setSavingReturnWindow(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ return_window_days: returnWindowDays }),
      });
      if (res.ok) {
        toast({ title: "Configuração salva", description: "Janela de retorno atualizada com sucesso." });
      } else {
        const data = await res.json().catch(() => null);
        toast({ title: "Erro ao salvar", description: data?.error || "Não foi possível salvar.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erro ao salvar", description: "Erro de conexão.", variant: "destructive" });
    }
    setSavingReturnWindow(false);
  };

  const handleDeleteBlock = async (id: string) => {
    setDeletingId(id);
    try {
      const { error } = await supabase.from("blocked_slots").delete().eq("id", id);
      if (error) {
        toast({ title: "Erro ao remover bloqueio", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Bloqueio removido", description: "O bloqueio foi removido com sucesso." });
      }
      await loadData();
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold" data-testid="text-page-title">
          Disponibilidade
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure seus horarios de atendimento e bloqueie datas
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="w-5 h-5" />
            Horarios por Dia da Semana
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {configs.map((config, index) => (
            <div key={config.day_of_week}>
              <div className="space-y-3 sm:space-y-0">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="w-24 shrink-0">
                    <Label
                      className="font-medium"
                      data-testid={`text-day-label-${config.day_of_week}`}
                    >
                      {DAYS_OF_WEEK[config.day_of_week]}
                    </Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      checked={config.is_active}
                      onCheckedChange={(checked) =>
                        updateConfig(index, { is_active: checked })
                      }
                      data-testid={`switch-active-${config.day_of_week}`}
                    />
                    <Label className="text-muted-foreground text-xs">
                      {config.is_active ? "Ativo" : "Inativo"}
                    </Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-2 sm:mt-0 sm:ml-28">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-muted-foreground whitespace-nowrap">
                      Inicio
                    </Label>
                    <Input
                      type="time"
                      value={config.start_time}
                      onChange={(e) =>
                        updateConfig(index, { start_time: e.target.value })
                      }
                      disabled={!config.is_active}
                      className="w-full sm:w-32"
                      data-testid={`input-start-time-${config.day_of_week}`}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-muted-foreground whitespace-nowrap">
                      Fim
                    </Label>
                    <Input
                      type="time"
                      value={config.end_time}
                      onChange={(e) =>
                        updateConfig(index, { end_time: e.target.value })
                      }
                      disabled={!config.is_active}
                      className="w-full sm:w-32"
                      data-testid={`input-end-time-${config.day_of_week}`}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-muted-foreground whitespace-nowrap">
                      Duracao (min)
                    </Label>
                    <Input
                      type="number"
                      value={config.slot_duration_min}
                      onChange={(e) =>
                        updateConfig(index, {
                          slot_duration_min: parseInt(e.target.value) || 0,
                        })
                      }
                      disabled={!config.is_active}
                      className="w-full sm:w-20"
                      min={10}
                      max={120}
                      data-testid={`input-slot-duration-${config.day_of_week}`}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-muted-foreground whitespace-nowrap">
                      Intervalo (min)
                    </Label>
                    <Input
                      type="number"
                      value={config.break_duration_min}
                      onChange={(e) =>
                        updateConfig(index, {
                          break_duration_min: parseInt(e.target.value) || 0,
                        })
                      }
                      disabled={!config.is_active}
                      className="w-full sm:w-20"
                      min={0}
                      max={60}
                      data-testid={`input-break-duration-${config.day_of_week}`}
                    />
                  </div>
                </div>
              </div>
              {index < configs.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}

          <div className="pt-4">
            <Button
              onClick={handleSaveConfigs}
              disabled={saving}
              data-testid="button-save-schedule"
            >
              <Save className="w-4 h-4" />
              {saving ? "Salvando..." : "Salvar Horarios"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarOff className="w-5 h-5" />
            Bloquear Datas/Horarios
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-end">
              <div className="flex items-center gap-2">
                <Label className="text-sm whitespace-nowrap">Data</Label>
                <Input
                  type="date"
                  value={newBlock.date}
                  onChange={(e) =>
                    setNewBlock((p) => ({ ...p, date: e.target.value }))
                  }
                  className="w-full sm:w-44"
                  data-testid="input-block-date"
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={newBlock.all_day}
                  onCheckedChange={(checked) =>
                    setNewBlock((p) => ({ ...p, all_day: checked }))
                  }
                  data-testid="switch-block-all-day"
                />
                <Label className="text-sm">Dia inteiro</Label>
              </div>

              {!newBlock.all_day && (
                <>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-muted-foreground whitespace-nowrap">
                      Inicio
                    </Label>
                    <Input
                      type="time"
                      value={newBlock.start_time}
                      onChange={(e) =>
                        setNewBlock((p) => ({
                          ...p,
                          start_time: e.target.value,
                        }))
                      }
                      className="w-full sm:w-32"
                      data-testid="input-block-start-time"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-muted-foreground whitespace-nowrap">
                      Fim
                    </Label>
                    <Input
                      type="time"
                      value={newBlock.end_time}
                      onChange={(e) =>
                        setNewBlock((p) => ({ ...p, end_time: e.target.value }))
                      }
                      className="w-full sm:w-32"
                      data-testid="input-block-end-time"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center gap-2">
                <Label className="text-sm whitespace-nowrap">Motivo</Label>
                <Input
                  value={newBlock.reason}
                  onChange={(e) =>
                    setNewBlock((p) => ({ ...p, reason: e.target.value }))
                  }
                  placeholder="Ex: Feriado, Ferias..."
                  className="w-full sm:w-48"
                  data-testid="input-block-reason"
                />
              </div>

              <div>
                <Button
                  onClick={handleAddBlock}
                  disabled={addingBlock || !newBlock.date}
                  variant="outline"
                  className="w-full sm:w-auto"
                  data-testid="button-add-block"
                >
                  <Plus className="w-4 h-4" />
                  {addingBlock ? "Adicionando..." : "Adicionar"}
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              Bloqueios cadastrados
            </h3>
            {blockedSlots.length === 0 ? (
              <p
                className="text-sm text-muted-foreground"
                data-testid="text-no-blocks"
              >
                Nenhum bloqueio cadastrado
              </p>
            ) : (
              <div className="space-y-2">
                {blockedSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between gap-4 p-3 rounded-md border flex-wrap"
                    data-testid={`blocked-slot-${slot.id}`}
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge variant="secondary" data-testid={`badge-block-date-${slot.id}`}>
                        {slot.date}
                      </Badge>
                      {slot.all_day ? (
                        <Badge variant="outline">Dia inteiro</Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          {slot.start_time} - {slot.end_time}
                        </span>
                      )}
                      {slot.reason && (
                        <span className="text-sm">{slot.reason}</span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteBlock(slot.id)}
                      disabled={deletingId === slot.id}
                      data-testid={`button-delete-block-${slot.id}`}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <RotateCcw className="w-5 h-5" />
            Janela de Retorno
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Após uma consulta concluída, o paciente pode agendar um retorno dentro desta janela de dias. Após esse período, será necessário agendar uma consulta regular.
          </p>
          <div className="flex items-center gap-3">
            <Label className="text-sm whitespace-nowrap">Dias para retorno</Label>
            <Input
              type="number"
              value={returnWindowDays}
              onChange={(e) => setReturnWindowDays(parseInt(e.target.value) || 30)}
              min={1}
              max={365}
              className="w-24"
              data-testid="input-return-window-days"
            />
            <span className="text-sm text-muted-foreground">dias</span>
          </div>
          <Button
            onClick={handleSaveReturnWindow}
            disabled={savingReturnWindow}
            data-testid="button-save-return-window"
          >
            <Save className="w-4 h-4" />
            {savingReturnWindow ? "Salvando..." : "Salvar"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

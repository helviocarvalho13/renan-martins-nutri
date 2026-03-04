"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Appointment } from "@/lib/types/database";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  CalendarPlus,
  Clock,
  CalendarCheck,
  ArrowRight,
  XCircle,
} from "lucide-react";

const statusMap: Record<string, { label: string; class: string }> = {
  CONFIRMED: { label: "Confirmada", class: "bg-blue-100 text-blue-700" },
  PENDING: { label: "Pendente", class: "bg-yellow-100 text-yellow-700" },
  CANCELLED: { label: "Cancelada", class: "bg-red-100 text-red-700" },
  COMPLETED: { label: "Concluida", class: "bg-green-100 text-green-700" },
  NO_SHOW: { label: "Nao compareceu", class: "bg-neutral-200 text-neutral-600" },
};

function typeLabel(type: string) {
  return type === "FIRST_VISIT" ? "Primeira Consulta" : "Retorno";
}

export default function ConsultasPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchAppointments = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("appointments")
      .select("*")
      .eq("patient_id", user.id)
      .order("date", { ascending: true });

    setAppointments(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const upcoming = appointments.filter(
    (a) => a.date >= today && ["PENDING", "CONFIRMED"].includes(a.status)
  );

  const history = appointments
    .filter((a) => !(a.date >= today && ["PENDING", "CONFIRMED"].includes(a.status)))
    .sort((a, b) => b.date.localeCompare(a.date));

  const completedWithReturn = appointments.find(
    (a) => a.status === "COMPLETED" && a.return_suggested_date
  );
  const hasActiveReturn = appointments.some(
    (a) => a.type === "RETURN" && ["PENDING", "CONFIRMED"].includes(a.status)
  );
  const showReturnSuggestion = completedWithReturn && !hasActiveReturn;

  const canCancel = (appointment: Appointment) => {
    const dt = new Date(`${appointment.date}T${appointment.start_time}`);
    return dt.getTime() > Date.now() + 12 * 60 * 60 * 1000;
  };

  const handleCancel = async (appointmentId: string) => {
    const confirmed = window.confirm(
      "Tem certeza que deseja cancelar esta consulta?"
    );
    if (!confirmed) return;

    setCancellingId(appointmentId);
    try {
      const res = await fetch("/api/patient/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointment_id: appointmentId }),
      });
      const data = await res.json();
      if (res.ok) {
        await fetchAppointments();
      } else {
        alert(data.error || "Erro ao cancelar consulta.");
      }
    } catch {
      alert("Erro ao cancelar consulta.");
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-neutral-900" data-testid="text-consultas-title">
          Minhas Consultas
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          Gerencie suas consultas agendadas e veja seu historico
        </p>
      </div>

      {showReturnSuggestion && (
        <Card className="border-blue-200 bg-blue-50" data-testid="card-return-suggestion">
          <CardContent className="p-4 flex items-center gap-3 flex-wrap">
            <CalendarCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-blue-900">
                Retorno sugerido para{" "}
                {format(
                  new Date(completedWithReturn.return_suggested_date + "T12:00:00"),
                  "dd/MM/yyyy"
                )}
              </p>
            </div>
            <Button variant="outline" size="sm" asChild data-testid="link-schedule-return">
              <Link href="/paciente/agendar">
                Agendar
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div>
        <h3 className="text-base font-semibold text-neutral-900 mb-4" data-testid="text-upcoming-title">
          Proximas Consultas
        </h3>
        {upcoming.length === 0 ? (
          <Card data-testid="card-no-upcoming">
            <CardContent className="p-6 text-center">
              <CalendarDays className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <p className="text-sm text-neutral-500 mb-3">
                Voce nao tem consultas agendadas
              </p>
              <Button variant="outline" size="sm" asChild data-testid="link-schedule-new">
                <Link href="/paciente/agendar">
                  <CalendarPlus className="w-4 h-4 mr-1" />
                  Agendar Consulta
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {upcoming.map((apt) => (
              <Card key={apt.id} data-testid={`card-upcoming-${apt.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-neutral-900">
                          {typeLabel(apt.type)}
                        </span>
                        <Badge
                          className={`${statusMap[apt.status]?.class || ""} border-0 text-xs`}
                          data-testid={`badge-status-${apt.id}`}
                        >
                          {statusMap[apt.status]?.label || apt.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-neutral-500 flex-wrap">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {format(new Date(apt.date + "T12:00:00"), "dd 'de' MMMM 'de' yyyy", {
                            locale: ptBR,
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {apt.start_time.slice(0, 5)} - {apt.end_time.slice(0, 5)}
                        </span>
                      </div>
                    </div>
                    {canCancel(apt) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleCancel(apt.id)}
                        disabled={cancellingId === apt.id}
                        data-testid={`button-cancel-${apt.id}`}
                      >
                        {cancellingId === apt.id ? (
                          <span className="flex items-center gap-1">
                            <span className="w-3 h-3 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                            Cancelando...
                          </span>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 mr-1" />
                            Cancelar
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Separator />

      <div>
        <h3 className="text-base font-semibold text-neutral-900 mb-4" data-testid="text-history-title">
          Historico
        </h3>
        {history.length === 0 ? (
          <Card data-testid="card-no-history">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-neutral-500">
                Nenhuma consulta no historico
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {history.map((apt) => (
              <Card key={apt.id} data-testid={`card-history-${apt.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-neutral-900">
                          {typeLabel(apt.type)}
                        </span>
                        <Badge
                          className={`${statusMap[apt.status]?.class || ""} border-0 text-xs`}
                          data-testid={`badge-history-status-${apt.id}`}
                        >
                          {statusMap[apt.status]?.label || apt.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-neutral-500 flex-wrap">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {format(new Date(apt.date + "T12:00:00"), "dd 'de' MMMM 'de' yyyy", {
                            locale: ptBR,
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {apt.start_time.slice(0, 5)} - {apt.end_time.slice(0, 5)}
                        </span>
                      </div>
                      {apt.notes && (
                        <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                          {apt.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

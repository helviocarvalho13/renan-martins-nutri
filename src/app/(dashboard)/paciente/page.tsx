"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  CalendarPlus,
  CalendarCheck,
  Clock,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Appointment } from "@/lib/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const statusMap: Record<string, { label: string; class: string }> = {
  CONFIRMED: { label: "Confirmada", class: "bg-blue-100 text-blue-700" },
  PENDING: { label: "Pendente", class: "bg-yellow-100 text-yellow-700" },
  CANCELLED: { label: "Cancelada", class: "bg-red-100 text-red-700" },
  COMPLETED: { label: "Concluída", class: "bg-green-100 text-green-700" },
  NO_SHOW: { label: "Não compareceu", class: "bg-neutral-200 text-neutral-600" },
};

function formatTypeLabel(type: string) {
  return type === "FIRST_VISIT" ? "Primeira Consulta" : "Retorno";
}

export default function PatientDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const supabase = createClient();

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUserName(user.user_metadata?.full_name || user.user_metadata?.name || user.email || "Paciente");

      const { data: appts, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("patient_id", user.id)
        .order("date", { ascending: true });

      if (error) {
        toast({
          title: "Erro ao carregar consultas",
          description: "Não foi possível carregar suas consultas. Tente novamente.",
          variant: "destructive",
        });
      }

      setAppointments((appts || []) as Appointment[]);
    } catch {
      toast({
        title: "Erro ao carregar consultas",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const upcoming = appointments
    .filter(
      (a) =>
        a.date >= today &&
        (a.status === "PENDING" || a.status === "CONFIRMED")
    )
    .sort((a, b) => a.date.localeCompare(b.date));

  const history = appointments
    .filter(
      (a) =>
        !(a.date >= today && (a.status === "PENDING" || a.status === "CONFIRMED"))
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  const hasActiveReturn = appointments.some(
    (a) =>
      a.type === "RETURN" &&
      (a.status === "PENDING" || a.status === "CONFIRMED") &&
      a.date >= today
  );

  const completedFirstVisitsWithReturn = appointments.filter(
    (a) =>
      a.type === "FIRST_VISIT" &&
      a.status === "COMPLETED" &&
      a.return_suggested_date
  );

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
        toast({
          title: "Consulta cancelada",
          description: "Sua consulta foi cancelada com sucesso.",
        });
        await fetchData();
      } else {
        toast({
          title: "Erro ao cancelar",
          description: data.error || "Não foi possível cancelar a consulta.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Erro ao cancelar",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900" data-testid="text-dashboard-title">
        Olá, {userName.split(" ")[0]}
      </h1>

      <Link href="/paciente/agendar" data-testid="link-schedule-new">
        <Card className="hover-elevate cursor-pointer">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-neutral-900 flex items-center justify-center shrink-0">
              <CalendarPlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-neutral-900" data-testid="text-schedule-card-title">Agendar Consulta</p>
              <p className="text-sm text-neutral-500 mt-0.5">Marque uma nova consulta com o nutricionista</p>
            </div>
          </CardContent>
        </Card>
      </Link>

      {!hasActiveReturn && completedFirstVisitsWithReturn.length > 0 && (
        <div className="space-y-3">
          {completedFirstVisitsWithReturn.map((a) => (
            <Card key={a.id} className="border-blue-200 bg-blue-50" data-testid={`card-return-suggestion-${a.id}`}>
              <CardContent className="p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <CalendarCheck className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900" data-testid={`text-return-date-${a.id}`}>
                      Retorno sugerido para{" "}
                      {format(new Date(a.return_suggested_date + "T12:00:00"), "dd/MM/yyyy")}
                    </p>
                    <p className="text-xs text-blue-700 mt-0.5">
                      {formatTypeLabel(a.type)} concluída em{" "}
                      {format(new Date(a.date + "T12:00:00"), "dd/MM/yyyy")}
                    </p>
                  </div>
                </div>
                <Button size="sm" asChild>
                  <Link href="/paciente/agendar?type=RETURN" data-testid={`link-schedule-return-${a.id}`}>
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Agendar Retorno
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div>
        <h2 className="text-base font-semibold text-neutral-900 mb-4" data-testid="text-upcoming-title">
          Próximas Consultas
        </h2>
        {upcoming.length === 0 ? (
          <Card data-testid="card-no-upcoming">
            <CardContent className="p-6 text-center">
              <CalendarDays className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <p className="text-sm text-neutral-500">
                Você não tem consultas agendadas
              </p>
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
                          {formatTypeLabel(apt.type)}
                        </span>
                        <Badge
                          className={`${statusMap[apt.status]?.class || ""} border-0 text-xs`}
                          data-testid={`badge-status-${apt.id}`}
                        >
                          {statusMap[apt.status]?.label || apt.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-neutral-500 flex-wrap">
                        <span className="flex items-center gap-1" data-testid={`text-date-${apt.id}`}>
                          <CalendarDays className="w-3.5 h-3.5" />
                          {format(new Date(apt.date + "T12:00:00"), "dd 'de' MMMM 'de' yyyy", {
                            locale: ptBR,
                          })}
                        </span>
                        <span className="flex items-center gap-1" data-testid={`text-time-${apt.id}`}>
                          <Clock className="w-3.5 h-3.5" />
                          {apt.start_time.slice(0, 5)} - {apt.end_time.slice(0, 5)}
                        </span>
                      </div>
                    </div>
                    {canCancel(apt) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200"
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
        <h2 className="text-base font-semibold text-neutral-900 mb-4" data-testid="text-history-title">
          Histórico de Consultas
        </h2>
        {history.length === 0 ? (
          <Card data-testid="card-no-history">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-neutral-500">
                Nenhuma consulta no histórico
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {history.map((apt) => {
              const status = statusMap[apt.status] || statusMap.PENDING;
              return (
                <Card key={apt.id} data-testid={`card-history-${apt.id}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-neutral-900">
                            {formatTypeLabel(apt.type)}
                          </span>
                          <Badge
                            className={`${status.class} border-0 text-xs`}
                            data-testid={`badge-history-status-${apt.id}`}
                          >
                            {status.label}
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
              );
            })}
          </div>
        )}
      </div>

      {upcoming.length === 0 && history.length === 0 && (
        <Card data-testid="card-empty-state">
          <CardContent className="p-8 text-center">
            <CalendarDays className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-600 font-medium mb-1" data-testid="text-empty-title">
              Nenhuma consulta ainda
            </p>
            <p className="text-sm text-neutral-400 mb-4" data-testid="text-empty-description">
              Agende sua primeira consulta com o nutricionista.
            </p>
            <Button asChild>
              <Link href="/paciente/agendar" data-testid="link-schedule-first">
                <CalendarPlus className="w-4 h-4 mr-1" />
                Agendar primeira consulta
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

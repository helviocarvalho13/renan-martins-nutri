"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  CalendarPlus,
  Clock,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Appointment } from "@/lib/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const statusMap: Record<string, { label: string; class: string }> = {
  CONFIRMED: { label: "Confirmada", class: "bg-blue-100 text-blue-700" },
  PENDING: { label: "Pendente", class: "bg-yellow-100 text-yellow-700" },
  CANCELLED: { label: "Cancelada", class: "bg-red-100 text-red-700" },
  COMPLETED: { label: "Concluida", class: "bg-green-100 text-green-700" },
  NO_SHOW: { label: "Nao compareceu", class: "bg-neutral-200 text-neutral-600" },
};

export default function PatientDashboard() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [returnSuggestion, setReturnSuggestion] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUserName(user.user_metadata?.full_name || user.user_metadata?.name || user.email || "Paciente");

      const { data: appts } = await supabase
        .from("appointments")
        .select("*")
        .eq("patient_id", user.id)
        .order("date", { ascending: true });

      const allAppts = (appts || []) as Appointment[];
      setAppointments(allAppts);

      const today = new Date().toISOString().split("T")[0];
      const hasPendingReturn = allAppts.some(
        (a) =>
          a.type === "RETURN" &&
          (a.status === "PENDING" || a.status === "CONFIRMED") &&
          a.date >= today
      );

      if (!hasPendingReturn) {
        const completedWithReturn = allAppts.find(
          (a) =>
            a.status === "COMPLETED" &&
            a.return_suggested_date
        );
        if (completedWithReturn) {
          setReturnSuggestion(completedWithReturn.return_suggested_date);
        }
      }

      setLoading(false);
    }
    loadData();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const upcoming = appointments
    .filter(
      (a) =>
        a.date >= today &&
        (a.status === "PENDING" || a.status === "CONFIRMED")
    )
    .sort((a, b) => a.date.localeCompare(b.date));

  const past = appointments
    .filter(
      (a) =>
        !(a.date >= today && (a.status === "PENDING" || a.status === "CONFIRMED"))
    )
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  const nextAppointment = upcoming[0] || null;

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
        <Skeleton className="h-6 w-32" />
        <div className="space-y-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  const formatTypeLabel = (type: string) =>
    type === "FIRST_VISIT" ? "Primeira Consulta" : "Retorno";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900" data-testid="text-dashboard-title">
        Ola, {userName.split(" ")[0]}
      </h1>

      {nextAppointment && (
        <Card data-testid="card-next-appointment">
          <CardContent className="p-6">
            <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-3">
              Proxima Consulta
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-lg font-semibold text-neutral-900" data-testid="text-next-type">
                    {formatTypeLabel(nextAppointment.type)}
                  </span>
                  <Badge
                    className={`${statusMap[nextAppointment.status]?.class || ""} border-0`}
                    data-testid="badge-next-status"
                  >
                    {statusMap[nextAppointment.status]?.label || nextAppointment.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                  <span className="flex items-center gap-1.5" data-testid="text-next-date">
                    <CalendarDays className="w-4 h-4 text-neutral-400" />
                    {format(new Date(nextAppointment.date + "T00:00:00"), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </span>
                  <span className="flex items-center gap-1.5" data-testid="text-next-time">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    {nextAppointment.start_time.slice(0, 5)} - {nextAppointment.end_time.slice(0, 5)}
                  </span>
                </div>
              </div>
              <Link href="/paciente/consultas" data-testid="link-view-details">
                <Button variant="outline" size="sm">
                  Ver detalhes
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {returnSuggestion && (
        <Card className="border-blue-200 bg-blue-50" data-testid="card-return-suggestion">
          <CardContent className="p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <CalendarCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <p className="text-sm text-blue-800" data-testid="text-return-suggestion">
                Retorno sugerido para{" "}
                {format(new Date(returnSuggestion + "T00:00:00"), "dd/MM/yyyy")}
              </p>
            </div>
            <Link href="/paciente/agendar" data-testid="link-schedule-return">
              <Button size="sm">
                Agendar retorno
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/paciente/agendar" data-testid="link-quick-schedule">
          <Card className="hover-elevate cursor-pointer h-full">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center shrink-0">
                <CalendarPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm text-neutral-900">Agendar Consulta</p>
                <p className="text-xs text-neutral-500 mt-0.5">Marque uma nova consulta</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/paciente/consultas" data-testid="link-quick-appointments">
          <Card className="hover-elevate cursor-pointer h-full">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                <CalendarDays className="w-5 h-5 text-neutral-700" />
              </div>
              <div>
                <p className="font-semibold text-sm text-neutral-900">Ver Consultas</p>
                <p className="text-xs text-neutral-500 mt-0.5">Historico e proximas consultas</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {past.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3" data-testid="text-history-title">
            Historico Recente
          </h2>
          <div className="space-y-3">
            {past.map((a) => {
              const status = statusMap[a.status] || statusMap.PENDING;
              return (
                <Card key={a.id} data-testid={`card-history-${a.id}`}>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-sm text-neutral-900">
                            {formatTypeLabel(a.type)}
                          </span>
                          <Badge className={`${status.class} border-0 text-xs`}>
                            {status.label}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="w-3 h-3" />
                            {format(new Date(a.date + "T00:00:00"), "dd/MM/yyyy")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {a.start_time.slice(0, 5)} - {a.end_time.slice(0, 5)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {upcoming.length === 0 && past.length === 0 && (
        <Card data-testid="card-empty-state">
          <CardContent className="p-8 text-center">
            <CalendarDays className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-600 font-medium mb-1" data-testid="text-empty-title">
              Nenhuma consulta ainda
            </p>
            <p className="text-sm text-neutral-400 mb-4" data-testid="text-empty-description">
              Agende sua primeira consulta com o nutricionista.
            </p>
            <Link href="/paciente/agendar" data-testid="link-schedule-first">
              <Button>
                <CalendarPlus className="w-4 h-4 mr-1" />
                Agendar primeira consulta
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

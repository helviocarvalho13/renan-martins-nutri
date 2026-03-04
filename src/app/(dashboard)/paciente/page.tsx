"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Leaf,
  LogOut,
  CalendarDays,
  Clock,
  Calendar,
  Plus,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Appointment, Service } from "@/lib/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Pendente", variant: "outline" },
  confirmed: { label: "Confirmado", variant: "default" },
  cancelled: { label: "Cancelado", variant: "destructive" },
  completed: { label: "Concluido", variant: "secondary" },
};

export default function PatientDashboard() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUserName(user.user_metadata?.name || user.email || "Paciente");

      const { data: appts } = await supabase
        .from("appointments")
        .select("*")
        .eq("patient_email", user.email)
        .order("date", { ascending: false });
      const { data: svcs } = await supabase.from("services").select("*");

      setAppointments(appts || []);
      setServices(svcs || []);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="space-y-3 w-full max-w-md p-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight">Minha Area</span>
                <span className="text-[10px] text-muted-foreground leading-tight">{userName}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/agendar">
                <Button size="sm" data-testid="button-new-appointment">
                  <Plus className="w-4 h-4 mr-1" />
                  Nova Consulta
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} data-testid="button-logout">
                <LogOut className="w-4 h-4 mr-1" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold tracking-tight mb-6" data-testid="text-patient-title">
          Minhas Consultas
        </h1>

        {appointments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4" data-testid="text-no-appointments">
                Voce ainda nao tem consultas agendadas.
              </p>
              <Link href="/agendar">
                <Button data-testid="button-schedule-first">
                  <Plus className="w-4 h-4 mr-1" />
                  Agendar primeira consulta
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {appointments.map((a) => {
              const service = services.find((s) => s.id === a.service_id);
              const status = statusMap[a.status] || statusMap.pending;
              return (
                <Card key={a.id} data-testid={`card-appointment-${a.id}`}>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-sm">{service?.name || "Consulta"}</span>
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
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
        )}
      </div>
    </div>
  );
}

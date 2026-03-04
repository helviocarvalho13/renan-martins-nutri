"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Profile, Appointment, AppointmentStatus } from "@/lib/types/database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, User, Phone, CreditCard, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const statusColors: Record<AppointmentStatus, string> = {
  CONFIRMED: "bg-blue-100 text-blue-700 border-blue-200",
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
  COMPLETED: "bg-green-100 text-green-700 border-green-200",
  NO_SHOW: "bg-neutral-200 text-neutral-600 border-neutral-300",
};

const statusLabels: Record<AppointmentStatus, string> = {
  CONFIRMED: "Confirmada",
  PENDING: "Pendente",
  CANCELLED: "Cancelada",
  COMPLETED: "Concluída",
  NO_SHOW: "No-show",
};

const typeLabels: Record<string, string> = {
  FIRST_VISIT: "Primeira Consulta",
  RETURN: "Retorno",
};

export default function PacienteDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const supabase = createClient();

      const [profileRes, appointmentsRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", id).single(),
        supabase
          .from("appointments")
          .select("*")
          .eq("patient_id", id)
          .order("date", { ascending: false })
          .order("start_time", { ascending: false }),
      ]);

      if (profileRes.error) {
        toast({ title: "Erro ao carregar paciente", description: profileRes.error.message, variant: "destructive" });
      } else if (profileRes.data) {
        setProfile(profileRes.data as Profile);
      }
      if (appointmentsRes.error) {
        toast({ title: "Erro ao carregar consultas", description: appointmentsRes.error.message, variant: "destructive" });
      } else if (appointmentsRes.data) {
        setAppointments(appointmentsRes.data as Appointment[]);
      }
      setLoading(false);
    }

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-4" data-testid="loading-skeleton">
        <Skeleton className="h-8 w-48" />
        <Card>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-48" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-4 md:p-6 space-y-4">
        <Link href="/admin/pacientes">
          <Button variant="ghost" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground" data-testid="text-not-found">
            Paciente não encontrado.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-4">
      <Link href="/admin/pacientes">
        <Button variant="ghost" data-testid="button-back">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle data-testid="text-patient-name">{profile.full_name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-start gap-4">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-muted shrink-0">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name}
                  className="h-16 w-16 rounded-full object-cover"
                  data-testid="img-avatar"
                />
              ) : (
                <User className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 space-y-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={profile.is_active ? "default" : "secondary"}
                  data-testid="badge-active-status"
                >
                  {profile.is_active ? "Ativo" : "Inativo"}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {profile.phone && (
                  <div className="flex items-center gap-2" data-testid="text-phone">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile.cpf && (
                  <div className="flex items-center gap-2" data-testid="text-cpf">
                    <CreditCard className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{profile.cpf}</span>
                  </div>
                )}
                {profile.date_of_birth && (
                  <div className="flex items-center gap-2" data-testid="text-dob">
                    <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>
                      {format(new Date(profile.date_of_birth + "T12:00:00"), "dd/MM/yyyy")}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground" data-testid="text-created-at">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>
                    Cadastrado em {format(new Date(profile.created_at), "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold" data-testid="text-history-title">
            Histórico de Consultas
          </h2>
          <Badge variant="secondary" data-testid="text-appointment-count">
            {appointments.length} consulta{appointments.length !== 1 ? "s" : ""}
          </Badge>
        </div>

        {appointments.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground" data-testid="text-no-appointments">
              Nenhuma consulta encontrada.
            </CardContent>
          </Card>
        ) : (
          appointments.map((appt) => (
            <Card key={appt.id} data-testid={`card-appointment-${appt.id}`}>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium" data-testid={`text-appt-date-${appt.id}`}>
                        {format(new Date(appt.date + "T12:00:00"), "dd/MM/yyyy")}
                      </span>
                      <span className="text-sm text-muted-foreground" data-testid={`text-appt-time-${appt.id}`}>
                        {appt.start_time.slice(0, 5)} - {appt.end_time.slice(0, 5)}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" data-testid={`badge-appt-type-${appt.id}`}>
                        {typeLabels[appt.type] ?? appt.type}
                      </Badge>
                      <Badge
                        className={statusColors[appt.status]}
                        data-testid={`badge-appt-status-${appt.id}`}
                      >
                        {statusLabels[appt.status]}
                      </Badge>
                    </div>
                    {appt.notes && (
                      <p className="text-sm text-muted-foreground mt-1" data-testid={`text-appt-notes-${appt.id}`}>
                        {appt.notes}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

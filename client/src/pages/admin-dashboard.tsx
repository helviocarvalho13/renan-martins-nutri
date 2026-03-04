import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Appointment, Service, User } from "@shared/schema";
import {
  Leaf,
  LogOut,
  CalendarDays,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart3,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Pendente", variant: "outline" },
  confirmed: { label: "Confirmado", variant: "default" },
  cancelled: { label: "Cancelado", variant: "destructive" },
  completed: { label: "Concluido", variant: "secondary" },
};

function StatsCards({ appointments }: { appointments: Appointment[] | undefined }) {
  const today = format(new Date(), "yyyy-MM-dd");
  const todayAppointments = appointments?.filter((a) => a.date === today) || [];
  const pendingCount = appointments?.filter((a) => a.status === "pending").length || 0;
  const confirmedCount = appointments?.filter((a) => a.status === "confirmed").length || 0;
  const totalCount = appointments?.length || 0;

  const stats = [
    { label: "Hoje", value: todayAppointments.length, icon: Calendar, color: "text-primary" },
    { label: "Pendentes", value: pendingCount, icon: AlertCircle, color: "text-yellow-600 dark:text-yellow-400" },
    { label: "Confirmadas", value: confirmedCount, icon: CheckCircle2, color: "text-primary" },
    { label: "Total", value: totalCount, icon: BarChart3, color: "text-muted-foreground" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} data-testid={`card-stat-${stat.label.toLowerCase()}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function AppointmentRow({
  appointment,
  services,
}: {
  appointment: Appointment;
  services: Service[] | undefined;
}) {
  const { toast } = useToast();
  const service = services?.find((s) => s.id === appointment.serviceId);
  const status = statusMap[appointment.status] || statusMap.pending;

  const updateStatus = useMutation({
    mutationFn: async (newStatus: string) => {
      const res = await apiRequest("PATCH", `/api/appointments/${appointment.id}`, { status: newStatus });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
      toast({ title: "Status atualizado" });
    },
    onError: (error: Error) => {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    },
  });

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border rounded-md"
      data-testid={`row-appointment-${appointment.id}`}
    >
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-sm truncate">{appointment.patientName}</span>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <CalendarDays className="w-3 h-3" />
            {format(new Date(appointment.date + "T00:00:00"), "dd/MM/yyyy")}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {appointment.startTime.slice(0, 5)} - {appointment.endTime.slice(0, 5)}
          </span>
          {service && (
            <span className="flex items-center gap-1">
              <Leaf className="w-3 h-3" />
              {service.name}
            </span>
          )}
        </div>
        {appointment.patientPhone && (
          <p className="text-xs text-muted-foreground">{appointment.patientEmail} | {appointment.patientPhone}</p>
        )}
        {appointment.notes && (
          <p className="text-xs text-muted-foreground italic">Obs: {appointment.notes}</p>
        )}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <Select
          value={appointment.status}
          onValueChange={(value) => updateStatus.mutate(value)}
          disabled={updateStatus.isPending}
        >
          <SelectTrigger className="w-[140px]" data-testid={`select-status-${appointment.id}`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="confirmed">Confirmado</SelectItem>
            <SelectItem value="completed">Concluido</SelectItem>
            <SelectItem value="cancelled">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ["/api/auth/me"],
  });

  const { data: appointments, isLoading: appointmentsLoading } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments"],
    enabled: !!user,
  });

  const { data: services } = useQuery<Service[]>({
    queryKey: ["/api/services"],
    enabled: !!user,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/auth/logout");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      setLocation("/admin/login");
    },
  });

  if (userLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="space-y-3 w-full max-w-md p-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    setLocation("/admin/login");
    return null;
  }

  const sortedAppointments = appointments
    ? [...appointments].sort((a, b) => {
        const dateA = new Date(a.date + "T" + a.startTime);
        const dateB = new Date(b.date + "T" + b.startTime);
        return dateB.getTime() - dateA.getTime();
      })
    : [];

  const todayStr = format(new Date(), "yyyy-MM-dd");
  const todayAppointments = sortedAppointments.filter((a) => a.date === todayStr);
  const upcomingAppointments = sortedAppointments.filter(
    (a) => a.date >= todayStr && (a.status === "pending" || a.status === "confirmed")
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight">Painel Admin</span>
                <span className="text-[10px] text-muted-foreground leading-tight">Bem-vindo, {user.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="button-view-site">
                  Ver Site
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight mb-1" data-testid="text-dashboard-title">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            {format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
        </div>

        {appointmentsLoading ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4 space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-8 w-12" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <>
            <StatsCards appointments={appointments} />

            <Tabs defaultValue="today" className="mt-8">
              <TabsList>
                <TabsTrigger value="today" data-testid="tab-today">
                  Hoje ({todayAppointments.length})
                </TabsTrigger>
                <TabsTrigger value="upcoming" data-testid="tab-upcoming">
                  Proximas ({upcomingAppointments.length})
                </TabsTrigger>
                <TabsTrigger value="all" data-testid="tab-all">
                  Todas ({sortedAppointments.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="mt-4">
                {todayAppointments.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground" data-testid="text-no-today">Nenhuma consulta agendada para hoje.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {todayAppointments.map((a) => (
                      <AppointmentRow key={a.id} appointment={a} services={services} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="upcoming" className="mt-4">
                {upcomingAppointments.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <CalendarDays className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground" data-testid="text-no-upcoming">Nenhuma consulta proxima.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {upcomingAppointments.map((a) => (
                      <AppointmentRow key={a.id} appointment={a} services={services} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="all" className="mt-4">
                {sortedAppointments.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <BarChart3 className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground" data-testid="text-no-appointments">Nenhuma consulta registrada.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {sortedAppointments.map((a) => (
                      <AppointmentRow key={a.id} appointment={a} services={services} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}

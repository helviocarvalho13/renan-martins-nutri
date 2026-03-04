"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  Appointment,
  Profile,
  AppointmentStatus,
} from "@/lib/types/database";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  isSameDay,
  isToday,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  FileText,
} from "lucide-react";

interface AppointmentWithProfile extends Appointment {
  profiles: Profile;
}

const STATUS_COLORS: Record<AppointmentStatus, string> = {
  CONFIRMED: "bg-blue-100 text-blue-700 border-blue-200",
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
  COMPLETED: "bg-green-100 text-green-700 border-green-200",
  NO_SHOW: "bg-neutral-200 text-neutral-600 border-neutral-300",
};

const STATUS_LABELS: Record<AppointmentStatus, string> = {
  CONFIRMED: "Confirmada",
  PENDING: "Pendente",
  CANCELLED: "Cancelada",
  COMPLETED: "Concluída",
  NO_SHOW: "No-show",
};

const HOURS = Array.from({ length: 14 }, (_, i) => i + 7);

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"daily" | "weekly" | "monthly">("daily");
  const [appointments, setAppointments] = useState<AppointmentWithProfile[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentWithProfile | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [updating, setUpdating] = useState(false);

  const supabase = createClient();

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    let startDate: string;
    let endDate: string;

    if (view === "daily") {
      startDate = format(currentDate, "yyyy-MM-dd");
      endDate = startDate;
    } else if (view === "weekly") {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
      startDate = format(weekStart, "yyyy-MM-dd");
      endDate = format(weekEnd, "yyyy-MM-dd");
    } else {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      startDate = format(monthStart, "yyyy-MM-dd");
      endDate = format(monthEnd, "yyyy-MM-dd");
    }

    const { data, error } = await supabase
      .from("appointments")
      .select("*, profiles(*)")
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: true })
      .order("start_time", { ascending: true });

    if (!error && data) {
      setAppointments(data as unknown as AppointmentWithProfile[]);
    }
    setLoading(false);
  }, [view, currentDate]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const navigatePrev = () => {
    if (view === "daily") setCurrentDate((d) => addDays(d, -1));
    else if (view === "weekly") setCurrentDate((d) => subWeeks(d, 1));
    else setCurrentDate((d) => subMonths(d, 1));
  };

  const navigateNext = () => {
    if (view === "daily") setCurrentDate((d) => addDays(d, 1));
    else if (view === "weekly") setCurrentDate((d) => addWeeks(d, 1));
    else setCurrentDate((d) => addMonths(d, 1));
  };

  const goToToday = () => setCurrentDate(new Date());

  const openDetail = (appt: AppointmentWithProfile) => {
    setSelectedAppointment(appt);
    setNotes(appt.notes || "");
    setReturnDate(appt.return_suggested_date || "");
    setDialogOpen(true);
  };

  const updateAppointment = async (updates: Record<string, unknown>) => {
    if (!selectedAppointment) return;
    setUpdating(true);
    const { error } = await supabase
      .from("appointments")
      .update(updates)
      .eq("id", selectedAppointment.id);

    if (!error) {
      await fetchAppointments();
      setDialogOpen(false);
    }
    setUpdating(false);
  };

  const handleStatusChange = (status: AppointmentStatus) => {
    updateAppointment({ status });
  };

  const handleSaveNotes = () => {
    updateAppointment({ notes, return_suggested_date: returnDate || null });
  };

  const getDateLabel = () => {
    if (view === "daily") {
      return format(currentDate, "EEEE, dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      });
    } else if (view === "weekly") {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
      return `${format(weekStart, "dd/MM", { locale: ptBR })} - ${format(weekEnd, "dd/MM/yyyy", { locale: ptBR })}`;
    } else {
      return format(currentDate, "MMMM 'de' yyyy", { locale: ptBR });
    }
  };

  const getAppointmentsForDay = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return appointments.filter((a) => a.date === dateStr);
  };

  const timeToPixels = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return (h - 7) * 64 + (m / 60) * 64;
  };

  const renderDailyView = () => {
    const dayAppointments = getAppointmentsForDay(currentDate);

    return (
      <div className="relative" data-testid="view-daily">
        {HOURS.map((hour) => (
          <div
            key={hour}
            className="flex border-b border-muted"
            style={{ height: 64 }}
          >
            <div className="w-16 shrink-0 text-xs text-muted-foreground pt-1 text-right pr-2">
              {`${hour.toString().padStart(2, "0")}:00`}
            </div>
            <div className="flex-1 relative" />
          </div>
        ))}
        {dayAppointments.map((appt) => {
          const top = timeToPixels(appt.start_time);
          const bottom = timeToPixels(appt.end_time);
          const height = Math.max(bottom - top, 24);
          return (
            <button
              key={appt.id}
              data-testid={`appointment-block-${appt.id}`}
              className={`absolute left-16 right-2 rounded-md border p-2 cursor-pointer text-left text-xs ${STATUS_COLORS[appt.status]}`}
              style={{ top: top, height }}
              onClick={() => openDetail(appt)}
            >
              <div className="font-medium truncate">
                {appt.profiles?.full_name}
              </div>
              <div>
                {appt.start_time.slice(0, 5)} - {appt.end_time.slice(0, 5)}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  const renderWeeklyView = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return (
      <div data-testid="view-weekly">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className={`text-center text-sm font-medium p-2 rounded-md ${isToday(day) ? "bg-primary/10" : ""}`}
            >
              <div>{format(day, "EEE", { locale: ptBR })}</div>
              <div className="text-lg">{format(day, "dd")}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const dayAppts = getAppointmentsForDay(day);
            return (
              <div
                key={day.toISOString()}
                className="min-h-[120px] border rounded-md p-1"
              >
                {dayAppts.map((appt) => (
                  <button
                    key={appt.id}
                    data-testid={`appointment-weekly-${appt.id}`}
                    className={`w-full text-left text-xs p-1 mb-1 rounded border cursor-pointer ${STATUS_COLORS[appt.status]}`}
                    onClick={() => openDetail(appt)}
                  >
                    <div className="font-medium truncate">
                      {appt.start_time.slice(0, 5)}
                    </div>
                    <div className="truncate">
                      {appt.profiles?.full_name}
                    </div>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthlyView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const allDays = eachDayOfInterval({
      start: calendarStart,
      end: calendarEnd,
    });

    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

    const dotColor: Record<AppointmentStatus, string> = {
      CONFIRMED: "bg-blue-500",
      PENDING: "bg-yellow-500",
      CANCELLED: "bg-red-500",
      COMPLETED: "bg-green-500",
      NO_SHOW: "bg-neutral-400",
    };

    return (
      <div data-testid="view-monthly">
        <div className="grid grid-cols-7 gap-1 mb-1">
          {dayNames.map((name) => (
            <div
              key={name}
              className="text-center text-xs font-medium text-muted-foreground p-1"
            >
              {name}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {allDays.map((day) => {
            const dayAppts = getAppointmentsForDay(day);
            const inMonth =
              day.getMonth() === currentDate.getMonth();
            return (
              <button
                key={day.toISOString()}
                data-testid={`month-day-${format(day, "yyyy-MM-dd")}`}
                className={`min-h-[72px] border rounded-md p-1 text-left cursor-pointer ${
                  !inMonth ? "opacity-40" : ""
                } ${isToday(day) ? "border-primary" : ""}`}
                onClick={() => {
                  setCurrentDate(day);
                  setView("daily");
                }}
              >
                <div className="text-xs font-medium">{format(day, "d")}</div>
                {dayAppts.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {dayAppts.slice(0, 4).map((appt) => (
                      <div
                        key={appt.id}
                        className={`w-2 h-2 rounded-full ${dotColor[appt.status]}`}
                      />
                    ))}
                    {dayAppts.length > 4 && (
                      <span className="text-xs text-muted-foreground">
                        +{dayAppts.length - 4}
                      </span>
                    )}
                  </div>
                )}
                {dayAppts.length > 0 && (
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {dayAppts.length} consulta{dayAppts.length > 1 ? "s" : ""}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">
          Agenda
        </h1>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="icon"
            onClick={navigatePrev}
            data-testid="button-prev"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            onClick={goToToday}
            data-testid="button-today"
          >
            Hoje
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={navigateNext}
            data-testid="button-next"
          >
            <ChevronRight />
          </Button>
          <span
            className="text-sm font-medium capitalize"
            data-testid="text-date-label"
          >
            {getDateLabel()}
          </span>
        </div>
      </div>

      <Tabs
        value={view}
        onValueChange={(v) => setView(v as "daily" | "weekly" | "monthly")}
      >
        <TabsList>
          <TabsTrigger value="daily" data-testid="tab-daily">
            Diario
          </TabsTrigger>
          <TabsTrigger value="weekly" data-testid="tab-weekly">
            Semanal
          </TabsTrigger>
          <TabsTrigger value="monthly" data-testid="tab-monthly">
            Mensal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card>
            <CardContent className="p-4 overflow-auto">
              {loading ? (
                <div
                  className="flex items-center justify-center h-40"
                  data-testid="loading-daily"
                >
                  <span className="text-muted-foreground">Carregando...</span>
                </div>
              ) : (
                renderDailyView()
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          <Card>
            <CardContent className="p-4 overflow-auto">
              {loading ? (
                <div
                  className="flex items-center justify-center h-40"
                  data-testid="loading-weekly"
                >
                  <span className="text-muted-foreground">Carregando...</span>
                </div>
              ) : (
                renderWeeklyView()
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card>
            <CardContent className="p-4 overflow-auto">
              {loading ? (
                <div
                  className="flex items-center justify-center h-40"
                  data-testid="loading-monthly"
                >
                  <span className="text-muted-foreground">Carregando...</span>
                </div>
              ) : (
                renderMonthlyView()
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle data-testid="text-dialog-title">
              Detalhes da Consulta
            </DialogTitle>
            <DialogDescription>
              Gerencie o status e as notas desta consulta
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <User className="w-4 h-4 text-muted-foreground" />
                <span
                  className="font-medium"
                  data-testid="text-patient-name"
                >
                  {selectedAppointment.profiles?.full_name}
                </span>
                <Badge
                  className={STATUS_COLORS[selectedAppointment.status]}
                  data-testid="badge-status"
                >
                  {STATUS_LABELS[selectedAppointment.status]}
                </Badge>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span data-testid="text-appointment-date">
                  {format(
                    new Date(selectedAppointment.date + "T12:00:00"),
                    "dd/MM/yyyy",
                    { locale: ptBR }
                  )}
                </span>
                <Clock className="w-4 h-4 text-muted-foreground ml-2" />
                <span data-testid="text-appointment-time">
                  {selectedAppointment.start_time.slice(0, 5)} -{" "}
                  {selectedAppointment.end_time.slice(0, 5)}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" data-testid="badge-type">
                  {selectedAppointment.type === "FIRST_VISIT"
                    ? "Primeira Consulta"
                    : "Retorno"}
                </Badge>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  Notas
                </label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Adicionar notas..."
                  data-testid="input-notes"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Sugerir data de retorno
                </label>
                <Input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  data-testid="input-return-date"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange("CONFIRMED")}
                  disabled={
                    updating ||
                    selectedAppointment.status === "CONFIRMED"
                  }
                  data-testid="button-confirm"
                >
                  Confirmar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange("CANCELLED")}
                  disabled={
                    updating ||
                    selectedAppointment.status === "CANCELLED"
                  }
                  data-testid="button-cancel"
                >
                  Cancelar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange("COMPLETED")}
                  disabled={
                    updating ||
                    selectedAppointment.status === "COMPLETED"
                  }
                  data-testid="button-complete"
                >
                  Marcar Concluída
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange("NO_SHOW")}
                  disabled={
                    updating ||
                    selectedAppointment.status === "NO_SHOW"
                  }
                  data-testid="button-noshow"
                >
                  Registrar No-Show
                </Button>
              </div>

              <DialogFooter>
                <Button
                  onClick={handleSaveNotes}
                  disabled={updating}
                  data-testid="button-save-notes"
                >
                  {updating ? "Salvando..." : "Salvar Notas"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

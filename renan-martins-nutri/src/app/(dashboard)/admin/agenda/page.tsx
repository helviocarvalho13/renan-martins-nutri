"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
  Plus,
  Search,
  CalendarClock,
  Check,
  X,
  Ban,
  UserX,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppointmentWithProfile extends Appointment {
  profiles: Profile;
}

interface SlotOption {
  start_time: string;
  end_time: string;
}

interface PatientResult {
  id: string;
  full_name: string;
  email?: string;
  phone?: string;
  cpf?: string;
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
  const [view, setView] = useState<"daily" | "weekly" | "monthly">("monthly");
  const [appointments, setAppointments] = useState<AppointmentWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentWithProfile | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [updating, setUpdating] = useState(false);

  const [rescheduleMode, setRescheduleMode] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleSlots, setRescheduleSlots] = useState<SlotOption[]>([]);
  const [rescheduleSelectedSlot, setRescheduleSelectedSlot] = useState<SlotOption | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [newApptOpen, setNewApptOpen] = useState(false);
  const [newApptDate, setNewApptDate] = useState("");
  const [newApptSlots, setNewApptSlots] = useState<SlotOption[]>([]);
  const [newApptSelectedSlot, setNewApptSelectedSlot] = useState<SlotOption | null>(null);
  const [newApptType, setNewApptType] = useState<"FIRST_VISIT" | "RETURN">("FIRST_VISIT");
  const [newApptPatientSearch, setNewApptPatientSearch] = useState("");
  const [newApptPatients, setNewApptPatients] = useState<PatientResult[]>([]);
  const [newApptSelectedPatient, setNewApptSelectedPatient] = useState<PatientResult | null>(null);
  const [newApptLoadingSlots, setNewApptLoadingSlots] = useState(false);
  const [newApptSearching, setNewApptSearching] = useState(false);
  const [newApptCreating, setNewApptCreating] = useState(false);

  const { toast } = useToast();

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

    try {
      const res = await fetch(`/api/admin/agenda?from=${startDate}&to=${endDate}`);
      if (!res.ok) throw new Error("Falha ao carregar agenda");
      const data = await res.json() as { appointments: Array<{
        id: string; patient_id: string; date: string; start_time: string; end_time: string;
        type: string; status: string; notes: string | null; modality: string | null;
        return_suggested_date: string | null; patient_name: string | null;
        patient_phone: string | null; patient_email: string | null;
      }> };
      const mapped = (data.appointments || []).map((a) => ({
        ...a,
        profiles: {
          id: a.patient_id,
          full_name: a.patient_name || "Paciente",
          phone: a.patient_phone,
          email: a.patient_email,
        },
      }));
      setAppointments(mapped as unknown as AppointmentWithProfile[]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      toast({ title: "Erro ao carregar agenda", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [view, currentDate, toast]);

  useEffect(() => {
    fetchAppointments();
    const interval = setInterval(fetchAppointments, 30000);
    return () => clearInterval(interval);
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
    setRescheduleMode(false);
    setRescheduleDate("");
    setRescheduleSlots([]);
    setRescheduleSelectedSlot(null);
    setDialogOpen(true);
  };

  const updateAppointmentViaApi = async (updates: Record<string, unknown>) => {
    if (!selectedAppointment) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/appointments/${selectedAppointment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        await fetchAppointments();
        setDialogOpen(false);
        toast({ title: "Consulta atualizada", description: "As alterações foram salvas com sucesso." });
      } else {
        const body = await res.json().catch(() => null);
        toast({ title: "Erro ao atualizar", description: body?.error || "Não foi possível salvar as alterações.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erro ao atualizar", description: "Ocorreu um erro de conexão. Tente novamente.", variant: "destructive" });
    }
    setUpdating(false);
  };

  const handleStatusChange = (status: AppointmentStatus) => {
    const updates: Record<string, unknown> = { status };
    if (status === "COMPLETED" && returnDate) {
      updates.return_suggested_date = returnDate;
    }
    if (status === "COMPLETED" && notes) {
      updates.notes = notes;
    }
    updateAppointmentViaApi(updates);
  };

  const handleSaveNotes = () => {
    updateAppointmentViaApi({ notes, return_suggested_date: returnDate || null });
  };

  const fetchAvailableSlots = async (date: string): Promise<SlotOption[]> => {
    try {
      const res = await fetch(`/api/available-slots?date=${date}`);
      if (!res.ok) return [];
      const data = await res.json();
      return data.slots || [];
    } catch {
      return [];
    }
  };

  const handleRescheduleDateChange = async (date: string) => {
    setRescheduleDate(date);
    setRescheduleSelectedSlot(null);
    if (!date) {
      setRescheduleSlots([]);
      return;
    }
    setLoadingSlots(true);
    const slots = await fetchAvailableSlots(date);
    setRescheduleSlots(slots);
    setLoadingSlots(false);
  };

  const handleRescheduleConfirm = () => {
    if (!rescheduleSelectedSlot || !rescheduleDate) return;
    updateAppointmentViaApi({
      date: rescheduleDate,
      start_time: rescheduleSelectedSlot.start_time,
      end_time: rescheduleSelectedSlot.end_time,
    });
  };

  const handleNewApptDateChange = async (date: string) => {
    setNewApptDate(date);
    setNewApptSelectedSlot(null);
    if (!date) {
      setNewApptSlots([]);
      return;
    }
    setNewApptLoadingSlots(true);
    const slots = await fetchAvailableSlots(date);
    setNewApptSlots(slots);
    setNewApptLoadingSlots(false);
  };

  const handlePatientSearch = async (query: string) => {
    setNewApptPatientSearch(query);
    if (query.length < 2) {
      setNewApptPatients([]);
      return;
    }
    setNewApptSearching(true);
    try {
      const res = await fetch(`/api/admin/patients/search?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setNewApptPatients(data.patients || []);
      }
    } catch {
      setNewApptPatients([]);
    }
    setNewApptSearching(false);
  };

  const handleCreateAppointment = async () => {
    if (!newApptSelectedPatient || !newApptDate || !newApptSelectedSlot) return;
    setNewApptCreating(true);
    try {
      const res = await fetch("/api/admin/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: newApptSelectedPatient.id,
          date: newApptDate,
          start_time: newApptSelectedSlot.start_time,
          end_time: newApptSelectedSlot.end_time,
          type: newApptType,
        }),
      });

      if (res.ok) {
        await fetchAppointments();
        setNewApptOpen(false);
        resetNewApptForm();
        toast({ title: "Consulta criada", description: "A consulta foi agendada com sucesso." });
      } else {
        const data = await res.json().catch(() => null);
        toast({ title: "Erro ao criar consulta", description: data?.error || "Não foi possível agendar.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erro ao criar consulta", description: "Ocorreu um erro de conexão.", variant: "destructive" });
    }
    setNewApptCreating(false);
  };

  const resetNewApptForm = () => {
    setNewApptDate("");
    setNewApptSlots([]);
    setNewApptSelectedSlot(null);
    setNewApptType("FIRST_VISIT");
    setNewApptPatientSearch("");
    setNewApptPatients([]);
    setNewApptSelectedPatient(null);
  };

  const getDateLabel = () => {
    if (view === "daily") {
      return format(currentDate, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
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
          <div key={hour} className="flex border-b border-muted" style={{ height: 64 }}>
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
              style={{ top, height }}
              onClick={() => openDetail(appt)}
            >
              <div className="font-medium truncate">{appt.profiles?.full_name}</div>
              <div>{appt.start_time.slice(0, 5)} - {appt.end_time.slice(0, 5)}</div>
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
      <div data-testid="view-weekly" className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map((day) => (
              <div key={day.toISOString()} className={`text-center text-xs sm:text-sm font-medium p-1 sm:p-2 rounded-md ${isToday(day) ? "bg-primary/10" : ""}`}>
                <div>{format(day, "EEE", { locale: ptBR })}</div>
                <div className="text-base sm:text-lg">{format(day, "dd")}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const dayAppts = getAppointmentsForDay(day);
              return (
                <div key={day.toISOString()} className="min-h-[120px] border rounded-md p-1">
                  {dayAppts.map((appt) => (
                    <button
                      key={appt.id}
                      data-testid={`appointment-weekly-${appt.id}`}
                      className={`w-full text-left text-xs p-1 mb-1 rounded border cursor-pointer ${STATUS_COLORS[appt.status]}`}
                      onClick={() => openDetail(appt)}
                    >
                      <div className="font-medium truncate">{appt.start_time.slice(0, 5)}</div>
                      <div className="truncate">{appt.profiles?.full_name}</div>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderMonthlyView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const allDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
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
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1">
          {dayNames.map((name) => (
            <div key={name} className="text-center text-[10px] sm:text-xs font-medium text-muted-foreground p-0.5 sm:p-1">
              {name}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
          {allDays.map((day) => {
            const dayAppts = getAppointmentsForDay(day);
            const inMonth = day.getMonth() === currentDate.getMonth();
            return (
              <button
                key={day.toISOString()}
                data-testid={`month-day-${format(day, "yyyy-MM-dd")}`}
                className={`min-h-[52px] sm:min-h-[72px] border rounded-md p-0.5 sm:p-1 text-left cursor-pointer ${!inMonth ? "opacity-40" : ""} ${isToday(day) ? "border-primary" : ""}`}
                onClick={() => { setCurrentDate(day); setView("daily"); }}
              >
                <div className="text-[10px] sm:text-xs font-medium">{format(day, "d")}</div>
                {dayAppts.length > 0 && (
                  <div className="flex flex-wrap gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
                    {dayAppts.slice(0, 4).map((appt) => (
                      <div key={appt.id} className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${dotColor[appt.status]}`} />
                    ))}
                    {dayAppts.length > 4 && (
                      <span className="text-[10px] sm:text-xs text-muted-foreground">+{dayAppts.length - 4}</span>
                    )}
                  </div>
                )}
                {dayAppts.length > 0 && (
                  <div className="hidden sm:block text-xs text-muted-foreground mt-0.5">
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

  const isTerminal = selectedAppointment && ["CANCELLED", "COMPLETED", "NO_SHOW"].includes(selectedAppointment.status);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">Agenda</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <Button onClick={() => { resetNewApptForm(); setNewApptOpen(true); }} data-testid="button-new-appointment">
            <Plus className="w-4 h-4" />
            Nova Consulta
          </Button>
          <Button variant="outline" size="icon" onClick={navigatePrev} data-testid="button-prev">
            <ChevronLeft />
          </Button>
          <Button variant="outline" onClick={goToToday} data-testid="button-today">Hoje</Button>
          <Button variant="outline" size="icon" onClick={navigateNext} data-testid="button-next">
            <ChevronRight />
          </Button>
          <span className="text-sm font-medium capitalize" data-testid="text-date-label">{getDateLabel()}</span>
        </div>
      </div>

      <Tabs value={view} onValueChange={(v) => setView(v as "daily" | "weekly" | "monthly")}>
        <TabsList>
          <TabsTrigger value="daily" data-testid="tab-daily">Diário</TabsTrigger>
          <TabsTrigger value="weekly" data-testid="tab-weekly">Semanal</TabsTrigger>
          <TabsTrigger value="monthly" data-testid="tab-monthly">Mensal</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card>
            <CardContent className="p-4 overflow-auto">
              {loading ? (
                <div className="flex items-center justify-center h-40" data-testid="loading-daily">
                  <span className="text-muted-foreground">Carregando...</span>
                </div>
              ) : renderDailyView()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          <Card>
            <CardContent className="p-4 overflow-auto">
              {loading ? (
                <div className="flex items-center justify-center h-40" data-testid="loading-weekly">
                  <span className="text-muted-foreground">Carregando...</span>
                </div>
              ) : renderWeeklyView()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card>
            <CardContent className="p-4 overflow-auto">
              {loading ? (
                <div className="flex items-center justify-center h-40" data-testid="loading-monthly">
                  <span className="text-muted-foreground">Carregando...</span>
                </div>
              ) : renderMonthlyView()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle data-testid="text-dialog-title">Detalhes da Consulta</DialogTitle>
            <DialogDescription>Gerencie o status e as notas desta consulta</DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium" data-testid="text-patient-name">{selectedAppointment.profiles?.full_name}</span>
                <Badge className={STATUS_COLORS[selectedAppointment.status]} data-testid="badge-status">
                  {STATUS_LABELS[selectedAppointment.status]}
                </Badge>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span data-testid="text-appointment-date">
                  {format(new Date(selectedAppointment.date + "T12:00:00"), "dd/MM/yyyy", { locale: ptBR })}
                </span>
                <Clock className="w-4 h-4 text-muted-foreground ml-2" />
                <span data-testid="text-appointment-time">
                  {selectedAppointment.start_time.slice(0, 5)} - {selectedAppointment.end_time.slice(0, 5)}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" data-testid="badge-type">
                  {selectedAppointment.type === "FIRST_VISIT" ? "Consulta" : "Retorno"}
                </Badge>
              </div>

              <Separator />

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
                <label className="text-sm font-medium">Sugerir data de retorno</label>
                <Input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  data-testid="input-return-date"
                />
              </div>

              {rescheduleMode && (
                <div className="space-y-3 p-3 border rounded-lg bg-muted/30">
                  <h4 className="text-sm font-semibold flex items-center gap-1">
                    <CalendarClock className="w-4 h-4" />
                    Remarcar consulta
                  </h4>
                  <div className="space-y-2">
                    <Label className="text-xs">Nova data</Label>
                    <Input
                      type="date"
                      value={rescheduleDate}
                      onChange={(e) => handleRescheduleDateChange(e.target.value)}
                      min={format(addDays(new Date(), 1), "yyyy-MM-dd")}
                      data-testid="input-reschedule-date"
                    />
                  </div>
                  {loadingSlots && <p className="text-xs text-muted-foreground">Buscando horários...</p>}
                  {!loadingSlots && rescheduleDate && rescheduleSlots.length === 0 && (
                    <p className="text-xs text-muted-foreground">Nenhum horário disponível nesta data.</p>
                  )}
                  {rescheduleSlots.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-xs">Horário</Label>
                      <div className="flex flex-wrap gap-1.5">
                        {rescheduleSlots.map((slot) => (
                          <Button
                            key={slot.start_time}
                            variant={rescheduleSelectedSlot?.start_time === slot.start_time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setRescheduleSelectedSlot(slot)}
                            data-testid={`button-reschedule-slot-${slot.start_time}`}
                          >
                            {slot.start_time.slice(0, 5)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleRescheduleConfirm}
                      disabled={updating || !rescheduleSelectedSlot}
                      data-testid="button-confirm-reschedule"
                    >
                      {updating ? "Remarcando..." : "Confirmar remarcação"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setRescheduleMode(false)}
                      data-testid="button-cancel-reschedule"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}

              {!isTerminal && !rescheduleMode && (
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange("CONFIRMED")}
                    disabled={updating || selectedAppointment.status === "CONFIRMED"}
                    data-testid="button-confirm"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Confirmar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRescheduleMode(true)}
                    disabled={updating}
                    data-testid="button-reschedule"
                  >
                    <CalendarClock className="w-3.5 h-3.5" />
                    Remarcar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange("COMPLETED")}
                    disabled={updating || selectedAppointment.status === "COMPLETED"}
                    data-testid="button-complete"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Atendimento Concluído
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange("CANCELLED")}
                    disabled={updating || selectedAppointment.status === "CANCELLED"}
                    className="text-red-600 hover:text-red-700"
                    data-testid="button-cancel"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    Cancelar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange("NO_SHOW")}
                    disabled={updating || selectedAppointment.status === "NO_SHOW"}
                    className="text-neutral-500 hover:text-neutral-700"
                    data-testid="button-noshow"
                  >
                    <UserX className="w-3.5 h-3.5" />
                    No-Show
                  </Button>
                </div>
              )}

              <DialogFooter>
                <Button onClick={handleSaveNotes} disabled={updating} data-testid="button-save-notes">
                  {updating ? "Salvando..." : "Salvar Notas"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={newApptOpen} onOpenChange={(open) => { setNewApptOpen(open); if (!open) resetNewApptForm(); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle data-testid="text-new-appointment-title">Nova Consulta</DialogTitle>
            <DialogDescription>Agende uma consulta para um paciente</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Paciente</Label>
              {newApptSelectedPatient ? (
                <div className="flex items-center justify-between p-2 border rounded-lg bg-muted/30">
                  <div>
                    <p className="text-sm font-medium" data-testid="text-selected-patient">{newApptSelectedPatient.full_name}</p>
                    <p className="text-xs text-muted-foreground">{newApptSelectedPatient.email}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setNewApptSelectedPatient(null)} data-testid="button-clear-patient">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={newApptPatientSearch}
                      onChange={(e) => handlePatientSearch(e.target.value)}
                      placeholder="Buscar por nome ou CPF..."
                      className="pl-9"
                      data-testid="input-patient-search"
                    />
                  </div>
                  {newApptSearching && <p className="text-xs text-muted-foreground">Buscando...</p>}
                  {newApptPatients.length > 0 && (
                    <div className="border rounded-lg max-h-40 overflow-y-auto">
                      {newApptPatients.map((patient) => (
                        <button
                          key={patient.id}
                          className="w-full text-left px-3 py-2 hover:bg-muted/50 transition-colors border-b last:border-b-0"
                          onClick={() => { setNewApptSelectedPatient(patient); setNewApptPatients([]); setNewApptPatientSearch(""); }}
                          data-testid={`button-select-patient-${patient.id}`}
                        >
                          <p className="text-sm font-medium">{patient.full_name}</p>
                          <p className="text-xs text-muted-foreground">{patient.email}{patient.cpf ? ` · ${patient.cpf}` : ""}</p>
                        </button>
                      ))}
                    </div>
                  )}
                  {!newApptSearching && newApptPatientSearch.length >= 2 && newApptPatients.length === 0 && (
                    <p className="text-xs text-muted-foreground">Nenhum paciente encontrado.</p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Tipo</Label>
              <div className="flex gap-2">
                <Button
                  variant={newApptType === "FIRST_VISIT" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewApptType("FIRST_VISIT")}
                  data-testid="button-type-first-visit"
                >
                  Consulta
                </Button>
                <Button
                  variant={newApptType === "RETURN" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewApptType("RETURN")}
                  data-testid="button-type-return"
                >
                  Retorno
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Data</Label>
              <Input
                type="date"
                value={newApptDate}
                onChange={(e) => handleNewApptDateChange(e.target.value)}
                min={format(new Date(), "yyyy-MM-dd")}
                data-testid="input-new-appointment-date"
              />
            </div>

            {newApptLoadingSlots && <p className="text-xs text-muted-foreground">Buscando horários...</p>}
            {!newApptLoadingSlots && newApptDate && newApptSlots.length === 0 && (
              <p className="text-xs text-muted-foreground">Nenhum horário disponível nesta data.</p>
            )}
            {newApptSlots.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Horário</Label>
                <div className="flex flex-wrap gap-1.5">
                  {newApptSlots.map((slot) => (
                    <Button
                      key={slot.start_time}
                      variant={newApptSelectedSlot?.start_time === slot.start_time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewApptSelectedSlot(slot)}
                      data-testid={`button-new-slot-${slot.start_time}`}
                    >
                      {slot.start_time.slice(0, 5)}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                onClick={handleCreateAppointment}
                disabled={newApptCreating || !newApptSelectedPatient || !newApptDate || !newApptSelectedSlot}
                data-testid="button-create-appointment"
              >
                {newApptCreating ? "Agendando..." : "Agendar Consulta"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

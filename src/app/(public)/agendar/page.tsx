"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Leaf,
  ArrowLeft,
  ArrowRight,
  Clock,
  CalendarDays,
  User,
  CheckCircle2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Service, TimeSlot } from "@/lib/types";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import { ptBR } from "date-fns/locale";

const steps = [
  { id: 1, title: "Servico", icon: Leaf },
  { id: 2, title: "Data e Horario", icon: CalendarDays },
  { id: 3, title: "Seus Dados", icon: User },
  { id: 4, title: "Confirmacao", icon: CheckCircle2 },
];

function SimpleCalendar({
  selected,
  onSelect,
}: {
  selected: Date | undefined;
  onSelect: (date: Date) => void;
}) {
  const [viewMonth, setViewMonth] = useState(new Date());
  const today = startOfToday();

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startPad = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startPad; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const monthNames = [
    "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setViewMonth(new Date(year, month - 1))}
          data-testid="button-prev-month"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm font-medium">
          {monthNames[month]} {year}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setViewMonth(new Date(year, month + 1))}
          data-testid="button-next-month"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground mb-2">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;
          const disabled =
            isBefore(date, today) ||
            date > addDays(new Date(), 60) ||
            date.getDay() === 0;
          const isSelected =
            selected &&
            date.getDate() === selected.getDate() &&
            date.getMonth() === selected.getMonth() &&
            date.getFullYear() === selected.getFullYear();

          return (
            <button
              key={date.toISOString()}
              disabled={disabled}
              onClick={() => onSelect(date)}
              className={`p-2 text-sm rounded-md transition-colors ${
                disabled
                  ? "text-muted-foreground/30 cursor-not-allowed"
                  : isSelected
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent cursor-pointer"
              }`}
              data-testid={`calendar-day-${date.getDate()}`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: svc } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true);
      const { data: slots } = await supabase
        .from("time_slots")
        .select("*")
        .eq("is_active", true);
      setServices(svc || []);
      setTimeSlots(slots || []);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    if (!selectedDate) return;
    async function loadBooked() {
      const dateStr = format(selectedDate!, "yyyy-MM-dd");
      const { data } = await supabase
        .from("appointments")
        .select("start_time")
        .eq("date", dateStr)
        .in("status", ["pending", "confirmed"]);
      setBookedSlots((data || []).map((d: any) => d.start_time));
    }
    loadBooked();
  }, [selectedDate]);

  const selectedService = services.find((s) => s.id === selectedServiceId);

  const availableSlots =
    selectedDate && timeSlots
      ? timeSlots
          .filter((slot) => slot.day_of_week === selectedDate.getDay())
          .filter((slot) => !bookedSlots.includes(slot.start_time))
          .sort((a, b) => a.start_time.localeCompare(b.start_time))
      : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: selectedServiceId,
          date: format(selectedDate!, "yyyy-MM-dd"),
          start_time: selectedStartTime,
          end_time: selectedEndTime,
          patient_name: patientName,
          patient_email: patientEmail,
          patient_phone: patientPhone,
          notes: notes || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao agendar. Tente novamente.");
        setSubmitting(false);
        return;
      }

      setCurrentStep(4);
    } catch {
      setError("Erro ao agendar. Tente novamente.");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-sm" data-testid="text-booking-brand">Renan Martins</span>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2" data-testid="text-booking-title">
            Agende sua Consulta
          </h1>
          <p className="text-muted-foreground">
            Siga os passos abaixo para agendar sua consulta com o Dr. Renan Martins.
          </p>
        </div>

        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {steps.map((step, i) => {
            const isActive = currentStep === step.id;
            const isComplete = currentStep > step.id;
            const StepIcon = step.icon;
            return (
              <div key={step.id} className="flex items-center gap-2 flex-shrink-0">
                {i > 0 && (
                  <div className={`w-8 h-px ${isComplete || isActive ? "bg-primary" : "bg-border"}`} />
                )}
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : isComplete
                        ? "text-primary"
                        : "text-muted-foreground"
                  }`}
                  data-testid={`step-${step.id}`}
                >
                  <StepIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{step.title}</span>
                </div>
              </div>
            );
          })}
        </div>

        {currentStep === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-4" data-testid="text-step1-title">
              Escolha o tipo de consulta
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-6 space-y-3">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardContent>
                    </Card>
                  ))
                : services.map((service) => (
                    <Card
                      key={service.id}
                      className={`cursor-pointer transition-colors ${
                        selectedServiceId === service.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/30"
                      }`}
                      onClick={() => {
                        setSelectedServiceId(service.id);
                        setCurrentStep(2);
                      }}
                      data-testid={`card-select-service-${service.id}`}
                    >
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-1">{service.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{service.duration_minutes} min</span>
                          </div>
                          <Badge variant="secondary">
                            R$ {(service.price / 100).toFixed(2).replace(".", ",")}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4" data-testid="text-step2-title">
              Escolha a data e horario
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-4">
                  <SimpleCalendar selected={selectedDate} onSelect={setSelectedDate} />
                </CardContent>
              </Card>

              <div>
                <p className="text-sm font-medium mb-3">
                  {selectedDate
                    ? `Horarios disponiveis em ${format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}`
                    : "Selecione uma data para ver os horarios"}
                </p>
                {selectedDate ? (
                  availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {availableSlots.map((slot) => (
                        <Button
                          key={slot.id}
                          type="button"
                          variant={selectedStartTime === slot.start_time ? "default" : "outline"}
                          onClick={() => {
                            setSelectedStartTime(slot.start_time);
                            setSelectedEndTime(slot.end_time);
                          }}
                          data-testid={`button-time-${slot.start_time}`}
                        >
                          {slot.start_time.slice(0, 5)}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground" data-testid="text-no-slots">
                      Nenhum horario disponivel nesta data. Tente outra data.
                    </p>
                  )
                ) : (
                  <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                    <CalendarDays className="w-5 h-5 mr-2" />
                    Selecione uma data
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <Button variant="outline" onClick={() => setCurrentStep(1)} data-testid="button-back-step1">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Voltar
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                disabled={!selectedStartTime}
                data-testid="button-next-step3"
              >
                Continuar
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-lg font-semibold mb-4" data-testid="text-step3-title">Seus dados</h2>

            <Card>
              <CardContent className="p-6">
                <div className="bg-primary/5 rounded-md p-4 mb-6">
                  <p className="text-sm font-medium mb-1">Resumo do agendamento:</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedService?.name} - {selectedDate && format(selectedDate, "dd/MM/yyyy")} as{" "}
                    {selectedStartTime?.slice(0, 5)}
                  </p>
                </div>

                {error && (
                  <div className="text-sm text-destructive bg-destructive/10 rounded-md p-3 mb-4">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Nome completo</Label>
                      <Input
                        id="patientName"
                        placeholder="Seu nome completo"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        required
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patientEmail">Email</Label>
                      <Input
                        id="patientEmail"
                        type="email"
                        placeholder="seu@email.com"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        required
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patientPhone">Telefone / WhatsApp</Label>
                    <Input
                      id="patientPhone"
                      placeholder="(11) 99999-9999"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      required
                      data-testid="input-phone"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Observacoes (opcional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Alguma informacao importante para a consulta?"
                      className="resize-none"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      data-testid="input-notes"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(2)} data-testid="button-back-step2">
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Voltar
                    </Button>
                    <Button type="submit" disabled={submitting} data-testid="button-submit-booking">
                      {submitting ? "Agendando..." : "Confirmar Agendamento"}
                      <CheckCircle2 className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 4 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2" data-testid="text-booking-success">
              Consulta Agendada!
            </h2>
            <p className="text-muted-foreground mb-2">
              Sua consulta foi agendada com sucesso. Voce recebera uma confirmacao em breve.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              {selectedService?.name} - {selectedDate && format(selectedDate, "dd/MM/yyyy")} as{" "}
              {selectedStartTime?.slice(0, 5)}
            </p>
            <Link href="/">
              <Button data-testid="button-back-to-home">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Voltar ao inicio
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

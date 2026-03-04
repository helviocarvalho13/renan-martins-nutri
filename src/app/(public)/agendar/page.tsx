"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  User,
  CheckCircle2,
} from "lucide-react";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import { ptBR } from "date-fns/locale";

const steps = [
  { id: 1, title: "Data e Horario", icon: CalendarDays },
  { id: 2, title: "Seus Dados", icon: User },
  { id: 3, title: "Confirmacao", icon: CheckCircle2 },
];

interface GeneratedSlot {
  start_time: string;
  end_time: string;
}

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
          className="text-neutral-500"
          data-testid="button-prev-month"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm font-medium text-neutral-700">
          {monthNames[month]} {year}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setViewMonth(new Date(year, month + 1))}
          className="text-neutral-500"
          data-testid="button-next-month"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-neutral-400 mb-2">
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
              className={`p-2 text-sm rounded-lg transition-colors ${
                disabled
                  ? "text-neutral-300 cursor-not-allowed"
                  : isSelected
                    ? "bg-neutral-900 text-white"
                    : "hover:bg-neutral-100 cursor-pointer text-neutral-700"
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
  const [availableSlots, setAvailableSlots] = useState<GeneratedSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedDate) return;
    setLoadingSlots(true);
    setSelectedStartTime("");
    setSelectedEndTime("");
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    fetch(`/api/available-slots?date=${dateStr}`)
      .then((res) => res.json())
      .then((data) => {
        setAvailableSlots(data.slots || []);
        setLoadingSlots(false);
      })
      .catch(() => {
        setAvailableSlots([]);
        setLoadingSlots(false);
      });
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: format(selectedDate!, "yyyy-MM-dd"),
          start_time: selectedStartTime,
          end_time: selectedEndTime,
          type: "FIRST_VISIT",
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

      setCurrentStep(3);
    } catch {
      setError("Erro ao agendar. Tente novamente.");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="font-semibold text-sm text-neutral-900" data-testid="text-booking-brand">
              Renan Martins
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-neutral-500" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-2" data-testid="text-booking-title">
            Agende sua Consulta
          </h1>
          <p className="text-neutral-500 text-sm">
            Siga os passos abaixo para agendar sua consulta com Renan Martins.
          </p>
        </div>

        <div className="flex items-center gap-2 mb-10">
          {steps.map((step, i) => {
            const isActive = currentStep === step.id;
            const isComplete = currentStep > step.id;
            const StepIcon = step.icon;
            return (
              <div key={step.id} className="flex items-center gap-2 flex-shrink-0">
                {i > 0 && (
                  <div className={`w-10 h-px ${isComplete || isActive ? "bg-neutral-900" : "bg-neutral-200"}`} />
                )}
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-colors ${
                    isActive
                      ? "bg-neutral-900 text-white font-medium"
                      : isComplete
                        ? "text-neutral-900"
                        : "text-neutral-400"
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
            <h2 className="text-lg font-semibold text-neutral-900 mb-6" data-testid="text-step1-title">
              Escolha a data e horario
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100">
                <SimpleCalendar selected={selectedDate} onSelect={setSelectedDate} />
              </div>

              <div>
                <p className="text-sm font-medium text-neutral-700 mb-4">
                  {selectedDate
                    ? `Horarios em ${format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}`
                    : "Selecione uma data"}
                </p>
                {selectedDate ? (
                  loadingSlots ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot.start_time}
                          type="button"
                          onClick={() => {
                            setSelectedStartTime(slot.start_time);
                            setSelectedEndTime(slot.end_time);
                          }}
                          className={`py-2.5 px-3 text-sm rounded-lg border transition-colors ${
                            selectedStartTime === slot.start_time
                              ? "bg-neutral-900 text-white border-neutral-900"
                              : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                          }`}
                          data-testid={`button-time-${slot.start_time}`}
                        >
                          {slot.start_time.slice(0, 5)}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-neutral-400 py-8 text-center" data-testid="text-no-slots">
                      Nenhum horario disponivel nesta data.
                    </p>
                  )
                ) : (
                  <div className="flex items-center justify-center py-12 text-neutral-400 text-sm">
                    <CalendarDays className="w-5 h-5 mr-2" />
                    Selecione uma data
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <Button
                onClick={() => setCurrentStep(2)}
                disabled={!selectedStartTime}
                className="rounded-full px-6 bg-neutral-900 text-white hover:bg-neutral-800"
                data-testid="button-next-step2"
              >
                Continuar
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-6" data-testid="text-step2-title">Seus dados</h2>

            <div className="bg-neutral-50 rounded-xl p-4 mb-6 border border-neutral-100">
              <p className="text-sm text-neutral-500">
                {selectedDate && format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} as{" "}
                {selectedStartTime?.slice(0, 5)}
              </p>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 rounded-xl p-4 mb-6 border border-red-100" data-testid="text-booking-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="patientName" className="text-neutral-700 text-sm">Nome completo</Label>
                  <Input
                    id="patientName"
                    placeholder="Seu nome completo"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                    className="border-neutral-200 focus:border-neutral-400 rounded-lg"
                    data-testid="input-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientEmail" className="text-neutral-700 text-sm">Email</Label>
                  <Input
                    id="patientEmail"
                    type="email"
                    placeholder="seu@email.com"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    required
                    className="border-neutral-200 focus:border-neutral-400 rounded-lg"
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="patientPhone" className="text-neutral-700 text-sm">Telefone / WhatsApp</Label>
                <Input
                  id="patientPhone"
                  placeholder="(11) 99999-9999"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  required
                  className="border-neutral-200 focus:border-neutral-400 rounded-lg"
                  data-testid="input-phone"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-neutral-700 text-sm">Observacoes (opcional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Alguma informacao importante para a consulta?"
                  className="resize-none border-neutral-200 focus:border-neutral-400 rounded-lg"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  data-testid="input-notes"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="rounded-full px-6 border-neutral-200"
                  data-testid="button-back-step1"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Voltar
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full px-6 bg-neutral-900 text-white hover:bg-neutral-800"
                  data-testid="button-submit-booking"
                >
                  {submitting ? "Agendando..." : "Confirmar Agendamento"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {currentStep === 3 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2" data-testid="text-booking-success">
              Consulta Agendada!
            </h2>
            <p className="text-neutral-500 mb-2">
              Sua consulta foi agendada com sucesso.
            </p>
            <p className="text-sm text-neutral-400 mb-10">
              {selectedDate && format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} as{" "}
              {selectedStartTime?.slice(0, 5)}
            </p>
            <Link href="/">
              <Button className="rounded-full px-6 bg-neutral-900 text-white hover:bg-neutral-800" data-testid="button-back-to-home">
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

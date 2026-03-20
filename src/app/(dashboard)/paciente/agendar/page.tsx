"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAvailableSlots } from "@/hooks/useAvailableSlots";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  UserPlus,
  RotateCcw,
  CalendarDays,
  Clock,
  Loader2,
  Laptop,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Appointment } from "@/lib/types";

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
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 mb-4">
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
              aria-label={`${date.getDate()} de ${monthNames[date.getMonth()]} de ${date.getFullYear()}`}
              aria-selected={isSelected}
              aria-disabled={disabled}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const stepLabels = ["Tipo & Modalidade", "Data", "Horário", "Confirmação"];

export default function PatientBookingPage() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<"FIRST_VISIT" | "RETURN" | null>(null);
  const [selectedModality, setSelectedModality] = useState<"ONLINE" | "PRESENCIAL" | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDateObj, setSelectedDateObj] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<{ start_time: string; end_time: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [canReturn, setCanReturn] = useState(false);
  const [returnDate, setReturnDate] = useState<string | null>(null);
  const [returnDaysRemaining, setReturnDaysRemaining] = useState<number | null>(null);
  const [hasActiveFirstVisit, setHasActiveFirstVisit] = useState(false);
  const [hasActiveReturn, setHasActiveReturn] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [returnWindowExpired, setReturnWindowExpired] = useState(false);

  const { slots, loading: loadingSlots } = useAvailableSlots(selectedDate);

  useEffect(() => {
    async function fetchPatientInfo() {
      try {
        const today = new Date().toISOString().split("T")[0];

        const [apptRes, eligibilityRes] = await Promise.all([
          fetch("/api/patient/appointments").then(r => r.ok ? r.json() : { appointments: [] }),
          fetch("/api/patient/return-eligibility").then(r => r.json()).catch(() => null),
        ]);

        const allAppts = (apptRes.appointments || []) as Appointment[];

        const futureActive = allAppts.filter(
          (a) => a.date >= today && (a.status === "PENDING" || a.status === "CONFIRMED")
        );

        setHasActiveFirstVisit(futureActive.some((a) => a.type === "FIRST_VISIT"));
        setHasActiveReturn(futureActive.some((a) => a.type === "RETURN"));

        if (eligibilityRes) {
          if (eligibilityRes.eligible) {
            setCanReturn(true);
            setReturnDate(eligibilityRes.return_suggested_date || null);
            setReturnDaysRemaining(eligibilityRes.days_remaining || null);
          } else if (eligibilityRes.reason === "window_expired") {
            setReturnWindowExpired(true);
          } else if (eligibilityRes.reason === "active_return_exists") {
            setHasActiveReturn(true);
          }
        }
      } catch {
        toast({
          title: "Erro ao carregar dados",
          description: "Ocorreu um erro inesperado. Tente novamente.",
          variant: "destructive",
        });
      } finally {
        setLoadingInfo(false);
      }
    }
    fetchPatientInfo();
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDateObj(date);
    setSelectedDate(format(date, "yyyy-MM-dd"));
    setSelectedSlot(null);
  };

  const handleConfirm = async () => {
    if (!selectedDate || !selectedSlot || !selectedType) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/patient/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          start_time: selectedSlot.start_time,
          end_time: selectedSlot.end_time,
          type: selectedType,
          modality: selectedModality,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.error || "Erro ao agendar. Tente novamente.";
        setError(errorMsg);
        toast({
          title: "Erro ao agendar",
          description: errorMsg,
          variant: "destructive",
        });
        setSubmitting(false);
        return;
      }

      toast({
        title: "Consulta agendada",
        description: "Sua consulta foi agendada com sucesso!",
      });
      setSuccess(true);
    } catch {
      setError("Erro ao agendar. Tente novamente.");
      toast({
        title: "Erro ao agendar",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    }
    setSubmitting(false);
  };

  if (success) {
    const dayMonth = selectedDateObj ? format(selectedDateObj, "dd/MM", { locale: ptBR }) : "";
    const hora = selectedSlot?.start_time.slice(0, 5) ?? "";
    const modalidadeLabel = selectedModality === "ONLINE" ? "Online" : "Presencial";
    const waText = encodeURIComponent(
      `Sim, confirmo o agendamento para o dia ${dayMonth} às ${hora}, na modalidade ${modalidadeLabel}.`
    );
    const waLink = `https://wa.me/559888318881?text=${waText}`;

    return (
      <div className="max-w-2xl mx-auto py-16 text-center px-4 sm:px-0">
        <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2" data-testid="text-booking-success">
          Sua consulta foi agendada!
        </h2>
        <p className="text-neutral-500 mb-2">
          {selectedType === "FIRST_VISIT" ? "Consulta agendada" : "Retorno agendado"} com sucesso.
        </p>
        <p className="text-sm text-neutral-400 mb-3">
          {selectedDateObj && format(selectedDateObj, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} às{" "}
          {selectedSlot?.start_time.slice(0, 5)} — {modalidadeLabel}
        </p>
        <p className="text-sm text-neutral-500 mb-8">
          Clique abaixo para confirmar seu horário via WhatsApp e garantir seu atendimento.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            className="rounded-full px-6 bg-green-600 hover:bg-green-700 text-white"
            data-testid="button-confirm-whatsapp"
            asChild
          >
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" />
              Confirmar pelo WhatsApp
            </a>
          </Button>
          <Button variant="outline" className="rounded-full px-6 border-neutral-200" data-testid="button-go-to-appointments" asChild>
            <Link href="/paciente">
              Ver minhas consultas
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (loadingInfo) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-0">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-neutral-900 mb-1" data-testid="text-booking-title">
          Agendar Consulta
        </h1>
        <p className="text-sm text-neutral-500">
          Siga os passos abaixo para agendar sua consulta.
        </p>
      </div>

      <div className="flex items-center gap-1 mb-10">
        {stepLabels.map((label, i) => {
          const stepNum = i + 1;
          const isActive = currentStep === stepNum;
          const isComplete = currentStep > stepNum;
          return (
            <div key={label} className="flex items-center gap-1 flex-wrap">
              {i > 0 && (
                <div className={`w-6 sm:w-10 h-px ${isComplete || isActive ? "bg-neutral-900" : "bg-neutral-200"}`} />
              )}
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? "bg-neutral-900 text-white"
                    : isComplete
                      ? "text-neutral-900"
                      : "text-neutral-400"
                }`}
                data-testid={`step-indicator-${stepNum}`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {currentStep === 1 && (
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-6" data-testid="text-step1-title">
            Escolha o tipo de consulta
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              disabled={hasActiveFirstVisit}
              onClick={() => setSelectedType("FIRST_VISIT")}
              className="text-left"
              data-testid="button-select-first-visit"
            >
              <Card
                className={`p-5 transition-colors cursor-pointer ${
                  hasActiveFirstVisit
                    ? "opacity-50 cursor-not-allowed"
                    : selectedType === "FIRST_VISIT"
                      ? "border-neutral-900 border-2"
                      : "border-neutral-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                    <UserPlus className="w-5 h-5 text-neutral-700" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Consulta</p>
                    <p className="text-xs text-neutral-500">
                      Sua primeira consulta com o nutricionista
                    </p>
                    {hasActiveFirstVisit && (
                      <p className="text-xs text-red-500 mt-2" data-testid="text-first-visit-disabled">
                        Você já tem uma consulta agendada
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </button>

            <button
              type="button"
              disabled={!canReturn || hasActiveReturn}
              onClick={() => setSelectedType("RETURN")}
              className="text-left"
              data-testid="button-select-return"
            >
              <Card
                className={`p-5 transition-colors cursor-pointer ${
                  !canReturn || hasActiveReturn
                    ? "opacity-50 cursor-not-allowed"
                    : selectedType === "RETURN"
                      ? "border-neutral-900 border-2"
                      : "border-neutral-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                    <RotateCcw className="w-5 h-5 text-neutral-700" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 mb-1">Retorno</p>
                    <p className="text-xs text-neutral-500">
                      Consulta de acompanhamento
                    </p>
                    {!canReturn && !returnWindowExpired && (
                      <p className="text-xs text-red-500 mt-2" data-testid="text-return-disabled-reason">
                        Disponível após uma consulta concluída
                      </p>
                    )}
                    {returnWindowExpired && (
                      <p className="text-xs text-red-500 mt-2" data-testid="text-return-window-expired">
                        Janela de retorno expirou. Agende uma consulta regular.
                      </p>
                    )}
                    {canReturn && hasActiveReturn && (
                      <p className="text-xs text-red-500 mt-2" data-testid="text-return-already-active">
                        Você já possui um retorno agendado
                      </p>
                    )}
                    {canReturn && !hasActiveReturn && (
                      <div className="mt-2 space-y-0.5">
                        {returnDate && (
                          <p className="text-xs text-neutral-500" data-testid="text-return-suggested-date">
                            Retorno sugerido para {format(new Date(returnDate + "T12:00:00"), "dd/MM/yyyy")}
                          </p>
                        )}
                        {returnDaysRemaining !== null && (
                          <p className="text-xs text-neutral-400" data-testid="text-return-days-remaining">
                            {returnDaysRemaining} dias restantes na janela de retorno
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </button>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-semibold text-neutral-700 mb-4">Modalidade</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSelectedModality("PRESENCIAL")}
                className="text-left"
                data-testid="button-select-presencial"
              >
                <Card
                  className={`p-5 transition-colors cursor-pointer ${
                    selectedModality === "PRESENCIAL"
                      ? "border-neutral-900 border-2"
                      : "border-neutral-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-neutral-700" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 mb-1">Presencial</p>
                      <p className="text-xs text-neutral-500">Atendimento no consultório</p>
                    </div>
                  </div>
                </Card>
              </button>

              <button
                type="button"
                onClick={() => setSelectedModality("ONLINE")}
                className="text-left"
                data-testid="button-select-online"
              >
                <Card
                  className={`p-5 transition-colors cursor-pointer ${
                    selectedModality === "ONLINE"
                      ? "border-neutral-900 border-2"
                      : "border-neutral-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                      <Laptop className="w-5 h-5 text-neutral-700" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 mb-1">Online</p>
                      <p className="text-xs text-neutral-500">Atendimento por videochamada</p>
                    </div>
                  </div>
                </Card>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setCurrentStep(2)}
              disabled={!selectedType || !selectedModality}
              className="rounded-full px-6 bg-neutral-900 text-white"
              data-testid="button-step1-continue"
            >
              Continuar
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-6" data-testid="text-step2-title">
            Escolha a data
          </h2>

          <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100 mb-6 max-w-sm">
            <SimpleCalendar selected={selectedDateObj} onSelect={handleDateSelect} />
          </div>

          {selectedDate && !loadingSlots && slots.length === 0 && (
            <p className="text-sm text-neutral-500 mb-6" data-testid="text-no-slots-date">
              Nenhum horário disponível nesta data. Escolha outra data.
            </p>
          )}

          {selectedDate && loadingSlots && (
            <div className="flex items-center gap-2 text-sm text-neutral-400 mb-6">
              <Loader2 className="w-4 h-4 animate-spin" />
              Verificando disponibilidade...
            </div>
          )}

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(1)}
              className="rounded-full px-6 border-neutral-200"
              data-testid="button-step2-back"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
            <Button
              onClick={() => setCurrentStep(3)}
              disabled={!selectedDate || slots.length === 0}
              className="rounded-full px-6 bg-neutral-900 text-white"
              data-testid="button-step2-continue"
            >
              Continuar
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2" data-testid="text-step3-title">
            Escolha o horário
          </h2>
          <p className="text-sm text-neutral-500 mb-6">
            {selectedDateObj && format(selectedDateObj, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>

          {loadingSlots ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-5 h-5 animate-spin text-neutral-400" />
            </div>
          ) : slots.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-8">
              {slots.map((slot) => {
                const isSelected =
                  selectedSlot?.start_time === slot.start_time &&
                  selectedSlot?.end_time === slot.end_time;
                return (
                  <button
                    key={slot.start_time}
                    type="button"
                    onClick={() => setSelectedSlot({ start_time: slot.start_time, end_time: slot.end_time })}
                    className={`py-3 px-3 text-sm rounded-lg border transition-colors ${
                      isSelected
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                    }`}
                    data-testid={`button-slot-${slot.start_time}`}
                  >
                    {slot.start_time.slice(0, 5)}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-neutral-400 py-8 text-center" data-testid="text-no-slots">
              Nenhum horário disponível nesta data.
            </p>
          )}

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedSlot(null);
                setCurrentStep(2);
              }}
              className="rounded-full px-6 border-neutral-200"
              data-testid="button-step3-back"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
            <Button
              onClick={() => setCurrentStep(4)}
              disabled={!selectedSlot}
              className="rounded-full px-6 bg-neutral-900 text-white"
              data-testid="button-step3-continue"
            >
              Continuar
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-6" data-testid="text-step4-title">
            Confirme seu agendamento
          </h2>

          <Card className="mb-8">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-sm text-neutral-500">Tipo</span>
                <span className="text-sm font-medium text-neutral-900" data-testid="text-confirm-type">
                  {selectedType === "FIRST_VISIT" ? "Consulta" : "Retorno"}
                </span>
              </div>
              <div className="h-px bg-neutral-100" />
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-sm text-neutral-500">Data</span>
                <span className="text-sm font-medium text-neutral-900" data-testid="text-confirm-date">
                  {selectedDateObj && format(selectedDateObj, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </span>
              </div>
              <div className="h-px bg-neutral-100" />
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-sm text-neutral-500">Horário</span>
                <span className="text-sm font-medium text-neutral-900" data-testid="text-confirm-time">
                  {selectedSlot?.start_time.slice(0, 5)} - {selectedSlot?.end_time.slice(0, 5)}
                </span>
              </div>
              <div className="h-px bg-neutral-100" />
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-sm text-neutral-500">Modalidade</span>
                <span className="text-sm font-medium text-neutral-900" data-testid="text-confirm-modality">
                  {selectedModality === "ONLINE" ? "Online" : "Presencial"}
                </span>
              </div>
              <div className="h-px bg-neutral-100" />
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-sm text-neutral-500">Duração</span>
                <span className="text-sm font-medium text-neutral-900" data-testid="text-confirm-duration">
                  50 minutos
                </span>
              </div>
            </CardContent>
          </Card>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 rounded-xl p-4 mb-6 border border-red-100" data-testid="text-booking-error">
              {error}
            </div>
          )}

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(3)}
              className="rounded-full px-6 border-neutral-200"
              data-testid="button-step4-back"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={submitting}
              className="rounded-full px-6 bg-neutral-900 text-white"
              data-testid="button-confirm-booking"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-1" />
                  Agendando...
                </>
              ) : (
                "Confirmar Agendamento"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

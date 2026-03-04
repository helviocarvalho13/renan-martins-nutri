"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ScheduleConfig {
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_duration_min: number;
  break_duration_min: number;
  is_active: boolean;
}

interface BlockedSlot {
  date: string;
  start_time: string | null;
  end_time: string | null;
  all_day: boolean;
}

const DAY_NAMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const DAY_NAMES_FULL = [
  "Domingo",
  "Segunda-feira",
  "Terca-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sabado",
];
const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startPad = firstDay.getDay();
  const days: (Date | null)[] = [];

  for (let i = 0; i < startPad; i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  return days;
}

function formatDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

const fallbackSchedule: ScheduleConfig[] = [
  { day_of_week: 1, start_time: "08:00", end_time: "18:00", slot_duration_min: 50, break_duration_min: 10, is_active: true },
  { day_of_week: 2, start_time: "08:00", end_time: "18:00", slot_duration_min: 50, break_duration_min: 10, is_active: true },
  { day_of_week: 3, start_time: "08:00", end_time: "18:00", slot_duration_min: 50, break_duration_min: 10, is_active: true },
  { day_of_week: 4, start_time: "08:00", end_time: "18:00", slot_duration_min: 50, break_duration_min: 10, is_active: true },
  { day_of_week: 5, start_time: "08:00", end_time: "18:00", slot_duration_min: 50, break_duration_min: 10, is_active: true },
];

export default function AgendaPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [schedule, setSchedule] = useState<ScheduleConfig[]>(fallbackSchedule);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [bookedDates, setBookedDates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();

        const { data: schedData } = await supabase
          .from("schedule_config")
          .select("day_of_week, start_time, end_time, slot_duration_min, break_duration_min, is_active")
          .eq("is_active", true);

        if (schedData && schedData.length > 0) {
          setSchedule(schedData);
        }

        const startDate = formatDate(new Date(currentYear, currentMonth, 1));
        const endDate = formatDate(new Date(currentYear, currentMonth + 1, 0));

        const { data: blockedData } = await supabase
          .from("blocked_slots")
          .select("date, start_time, end_time, all_day")
          .gte("date", startDate)
          .lte("date", endDate);

        if (blockedData) {
          setBlockedSlots(blockedData);
        }

        const { data: apptData } = await supabase
          .from("appointments")
          .select("date")
          .gte("date", startDate)
          .lte("date", endDate)
          .in("status", ["PENDING", "CONFIRMED"]);

        if (apptData) {
          const counts: Record<string, number> = {};
          apptData.forEach((a) => {
            counts[a.date] = (counts[a.date] || 0) + 1;
          });
          setBookedDates(counts);
        }
      } catch {
        // use fallbacks
      }
      setLoading(false);
    }
    load();
  }, [currentMonth, currentYear]);

  const activeDays = useMemo(
    () => new Set(schedule.filter((s) => s.is_active).map((s) => s.day_of_week)),
    [schedule]
  );

  const blockedFullDays = useMemo(() => {
    const set = new Set<string>();
    blockedSlots.forEach((b) => {
      if (b.all_day) set.add(b.date);
    });
    return set;
  }, [blockedSlots]);

  const days = getMonthDays(currentYear, currentMonth);

  const getSlotCount = (date: Date): number => {
    const config = schedule.find(
      (s) => s.day_of_week === date.getDay() && s.is_active
    );
    if (!config) return 0;

    const startMinutes =
      parseInt(config.start_time.split(":")[0]) * 60 +
      parseInt(config.start_time.split(":")[1]);
    const endMinutes =
      parseInt(config.end_time.split(":")[0]) * 60 +
      parseInt(config.end_time.split(":")[1]);
    const totalMinutes = endMinutes - startMinutes;
    const slotCycle = config.slot_duration_min + config.break_duration_min;
    return Math.floor(totalMinutes / slotCycle);
  };

  const getDayStatus = (date: Date): "available" | "limited" | "unavailable" | "past" => {
    const todayStr = formatDate(today);
    const dateStr = formatDate(date);

    if (dateStr < todayStr) return "past";
    if (!activeDays.has(date.getDay())) return "unavailable";
    if (blockedFullDays.has(dateStr)) return "unavailable";

    const totalSlots = getSlotCount(date);
    const booked = bookedDates[dateStr] || 0;
    const available = totalSlots - booked;

    if (available <= 0) return "unavailable";
    if (available <= 2) return "limited";
    return "available";
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  const isPastMonth =
    currentYear < today.getFullYear() ||
    (currentYear === today.getFullYear() && currentMonth < today.getMonth());

  const selectedStatus = selectedDate ? getDayStatus(selectedDate) : null;
  const selectedConfig = selectedDate
    ? schedule.find((s) => s.day_of_week === selectedDate.getDay() && s.is_active)
    : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              Agenda
            </p>
            <h1
              className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
              style={{ fontFamily: "var(--font-serif)" }}
              data-testid="text-agenda-title"
            >
              Disponibilidade de Horarios
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Confira os dias com horários disponíveis e agende sua consulta.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="shadow-md">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-6">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={prevMonth}
                      disabled={isPastMonth}
                      data-testid="button-prev-month"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <h2 className="font-semibold text-lg" data-testid="text-current-month">
                      {MONTH_NAMES[currentMonth]} {currentYear}
                    </h2>
                    <Button variant="ghost" size="icon" onClick={nextMonth} data-testid="button-next-month">
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {DAY_NAMES.map((d) => (
                      <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">
                        {d}
                      </div>
                    ))}
                  </div>

                  {loading ? (
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 35 }).map((_, i) => (
                        <div key={i} className="aspect-square rounded-lg bg-muted/30 animate-pulse" />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-7 gap-1">
                      {days.map((day, i) => {
                        if (!day) {
                          return <div key={`empty-${i}`} className="aspect-square" />;
                        }

                        const status = getDayStatus(day);
                        const dateStr = formatDate(day);
                        const isSelected =
                          selectedDate && formatDate(selectedDate) === dateStr;
                        const isToday = formatDate(today) === dateStr;

                        return (
                          <button
                            key={dateStr}
                            onClick={() =>
                              status !== "past" && status !== "unavailable"
                                ? setSelectedDate(day)
                                : undefined
                            }
                            disabled={status === "past" || status === "unavailable"}
                            className={`aspect-square rounded-lg text-sm font-medium transition-all relative flex flex-col items-center justify-center gap-0.5
                              ${isSelected ? "bg-primary text-primary-foreground shadow-md" : ""}
                              ${!isSelected && status === "available" ? "hover:bg-primary/10 text-foreground" : ""}
                              ${!isSelected && status === "limited" ? "hover:bg-yellow-500/10 text-foreground" : ""}
                              ${status === "unavailable" ? "text-muted-foreground/30 cursor-not-allowed" : ""}
                              ${status === "past" ? "text-muted-foreground/20 cursor-not-allowed" : ""}
                              ${isToday && !isSelected ? "ring-1 ring-primary" : ""}
                            `}
                            data-testid={`day-${dateStr}`}
                          >
                            {day.getDate()}
                            {status !== "past" && status !== "unavailable" && (
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  isSelected
                                    ? "bg-primary-foreground"
                                    : status === "available"
                                    ? "bg-emerald-500"
                                    : "bg-yellow-500"
                                }`}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-6 mt-6 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      Disponivel
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      Poucos horarios
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20" />
                      Indisponível
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              {selectedDate && selectedConfig ? (
                <Card className="shadow-md sticky top-24" data-testid="card-day-detail">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-semibold">
                          {selectedDate.getDate()} de {MONTH_NAMES[selectedDate.getMonth()]}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {DAY_NAMES_FULL[selectedDate.getDay()]}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedConfig.start_time} - {selectedConfig.end_time}</span>
                      </div>

                      {selectedStatus === "available" && (
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Horários disponíveis
                        </Badge>
                      )}
                      {selectedStatus === "limited" && (
                        <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          <Clock className="w-3 h-3 mr-1" />
                          Poucos horarios
                        </Badge>
                      )}
                    </div>

                    <Link href="/agendar">
                      <Button className="w-full mt-2" data-testid="button-book-from-agenda">
                        Agendar neste dia
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-md">
                  <CardContent className="p-5 text-center space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Selecione um dia no calendario para ver detalhes da disponibilidade.
                    </p>
                  </CardContent>
                </Card>
              )}

              <Card className="shadow-md mt-4">
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-semibold text-sm">Dias de Atendimento</h3>
                  <div className="space-y-1.5">
                    {DAY_NAMES_FULL.map((name, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className={activeDays.has(i) ? "text-foreground" : "text-muted-foreground/50"}>
                          {name}
                        </span>
                        {activeDays.has(i) ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-muted-foreground/30" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

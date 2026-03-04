"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  Clock,
  AlertCircle,
  CheckCircle2,
  Users,
  ArrowRight,
} from "lucide-react";
import type { Appointment, Profile, AppointmentStatus } from "@/lib/types/database";

interface AppointmentWithProfile extends Appointment {
  profiles: Pick<Profile, "full_name" | "phone">;
}

const statusColors: Record<AppointmentStatus, string> = {
  CONFIRMED: "bg-blue-100 text-blue-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-700",
  COMPLETED: "bg-green-100 text-green-700",
  NO_SHOW: "bg-neutral-200 text-neutral-600",
};

const statusLabels: Record<AppointmentStatus, string> = {
  CONFIRMED: "Confirmada",
  PENDING: "Pendente",
  CANCELLED: "Cancelada",
  COMPLETED: "Concluída",
  NO_SHOW: "No-show",
};

export default function AdminDashboardPage() {
  const [todayAppointments, setTodayAppointments] = useState<AppointmentWithProfile[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const supabase = createClient();

    async function loadDashboard() {
      const [appointmentsRes, pendingRes, confirmedRes, patientsRes] = await Promise.all([
        supabase
          .from("appointments")
          .select("*, profiles!appointments_patient_id_fkey(full_name, phone)")
          .eq("date", today)
          .neq("status", "CANCELLED")
          .order("start_time", { ascending: true }),
        supabase
          .from("appointments")
          .select("id", { count: "exact" })
          .eq("status", "PENDING")
          .gte("date", today),
        supabase
          .from("appointments")
          .select("id", { count: "exact" })
          .eq("status", "CONFIRMED")
          .eq("date", today),
        supabase
          .from("profiles")
          .select("id", { count: "exact" })
          .eq("role", "PATIENT")
          .eq("is_active", true),
      ]);

      if (appointmentsRes.data) setTodayAppointments(appointmentsRes.data as AppointmentWithProfile[]);
      setPendingCount(pendingRes.count || 0);
      setConfirmedCount(confirmedRes.count || 0);
      setTotalPatients(patientsRes.count || 0);
      setLoading(false);
    }

    loadDashboard();

    const channel = supabase
      .channel("dashboard-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "appointments" },
        () => { loadDashboard(); }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [today]);

  const freeSlots = Math.max(0, 8 - todayAppointments.filter((a) => a.status !== "CANCELLED" && a.status !== "NO_SHOW").length);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-neutral-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Consultas Hoje</p>
                <p className="text-3xl font-bold text-neutral-900 mt-1" data-testid="text-today-count">
                  {todayAppointments.length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Horarios Livres</p>
                <p className="text-3xl font-bold text-neutral-900 mt-1" data-testid="text-free-slots">{freeSlots}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Pendentes</p>
                <p className="text-3xl font-bold text-neutral-900 mt-1" data-testid="text-pending-count">{pendingCount}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Total Pacientes</p>
                <p className="text-3xl font-bold text-neutral-900 mt-1" data-testid="text-total-patients">{totalPatients}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-neutral-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-neutral-200">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-neutral-900">Agenda do Dia</h2>
                <Link href="/admin/agenda">
                  <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-neutral-900" data-testid="link-view-agenda">
                    Ver agenda completa <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              {todayAppointments.length === 0 ? (
                <div className="text-center py-12 text-neutral-400">
                  <CalendarDays className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Nenhuma consulta agendada para hoje</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {todayAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-50 transition-colors border border-neutral-100"
                      data-testid={`appointment-item-${apt.id}`}
                    >
                      <div className="text-center min-w-[60px]">
                        <p className="text-sm font-semibold text-neutral-900">{apt.start_time.slice(0, 5)}</p>
                        <p className="text-[10px] text-neutral-400">{apt.end_time.slice(0, 5)}</p>
                      </div>
                      <div className="w-px h-10 bg-neutral-200" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-900 truncate">
                          {apt.profiles?.full_name || "Paciente"}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {apt.type === "FIRST_VISIT" ? "Primeira consulta" : "Retorno"}
                        </p>
                      </div>
                      <Badge className={`${statusColors[apt.status]} border-0 text-[11px]`}>
                        {statusLabels[apt.status]}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-neutral-200">
            <CardContent className="p-5">
              <h2 className="font-semibold text-neutral-900 mb-4">Resumo Rapido</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <p className="text-sm font-medium text-blue-900">{confirmedCount} confirmadas hoje</p>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <p className="text-sm font-medium text-yellow-900">{pendingCount} aguardando confirmação</p>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
                  <Clock className="w-4 h-4 text-green-600" />
                  <p className="text-sm font-medium text-green-900">{freeSlots} horários disponíveis</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Link href="/admin/agenda" className="block">
                  <Button variant="outline" size="sm" className="w-full justify-start text-neutral-600 border-neutral-200" data-testid="link-manage-agenda">
                    <CalendarDays className="w-4 h-4 mr-2" /> Gerenciar agenda
                  </Button>
                </Link>
                <Link href="/admin/pacientes" className="block">
                  <Button variant="outline" size="sm" className="w-full justify-start text-neutral-600 border-neutral-200" data-testid="link-manage-patients">
                    <Users className="w-4 h-4 mr-2" /> Ver pacientes
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

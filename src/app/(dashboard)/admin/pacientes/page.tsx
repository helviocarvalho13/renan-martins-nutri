"use client";

import { useEffect, useState, useCallback } from "react";
import type { Profile } from "@/lib/types/database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ChevronLeft, ChevronRight, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const PAGE_SIZE = 20;

export default function PacientesPage() {
  const { toast } = useToast();
  const [patients, setPatients] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    try {
      const url = debouncedSearch.trim().length >= 2
        ? `/api/admin/patients/search?q=${encodeURIComponent(debouncedSearch.trim())}`
        : "/api/admin/patients";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Falha ao carregar pacientes");
      const data = await res.json() as { patients: Profile[] };
      const allPatients = data.patients || [];
      const paginated = allPatients.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
      setPatients(paginated);
      setTotalCount(allPatients.length);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      toast({ title: "Erro ao carregar pacientes", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, page, toast]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold" data-testid="text-page-title">
          Pacientes
        </h1>
        <Badge variant="secondary" data-testid="text-total-count">
          {totalCount} paciente{totalCount !== 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          data-testid="input-search"
          placeholder="Buscar por nome ou CPF..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {loading ? (
        <div className="space-y-3" data-testid="loading-skeleton">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : patients.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground" data-testid="text-empty-state">
            Nenhum paciente encontrado.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {patients.map((patient) => (
            <Link
              key={patient.id}
              href={`/admin/pacientes/${patient.id}`}
              data-testid={`link-patient-${patient.id}`}
            >
              <Card className="hover-elevate cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate" data-testid={`text-name-${patient.id}`}>
                        {patient.full_name}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        {patient.phone && (
                          <span data-testid={`text-phone-${patient.id}`}>{patient.phone}</span>
                        )}
                        {patient.cpf && (
                          <span data-testid={`text-cpf-${patient.id}`}>{patient.cpf}</span>
                        )}
                        {patient.date_of_birth && (
                          <span data-testid={`text-dob-${patient.id}`}>
                            {format(new Date(patient.date_of_birth + "T12:00:00"), "dd/MM/yyyy")}
                          </span>
                        )}
                      </div>
                    </div>
                    <Badge
                      variant={patient.is_active ? "default" : "secondary"}
                      data-testid={`badge-status-${patient.id}`}
                    >
                      {patient.is_active ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            data-testid="button-prev-page"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
          <span className="text-sm text-muted-foreground" data-testid="text-page-info">
            {page + 1} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            data-testid="button-next-page"
          >
            Proximo
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

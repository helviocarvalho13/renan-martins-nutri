"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PublicAgendarRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/paciente/agendar");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-neutral-500 text-sm">Redirecionando para o agendamento...</p>
    </div>
  );
}

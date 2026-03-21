import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Horários Disponíveis | Renan Martins Nutricionista",
  description: "Confira os horários disponíveis para agendar sua consulta com o nutricionista Renan Martins.",
};

export default function AgendaLayout({ children }: { children: React.ReactNode }) {
  return children;
}

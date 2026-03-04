import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agendar Consulta | Renan Martins Nutricionista",
  description: "Agende sua consulta online com o nutricionista Renan Martins. Escolha o melhor horário para você.",
};

export default function AgendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}

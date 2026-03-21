import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro | Renan Martins Nutricionista",
  description: "Crie sua conta para agendar consultas com o nutricionista Renan Martins.",
  robots: { index: false, follow: false },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}

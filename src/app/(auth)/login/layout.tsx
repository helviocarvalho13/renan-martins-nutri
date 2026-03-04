import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Renan Martins Nutricionista",
  description: "Acesse sua conta para gerenciar consultas e acompanhamento nutricional.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}

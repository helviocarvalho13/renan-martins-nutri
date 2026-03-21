import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recuperar Senha | Renan Martins Nutricionista",
  description: "Recupere sua senha para acessar sua conta.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}

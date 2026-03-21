import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site | Painel Administrativo - Renan Martins",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return children;
}

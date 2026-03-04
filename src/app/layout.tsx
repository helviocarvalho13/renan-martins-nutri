import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://renanmartins.com.br"),
  title: "Renan Martins - Nutricionista | Agende sua Consulta",
  description:
    "Nutricionista Renan Martins - Consultas personalizadas para uma vida mais saudavel. Agende online.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://renanmartins.com.br",
    siteName: "Renan Martins Nutricionista",
    title: "Renan Martins - Nutricionista | Agende sua Consulta",
    description:
      "Consultas personalizadas para uma vida mais saudavel. Agende online com o nutricionista Renan Martins.",
    images: [
      {
        url: "/images/renan-martins.jpg",
        width: 1200,
        height: 630,
        alt: "Renan Martins - Nutricionista",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renan Martins - Nutricionista | Agende sua Consulta",
    description:
      "Consultas personalizadas para uma vida mais saudavel. Agende online com o nutricionista Renan Martins.",
    images: ["/images/renan-martins.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#16a34a",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <body suppressHydrationWarning>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:p-4 focus:text-neutral-900">
          Pular para conteúdo principal
        </a>
        {children}
        <ClientProviders />
      </body>
    </html>
  );
}

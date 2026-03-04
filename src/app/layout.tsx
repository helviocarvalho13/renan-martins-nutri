import type { Metadata } from "next";
import "./globals.css";
import MageBotLoader from "@/components/chatbot/MageBotLoader";
import { Toaster } from "@/components/ui/toaster";

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
    <html lang="pt-BR" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:p-4 focus:text-neutral-900">
          Pular para conteúdo principal
        </a>
        {children}
        <Toaster />
        <MageBotLoader />
      </body>
    </html>
  );
}

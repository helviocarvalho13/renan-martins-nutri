import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Renan Martins - Nutricionista | Agende sua Consulta",
  description:
    "Nutricionista Renan Martins - Consultas personalizadas para uma vida mais saudavel. Agende online.",
  openGraph: {
    title: "Renan Martins - Nutricionista",
    description:
      "Consultas personalizadas para uma vida mais saudavel. Agende online.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

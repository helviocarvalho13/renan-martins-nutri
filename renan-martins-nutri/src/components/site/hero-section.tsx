"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/renan-martins.jpg"
          alt="Renan Martins - Nutricionista"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-white/60" />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 py-32 animate-fade-in-up">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-neutral-900 mb-6"
          data-testid="text-hero-title"
        >
          Nutrição consciente para transformar sua vida
        </h1>

        <p
          className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in-up [animation-delay:200ms]"
          data-testid="text-hero-subtitle"
        >
          Consultas personalizadas para ajudar você a alcançar seus objetivos de
          saúde e bem-estar com um plano alimentar sob medida.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up [animation-delay:400ms]">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-neutral-300 text-neutral-700 hover:bg-white/80 bg-white/60 backdrop-blur-sm"
            data-testid="button-hero-about"
            asChild
          >
            <a href="#sobre">Saiba Mais</a>
          </Button>
          <Button
            size="lg"
            className="rounded-full px-8 bg-neutral-900 text-white hover:bg-neutral-800"
            data-testid="button-hero-schedule"
            asChild
          >
            <Link href="/paciente/agendar">Agendar Consulta</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

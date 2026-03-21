"use client";

import Image from "next/image";
import { useAnimateIn } from "@/hooks/useAnimateIn";

export function AboutSection() {
  const { ref, visible } = useAnimateIn("-100px");

  return (
    <section id="sobre" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8" ref={ref}>
        <div
          className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/renan-martins.jpg"
                alt="Renan Martins - Nutricionista"
                fill
                loading="lazy"
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest" data-testid="text-about-label">
              Sobre Mim
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900"
              data-testid="text-about-title"
            >
              DESTRAVE O PRÓXIMO NÍVEL
            </h2>
            <p className="text-neutral-500 leading-relaxed" data-testid="text-about-desc">
              Sou o Renan Martins, nutricionista clínico com mais de 8 anos de experiência. Acredito que a nutrição vai além de uma dieta — é sobre construir uma relação saudável com a comida e alcançar qualidade de vida.
            </p>
            <p className="text-neutral-500 leading-relaxed">
              Minha abordagem é baseada em evidências científicas e personalizada para cada paciente, considerando objetivos, rotina e preferências alimentares.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

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
            <p
              className="text-sm font-medium text-neutral-400 uppercase tracking-widest"
              data-testid="text-about-label"
            >
              Sobre Mim
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900"
              data-testid="text-about-title"
            >
              DESTRAVE O PRÓXIMO NÍVEL
            </h2>
            <p
              className="text-neutral-500 leading-relaxed"
              data-testid="text-about-desc"
            >
              Sou Renan Martins, nutricionista clínico e esportivo, com mais de
              10 anos de experiência ajudando pessoas a alcançarem alto nível de
              desempenho físico e mental.
            </p>
            <p
              className="text-neutral-500 leading-relaxed"
              data-testid="text-about-desc"
            >
              Ao longo da minha trajetória, tive a oportunidade de atender
              empresários, líderes e profissionais que lidam diariamente com
              alta demanda, tomada de decisão e responsabilidade. Nos últimos 6
              anos, direcionei ainda mais meu trabalho para atletas
              profissionais de alto rendimento, onde cada detalhe da nutrição
              impacta diretamente no resultado. Essa vivência me mostrou que,
              independentemente do cenário — seja no esporte ou nos negócios — o
              princípio é o mesmo: performance exige estratégia.
            </p>
            <p
              className="text-neutral-500 leading-relaxed"
              data-testid="text-about-desc"
            >
              Meu objetivo é estruturar sua nutrição de forma precisa, para que
              seu corpo acompanhe o nível da sua rotina, com energia,
              consistência e resultado.{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

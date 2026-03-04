"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useMounted } from "@/hooks/useMounted";

const fadeIn = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export function AboutSection() {
  const mounted = useMounted();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          initial={mounted ? "hidden" : false}
          animate={isInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.div variants={fadeIn}>
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
          </motion.div>

          <motion.div className="space-y-6" variants={fadeIn}>
            <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest" data-testid="text-about-label">
              Sobre Mim
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900"
              data-testid="text-about-title"
            >
              Nutrição com ciência e acolhimento
            </h2>
            <p className="text-neutral-500 leading-relaxed" data-testid="text-about-desc">
              Sou o Renan Martins, nutricionista clínico com mais de 8 anos de experiência. Acredito que a nutrição vai além de uma dieta — é sobre construir uma relação saudável com a comida e alcançar qualidade de vida.
            </p>
            <p className="text-neutral-500 leading-relaxed">
              Minha abordagem é baseada em evidências científicas e personalizada para cada paciente, considerando objetivos, rotina e preferências alimentares.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-neutral-100">
              <div data-testid="counter-experience">
                <p className="text-3xl font-bold text-neutral-900">8+</p>
                <p className="text-sm text-neutral-400 mt-1">Anos</p>
              </div>
              <div data-testid="counter-patients">
                <p className="text-3xl font-bold text-neutral-900">500+</p>
                <p className="text-sm text-neutral-400 mt-1">Pacientes</p>
              </div>
              <div data-testid="counter-rating">
                <p className="text-3xl font-bold text-neutral-900">4.9</p>
                <p className="text-sm text-neutral-400 mt-1">Avaliação</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-bold text-3xl md:text-4xl text-primary">
      {count}{suffix}
    </span>
  );
}

const fadeInUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="py-20 md:py-28 bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.div variants={fadeInUp}>
            <div className="relative">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/renan-martins.jpg"
                  alt="Renan Martins - Nutricionista"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-xl px-6 py-4 shadow-lg">
                <p className="font-bold text-3xl">8+</p>
                <p className="text-sm opacity-90">Anos de experiencia</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="space-y-6" variants={fadeInUp}>
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Quem Sou Eu</p>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
                style={{ fontFamily: "var(--font-serif)" }}
                data-testid="text-about-title"
              >
                Nutricao com ciencia e acolhimento
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4" data-testid="text-about-desc">
                Sou o Renan Martins, nutricionista clinico com mais de 8 anos de experiencia. Acredito que a nutricao vai alem de uma dieta — e sobre construir uma relacao saudavel com a comida e alcancar qualidade de vida.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Minha abordagem e baseada em evidencias cientificas e personalizada para cada paciente, considerando objetivos, rotina e preferencias alimentares.
              </p>
            </div>

            <div className="space-y-3">
              {[
                "Formado em Nutricao pela Universidade Federal",
                "Pos-graduacao em Nutricao Clinica Funcional",
                "Especializacao em Nutricao Esportiva",
                "Membro do Conselho Regional de Nutricionistas",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 rounded-xl bg-background shadow-sm border" data-testid="counter-experience">
                <AnimatedCounter target={8} suffix="+" />
                <p className="text-xs text-muted-foreground mt-1">Anos de Experiencia</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-background shadow-sm border" data-testid="counter-patients">
                <AnimatedCounter target={500} suffix="+" />
                <p className="text-xs text-muted-foreground mt-1">Pacientes Atendidos</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-background shadow-sm border" data-testid="counter-rating">
                <AnimatedCounter target={4} suffix=".9" />
                <p className="text-xs text-muted-foreground mt-1">Avaliacao</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useMounted } from "@/hooks/useMounted";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export function HeroSection() {
  const mounted = useMounted();
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

      <motion.div
        className="relative z-10 text-center max-w-3xl mx-auto px-6 py-32"
        variants={containerVariants}
        initial={mounted ? "hidden" : false}
        animate="visible"
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-neutral-900 mb-6"
          variants={itemVariants}
          data-testid="text-hero-title"
        >
          Nutricao consciente para transformar sua vida
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto mb-10 leading-relaxed"
          variants={itemVariants}
          data-testid="text-hero-subtitle"
        >
          Consultas personalizadas para ajudar voce a alcancar seus objetivos de saude e bem-estar com um plano alimentar sob medida.
        </motion.p>

        <motion.div className="flex flex-wrap items-center justify-center gap-4" variants={itemVariants}>
          <a href="#sobre">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-neutral-300 text-neutral-700 hover:bg-white/80 bg-white/60 backdrop-blur-sm"
              data-testid="button-hero-about"
            >
              Saiba Mais
            </Button>
          </a>
          <Link href="/agendar">
            <Button
              size="lg"
              className="rounded-full px-8 bg-neutral-900 text-white hover:bg-neutral-800"
              data-testid="button-hero-schedule"
            >
              Agendar Consulta
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

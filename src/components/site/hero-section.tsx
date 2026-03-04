"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useMounted } from "@/hooks/useMounted";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const imageVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } },
};

export function HeroSection() {
  const mounted = useMounted();
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/20" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial={mounted ? "hidden" : false}
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-xs font-medium" data-testid="badge-crn">
                CRN-3 - Nutricionista Clinico
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
              variants={itemVariants}
              data-testid="text-hero-title"
            >
              Transformando vidas atraves da{" "}
              <span className="text-primary">nutricao consciente</span>
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground max-w-lg mb-4 leading-relaxed"
              variants={itemVariants}
              data-testid="text-hero-subtitle"
            >
              Consultas individualizadas para ajudar voce a alcancar seus objetivos de saude e bem-estar com um plano alimentar feito sob medida.
            </motion.p>

            <motion.p
              className="text-sm font-semibold text-primary mb-8"
              variants={itemVariants}
              data-testid="text-hero-name"
            >
              Renan Martins — Nutricionista
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-3" variants={itemVariants}>
              <Link href="/agendar">
                <Button size="lg" className="shadow-lg shadow-primary/20" data-testid="button-hero-schedule">
                  Agendar Consulta
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="#sobre">
                <Button variant="outline" size="lg" data-testid="button-hero-about">
                  Saiba mais
                </Button>
              </a>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-6 mt-12"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2" data-testid="stat-patients">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="font-bold text-xl">500+</span>
                  <p className="text-xs text-muted-foreground">Pacientes</p>
                </div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="flex items-center gap-2" data-testid="stat-experience">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="font-bold text-xl">8+</span>
                  <p className="text-xs text-muted-foreground">Anos</p>
                </div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="flex items-center gap-2" data-testid="stat-rating">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="font-bold text-xl">4.9</span>
                  <p className="text-xs text-muted-foreground">Avaliacao</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative hidden lg:block"
            variants={imageVariants}
            initial={mounted ? "hidden" : false}
            animate="visible"
          >
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl -rotate-3 scale-105" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/renan-martins.jpg"
                  alt="Renan Martins - Nutricionista"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 0vw, 400px"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-xl px-5 py-3 shadow-lg">
                <p className="font-bold text-2xl">8+</p>
                <p className="text-xs opacity-90">Anos de experiencia</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

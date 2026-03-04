"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Star, Heart } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/30" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-2xl">
          <Badge variant="secondary" className="mb-6" data-testid="badge-crn">
            CRN - Nutricionista Clinico
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6" data-testid="text-hero-title">
            Transforme sua
            <span className="block text-primary">saude</span>
            com nutricao
            <span className="block">personalizada</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed" data-testid="text-hero-subtitle">
            Consultas individualizadas para ajudar voce a alcancar seus objetivos de saude e bem-estar com um plano alimentar feito sob medida.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/agendar">
              <Button size="lg" data-testid="button-hero-schedule">
                Agende sua Consulta
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href="#sobre">
              <Button variant="outline" size="lg" data-testid="button-hero-about">
                Saiba mais
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-12">
            <div className="flex items-center gap-2" data-testid="stat-patients">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <span className="font-bold text-lg">500+</span>
                <span className="text-sm text-muted-foreground ml-1">Pacientes</span>
              </div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex items-center gap-2" data-testid="stat-experience">
              <Star className="w-5 h-5 text-primary" />
              <div>
                <span className="font-bold text-lg">8+</span>
                <span className="text-sm text-muted-foreground ml-1">Anos de Experiencia</span>
              </div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex items-center gap-2" data-testid="stat-rating">
              <Heart className="w-5 h-5 text-primary" />
              <div>
                <span className="font-bold text-lg">4.9</span>
                <span className="text-sm text-muted-foreground ml-1">Avaliacao</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

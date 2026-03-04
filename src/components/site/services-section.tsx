"use client";

import { useRef } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import {
  Clock,
  ChevronRight,
  Stethoscope,
  Dumbbell,
  Salad,
  Sparkles,
} from "lucide-react";

const services = [
  {
    name: "Nutricao Clinica",
    description:
      "Avaliacao completa do estado nutricional, anamnese detalhada, definicao de objetivos e elaboracao do plano alimentar personalizado para suas necessidades.",
    icon: Stethoscope,
    duration: 60,
    color: "from-emerald-500/10 to-emerald-500/5",
  },
  {
    name: "Nutricao Esportiva",
    description:
      "Plano alimentar focado em performance esportiva, com estrategias de periodizacao nutricional e orientacao sobre suplementacao adequada.",
    icon: Dumbbell,
    duration: 60,
    color: "from-blue-500/10 to-blue-500/5",
  },
  {
    name: "Reeducacao Alimentar",
    description:
      "Programa completo para transformar sua relacao com a comida, com acompanhamento personalizado e suporte continuo para resultados duradouros.",
    icon: Salad,
    duration: 50,
    color: "from-orange-500/10 to-orange-500/5",
  },
  {
    name: "Nutricao Funcional",
    description:
      "Abordagem integrativa que busca tratar a causa raiz dos desequilibrios nutricionais, utilizando alimentos como ferramenta terapeutica.",
    icon: Sparkles,
    duration: 60,
    color: "from-purple-500/10 to-purple-500/5",
  },
];

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.1 },
  }),
};

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="servicos" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Areas de Atuacao
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
            data-testid="text-services-title"
          >
            Como posso te ajudar
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ofereco diferentes tipos de acompanhamento para atender suas necessidades especificas de saude e nutricao.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50" data-testid={`card-service-${index}`}>
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration} min</span>
                    </div>
                    <Link href="/agendar" className="block mt-auto">
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" data-testid={`button-book-${index}`}>
                        Agendar
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Stethoscope,
  Dumbbell,
  Salad,
  Sparkles,
} from "lucide-react";
import { useMounted } from "@/hooks/useMounted";

const services = [
  {
    name: "Nutricao Clinica",
    description:
      "Avaliacao completa do estado nutricional e elaboracao do plano alimentar personalizado.",
    icon: Stethoscope,
  },
  {
    name: "Nutricao Esportiva",
    description:
      "Plano alimentar focado em performance com estrategias de periodizacao nutricional.",
    icon: Dumbbell,
  },
  {
    name: "Reeducacao Alimentar",
    description:
      "Programa para transformar sua relacao com a comida com resultados duradouros.",
    icon: Salad,
  },
  {
    name: "Nutricao Funcional",
    description:
      "Abordagem integrativa que trata a causa raiz dos desequilibrios nutricionais.",
    icon: Sparkles,
  },
];

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.08 },
  }),
};

export function ServicesSection() {
  const mounted = useMounted();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="servicos" className="py-24 md:py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8" ref={ref}>
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest mb-3">
            Servicos
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900"
            data-testid="text-services-title"
          >
            Como posso te ajudar
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial={mounted ? "hidden" : false}
                animate={isInView ? "visible" : "hidden"}
              >
                <div
                  className="bg-white rounded-xl p-6 h-full flex flex-col border border-neutral-100 hover:border-neutral-200 hover:shadow-sm transition-all duration-200"
                  data-testid={`card-service-${index}`}
                >
                  <div className="w-11 h-11 rounded-lg bg-neutral-100 flex items-center justify-center mb-5">
                    <IconComponent className="w-5 h-5 text-neutral-700" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">{service.name}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed flex-grow mb-5">
                    {service.description}
                  </p>
                  <Link href="/agendar">
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-neutral-600 hover:text-neutral-900 p-0 h-auto font-medium text-sm"
                      data-testid={`button-book-${index}`}
                    >
                      Agendar
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

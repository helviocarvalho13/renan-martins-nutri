"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Stethoscope,
  Dumbbell,
  Salad,
  Sparkles,
} from "lucide-react";
import { useAnimateIn } from "@/hooks/useAnimateIn";

const services = [
  {
    name: "Nutrição Clínica",
    description:
      "Avaliação completa do estado nutricional e elaboração do plano alimentar personalizado.",
    icon: Stethoscope,
  },
  {
    name: "Nutrição Esportiva",
    description:
      "Plano alimentar focado em performance com estratégias de periodização nutricional.",
    icon: Dumbbell,
  },
  {
    name: "Reeducação Alimentar",
    description:
      "Programa para transformar sua relação com a comida com resultados duradouros.",
    icon: Salad,
  },
  {
    name: "Nutrição Funcional",
    description:
      "Abordagem integrativa que trata a causa raiz dos desequilíbrios nutricionais.",
    icon: Sparkles,
  },
];

export function ServicesSection() {
  const { ref, visible } = useAnimateIn();

  return (
    <section id="servicos" className="py-24 md:py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8" ref={ref}>
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest mb-3">
            Serviços
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
              <div
                key={index}
                className={`transition-all duration-500 ease-out ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: visible ? `${index * 80}ms` : "0ms" }}
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
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-neutral-600 hover:text-neutral-900 p-0 h-auto font-medium text-sm"
                    data-testid={`button-book-${index}`}
                    asChild
                  >
                    <Link href="/paciente/agendar">
                      Agendar
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

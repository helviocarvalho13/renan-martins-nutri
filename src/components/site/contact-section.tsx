"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, ArrowRight, Instagram } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useMounted } from "@/hooks/useMounted";

const fadeIn = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ContactSection() {
  const mounted = useMounted();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const contactItems = [
    {
      icon: Phone,
      label: "WhatsApp",
      value: "(11) 99999-9999",
      href: "https://wa.me/5511999999999",
      testId: "contact-phone",
    },
    {
      icon: Mail,
      label: "Email",
      value: "contato@renanmartins.com.br",
      href: "mailto:contato@renanmartins.com.br",
      testId: "contact-email",
    },
    {
      icon: MapPin,
      label: "Endereco",
      value: "Av. Paulista, 1000 - Bela Vista, SP",
      href: "https://maps.google.com/?q=Av.+Paulista+1000+Sao+Paulo",
      testId: "contact-address",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@renanmartins.nutri",
      href: "https://instagram.com/renanmartins.nutri",
      testId: "contact-instagram",
    },
  ];

  return (
    <section id="contato" className="py-24 md:py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={mounted ? "hidden" : false}
            animate={isInView ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeIn}>
              <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest mb-3">
                Contato
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-4"
                data-testid="text-contact-title"
              >
                Entre em contato
              </h2>
              <p className="text-neutral-500 mb-10">
                Ficou com alguma duvida? Entre em contato ou agende sua consulta diretamente.
              </p>
            </motion.div>

            <motion.div className="space-y-4" variants={fadeIn}>
              {contactItems.map((item) => (
                <a
                  key={item.testId}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-neutral-100 hover:border-neutral-200 transition-colors group"
                  data-testid={item.testId}
                >
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0 group-hover:bg-neutral-200 transition-colors">
                    <item.icon className="w-5 h-5 text-neutral-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-400">{item.label}</p>
                    <p className="font-medium text-sm text-neutral-700 truncate">{item.value}</p>
                  </div>
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center"
            initial={mounted ? { y: 30, opacity: 0 } : false}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl border border-neutral-100 p-10 text-center" data-testid="card-cta-schedule">
              <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                Pronto para comecar?
              </h3>
              <p className="text-neutral-500 mb-8">
                Agende sua consulta online de forma rapida e pratica.
              </p>
              <Link href="/agendar" className="block mb-3">
                <Button
                  size="lg"
                  className="w-full rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
                  data-testid="button-cta-schedule"
                >
                  Agendar Consulta
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/agenda" className="block">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full border-neutral-200"
                  data-testid="button-view-agenda"
                >
                  Ver Agenda Disponivel
                </Button>
              </Link>
              <p className="text-xs text-neutral-400 mt-6">
                Segunda a Sexta, das 8h as 18h
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

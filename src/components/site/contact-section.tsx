"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Calendar, ArrowRight, Instagram, Clock } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useMounted } from "@/hooks/useMounted";

const fadeInUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export function ContactSection() {
  const mounted = useMounted();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contato" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="text-center mb-14"
          initial={mounted ? { y: 30, opacity: 0 } : false}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Contato</p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
            data-testid="text-contact-title"
          >
            Entre em contato
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ficou com alguma duvida? Entre em contato ou agende sua consulta diretamente pelo sistema.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            className="space-y-6"
            initial={mounted ? "hidden" : false}
            animate={isInView ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeInUp}>
              <div className="rounded-xl overflow-hidden shadow-md border h-[280px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1976588706487!2d-46.65517812467398!3d-23.564616378810724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c0776a!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localizacao do consultorio"
                  data-testid="map-embed"
                />
              </div>
            </motion.div>

            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={fadeInUp}>
              {[
                {
                  icon: Phone,
                  label: "Telefone / WhatsApp",
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
              ].map((item) => (
                <a
                  key={item.testId}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                  data-testid={item.testId}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-medium text-sm truncate">{item.value}</p>
                  </div>
                </a>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Horario de Atendimento</p>
                <p className="font-medium text-sm">Segunda a Sexta, das 8h as 18h</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={mounted ? { y: 40, opacity: 0 } : false}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="shadow-lg border-border/50 h-full" data-testid="card-cta-schedule">
              <CardContent className="p-8 md:p-10 flex flex-col items-center justify-center text-center h-full space-y-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                    Pronto para comecar?
                  </h3>
                  <p className="text-muted-foreground">
                    Agende sua consulta online de forma rapida e pratica. Escolha o melhor horario para voce.
                  </p>
                </div>
                <Link href="/agendar" className="w-full">
                  <Button size="lg" className="w-full shadow-lg shadow-primary/20" data-testid="button-cta-schedule">
                    Agendar Consulta
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/agenda" className="w-full">
                  <Button variant="outline" size="lg" className="w-full" data-testid="button-view-agenda">
                    Ver Agenda Disponivel
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground">
                  Horarios disponiveis de segunda a sexta, das 8h as 18h
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

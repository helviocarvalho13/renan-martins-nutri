"use client";

import { useRef } from "react";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import { motion, useInView } from "framer-motion";

const fadeIn = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ContactSection() {
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
      label: "Endereço",
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
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="max-w-2xl mx-auto"
        >
          <motion.div variants={fadeIn} className="text-center mb-10">
            <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest mb-3">
              Contato
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-4"
              data-testid="text-contact-title"
            >
              Entre em contato
            </h2>
            <p className="text-neutral-500">
              Ficou com alguma dúvida? Entre em contato ou agende sua consulta diretamente.
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
      </div>
    </section>
  );
}

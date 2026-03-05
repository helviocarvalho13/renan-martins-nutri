"use client";

import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import { useAnimateIn } from "@/hooks/useAnimateIn";

export function ContactSection() {
  const { ref, visible } = useAnimateIn();

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
      value: "renanmartinsnutri@gmail.com",
      href: "mailto:renanmartinsnutri@gmail.com",
      testId: "contact-email",
    },
    {
      icon: MapPin,
      label: "Endereço",
      value: "Av. dos Holandeses, Marcus Barbosa | Intelligent Office, 6916 - Calhau, São Luís - MA, 65071-380",
      href: "https://maps.app.goo.gl/JDwrkfuehQcBwfP68",
      testId: "contact-address",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@renanmartinsnutri",
      href: "https://instagram.com/renanmartins.nutri",
      testId: "contact-instagram",
    },
  ];

  return (
    <section id="contato" className="py-24 md:py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8" ref={ref}>
        <div
          className={`max-w-2xl mx-auto transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-10">
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
          </div>

          <div className="space-y-4">
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
          </div>
        </div>
      </div>
    </section>
  );
}

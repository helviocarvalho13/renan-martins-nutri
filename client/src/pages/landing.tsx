import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { Service } from "@shared/schema";
import {
  Leaf,
  Calendar,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Apple,
  Heart,
  Target,
  Star,
  ChevronRight,
  Instagram,
  CheckCircle2,
  Utensils,
  Activity,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm leading-tight" data-testid="text-brand-name">Renan Martins</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest leading-tight">Nutricionista</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a href="#sobre" className="text-sm text-muted-foreground transition-colors" data-testid="link-about">Sobre</a>
            <a href="#servicos" className="text-sm text-muted-foreground transition-colors" data-testid="link-services">Servicos</a>
            <a href="#depoimentos" className="text-sm text-muted-foreground transition-colors" data-testid="link-testimonials">Depoimentos</a>
            <a href="#contato" className="text-sm text-muted-foreground transition-colors" data-testid="link-contact">Contato</a>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/admin/login">
              <Button variant="ghost" size="sm" data-testid="button-admin-login">
                Admin
              </Button>
            </Link>
            <Link href="/agendar">
              <Button size="sm" data-testid="button-schedule-cta">
                <Calendar className="w-4 h-4 mr-1" />
                Agendar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/30" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
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
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="sobre" className="py-20 bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={fadeInUp}>
            <div className="relative">
              <div className="w-full aspect-[4/5] rounded-md bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Leaf className="w-16 h-16 text-primary" />
                  </div>
                  <p className="text-lg font-semibold">Renan Martins</p>
                  <p className="text-sm text-muted-foreground">Nutricionista Clinico</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-md px-4 py-3">
                <p className="font-bold text-2xl">8+</p>
                <p className="text-xs">Anos de experiencia</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6">
            <div>
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Quem Sou Eu</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" data-testid="text-about-title">
                Nutricao com ciencia e acolhimento
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4" data-testid="text-about-desc">
                Sou o Renan Martins, nutricionista clinico com mais de 8 anos de experiencia. Acredito que a nutricao vai alem de uma dieta - e sobre construir uma relacao saudavel com a comida e alcancar qualidade de vida.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Minha abordagem e baseada em evidencias cientificas e personalizada para cada paciente, considerando objetivos, rotina e preferencias alimentares.
              </p>
            </div>

            <div className="space-y-3">
              {[
                "Formado em Nutricao pela Universidade Federal",
                "Pos-graduacao em Nutricao Clinica Funcional",
                "Especializacao em Nutricao Esportiva",
                "Membro do Conselho Regional de Nutricionistas",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const iconMap: Record<string, typeof Apple> = {
    apple: Apple,
    heart: Heart,
    target: Target,
    activity: Activity,
    utensils: Utensils,
    leaf: Leaf,
  };

  return (
    <section id="servicos" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.p variants={fadeInUp} className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            Servicos
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold tracking-tight mb-4" data-testid="text-services-title">
            Como posso te ajudar
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-xl mx-auto">
            Ofereco diferentes tipos de acompanhamento para atender suas necessidades especificas de saude e nutricao.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6 space-y-4">
                    <Skeleton className="w-12 h-12 rounded-md" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))
            : services?.map((service) => {
                const IconComponent = iconMap[service.icon || "leaf"] || Leaf;
                return (
                  <motion.div key={service.id} variants={fadeInUp}>
                    <Card className="h-full hover-elevate" data-testid={`card-service-${service.id}`}>
                      <CardContent className="p-6 space-y-4">
                        <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                        </div>
                        <div className="flex items-center justify-between gap-2 pt-2">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{service.durationMinutes} min</span>
                          </div>
                          <span className="font-semibold text-primary">
                            R$ {(service.price / 100).toFixed(2).replace(".", ",")}
                          </span>
                        </div>
                        <Link href="/agendar" className="block">
                          <Button variant="outline" className="w-full" data-testid={`button-book-${service.id}`}>
                            Agendar
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ana Paula S.",
      text: "O Renan mudou minha relacao com a comida. Em 3 meses consegui resultados que buscava ha anos. Profissional incrivel!",
      rating: 5,
    },
    {
      name: "Carlos M.",
      text: "Atendimento excepcional. O plano alimentar e totalmente adaptado a minha rotina de treinos. Recomendo muito!",
      rating: 5,
    },
    {
      name: "Mariana L.",
      text: "Finalmente encontrei um nutricionista que me ouve e entende minhas necessidades. As consultas sao muito completas.",
      rating: 5,
    },
  ];

  return (
    <section id="depoimentos" className="py-20 bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.p variants={fadeInUp} className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            Depoimentos
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold tracking-tight mb-4" data-testid="text-testimonials-title">
            O que meus pacientes dizem
          </motion.h2>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Card className="h-full" data-testid={`card-testimonial-${i}`}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">"{t.text}"</p>
                  <p className="font-medium text-sm">{t.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contato" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Contato</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" data-testid="text-contact-title">
              Entre em contato
            </h2>
            <p className="text-muted-foreground mb-8">
              Ficou com alguma duvida? Entre em contato ou agende sua consulta diretamente pelo sistema.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4" data-testid="contact-phone">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefone / WhatsApp</p>
                  <p className="font-medium">(11) 99999-9999</p>
                </div>
              </div>

              <div className="flex items-center gap-4" data-testid="contact-email">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">contato@renanmartins.com.br</p>
                </div>
              </div>

              <div className="flex items-center gap-4" data-testid="contact-address">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Endereco</p>
                  <p className="font-medium">Av. Paulista, 1000 - Bela Vista, Sao Paulo - SP</p>
                </div>
              </div>

              <div className="flex items-center gap-4" data-testid="contact-instagram">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Instagram</p>
                  <p className="font-medium">@renanmartins.nutri</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card data-testid="card-cta-schedule">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Pronto para comecar?</h3>
                  <p className="text-muted-foreground text-sm">
                    Agende sua consulta online de forma rapida e pratica. Escolha o melhor horario para voce.
                  </p>
                </div>
                <Link href="/agendar">
                  <Button size="lg" className="w-full" data-testid="button-cta-schedule">
                    Agendar Consulta
                    <ArrowRight className="w-4 h-4 ml-2" />
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

function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium">Renan Martins Nutricionista</span>
          </div>
          <p className="text-xs text-muted-foreground" data-testid="text-footer-copyright">
            2024 Renan Martins. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

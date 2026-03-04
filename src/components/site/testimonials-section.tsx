"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

interface Testimonial {
  id: string;
  content: string;
  rating: number;
  created_at: string;
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    content: "O Renan mudou minha relacao com a comida. Em 3 meses consegui resultados que buscava ha anos. Profissional incrivel!",
    rating: 5,
    created_at: "",
  },
  {
    id: "2",
    content: "Atendimento excepcional. O plano alimentar e totalmente adaptado a minha rotina de treinos. Recomendo muito!",
    rating: 5,
    created_at: "",
  },
  {
    id: "3",
    content: "Finalmente encontrei um nutricionista que me ouve e entende minhas necessidades. As consultas sao muito completas.",
    rating: 5,
    created_at: "",
  },
];

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("testimonials")
          .select("id, content, rating, created_at")
          .eq("is_approved", true)
          .order("created_at", { ascending: false });
        if (data && data.length > 0) {
          setTestimonials(data);
        }
      } catch {
        // use fallback
      }
    }
    load();
  }, []);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section id="depoimentos" className="py-20 md:py-28 bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          className="text-center mb-14"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Depoimentos
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
            data-testid="text-testimonials-title"
          >
            O que meus pacientes dizem
          </h2>
        </motion.div>

        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ y: 40, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow" data-testid={`card-testimonial-${i}`}>
                <CardContent className="p-6 space-y-4">
                  <Quote className="w-8 h-8 text-primary/20" />
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">P</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Paciente verificado</p>
                      <p className="text-xs text-muted-foreground">Consulta realizada</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden">
          <Card data-testid={`card-testimonial-mobile`}>
            <CardContent className="p-6 space-y-4">
              <Quote className="w-8 h-8 text-primary/20" />
              <div className="flex gap-1">
                {Array.from({ length: testimonials[current]?.rating || 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic min-h-[80px]">
                &ldquo;{testimonials[current]?.content}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">P</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Paciente verificado</p>
                  <p className="text-xs text-muted-foreground">Consulta realizada</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button variant="outline" size="icon" onClick={prev} aria-label="Depoimento anterior" data-testid="button-testimonial-prev">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  data-testid={`button-testimonial-dot-${i}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next} aria-label="Proximo depoimento" data-testid="button-testimonial-next">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

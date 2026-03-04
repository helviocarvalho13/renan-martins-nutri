"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useMounted } from "@/hooks/useMounted";

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
  const mounted = useMounted();
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
    <section id="depoimentos" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={mounted ? { y: 20, opacity: 0 } : false}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest mb-3">
            Depoimentos
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900"
            data-testid="text-testimonials-title"
          >
            O que meus pacientes dizem
          </h2>
        </motion.div>

        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.id}
              initial={mounted ? { y: 30, opacity: 0 } : false}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.12 }}
            >
              <div className="h-full p-6 rounded-xl border border-neutral-100" data-testid={`card-testimonial-${i}`}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                    <span className="text-neutral-500 font-medium text-xs">P</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-neutral-700">Paciente verificado</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden">
          <div className="p-6 rounded-xl border border-neutral-100" data-testid="card-testimonial-mobile">
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: testimonials[current]?.rating || 5 }).map((_, j) => (
                <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-neutral-600 text-sm leading-relaxed min-h-[80px] mb-6">
              &ldquo;{testimonials[current]?.content}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                <span className="text-neutral-500 font-medium text-xs">P</span>
              </div>
              <p className="font-medium text-sm text-neutral-700">Paciente verificado</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button variant="ghost" size="icon" onClick={prev} aria-label="Anterior" className="text-neutral-400" data-testid="button-testimonial-prev">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === current ? "bg-neutral-900" : "bg-neutral-300"
                  }`}
                  data-testid={`button-testimonial-dot-${i}`}
                />
              ))}
            </div>
            <Button variant="ghost" size="icon" onClick={next} aria-label="Proximo" className="text-neutral-400" data-testid="button-testimonial-next">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

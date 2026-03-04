import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

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

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-20 bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            Depoimentos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" data-testid="text-testimonials-title">
            O que meus pacientes dizem
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className="h-full" data-testid={`card-testimonial-${i}`}>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <p className="font-medium text-sm">{t.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

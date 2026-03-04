import { Leaf, CheckCircle2 } from "lucide-react";

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
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
          </div>

          <div className="space-y-6">
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
          </div>
        </div>
      </div>
    </section>
  );
}

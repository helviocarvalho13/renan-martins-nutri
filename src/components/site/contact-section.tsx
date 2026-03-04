import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Calendar, ArrowRight, Instagram } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contato" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
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
          </div>

          <div>
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
          </div>
        </div>
      </div>
    </section>
  );
}

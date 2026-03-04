"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";

export function Footer() {
  const currentYear = 2025;

  return (
    <footer className="border-t bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight">Renan Martins</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest leading-tight">
                  Nutricionista
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transformando vidas atraves da nutricao consciente com atendimento personalizado e humanizado.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Navegacao</h4>
            <ul className="space-y-2.5">
              <li><a href="#sobre" className="text-sm text-muted-foreground hover:text-primary transition-colors">Quem Sou Eu</a></li>
              <li><a href="#servicos" className="text-sm text-muted-foreground hover:text-primary transition-colors">Servicos</a></li>
              <li><a href="#depoimentos" className="text-sm text-muted-foreground hover:text-primary transition-colors">Depoimentos</a></li>
              <li><a href="#contato" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Acesso</h4>
            <ul className="space-y-2.5">
              <li><Link href="/agendar" className="text-sm text-muted-foreground hover:text-primary transition-colors">Agendar Consulta</Link></li>
              <li><Link href="/agenda" className="text-sm text-muted-foreground hover:text-primary transition-colors">Ver Agenda</Link></li>
              <li><Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">Area do Paciente</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Contato</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-muted-foreground">(11) 99999-9999</span></li>
              <li><span className="text-sm text-muted-foreground">contato@renanmartins.com.br</span></li>
              <li><span className="text-sm text-muted-foreground">Av. Paulista, 1000 - SP</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground" data-testid="text-footer-copyright">
            {currentYear} Renan Martins. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacidade" className="text-xs text-muted-foreground hover:text-primary transition-colors" data-testid="link-privacy">
              Politica de Privacidade
            </Link>
            <Link href="/termos" className="text-xs text-muted-foreground hover:text-primary transition-colors" data-testid="link-terms">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

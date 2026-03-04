"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-neutral-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-semibold text-neutral-900">Renan Martins</span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Nutricao consciente com atendimento personalizado e humanizado.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-sm text-neutral-900 mb-4">Navegacao</h4>
            <ul className="space-y-2.5">
              <li><a href="#sobre" className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors">Sobre</a></li>
              <li><a href="#servicos" className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors">Servicos</a></li>
              <li><a href="#depoimentos" className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors">Depoimentos</a></li>
              <li><a href="#contato" className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm text-neutral-900 mb-4">Acesso</h4>
            <ul className="space-y-2.5">
              <li><Link href="/agendar" className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors">Agendar Consulta</Link></li>
              <li><Link href="/agenda" className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors">Ver Agenda</Link></li>
              <li><Link href="/login" className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors">Area do Paciente</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm text-neutral-900 mb-4">Contato</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-neutral-400">(11) 99999-9999</span></li>
              <li><span className="text-sm text-neutral-400">contato@renanmartins.com.br</span></li>
              <li><span className="text-sm text-neutral-400">Av. Paulista, 1000 - SP</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400" data-testid="text-footer-copyright">
            2025 Renan Martins. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacidade" className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors" data-testid="link-privacy">
              Politica de Privacidade
            </Link>
            <Link href="/termos" className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors" data-testid="link-terms">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

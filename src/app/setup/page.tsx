"use client";

import { Database, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-md bg-primary flex items-center justify-center mb-4">
            <Database className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-setup-title">
            Configuração do Banco de Dados
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Este projeto usa Replit PostgreSQL com Drizzle ORM
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Banco de dados configurado</p>
                <p className="text-sm text-muted-foreground mt-2">
                  O banco de dados é gerenciado automaticamente pelo Drizzle ORM usando
                  a variável de ambiente <code className="font-mono bg-muted px-1 rounded">DATABASE_URL</code> do Replit PostgreSQL.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Para sincronizar o schema, execute <code className="font-mono bg-muted px-1 rounded">npm run db:push</code>.
                  Para criar a conta admin, acesse <code className="font-mono bg-muted px-1 rounded">/api/seed-admin</code>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/" className="text-xs text-muted-foreground underline" data-testid="link-back-home">
            Voltar ao site
          </Link>
        </div>
      </div>
    </div>
  );
}

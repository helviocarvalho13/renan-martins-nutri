"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Copy, CheckCircle2, AlertCircle } from "lucide-react";

export default function SetupPage() {
  const [sql, setSql] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSql, setShowSql] = useState(false);

  const fetchSQL = async () => {
    setLoading(true);
    const res = await fetch("/api/setup");
    const data = await res.json();
    setSql(data.sql);
    setLoading(false);
    setShowSql(true);
    return data.sql;
  };

  const handleCopy = async () => {
    const textToCopy = sql || await fetchSQL();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-md bg-primary flex items-center justify-center mb-4">
            <Database className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-setup-title">
            Configuracao do Banco de Dados
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure as tabelas necessarias no Supabase
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Instrucoes</p>
                <ol className="text-sm text-muted-foreground mt-2 space-y-2 list-decimal list-inside">
                  <li>Acesse o painel do Supabase (Dashboard)</li>
                  <li>Va em <strong>SQL Editor</strong> &gt; <strong>New Query</strong></li>
                  <li>Clique no botao abaixo para copiar o SQL</li>
                  <li>Cole o SQL no editor e execute</li>
                  <li>Pronto! O banco de dados estara configurado</li>
                </ol>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCopy} className="flex-1" disabled={loading} data-testid="button-copy-sql">
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    SQL copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    {loading ? "Carregando..." : "Copiar SQL completo"}
                  </>
                )}
              </Button>
              {!showSql && (
                <Button variant="outline" onClick={fetchSQL} disabled={loading} data-testid="button-show-sql">
                  Ver SQL
                </Button>
              )}
            </div>

            {showSql && sql && (
              <pre className="bg-muted p-4 rounded-md text-xs max-h-96 overflow-auto whitespace-pre-wrap font-mono" data-testid="text-sql-preview">
                {sql}
              </pre>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <a href="/" className="text-xs text-muted-foreground underline" data-testid="link-back-home">
            Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
}

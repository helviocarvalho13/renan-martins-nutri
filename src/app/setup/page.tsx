"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Database, CheckCircle2, Copy, AlertCircle } from "lucide-react";

export default function SetupPage() {
  const [sql, setSql] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "manual">("idle");

  const fetchSQL = async () => {
    const res = await fetch("/api/setup");
    const data = await res.json();
    setSql(data.sql);
    return data.sql;
  };

  const handleSetup = async () => {
    setLoading(true);
    const sqlText = await fetchSQL();

    const res = await fetch("/api/setup", { method: "POST" });
    const data = await res.json();

    if (data.error) {
      setStatus("manual");
    } else {
      setStatus("success");
    }
    setLoading(false);
  };

  const handleCopy = async () => {
    if (!sql) await fetchSQL();
    const textToCopy = sql || (await (await fetch("/api/setup")).json()).sql;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
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

        {status === "success" && (
          <Card className="border-primary">
            <CardContent className="p-6 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-primary mx-auto" />
              <p className="font-medium">Banco de dados configurado com sucesso!</p>
              <p className="text-sm text-muted-foreground">
                As tabelas e dados iniciais foram criados. Voce pode acessar o site normalmente.
              </p>
              <a href="/">
                <Button className="mt-4" data-testid="button-go-home">Ir para o site</Button>
              </a>
            </CardContent>
          </Card>
        )}

        {status === "manual" && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Configuracao manual necessaria</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Copie o SQL abaixo e cole no <strong>SQL Editor</strong> do seu painel Supabase
                    (Dashboard &gt; SQL Editor &gt; New Query). Execute o SQL e depois volte aqui.
                  </p>
                </div>
              </div>

              <Button onClick={handleCopy} variant="outline" className="w-full" data-testid="button-copy-sql">
                <Copy className="w-4 h-4 mr-2" />
                {copied ? "SQL copiado!" : "Copiar SQL"}
              </Button>

              {sql && (
                <pre className="bg-muted p-4 rounded-md text-xs max-h-64 overflow-auto whitespace-pre-wrap">
                  {sql}
                </pre>
              )}
            </CardContent>
          </Card>
        )}

        {status === "idle" && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                Este assistente ira criar as tabelas necessarias no Supabase: servicos,
                horarios, agendamentos e perfis. Tambem adicionara dados iniciais.
              </p>
              <Button onClick={handleSetup} className="w-full" disabled={loading} data-testid="button-run-setup">
                {loading ? "Configurando..." : "Configurar Banco de Dados"}
                <Database className="w-4 h-4 ml-2" />
              </Button>

              <div className="text-center">
                <button
                  onClick={async () => {
                    await fetchSQL();
                    setStatus("manual");
                  }}
                  className="text-xs text-muted-foreground underline"
                  data-testid="button-manual-setup"
                >
                  Prefiro configurar manualmente
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

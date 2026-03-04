import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Leaf, LogIn } from "lucide-react";
import { Link } from "wouter";

const loginSchema = z.object({
  username: z.string().min(1, "Usuario obrigatorio"),
  password: z.string().min(1, "Senha obrigatoria"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const res = await apiRequest("POST", "/api/auth/login", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      setLocation("/admin");
    },
    onError: (error: Error) => {
      toast({
        title: "Erro no login",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Link href="/">
            <div className="w-12 h-12 mx-auto rounded-md bg-primary flex items-center justify-center mb-4 cursor-pointer">
              <Leaf className="w-7 h-7 text-primary-foreground" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="text-login-title">Painel Administrativo</h1>
          <p className="text-sm text-muted-foreground mt-1">Entre com suas credenciais para acessar</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuario</FormLabel>
                      <FormControl>
                        <Input placeholder="admin" {...field} data-testid="input-username" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Sua senha" {...field} data-testid="input-password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={mutation.isPending} data-testid="button-login">
                  {mutation.isPending ? "Entrando..." : "Entrar"}
                  <LogIn className="w-4 h-4 ml-1" />
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          <Link href="/" className="underline" data-testid="link-back-home">
            Voltar ao site
          </Link>
        </p>
      </div>
    </div>
  );
}

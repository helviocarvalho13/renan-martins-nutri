"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, ChevronRight, Apple, Heart, Target, Activity, Leaf } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { SiteContent, ServiceItem } from "@/lib/types";

const iconMap: Record<string, any> = {
  apple: Apple,
  heart: Heart,
  target: Target,
  activity: Activity,
  leaf: Leaf,
};

export function ServicesSection() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      const supabase = createClient();
      const { data } = await supabase
        .from("site_content")
        .select("content")
        .eq("section", "services")
        .eq("is_active", true)
        .single();
      if (data?.content) {
        const content = data.content as { items?: ServiceItem[] };
        setServices(content.items || []);
      }
      setLoading(false);
    }
    loadServices();
  }, []);

  return (
    <section id="servicos" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
            Servicos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" data-testid="text-services-title">
            Como posso te ajudar
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ofereco diferentes tipos de acompanhamento para atender suas necessidades especificas de saude e nutricao.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6 space-y-4">
                    <Skeleton className="w-12 h-12 rounded-md" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))
            : services.map((service, index) => {
                const IconComponent = iconMap[service.icon || "leaf"] || Leaf;
                return (
                  <Card key={index} className="h-full" data-testid={`card-service-${index}`}>
                    <CardContent className="p-6 space-y-4">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{service.duration_minutes} min</span>
                        </div>
                        <span className="font-semibold text-primary">
                          R$ {(service.price_cents / 100).toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                      <Link href="/agendar" className="block">
                        <Button variant="outline" className="w-full" data-testid={`button-book-${index}`}>
                          Agendar
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
        </div>
      </div>
    </section>
  );
}

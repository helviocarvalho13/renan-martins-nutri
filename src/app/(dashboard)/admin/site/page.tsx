"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SiteContent, Testimonial, Profile } from "@/lib/types/database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Save, Star, Check, X, Trash2 } from "lucide-react";

interface TestimonialWithProfile extends Testimonial {
  profiles?: Profile | null;
}

const sectionLabels: Record<string, string> = {
  hero: "Hero",
  about: "Sobre",
  services: "Servicos",
  contact: "Contato",
  footer: "Rodape",
};

export default function SiteManagementPage() {
  const supabase = createClient();

  const [siteContent, setSiteContent] = useState<SiteContent[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchSiteContent = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("site_content")
      .select("*")
      .order("sort_order", { ascending: true });

    if (data) {
      setSiteContent(data);
      const contentMap: Record<string, string> = {};
      data.forEach((item) => {
        contentMap[item.section] = JSON.stringify(item.content, null, 2);
      });
      setEditedContent(contentMap);
    }
    setLoading(false);
  }, []);

  const fetchTestimonials = useCallback(async () => {
    setTestimonialsLoading(true);
    const { data } = await supabase
      .from("testimonials")
      .select("*, profiles(*)")
      .order("created_at", { ascending: false });

    if (data) {
      setTestimonials(data as TestimonialWithProfile[]);
    }
    setTestimonialsLoading(false);
  }, []);

  useEffect(() => {
    fetchSiteContent();
    fetchTestimonials();
  }, [fetchSiteContent, fetchTestimonials]);

  const handleSaveSection = async (section: string) => {
    setSavingSection(section);
    try {
      const parsed = JSON.parse(editedContent[section]);
      const item = siteContent.find((s) => s.section === section);
      if (item) {
        await supabase
          .from("site_content")
          .update({ content: parsed })
          .eq("id", item.id);
      }
      await fetchSiteContent();
    } catch {
      alert("JSON invalido. Verifique a formatacao.");
    }
    setSavingSection(null);
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    await supabase
      .from("testimonials")
      .update({ is_approved: true })
      .eq("id", id);
    await fetchTestimonials();
    setActionLoading(null);
  };

  const handleReject = async (id: string) => {
    setActionLoading(id);
    await supabase
      .from("testimonials")
      .update({ is_approved: false })
      .eq("id", id);
    await fetchTestimonials();
    setActionLoading(null);
  };

  const handleDelete = async (id: string) => {
    setActionLoading(id);
    await supabase.from("testimonials").delete().eq("id", id);
    await fetchTestimonials();
    setActionLoading(null);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold" data-testid="text-page-title">
        Gerenciamento do Site
      </h1>

      <Tabs defaultValue="content">
        <TabsList data-testid="tabs-site-management">
          <TabsTrigger value="content" data-testid="tab-trigger-content">
            Conteudo do Site
          </TabsTrigger>
          <TabsTrigger value="testimonials" data-testid="tab-trigger-testimonials">
            Depoimentos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-40" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-32 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : siteContent.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground" data-testid="text-no-content">
                  Nenhum conteudo encontrado. Execute o seed para popular o site.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {siteContent.map((item) => (
                <Card key={item.id} data-testid={`card-section-${item.section}`}>
                  <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                    <CardTitle className="text-lg">
                      {item.title || sectionLabels[item.section] || item.section}
                    </CardTitle>
                    <Badge variant="outline" data-testid={`badge-section-${item.section}`}>
                      {item.section}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Textarea
                      data-testid={`textarea-content-${item.section}`}
                      className="font-mono text-xs min-h-[200px]"
                      value={editedContent[item.section] || ""}
                      onChange={(e) =>
                        setEditedContent((prev) => ({
                          ...prev,
                          [item.section]: e.target.value,
                        }))
                      }
                    />
                    <div className="flex justify-end">
                      <Button
                        data-testid={`button-save-${item.section}`}
                        onClick={() => handleSaveSection(item.section)}
                        disabled={savingSection === item.section}
                      >
                        <Save />
                        {savingSection === item.section ? "Salvando..." : "Salvar"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="testimonials">
          {testimonialsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground" data-testid="text-no-testimonials">
                  Nenhum depoimento encontrado.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} data-testid={`card-testimonial-${testimonial.id}`}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="space-y-1 flex-1 min-w-0">
                        {testimonial.profiles?.full_name && (
                          <p
                            className="font-medium text-sm"
                            data-testid={`text-testimonial-name-${testimonial.id}`}
                          >
                            {testimonial.profiles.full_name}
                          </p>
                        )}
                        <div className="flex items-center gap-1" data-testid={`rating-${testimonial.id}`}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <Badge
                        variant={testimonial.is_approved ? "default" : "secondary"}
                        data-testid={`badge-status-${testimonial.id}`}
                      >
                        {testimonial.is_approved ? "Aprovado" : "Pendente"}
                      </Badge>
                    </div>

                    <Separator />

                    <p
                      className="text-sm text-muted-foreground"
                      data-testid={`text-testimonial-content-${testimonial.id}`}
                    >
                      {testimonial.content}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                      {!testimonial.is_approved && (
                        <Button
                          variant="outline"
                          size="sm"
                          data-testid={`button-approve-${testimonial.id}`}
                          disabled={actionLoading === testimonial.id}
                          onClick={() => handleApprove(testimonial.id)}
                        >
                          <Check />
                          Aprovar
                        </Button>
                      )}
                      {testimonial.is_approved && (
                        <Button
                          variant="outline"
                          size="sm"
                          data-testid={`button-reject-${testimonial.id}`}
                          disabled={actionLoading === testimonial.id}
                          onClick={() => handleReject(testimonial.id)}
                        >
                          <X />
                          Rejeitar
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        data-testid={`button-delete-${testimonial.id}`}
                        disabled={actionLoading === testimonial.id}
                        onClick={() => handleDelete(testimonial.id)}
                      >
                        <Trash2 />
                        Excluir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { useState } from "react";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Service, TimeSlot } from "@shared/schema";
import {
  Leaf,
  ArrowLeft,
  ArrowRight,
  Clock,
  CalendarDays,
  User,
  CheckCircle2,
} from "lucide-react";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";

const bookingSchema = z.object({
  serviceId: z.string().min(1, "Selecione um servico"),
  date: z.string().min(1, "Selecione uma data"),
  startTime: z.string().min(1, "Selecione um horario"),
  endTime: z.string(),
  patientName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  patientEmail: z.string().email("Email invalido"),
  patientPhone: z.string().min(10, "Telefone invalido"),
  notes: z.string().optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

const steps = [
  { id: 1, title: "Servico", icon: Leaf },
  { id: 2, title: "Data e Horario", icon: CalendarDays },
  { id: 3, title: "Seus Dados", icon: User },
  { id: 4, title: "Confirmacao", icon: CheckCircle2 },
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();

  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: timeSlots } = useQuery<TimeSlot[]>({
    queryKey: ["/api/time-slots"],
  });

  const selectedDateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const { data: bookedSlots } = useQuery<string[]>({
    queryKey: ["/api/appointments/booked", selectedDateStr],
    enabled: !!selectedDate,
  });

  const form = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceId: "",
      date: "",
      startTime: "",
      endTime: "",
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      notes: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: BookingForm) => {
      const res = await apiRequest("POST", "/api/appointments", data);
      return res.json();
    },
    onSuccess: () => {
      setCurrentStep(4);
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao agendar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const selectedService = services?.find((s) => s.id === form.watch("serviceId"));

  const availableSlots =
    selectedDate && timeSlots
      ? timeSlots
          .filter((slot) => slot.dayOfWeek === selectedDate.getDay() && slot.isActive)
          .filter((slot) => !(bookedSlots || []).includes(slot.startTime))
      : [];

  const handleSelectService = (serviceId: string) => {
    form.setValue("serviceId", serviceId);
    setCurrentStep(2);
  };

  const handleSelectDate = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      form.setValue("date", format(date, "yyyy-MM-dd"));
      form.setValue("startTime", "");
      form.setValue("endTime", "");
    }
  };

  const handleSelectTime = (slot: TimeSlot) => {
    form.setValue("startTime", slot.startTime);
    form.setValue("endTime", slot.endTime);
  };

  const onSubmit = (data: BookingForm) => {
    mutation.mutate(data);
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return !!form.watch("serviceId");
      case 2:
        return !!form.watch("startTime");
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-sm" data-testid="text-booking-brand">Renan Martins</span>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2" data-testid="text-booking-title">
            Agende sua Consulta
          </h1>
          <p className="text-muted-foreground">
            Siga os passos abaixo para agendar sua consulta com o Dr. Renan Martins.
          </p>
        </div>

        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {steps.map((step, i) => {
            const isActive = currentStep === step.id;
            const isComplete = currentStep > step.id;
            const StepIcon = step.icon;
            return (
              <div key={step.id} className="flex items-center gap-2 flex-shrink-0">
                {i > 0 && <div className={`w-8 h-px ${isComplete || isActive ? "bg-primary" : "bg-border"}`} />}
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : isComplete
                        ? "text-primary"
                        : "text-muted-foreground"
                  }`}
                  data-testid={`step-${step.id}`}
                >
                  <StepIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{step.title}</span>
                </div>
              </div>
            );
          })}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-lg font-semibold mb-4" data-testid="text-step1-title">Escolha o tipo de consulta</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {servicesLoading
                      ? Array.from({ length: 3 }).map((_, i) => (
                          <Card key={i}>
                            <CardContent className="p-6 space-y-3">
                              <Skeleton className="h-5 w-3/4" />
                              <Skeleton className="h-4 w-full" />
                              <Skeleton className="h-4 w-1/2" />
                            </CardContent>
                          </Card>
                        ))
                      : services?.filter((s) => s.isActive).map((service) => (
                          <Card
                            key={service.id}
                            className={`cursor-pointer transition-colors hover-elevate ${
                              form.watch("serviceId") === service.id
                                ? "border-primary bg-primary/5"
                                : ""
                            }`}
                            onClick={() => handleSelectService(service.id)}
                            data-testid={`card-select-service-${service.id}`}
                          >
                            <CardContent className="p-6">
                              <h3 className="font-semibold mb-1">{service.name}</h3>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {service.description}
                              </p>
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  <span>{service.durationMinutes} min</span>
                                </div>
                                <Badge variant="secondary">
                                  R$ {(service.price / 100).toFixed(2).replace(".", ",")}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-lg font-semibold mb-4" data-testid="text-step2-title">Escolha a data e horario</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-4 flex justify-center">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={handleSelectDate}
                          disabled={(date) =>
                            isBefore(date, startOfToday()) || date > addDays(new Date(), 60) || date.getDay() === 0
                          }
                          data-testid="calendar-date"
                        />
                      </CardContent>
                    </Card>

                    <div>
                      <p className="text-sm font-medium mb-3">
                        {selectedDate
                          ? `Horarios disponiveis em ${format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}`
                          : "Selecione uma data para ver os horarios"}
                      </p>
                      {selectedDate ? (
                        availableSlots.length > 0 ? (
                          <div className="grid grid-cols-2 gap-2">
                            {availableSlots.map((slot) => (
                              <Button
                                key={slot.id}
                                type="button"
                                variant={form.watch("startTime") === slot.startTime ? "default" : "outline"}
                                onClick={() => handleSelectTime(slot)}
                                data-testid={`button-time-${slot.startTime}`}
                              >
                                {slot.startTime.slice(0, 5)}
                              </Button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground" data-testid="text-no-slots">
                            Nenhum horario disponivel nesta data. Tente outra data.
                          </p>
                        )
                      ) : (
                        <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                          <CalendarDays className="w-5 h-5 mr-2" />
                          Selecione uma data
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} data-testid="button-back-step1">
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Voltar
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      disabled={!canGoNext()}
                      data-testid="button-next-step3"
                    >
                      Continuar
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-lg font-semibold mb-4" data-testid="text-step3-title">Seus dados</h2>

                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="bg-primary/5 rounded-md p-4 mb-4">
                        <p className="text-sm font-medium mb-1">Resumo do agendamento:</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedService?.name} - {selectedDate && format(selectedDate, "dd/MM/yyyy")} as{" "}
                          {form.watch("startTime")?.slice(0, 5)}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="patientName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome completo</FormLabel>
                              <FormControl>
                                <Input placeholder="Seu nome completo" {...field} data-testid="input-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="patientEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="seu@email.com" {...field} data-testid="input-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="patientPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone / WhatsApp</FormLabel>
                            <FormControl>
                              <Input placeholder="(11) 99999-9999" {...field} data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Observacoes (opcional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Alguma informacao importante para a consulta?"
                                className="resize-none"
                                {...field}
                                data-testid="input-notes"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <div className="flex items-center gap-3 mt-6">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(2)} data-testid="button-back-step2">
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Voltar
                    </Button>
                    <Button type="submit" disabled={mutation.isPending} data-testid="button-submit-booking">
                      {mutation.isPending ? "Agendando..." : "Confirmar Agendamento"}
                      <CheckCircle2 className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2" data-testid="text-booking-success">Consulta Agendada!</h2>
                  <p className="text-muted-foreground mb-2">
                    Sua consulta foi agendada com sucesso. Voce recebera um email de confirmacao em breve.
                  </p>
                  <p className="text-sm text-muted-foreground mb-8">
                    {selectedService?.name} - {selectedDate && format(selectedDate, "dd/MM/yyyy")} as{" "}
                    {form.watch("startTime")?.slice(0, 5)}
                  </p>
                  <Link href="/">
                    <Button data-testid="button-back-to-home">
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Voltar ao inicio
                    </Button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Form>
      </div>
    </div>
  );
}

import type { ChatContext, EngineResponse, QuickReply, Slot, ChatStateKey } from "./types";
import { createInitialContext } from "./types";
import { parseDatePtBr, formatDatePtBr, formatDateISO } from "./dateParser";
import { startOfDay, addDays, format } from "date-fns";

async function fetchAvailableSlots(date: string): Promise<Slot[]> {
  try {
    const res = await fetch(`/api/available-slots?date=${date}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.slots || [];
  } catch {
    return [];
  }
}

async function bookAppointment(params: {
  date: string;
  start_time: string;
  end_time: string;
  type: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/patient/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error || "Erro ao agendar." };
    return { success: true };
  } catch {
    return { success: false, error: "Erro de conexao. Tente novamente." };
  }
}

function formatSlotTime(time: string): string {
  return time.slice(0, 5);
}

const MENU_REPLIES: QuickReply[] = [
  { label: "Agendar consulta", value: "agendar" },
  { label: "Ver agendamentos", value: "agendamentos" },
  { label: "Servicos", value: "servicos" },
  { label: "Contato", value: "contato" },
];

const ANYTHING_ELSE_REPLIES: QuickReply[] = [
  { label: "Sim, quero mais ajuda", value: "sim" },
  { label: "Nao, obrigado", value: "nao" },
];

const TYPE_REPLIES: QuickReply[] = [
  { label: "Primeira Consulta", value: "FIRST_VISIT" },
  { label: "Retorno", value: "RETURN" },
  { label: "Voltar ao menu", value: "menu" },
];

export async function processMessage(
  input: string,
  context: ChatContext
): Promise<EngineResponse> {
  const trimmed = input.trim().toLowerCase();

  if (trimmed === "menu" || trimmed === "voltar" || trimmed === "inicio") {
    return {
      messages: ["Como posso te ajudar?"],
      context: { ...context, state: "MENU" },
      quickReplies: MENU_REPLIES,
    };
  }

  switch (context.state) {
    case "GREETING":
      return handleGreeting(context);

    case "MENU":
      return handleMenu(trimmed, context);

    case "AUTH_CHECK":
      return handleAuthCheck(context);

    case "SELECT_TYPE":
      return handleSelectType(trimmed, context);

    case "SELECT_DATE":
      return handleSelectDate(input, context);

    case "VALIDATE_DATE":
      return handleValidateDate(context);

    case "SHOW_SLOTS":
      return handleShowSlots(trimmed, context);

    case "CONFIRM":
      return handleConfirm(trimmed, context);

    case "BOOKING":
      return handleBooking(context);

    case "ANYTHING_ELSE":
      return handleAnythingElse(trimmed, context);

    case "FAREWELL":
      return handleFarewell(context);

    case "VIEW_APPOINTMENTS":
      return handleViewAppointments(context);

    case "SERVICES_INFO":
      return handleServicesInfo(context);

    case "CONTACT_INFO":
      return handleContactInfo(context);

    default:
      return handleGreeting(context);
  }
}

function handleGreeting(context: ChatContext): EngineResponse {
  const greeting = context.userName
    ? `Ola, ${context.userName}! Eu sou o MageBot, assistente virtual do Renan Martins Nutricao. Como posso te ajudar hoje?`
    : "Ola! Eu sou o MageBot, assistente virtual do Renan Martins Nutricao. Como posso te ajudar hoje?";

  return {
    messages: [greeting],
    context: { ...context, state: "MENU" },
    quickReplies: MENU_REPLIES,
  };
}

function handleMenu(input: string, context: ChatContext): EngineResponse {
  if (input === "agendar" || input.includes("agendar") || input.includes("consulta") || input.includes("marcar")) {
    return {
      messages: ["Vamos agendar sua consulta!"],
      context: { ...context, state: "AUTH_CHECK" },
      quickReplies: [],
    };
  }

  if (input === "agendamentos" || input.includes("agendamento") || input.includes("minhas consultas")) {
    return handleViewAppointments(context);
  }

  if (input === "servicos" || input.includes("servico") || input.includes("serviço")) {
    return handleServicesInfo(context);
  }

  if (input === "contato" || input.includes("contato") || input.includes("telefone") || input.includes("endereco")) {
    return handleContactInfo(context);
  }

  return {
    messages: ["Desculpe, nao entendi. Escolha uma das opcoes abaixo:"],
    context: { ...context, state: "MENU" },
    quickReplies: MENU_REPLIES,
  };
}

function handleAuthCheck(context: ChatContext): EngineResponse {
  if (!context.isAuthenticated) {
    return {
      messages: [
        "Para agendar uma consulta, voce precisa estar logado.",
        "Por favor, faca login ou crie uma conta e depois volte aqui para agendar.",
      ],
      context: { ...context, state: "ANYTHING_ELSE" },
      quickReplies: [
        { label: "Fazer login", value: "login" },
        { label: "Voltar ao menu", value: "menu" },
      ],
    };
  }

  return {
    messages: ["Qual tipo de consulta voce deseja agendar?"],
    context: { ...context, state: "SELECT_TYPE" },
    quickReplies: TYPE_REPLIES,
  };
}

function handleSelectType(input: string, context: ChatContext): EngineResponse {
  if (input === "first_visit" || input.includes("primeira")) {
    return {
      messages: [
        "Primeira consulta selecionada!",
        "Para qual data voce gostaria de agendar? Voce pode digitar: 'amanha', 'proxima segunda', 'dia 15', '15/03', etc.",
      ],
      context: { ...context, state: "SELECT_DATE", appointmentType: "FIRST_VISIT" },
      quickReplies: [
        { label: "Amanha", value: "amanha" },
        { label: "Proxima segunda", value: "proxima segunda" },
        { label: "Proxima quarta", value: "proxima quarta" },
        { label: "Proxima sexta", value: "proxima sexta" },
      ],
    };
  }

  if (input === "return" || input.includes("retorno")) {
    return {
      messages: [
        "Retorno selecionado!",
        "Para qual data voce gostaria de agendar o retorno? Voce pode digitar: 'amanha', 'proxima segunda', 'dia 15', '15/03', etc.",
      ],
      context: { ...context, state: "SELECT_DATE", appointmentType: "RETURN" },
      quickReplies: [
        { label: "Amanha", value: "amanha" },
        { label: "Proxima segunda", value: "proxima segunda" },
        { label: "Proxima quarta", value: "proxima quarta" },
        { label: "Proxima sexta", value: "proxima sexta" },
      ],
    };
  }

  return {
    messages: ["Por favor, selecione o tipo de consulta:"],
    context: { ...context, state: "SELECT_TYPE" },
    quickReplies: TYPE_REPLIES,
  };
}

async function handleSelectDate(input: string, context: ChatContext): Promise<EngineResponse> {
  const parsed = parseDatePtBr(input);
  if (!parsed) {
    return {
      messages: [
        "Nao consegui entender a data. Tente novamente usando formatos como:",
        "'amanha', 'proxima segunda', 'dia 15', '15/03', '15/03/2025', '15 de marco'",
      ],
      context: { ...context, state: "SELECT_DATE" },
      quickReplies: [
        { label: "Amanha", value: "amanha" },
        { label: "Proxima segunda", value: "proxima segunda" },
        { label: "Voltar ao menu", value: "menu" },
      ],
    };
  }

  const today = startOfDay(new Date());
  const minDate = addDays(today, 1);
  if (parsed < minDate) {
    return {
      messages: ["A data precisa ser pelo menos amanha. Agendamentos devem ser feitos com pelo menos 24 horas de antecedencia."],
      context: { ...context, state: "SELECT_DATE" },
      quickReplies: [
        { label: "Amanha", value: "amanha" },
        { label: "Proxima segunda", value: "proxima segunda" },
      ],
    };
  }

  const dateISO = formatDateISO(parsed);
  const slots = await fetchAvailableSlots(dateISO);

  if (slots.length === 0) {
    const suggestions = await findNextAvailableDays(dateISO, 3);
    const suggestionMessages = suggestions.length > 0
      ? [`Nao ha horarios disponiveis para ${formatDatePtBr(parsed)}.`, `Proximos dias disponiveis: ${suggestions.map(s => formatDatePtBr(new Date(s + "T12:00:00"))).join(", ")}`]
      : [`Nao ha horarios disponiveis para ${formatDatePtBr(parsed)}. Tente outra data.`];

    const suggestionReplies: QuickReply[] = suggestions.map(s => ({
      label: formatDatePtBr(new Date(s + "T12:00:00")),
      value: formatDatePtBr(new Date(s + "T12:00:00")),
    }));
    suggestionReplies.push({ label: "Outra data", value: "outra" });

    return {
      messages: suggestionMessages,
      context: { ...context, state: "SELECT_DATE" },
      quickReplies: suggestionReplies,
    };
  }

  return {
    messages: [
      `Horarios disponiveis para ${formatDatePtBr(parsed)}:`,
      "Escolha um horario:",
    ],
    context: {
      ...context,
      state: "SHOW_SLOTS",
      selectedDate: dateISO,
      availableSlots: slots,
    },
    quickReplies: slots.map((s) => ({
      label: formatSlotTime(s.start_time),
      value: s.start_time,
    })),
  };
}

async function findNextAvailableDays(fromDate: string, count: number): Promise<string[]> {
  const results: string[] = [];
  let current = addDays(new Date(fromDate + "T12:00:00"), 1);

  for (let i = 0; i < 30 && results.length < count; i++) {
    const dateStr = formatDateISO(current);
    const slots = await fetchAvailableSlots(dateStr);
    if (slots.length > 0) {
      results.push(dateStr);
    }
    current = addDays(current, 1);
  }

  return results;
}

function handleValidateDate(context: ChatContext): EngineResponse {
  return {
    messages: ["Buscando horarios disponiveis..."],
    context,
    quickReplies: [],
  };
}

function handleShowSlots(input: string, context: ChatContext): EngineResponse {
  const matchedSlot = context.availableSlots.find(
    (s) => s.start_time === input || formatSlotTime(s.start_time) === input
  );

  if (!matchedSlot) {
    return {
      messages: ["Por favor, escolha um dos horarios disponiveis:"],
      context: { ...context, state: "SHOW_SLOTS" },
      quickReplies: context.availableSlots.map((s) => ({
        label: formatSlotTime(s.start_time),
        value: s.start_time,
      })),
    };
  }

  const typeLabel = context.appointmentType === "FIRST_VISIT" ? "Primeira Consulta" : "Retorno";
  const dateFormatted = context.selectedDate
    ? formatDatePtBr(new Date(context.selectedDate + "T12:00:00"))
    : "";

  return {
    messages: [
      "Por favor, confirme os dados do agendamento:",
      `Tipo: ${typeLabel}`,
      `Data: ${dateFormatted}`,
      `Horario: ${formatSlotTime(matchedSlot.start_time)} - ${formatSlotTime(matchedSlot.end_time)}`,
      "Deseja confirmar?",
    ],
    context: { ...context, state: "CONFIRM", selectedSlot: matchedSlot },
    quickReplies: [
      { label: "Confirmar", value: "sim" },
      { label: "Escolher outro horario", value: "outro_horario" },
      { label: "Cancelar", value: "cancelar" },
    ],
  };
}

async function handleConfirm(input: string, context: ChatContext): Promise<EngineResponse> {
  if (input === "sim" || input === "confirmar" || input.includes("confirm")) {
    if (!context.selectedDate || !context.selectedSlot || !context.appointmentType) {
      return {
        messages: ["Erro: dados do agendamento incompletos. Vamos comecar de novo."],
        context: { ...context, state: "SELECT_TYPE", selectedDate: null, selectedSlot: null, appointmentType: null },
        quickReplies: TYPE_REPLIES,
      };
    }

    const result = await bookAppointment({
      date: context.selectedDate,
      start_time: context.selectedSlot.start_time,
      end_time: context.selectedSlot.end_time,
      type: context.appointmentType,
    });

    if (result.success) {
      const dateFormatted = formatDatePtBr(new Date(context.selectedDate + "T12:00:00"));
      return {
        messages: [
          "Consulta agendada com sucesso!",
          `Data: ${dateFormatted} as ${formatSlotTime(context.selectedSlot.start_time)}`,
          "Voce recebera uma confirmacao em breve. Posso ajudar com mais alguma coisa?",
        ],
        context: {
          ...context,
          state: "ANYTHING_ELSE",
          selectedDate: null,
          selectedSlot: null,
          appointmentType: null,
          availableSlots: [],
        },
        quickReplies: ANYTHING_ELSE_REPLIES,
      };
    }

    return {
      messages: [
        `Nao foi possivel agendar: ${result.error}`,
        "Deseja tentar novamente?",
      ],
      context: { ...context, state: "ANYTHING_ELSE" },
      quickReplies: [
        { label: "Tentar novamente", value: "agendar" },
        { label: "Voltar ao menu", value: "menu" },
      ],
    };
  }

  if (input === "outro_horario" || input.includes("outro")) {
    return {
      messages: ["Escolha outro horario:"],
      context: { ...context, state: "SHOW_SLOTS", selectedSlot: null },
      quickReplies: context.availableSlots.map((s) => ({
        label: formatSlotTime(s.start_time),
        value: s.start_time,
      })),
    };
  }

  if (input === "cancelar" || input.includes("cancel")) {
    return {
      messages: ["Agendamento cancelado. Posso ajudar com mais alguma coisa?"],
      context: {
        ...context,
        state: "ANYTHING_ELSE",
        selectedDate: null,
        selectedSlot: null,
        appointmentType: null,
        availableSlots: [],
      },
      quickReplies: ANYTHING_ELSE_REPLIES,
    };
  }

  return {
    messages: ["Por favor, confirme ou cancele o agendamento:"],
    context,
    quickReplies: [
      { label: "Confirmar", value: "sim" },
      { label: "Cancelar", value: "cancelar" },
    ],
  };
}

function handleBooking(context: ChatContext): EngineResponse {
  return {
    messages: ["Processando seu agendamento..."],
    context,
    quickReplies: [],
  };
}

function handleAnythingElse(input: string, context: ChatContext): EngineResponse {
  if (input === "sim" || input.includes("sim") || input.includes("ajuda")) {
    return {
      messages: ["Como posso te ajudar?"],
      context: { ...context, state: "MENU" },
      quickReplies: MENU_REPLIES,
    };
  }

  if (input === "login") {
    return {
      messages: [
        "Para fazer login, acesse a pagina de login clicando no botao 'Entrar' no topo do site.",
        "Apos o login, volte aqui e eu poderei te ajudar a agendar sua consulta!",
        "Posso ajudar com mais alguma coisa?",
      ],
      context: { ...context, state: "ANYTHING_ELSE" },
      quickReplies: ANYTHING_ELSE_REPLIES,
    };
  }

  return handleFarewell(context);
}

function handleFarewell(context: ChatContext): EngineResponse {
  return {
    messages: [
      "Obrigado por usar o MageBot! Ate a proxima! Se precisar de algo, e so me chamar.",
    ],
    context: { ...context, state: "FAREWELL" },
    quickReplies: [{ label: "Voltar ao menu", value: "menu" }],
  };
}

function handleViewAppointments(context: ChatContext): EngineResponse {
  if (!context.isAuthenticated) {
    return {
      messages: [
        "Para ver seus agendamentos, voce precisa estar logado.",
        "Acesse a area do paciente para ver suas consultas.",
      ],
      context: { ...context, state: "ANYTHING_ELSE" },
      quickReplies: [
        { label: "Fazer login", value: "login" },
        { label: "Voltar ao menu", value: "menu" },
      ],
    };
  }

  return {
    messages: [
      "Voce pode ver todos os seus agendamentos na area do paciente.",
      "Acesse /paciente para ver suas consultas, cancelar ou agendar novas.",
      "Posso ajudar com mais alguma coisa?",
    ],
    context: { ...context, state: "ANYTHING_ELSE" },
    quickReplies: ANYTHING_ELSE_REPLIES,
  };
}

function handleServicesInfo(context: ChatContext): EngineResponse {
  return {
    messages: [
      "Nossos servicos incluem:",
      "- Consulta Nutricional (Primeira Visita): Avaliacao completa, anamnese, plano alimentar personalizado.",
      "- Retorno Nutricional: Acompanhamento, ajuste do plano alimentar, avaliacao de progresso.",
      "Gostaria de agendar uma consulta?",
    ],
    context: { ...context, state: "ANYTHING_ELSE" },
    quickReplies: [
      { label: "Agendar consulta", value: "agendar" },
      { label: "Voltar ao menu", value: "menu" },
    ],
  };
}

function handleContactInfo(context: ChatContext): EngineResponse {
  return {
    messages: [
      "Informacoes de contato:",
      "Renan Martins - Nutricionista",
      "Acesse a secao de contato no site para mais informacoes sobre telefone, endereco e horario de funcionamento.",
      "Posso ajudar com mais alguma coisa?",
    ],
    context: { ...context, state: "ANYTHING_ELSE" },
    quickReplies: ANYTHING_ELSE_REPLIES,
  };
}

export function getGreetingResponse(context: ChatContext): EngineResponse {
  return handleGreeting(context);
}

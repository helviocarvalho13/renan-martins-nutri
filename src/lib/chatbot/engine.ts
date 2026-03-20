import type { ChatContext, EngineResponse, QuickReply, Slot } from "./types";
import { parseDatePtBr, formatDatePtBr, formatDateISO } from "./dateParser";
import { startOfDay, addDays } from "date-fns";

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

function formatSlotTime(time: string): string {
  return time.slice(0, 5);
}

const MENU_REPLIES: QuickReply[] = [
  { label: "📅 Agendar consulta", value: "Agendar" },
];

const ANYTHING_ELSE_REPLIES: QuickReply[] = [
  { label: "Sim, agendar outra", value: "sim" },
  { label: "Não, obrigado", value: "Não" },
];

const TYPE_REPLIES: QuickReply[] = [
  { label: "Consulta", value: "Consulta" },
  { label: "Retorno", value: "Retorno" },
];

const MODALITY_REPLIES: QuickReply[] = [
  { label: "🏥 Presencial", value: "PRESENCIAL" },
  { label: "💻 Online", value: "ONLINE" },
];

const DATE_REPLIES: QuickReply[] = [
  { label: "Amanhã", value: "amanha" },
  { label: "Próxima segunda", value: "proxima segunda" },
  { label: "Próxima quarta", value: "proxima quarta" },
  { label: "Próxima sexta", value: "proxima sexta" },
];

export async function processMessage(
  input: string,
  context: ChatContext
): Promise<EngineResponse> {
  const trimmed = input.trim().toLowerCase();

  if (trimmed === "menu" || trimmed === "voltar" || trimmed === "inicio" || trimmed === "início") {
    return {
      messages: ["Como posso te ajudar?"],
      context: { ...context, state: "MENU", loginEmail: null },
      quickReplies: MENU_REPLIES,
    };
  }

  try {
    switch (context.state) {
      case "GREETING":
        return handleGreeting(context);

      case "MENU":
        return handleMenu(trimmed, context);

      case "LOGIN_EMAIL":
        return handleLoginEmail(input.trim(), context);

      case "LOGIN_PASSWORD":
        return handleLoginPassword(context);

      case "SELECT_TYPE":
        return handleSelectType(trimmed, context);

      case "SELECT_MODALITY":
        return handleSelectModality(input.trim(), context);

      case "SELECT_DATE":
        return await handleSelectDate(input, context);

      case "SHOW_SLOTS":
        return handleShowSlots(trimmed, context);

      case "CONFIRM":
        return handleConfirm(trimmed, context);

      case "BOOKING_READY":
        return {
          messages: ["Processando seu agendamento..."],
          context,
          quickReplies: [],
        };

      case "ANYTHING_ELSE":
        return handleAnythingElse(trimmed, context);

      case "FAREWELL":
        return handleFarewell(context);

      default:
        return handleGreeting(context);
    }
  } catch {
    return {
      messages: [
        "Desculpe, ocorreu um erro inesperado. Vamos tentar novamente.",
        "Como posso te ajudar?",
      ],
      context: { ...context, state: "MENU" },
      quickReplies: MENU_REPLIES,
    };
  }
}

function handleGreeting(context: ChatContext): EngineResponse {
  const greeting = context.userName
    ? `Olá, ${context.userName}! Eu sou o Team Mago, assistente virtual do Renan Martins Nutrição. Posso te ajudar a agendar uma consulta!`
    : "Olá! Eu sou o Team Mago, assistente virtual do Renan Martins Nutrição. Posso te ajudar a agendar uma consulta!";

  return {
    messages: [greeting],
    context: { ...context, state: "MENU" },
    quickReplies: MENU_REPLIES,
  };
}

function handleMenu(input: string, context: ChatContext): EngineResponse {
  if (input === "agendar" || input.includes("agendar") || input.includes("consulta") || input.includes("marcar") || input === "sim") {
    if (!context.isAuthenticated) {
      return {
        messages: [
          "Vamos agendar sua consulta! 📅",
          "Para agendar, você precisa estar logado. Deseja fazer login agora pelo chat?",
        ],
        context: { ...context, state: "LOGIN_EMAIL" },
        quickReplies: [
          { label: "Sim, fazer login", value: "sim_login" },
          { label: "Voltar ao menu", value: "Menu" },
        ],
      };
    }
    return {
      messages: [
        "Vamos agendar sua consulta! 📅",
        "Qual tipo de consulta você deseja agendar?",
      ],
      context: { ...context, state: "SELECT_TYPE" },
      quickReplies: TYPE_REPLIES,
    };
  }

  return {
    messages: [
      "Eu posso te ajudar a agendar uma consulta com o nutricionista Renan Martins.",
      "Deseja agendar agora?",
    ],
    context: { ...context, state: "MENU" },
    quickReplies: MENU_REPLIES,
  };
}

function handleLoginEmail(input: string, context: ChatContext): EngineResponse {
  if (input.toLowerCase() === "sim_login" || input.toLowerCase() === "sim" || input.toLowerCase().includes("login")) {
    return {
      messages: ["Por favor, digite seu e-mail:"],
      context: { ...context, state: "LOGIN_EMAIL", loginEmail: null },
      quickReplies: [],
    };
  }

  if (input.includes("@") && input.includes(".")) {
    return {
      messages: ["Agora digite sua senha:"],
      context: { ...context, state: "LOGIN_PASSWORD", loginEmail: input },
      quickReplies: [],
    };
  }

  return {
    messages: ["Por favor, digite um e-mail válido:"],
    context: { ...context, state: "LOGIN_EMAIL" },
    quickReplies: [{ label: "Voltar ao menu", value: "Menu" }],
  };
}

function handleLoginPassword(_context: ChatContext): EngineResponse {
  return {
    messages: ["Verificando suas credenciais..."],
    context: _context,
    quickReplies: [],
  };
}

export function getLoginSuccessResponse(context: ChatContext): EngineResponse {
  return {
    messages: [
      `Login realizado com sucesso! Bem-vindo(a), ${context.userName || ""}! ✅`,
      "Qual tipo de consulta você deseja agendar?",
    ],
    context: { ...context, state: "SELECT_TYPE", loginEmail: null },
    quickReplies: TYPE_REPLIES,
  };
}

export function getLoginFailureResponse(context: ChatContext, error?: string): EngineResponse {
  const errorMsg = error === "Invalid login credentials"
    ? "E-mail ou senha incorretos."
    : (error || "E-mail ou senha incorretos.");

  return {
    messages: [
      `❌ ${errorMsg}`,
      "Tente novamente. Digite seu e-mail:",
    ],
    context: { ...context, state: "LOGIN_EMAIL", loginEmail: null },
    quickReplies: [{ label: "Voltar ao menu", value: "Menu" }],
  };
}

function handleSelectType(input: string, context: ChatContext): EngineResponse {
  let appointmentType: "FIRST_VISIT" | "RETURN" | null = null;
  let typeLabel = "";

  if (input === "first_visit" || input.includes("consulta")) {
    appointmentType = "FIRST_VISIT";
    typeLabel = "Consulta";
  } else if (input === "return" || input.includes("retorno")) {
    appointmentType = "RETURN";
    typeLabel = "Retorno";
  }

  if (!appointmentType) {
    return {
      messages: ["Por favor, selecione o tipo de consulta:"],
      context: { ...context, state: "SELECT_TYPE" },
      quickReplies: TYPE_REPLIES,
    };
  }

  return {
    messages: [
      `${typeLabel} selecionado(a)! ✅`,
      "A consulta será presencial ou online?",
    ],
    context: { ...context, state: "SELECT_MODALITY", appointmentType },
    quickReplies: MODALITY_REPLIES,
  };
}

function handleSelectModality(input: string, context: ChatContext): EngineResponse {
  const lower = input.toLowerCase();
  let modality: "PRESENCIAL" | "ONLINE" | null = null;

  if (lower === "presencial" || lower === "🏥 presencial" || lower.includes("presencial")) {
    modality = "PRESENCIAL";
  } else if (lower === "online" || lower === "💻 online" || lower.includes("online")) {
    modality = "ONLINE";
  }

  if (!modality) {
    return {
      messages: ["Por favor, escolha entre presencial ou online:"],
      context: { ...context, state: "SELECT_MODALITY" },
      quickReplies: MODALITY_REPLIES,
    };
  }

  const modalityLabel = modality === "ONLINE" ? "Online 💻" : "Presencial 🏥";

  return {
    messages: [
      `${modalityLabel} selecionado! ✅`,
      "Para qual data você gostaria de agendar? Selecione a data no calendário",
    ],
    context: { ...context, state: "SELECT_DATE", appointmentModality: modality },
    quickReplies: DATE_REPLIES,
  };
}

async function handleSelectDate(input: string, context: ChatContext): Promise<EngineResponse> {
  const parsed = parseDatePtBr(input);
  if (!parsed) {
    return {
      messages: [
        "Não consegui entender a data. Tente novamente usando formatos como:",
        "'amanhã', 'próxima segunda', 'dia 15', '15/03', '15/03/2025', '15 de março'",
      ],
      context: { ...context, state: "SELECT_DATE" },
      quickReplies: [
        { label: "Amanhã", value: "amanha" },
        { label: "Próxima segunda", value: "proxima segunda" },
        { label: "Voltar ao menu", value: "Menu" },
      ],
    };
  }

  const today = startOfDay(new Date());
  const minDate = addDays(today, 1);
  if (parsed < minDate) {
    return {
      messages: ["A data precisa ser pelo menos amanhã. Agendamentos devem ser feitos com pelo menos 24 horas de antecedência."],
      context: { ...context, state: "SELECT_DATE" },
      quickReplies: [
        { label: "Amanhã", value: "amanha" },
        { label: "Próxima segunda", value: "proxima segunda" },
      ],
    };
  }

  const dateISO = formatDateISO(parsed);

  let slots: Slot[];
  try {
    slots = await fetchAvailableSlots(dateISO);
  } catch {
    return {
      messages: [
        "Ocorreu um erro ao buscar os horários disponíveis. Por favor, tente novamente.",
      ],
      context: { ...context, state: "SELECT_DATE" },
      quickReplies: [
        { label: "Tentar novamente", value: input },
        { label: "Voltar ao menu", value: "Menu" },
      ],
    };
  }

  if (slots.length === 0) {
    let suggestions: string[] = [];
    try {
      suggestions = await findNextAvailableDays(dateISO, 3);
    } catch {}

    const suggestionMessages = suggestions.length > 0
      ? [`Não há horários disponíveis para ${formatDatePtBr(parsed)}.`, `Próximos dias disponíveis: ${suggestions.map(s => formatDatePtBr(new Date(s + "T12:00:00"))).join(", ")}`]
      : [`Não há horários disponíveis para ${formatDatePtBr(parsed)}. Tente outra data.`];

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
      `Horários disponíveis para ${formatDatePtBr(parsed)}:`,
      "Escolha um horário:",
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
    try {
      const slots = await fetchAvailableSlots(dateStr);
      if (slots.length > 0) {
        results.push(dateStr);
      }
    } catch {}
    current = addDays(current, 1);
  }

  return results;
}

function handleShowSlots(input: string, context: ChatContext): EngineResponse {
  if (!context.availableSlots || context.availableSlots.length === 0) {
    return {
      messages: [
        "Os horários expiraram. Vamos selecionar a data novamente.",
        "Para qual data você gostaria de agendar?",
      ],
      context: { ...context, state: "SELECT_DATE", availableSlots: [], selectedDate: null },
      quickReplies: [
        { label: "Amanhã", value: "amanha" },
        { label: "Próxima segunda", value: "proxima segunda" },
        { label: "Voltar ao menu", value: "Menu" },
      ],
    };
  }

  const matchedSlot = context.availableSlots.find(
    (s) => s.start_time === input || formatSlotTime(s.start_time) === input
  );

  if (!matchedSlot) {
    return {
      messages: ["Por favor, escolha um dos horários disponíveis:"],
      context: { ...context, state: "SHOW_SLOTS" },
      quickReplies: context.availableSlots.map((s) => ({
        label: formatSlotTime(s.start_time),
        value: s.start_time,
      })),
    };
  }

  const typeLabel = context.appointmentType === "FIRST_VISIT" ? "Consulta" : "Retorno";
  const modalityLabel = context.appointmentModality === "ONLINE" ? "Online" : "Presencial";
  const dateFormatted = context.selectedDate
    ? formatDatePtBr(new Date(context.selectedDate + "T12:00:00"))
    : "";

  return {
    messages: [
      `📋 Confirme: ${typeLabel} ${modalityLabel}, em ${dateFormatted}, às ${formatSlotTime(matchedSlot.start_time)} até ${formatSlotTime(matchedSlot.end_time)}. Deseja confirmar?`
    ],
    context: { ...context, state: "CONFIRM", selectedSlot: matchedSlot },
    quickReplies: [
      { label: "✅ Confirmar", value: "sim" },
      { label: "Escolher outro horário", value: "outro_horario" },
      { label: "Cancelar", value: "Cancelar" },
    ],
  };
}

function handleConfirm(input: string, context: ChatContext): EngineResponse {
  if (input === "sim" || input === "confirmar" || input.includes("confirm")) {
    if (!context.selectedDate || !context.selectedSlot || !context.appointmentType) {
      return {
        messages: [
          "⚠️ Dados do agendamento incompletos. Vamos recomeçar.",
          "Qual tipo de consulta você deseja agendar?",
        ],
        context: {
          ...context,
          state: "SELECT_TYPE",
          selectedDate: null,
          selectedSlot: null,
          appointmentType: null,
          appointmentModality: null,
          availableSlots: [],
        },
        quickReplies: TYPE_REPLIES,
      };
    }

    if (!context.isAuthenticated) {
      return {
        messages: [
          "⚠️ Sua sessão expirou. Você precisa fazer login novamente para agendar.",
          "Digite seu e-mail:",
        ],
        context: { ...context, state: "LOGIN_EMAIL", loginEmail: null },
        quickReplies: [{ label: "Voltar ao menu", value: "Menu" }],
      };
    }

    return {
      messages: ["Agendando sua consulta..."],
      context: { ...context, state: "BOOKING_READY" },
      quickReplies: [],
      needsBooking: true,
    };
  }

  if (input === "outro_horario" || input.includes("outro")) {
    if (!context.availableSlots || context.availableSlots.length === 0) {
      return {
        messages: [
          "Os horários não estão mais disponíveis. Vamos selecionar a data novamente.",
        ],
        context: { ...context, state: "SELECT_DATE", availableSlots: [], selectedSlot: null },
        quickReplies: [
          { label: "Amanhã", value: "amanha" },
          { label: "Próxima segunda", value: "proxima segunda" },
        ],
      };
    }

    return {
      messages: ["Escolha outro horário:"],
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
        appointmentModality: null,
        availableSlots: [],
      },
      quickReplies: ANYTHING_ELSE_REPLIES,
    };
  }

  return {
    messages: ["Por favor, confirme ou cancele o agendamento:"],
    context,
    quickReplies: [
      { label: "✅ Confirmar", value: "sim" },
      { label: "Cancelar", value: "Cancelar" },
    ],
  };
}

export function getBookingSuccessResponse(context: ChatContext): EngineResponse {
  const dateFormatted = context.selectedDate
    ? formatDatePtBr(new Date(context.selectedDate + "T12:00:00"))
    : "";
  const timeFormatted = context.selectedSlot
    ? formatSlotTime(context.selectedSlot.start_time)
    : "";
  const modalityLabel = context.appointmentModality === "ONLINE" ? "Online" : "Presencial";

  return {
    messages: [
      "✅ Consulta agendada com sucesso!",
      `Data: ${dateFormatted} às ${timeFormatted} (${modalityLabel})`,
      "Você receberá uma confirmação em breve. Posso ajudar com mais alguma coisa?",
    ],
    context: {
      ...context,
      state: "ANYTHING_ELSE",
      selectedDate: null,
      selectedSlot: null,
      appointmentType: null,
      appointmentModality: null,
      availableSlots: [],
    },
    quickReplies: ANYTHING_ELSE_REPLIES,
  };
}

export function getBookingErrorResponse(context: ChatContext, error: string): EngineResponse {
  let userFriendlyError = error;
  if (error.includes("already have") || error.includes("já possui")) {
    userFriendlyError = "Você já possui uma consulta deste tipo agendada.";
  } else if (error.includes("24") || error.includes("antecedência") || error.includes("antecedencia")) {
    userFriendlyError = "Agendamentos devem ser feitos com pelo menos 24 horas de antecedência.";
  } else if (error.includes("slot") || error.includes("horário") || error.includes("horario") || error.includes("ocupado")) {
    userFriendlyError = "Este horário não está mais disponível. Por favor, escolha outro.";
  } else if (error.includes("autenticado") || error.includes("Unauthorized")) {
    userFriendlyError = "Sua sessão expirou. Faça login novamente.";
  }

  return {
    messages: [
      `❌ Não foi possível agendar: ${userFriendlyError}`,
      "Deseja tentar novamente?",
    ],
    context: { ...context, state: "ANYTHING_ELSE" },
    quickReplies: [
      { label: "Tentar novamente", value: "agendar" },
      { label: "Voltar ao menu", value: "Menu" },
    ],
  };
}

function handleAnythingElse(input: string, context: ChatContext): EngineResponse {
  if (input === "sim" || input.includes("sim") || input.includes("ajuda") || input.includes("agendar")) {
    return handleMenu("agendar", context);
  }

  if (input === "login" || input.includes("fazer login")) {
    return {
      messages: [
        "Vamos fazer seu login!",
        "Por favor, digite seu e-mail:",
      ],
      context: { ...context, state: "LOGIN_EMAIL", loginEmail: null },
      quickReplies: [],
    };
  }

  return handleFarewell(context);
}

function handleFarewell(context: ChatContext): EngineResponse {
  return {
    messages: [
      "Obrigado por usar o Team Mago! Até a próxima! Se precisar de algo, é só me chamar. 👋",
    ],
    context: { ...context, state: "FAREWELL" },
    quickReplies: [{ label: "Voltar ao menu", value: "Menu" }],
  };
}

export function getGreetingResponse(context: ChatContext): EngineResponse {
  return handleGreeting(context);
}

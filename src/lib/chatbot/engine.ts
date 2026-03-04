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
    if (!res.ok) {
      let errorMsg = "Erro ao agendar.";
      try {
        const data = await res.json();
        errorMsg = data.error || errorMsg;
      } catch {}
      return { success: false, error: errorMsg };
    }
    return { success: true };
  } catch {
    return { success: false, error: "Erro de conexão. Verifique sua internet e tente novamente." };
  }
}

function formatSlotTime(time: string): string {
  return time.slice(0, 5);
}

const MENU_REPLIES: QuickReply[] = [
  { label: "📅 Agendar consulta", value: "agendar" },
  { label: "📋 Ver agendamentos", value: "agendamentos" },
  { label: "💼 Serviços", value: "servicos" },
  { label: "📞 Contato", value: "contato" },
];

const ANYTHING_ELSE_REPLIES: QuickReply[] = [
  { label: "Sim, quero mais ajuda", value: "sim" },
  { label: "Não, obrigado", value: "nao" },
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

      case "AUTH_CHECK":
        return handleAuthCheck(context);

      case "LOGIN_EMAIL":
        return handleLoginEmail(input.trim(), context);

      case "LOGIN_PASSWORD":
        return handleLoginPassword(context);

      case "SELECT_TYPE":
        return handleSelectType(trimmed, context);

      case "SELECT_DATE":
        return await handleSelectDate(input, context);

      case "VALIDATE_DATE":
        return handleValidateDate(context);

      case "SHOW_SLOTS":
        return handleShowSlots(trimmed, context);

      case "CONFIRM":
        return await handleConfirm(trimmed, context);

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
    ? `Olá, ${context.userName}! Eu sou o MageBot, assistente virtual do Renan Martins Nutrição. Como posso te ajudar hoje?`
    : "Olá! Eu sou o MageBot, assistente virtual do Renan Martins Nutrição. Como posso te ajudar hoje?";

  return {
    messages: [greeting],
    context: { ...context, state: "MENU" },
    quickReplies: MENU_REPLIES,
  };
}

function handleMenu(input: string, context: ChatContext): EngineResponse {
  if (input === "agendar" || input.includes("agendar") || input.includes("consulta") || input.includes("marcar")) {
    if (!context.isAuthenticated) {
      return {
        messages: [
          "Vamos agendar sua consulta! 📅",
          "Para agendar, você precisa estar logado. Deseja fazer login agora pelo chat?",
        ],
        context: { ...context, state: "LOGIN_EMAIL" },
        quickReplies: [
          { label: "Sim, fazer login", value: "sim_login" },
          { label: "Voltar ao menu", value: "menu" },
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

  if (input === "agendamentos" || input.includes("agendamento") || input.includes("minhas consultas")) {
    return handleViewAppointments(context);
  }

  if (input === "servicos" || input.includes("servico") || input.includes("serviço") || input.includes("serviços")) {
    return handleServicesInfo(context);
  }

  if (input === "contato" || input.includes("contato") || input.includes("telefone") || input.includes("endereço") || input.includes("endereco")) {
    return handleContactInfo(context);
  }

  return {
    messages: ["Desculpe, não entendi. Escolha uma das opções abaixo:"],
    context: { ...context, state: "MENU" },
    quickReplies: MENU_REPLIES,
  };
}

function handleAuthCheck(context: ChatContext): EngineResponse {
  if (!context.isAuthenticated) {
    return {
      messages: [
        "Para agendar uma consulta, você precisa estar logado.",
        "Deseja fazer login agora pelo chat?",
      ],
      context: { ...context, state: "LOGIN_EMAIL" },
      quickReplies: [
        { label: "Sim, fazer login", value: "sim_login" },
        { label: "Voltar ao menu", value: "menu" },
      ],
    };
  }

  return {
    messages: ["Qual tipo de consulta você deseja agendar?"],
    context: { ...context, state: "SELECT_TYPE" },
    quickReplies: TYPE_REPLIES,
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
    quickReplies: [{ label: "Voltar ao menu", value: "menu" }],
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
    quickReplies: [{ label: "Voltar ao menu", value: "menu" }],
  };
}

function handleSelectType(input: string, context: ChatContext): EngineResponse {
  if (input === "first_visit" || input.includes("primeira")) {
    return {
      messages: [
        "Primeira consulta selecionada! ✅",
        "Para qual data você gostaria de agendar? Você pode digitar: 'amanhã', 'próxima segunda', 'dia 15', '15/03', etc.",
      ],
      context: { ...context, state: "SELECT_DATE", appointmentType: "FIRST_VISIT" },
      quickReplies: [
        { label: "Amanhã", value: "amanha" },
        { label: "Próxima segunda", value: "proxima segunda" },
        { label: "Próxima quarta", value: "proxima quarta" },
        { label: "Próxima sexta", value: "proxima sexta" },
      ],
    };
  }

  if (input === "return" || input.includes("retorno")) {
    return {
      messages: [
        "Retorno selecionado! ✅",
        "Para qual data você gostaria de agendar o retorno? Você pode digitar: 'amanhã', 'próxima segunda', 'dia 15', '15/03', etc.",
      ],
      context: { ...context, state: "SELECT_DATE", appointmentType: "RETURN" },
      quickReplies: [
        { label: "Amanhã", value: "amanha" },
        { label: "Próxima segunda", value: "proxima segunda" },
        { label: "Próxima quarta", value: "proxima quarta" },
        { label: "Próxima sexta", value: "proxima sexta" },
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
        "Não consegui entender a data. Tente novamente usando formatos como:",
        "'amanhã', 'próxima segunda', 'dia 15', '15/03', '15/03/2025', '15 de março'",
      ],
      context: { ...context, state: "SELECT_DATE" },
      quickReplies: [
        { label: "Amanhã", value: "amanha" },
        { label: "Próxima segunda", value: "proxima segunda" },
        { label: "Voltar ao menu", value: "menu" },
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
        { label: "Voltar ao menu", value: "menu" },
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

function handleValidateDate(context: ChatContext): EngineResponse {
  return {
    messages: ["Buscando horários disponíveis..."],
    context,
    quickReplies: [],
  };
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
        { label: "Voltar ao menu", value: "menu" },
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

  const typeLabel = context.appointmentType === "FIRST_VISIT" ? "Primeira Consulta" : "Retorno";
  const dateFormatted = context.selectedDate
    ? formatDatePtBr(new Date(context.selectedDate + "T12:00:00"))
    : "";

  return {
    messages: [
      "📋 Por favor, confirme os dados do agendamento:",
      `Tipo: ${typeLabel}`,
      `Data: ${dateFormatted}`,
      `Horário: ${formatSlotTime(matchedSlot.start_time)} - ${formatSlotTime(matchedSlot.end_time)}`,
      "Deseja confirmar?",
    ],
    context: { ...context, state: "CONFIRM", selectedSlot: matchedSlot },
    quickReplies: [
      { label: "✅ Confirmar", value: "sim" },
      { label: "Escolher outro horário", value: "outro_horario" },
      { label: "Cancelar", value: "cancelar" },
    ],
  };
}

async function handleConfirm(input: string, context: ChatContext): Promise<EngineResponse> {
  if (input === "sim" || input === "confirmar" || input.includes("confirm")) {
    if (!context.selectedDate || !context.selectedSlot || !context.appointmentType) {
      return {
        messages: [
          "⚠️ Dados do agendamento incompletos. Vamos recomeçar.",
          "Qual tipo de consulta você deseja agendar?",
        ],
        context: { ...context, state: "SELECT_TYPE", selectedDate: null, selectedSlot: null, appointmentType: null, availableSlots: [] },
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
        quickReplies: [{ label: "Voltar ao menu", value: "menu" }],
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
          "✅ Consulta agendada com sucesso!",
          `Data: ${dateFormatted} às ${formatSlotTime(context.selectedSlot.start_time)}`,
          "Você receberá uma confirmação em breve. Posso ajudar com mais alguma coisa?",
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

    let userFriendlyError = result.error || "Erro desconhecido.";
    if (userFriendlyError.includes("already have") || userFriendlyError.includes("já possui")) {
      userFriendlyError = "Você já possui uma consulta deste tipo agendada.";
    } else if (userFriendlyError.includes("24") || userFriendlyError.includes("antecedência") || userFriendlyError.includes("antecedencia")) {
      userFriendlyError = "Agendamentos devem ser feitos com pelo menos 24 horas de antecedência.";
    } else if (userFriendlyError.includes("slot") || userFriendlyError.includes("horário") || userFriendlyError.includes("horario")) {
      userFriendlyError = "Este horário não está mais disponível. Por favor, escolha outro.";
    }

    return {
      messages: [
        `❌ Não foi possível agendar: ${userFriendlyError}`,
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
      "Obrigado por usar o MageBot! Até a próxima! Se precisar de algo, é só me chamar. 👋",
    ],
    context: { ...context, state: "FAREWELL" },
    quickReplies: [{ label: "Voltar ao menu", value: "menu" }],
  };
}

function handleViewAppointments(context: ChatContext): EngineResponse {
  if (!context.isAuthenticated) {
    return {
      messages: [
        "Para ver seus agendamentos, você precisa estar logado.",
        "Deseja fazer login agora?",
      ],
      context: { ...context, state: "LOGIN_EMAIL" },
      quickReplies: [
        { label: "Sim, fazer login", value: "sim_login" },
        { label: "Voltar ao menu", value: "menu" },
      ],
    };
  }

  return {
    messages: [
      "Você pode ver todos os seus agendamentos na área do paciente.",
      "Acesse a página /paciente para ver suas consultas, cancelar ou agendar novas.",
      "Posso ajudar com mais alguma coisa?",
    ],
    context: { ...context, state: "ANYTHING_ELSE" },
    quickReplies: ANYTHING_ELSE_REPLIES,
  };
}

function handleServicesInfo(context: ChatContext): EngineResponse {
  return {
    messages: [
      "Nossos serviços incluem:",
      "🩺 Nutrição Clínica — Avaliação completa, anamnese e plano alimentar personalizado.",
      "🏋️ Nutrição Esportiva — Performance e periodização nutricional.",
      "🥗 Reeducação Alimentar — Transforme sua relação com a comida.",
      "✨ Nutrição Funcional — Abordagem integrativa para desequilíbrios nutricionais.",
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
      "📞 Informações de contato:",
      "Renan Martins — Nutricionista",
      "Acesse a seção de contato no site para mais informações sobre telefone, endereço e horário de funcionamento.",
      "Posso ajudar com mais alguma coisa?",
    ],
    context: { ...context, state: "ANYTHING_ELSE" },
    quickReplies: ANYTHING_ELSE_REPLIES,
  };
}

export function getGreetingResponse(context: ChatContext): EngineResponse {
  return handleGreeting(context);
}

(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/chatbot/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createInitialContext",
    ()=>createInitialContext
]);
function createInitialContext() {
    return {
        state: "GREETING",
        isAuthenticated: false,
        userId: null,
        userName: null,
        appointmentType: null,
        selectedDate: null,
        selectedSlot: null,
        availableSlots: []
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/chatbot/dateParser.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatDateISO",
    ()=>formatDateISO,
    "formatDatePtBr",
    ()=>formatDatePtBr,
    "parseDatePtBr",
    ()=>parseDatePtBr
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/addDays.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextMonday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/nextMonday.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextTuesday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/nextTuesday.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextWednesday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/nextWednesday.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextThursday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/nextThursday.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextFriday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/nextFriday.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextSaturday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/nextSaturday.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextSunday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/nextSunday.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$setDate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/setDate.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$setMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/setMonth.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isValid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/isValid.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/startOfDay.mjs [app-client] (ecmascript)");
;
const MONTH_MAP = {
    janeiro: 0,
    fevereiro: 1,
    marco: 2,
    março: 2,
    abril: 3,
    maio: 4,
    junho: 5,
    julho: 6,
    agosto: 7,
    setembro: 8,
    outubro: 9,
    novembro: 10,
    dezembro: 11,
    jan: 0,
    fev: 1,
    mar: 2,
    abr: 3,
    mai: 4,
    jun: 5,
    jul: 6,
    ago: 7,
    set: 8,
    out: 9,
    nov: 10,
    dez: 11
};
const DAY_OF_WEEK_FN = {
    segunda: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextMonday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nextMonday"],
    "segunda-feira": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextMonday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nextMonday"],
    terca: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextTuesday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nextTuesday"],
    "terca-feira": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextTuesday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nextTuesday"],
    terça: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextTuesday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nextTuesday"],
    "terça-feira": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextTuesday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nextTuesday"],
    quarta: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextWednesday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nextWednesday"],
    "quarta-feira": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextWednesday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nextWednesday"],
    quinta: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextThursday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nextThursday"],
    "quinta-feira": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextThursday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nextThursday"],
    sexta: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextFriday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nextFriday"],
    "sexta-feira": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextFriday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nextFriday"],
    sabado: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextSaturday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nextSaturday"],
    sábado: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextSaturday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nextSaturday"],
    domingo: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$nextSunday$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nextSunday"]
};
function normalize(input) {
    return input.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function parseDatePtBr(input) {
    const raw = input.toLowerCase().trim();
    const normalized = normalize(input);
    const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfDay"])(new Date());
    if (normalized === "hoje") {
        return today;
    }
    if (normalized === "amanha") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(today, 1);
    }
    if (normalized === "depois de amanha") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(today, 2);
    }
    const nextDayMatch = normalized.match(/^(?:proxima?|próxima?|prox\.?)\s+(.+)$/);
    if (nextDayMatch) {
        const dayName = nextDayMatch[1].trim();
        for (const [key, fn] of Object.entries(DAY_OF_WEEK_FN)){
            if (normalize(key) === normalize(dayName)) {
                return fn(today);
            }
        }
    }
    for (const [key, fn] of Object.entries(DAY_OF_WEEK_FN)){
        if (normalized === normalize(key)) {
            return fn(today);
        }
    }
    const ddmmyyyySlash = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (ddmmyyyySlash) {
        const [, d, m, y] = ddmmyyyySlash;
        const date = new Date(Number(y), Number(m) - 1, Number(d));
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isValid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValid"])(date)) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfDay"])(date);
    }
    const ddmmSlash = raw.match(/^(\d{1,2})\/(\d{1,2})$/);
    if (ddmmSlash) {
        const [, d, m] = ddmmSlash;
        let year = today.getFullYear();
        let date = new Date(year, Number(m) - 1, Number(d));
        if (date < today) {
            date = new Date(year + 1, Number(m) - 1, Number(d));
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isValid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValid"])(date)) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfDay"])(date);
    }
    const diaNumMatch = normalized.match(/^dia\s+(\d{1,2})$/);
    if (diaNumMatch) {
        const day = Number(diaNumMatch[1]);
        let date = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$setDate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDate"])(today, day);
        if (date < today) {
            date = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$setDate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDate"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(today, 30), day);
            date = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$setMonth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setMonth"])(date, today.getMonth() + 1);
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isValid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValid"])(date) && date.getDate() === day) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfDay"])(date);
    }
    const dayDeMonthMatch = normalized.match(/^(\d{1,2})\s+de\s+([a-zçã]+)$/);
    if (dayDeMonthMatch) {
        const day = Number(dayDeMonthMatch[1]);
        const monthStr = dayDeMonthMatch[2];
        const month = MONTH_MAP[monthStr] ?? MONTH_MAP[normalize(monthStr)];
        if (month !== undefined) {
            let year = today.getFullYear();
            let date = new Date(year, month, day);
            if (date < today) {
                date = new Date(year + 1, month, day);
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isValid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValid"])(date) && date.getDate() === day) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfDay"])(date);
        }
    }
    const ddmmyyyyDash = raw.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (ddmmyyyyDash) {
        const [, d, m, y] = ddmmyyyyDash;
        const date = new Date(Number(y), Number(m) - 1, Number(d));
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$isValid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValid"])(date)) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfDay"])(date);
    }
    return null;
}
function formatDatePtBr(date) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, "dd/MM/yyyy");
}
function formatDateISO(date) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, "yyyy-MM-dd");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/chatbot/engine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getGreetingResponse",
    ()=>getGreetingResponse,
    "processMessage",
    ()=>processMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatbot$2f$dateParser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/chatbot/dateParser.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/startOfDay.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/addDays.mjs [app-client] (ecmascript)");
;
;
async function fetchAvailableSlots(date) {
    try {
        const res = await fetch(`/api/available-slots?date=${date}`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.slots || [];
    } catch  {
        return [];
    }
}
async function bookAppointment(params) {
    try {
        const res = await fetch("/api/patient/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        });
        const data = await res.json();
        if (!res.ok) return {
            success: false,
            error: data.error || "Erro ao agendar."
        };
        return {
            success: true
        };
    } catch  {
        return {
            success: false,
            error: "Erro de conexao. Tente novamente."
        };
    }
}
function formatSlotTime(time) {
    return time.slice(0, 5);
}
const MENU_REPLIES = [
    {
        label: "Agendar consulta",
        value: "agendar"
    },
    {
        label: "Ver agendamentos",
        value: "agendamentos"
    },
    {
        label: "Servicos",
        value: "servicos"
    },
    {
        label: "Contato",
        value: "contato"
    }
];
const ANYTHING_ELSE_REPLIES = [
    {
        label: "Sim, quero mais ajuda",
        value: "sim"
    },
    {
        label: "Nao, obrigado",
        value: "nao"
    }
];
const TYPE_REPLIES = [
    {
        label: "Primeira Consulta",
        value: "FIRST_VISIT"
    },
    {
        label: "Retorno",
        value: "RETURN"
    },
    {
        label: "Voltar ao menu",
        value: "menu"
    }
];
async function processMessage(input, context) {
    const trimmed = input.trim().toLowerCase();
    if (trimmed === "menu" || trimmed === "voltar" || trimmed === "inicio") {
        return {
            messages: [
                "Como posso te ajudar?"
            ],
            context: {
                ...context,
                state: "MENU"
            },
            quickReplies: MENU_REPLIES
        };
    }
    switch(context.state){
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
function handleGreeting(context) {
    const greeting = context.userName ? `Ola, ${context.userName}! Eu sou o MageBot, assistente virtual do Renan Martins Nutricao. Como posso te ajudar hoje?` : "Ola! Eu sou o MageBot, assistente virtual do Renan Martins Nutricao. Como posso te ajudar hoje?";
    return {
        messages: [
            greeting
        ],
        context: {
            ...context,
            state: "MENU"
        },
        quickReplies: MENU_REPLIES
    };
}
function handleMenu(input, context) {
    if (input === "agendar" || input.includes("agendar") || input.includes("consulta") || input.includes("marcar")) {
        return {
            messages: [
                "Vamos agendar sua consulta!"
            ],
            context: {
                ...context,
                state: "AUTH_CHECK"
            },
            quickReplies: []
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
        messages: [
            "Desculpe, nao entendi. Escolha uma das opcoes abaixo:"
        ],
        context: {
            ...context,
            state: "MENU"
        },
        quickReplies: MENU_REPLIES
    };
}
function handleAuthCheck(context) {
    if (!context.isAuthenticated) {
        return {
            messages: [
                "Para agendar uma consulta, voce precisa estar logado.",
                "Por favor, faca login ou crie uma conta e depois volte aqui para agendar."
            ],
            context: {
                ...context,
                state: "ANYTHING_ELSE"
            },
            quickReplies: [
                {
                    label: "Fazer login",
                    value: "login"
                },
                {
                    label: "Voltar ao menu",
                    value: "menu"
                }
            ]
        };
    }
    return {
        messages: [
            "Qual tipo de consulta voce deseja agendar?"
        ],
        context: {
            ...context,
            state: "SELECT_TYPE"
        },
        quickReplies: TYPE_REPLIES
    };
}
function handleSelectType(input, context) {
    if (input === "first_visit" || input.includes("primeira")) {
        return {
            messages: [
                "Primeira consulta selecionada!",
                "Para qual data voce gostaria de agendar? Voce pode digitar: 'amanha', 'proxima segunda', 'dia 15', '15/03', etc."
            ],
            context: {
                ...context,
                state: "SELECT_DATE",
                appointmentType: "FIRST_VISIT"
            },
            quickReplies: [
                {
                    label: "Amanha",
                    value: "amanha"
                },
                {
                    label: "Proxima segunda",
                    value: "proxima segunda"
                },
                {
                    label: "Proxima quarta",
                    value: "proxima quarta"
                },
                {
                    label: "Proxima sexta",
                    value: "proxima sexta"
                }
            ]
        };
    }
    if (input === "return" || input.includes("retorno")) {
        return {
            messages: [
                "Retorno selecionado!",
                "Para qual data voce gostaria de agendar o retorno? Voce pode digitar: 'amanha', 'proxima segunda', 'dia 15', '15/03', etc."
            ],
            context: {
                ...context,
                state: "SELECT_DATE",
                appointmentType: "RETURN"
            },
            quickReplies: [
                {
                    label: "Amanha",
                    value: "amanha"
                },
                {
                    label: "Proxima segunda",
                    value: "proxima segunda"
                },
                {
                    label: "Proxima quarta",
                    value: "proxima quarta"
                },
                {
                    label: "Proxima sexta",
                    value: "proxima sexta"
                }
            ]
        };
    }
    return {
        messages: [
            "Por favor, selecione o tipo de consulta:"
        ],
        context: {
            ...context,
            state: "SELECT_TYPE"
        },
        quickReplies: TYPE_REPLIES
    };
}
async function handleSelectDate(input, context) {
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatbot$2f$dateParser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseDatePtBr"])(input);
    if (!parsed) {
        return {
            messages: [
                "Nao consegui entender a data. Tente novamente usando formatos como:",
                "'amanha', 'proxima segunda', 'dia 15', '15/03', '15/03/2025', '15 de marco'"
            ],
            context: {
                ...context,
                state: "SELECT_DATE"
            },
            quickReplies: [
                {
                    label: "Amanha",
                    value: "amanha"
                },
                {
                    label: "Proxima segunda",
                    value: "proxima segunda"
                },
                {
                    label: "Voltar ao menu",
                    value: "menu"
                }
            ]
        };
    }
    const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfDay"])(new Date());
    const minDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(today, 1);
    if (parsed < minDate) {
        return {
            messages: [
                "A data precisa ser pelo menos amanha. Agendamentos devem ser feitos com pelo menos 24 horas de antecedencia."
            ],
            context: {
                ...context,
                state: "SELECT_DATE"
            },
            quickReplies: [
                {
                    label: "Amanha",
                    value: "amanha"
                },
                {
                    label: "Proxima segunda",
                    value: "proxima segunda"
                }
            ]
        };
    }
    const dateISO = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatbot$2f$dateParser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateISO"])(parsed);
    const slots = await fetchAvailableSlots(dateISO);
    if (slots.length === 0) {
        const suggestions = await findNextAvailableDays(dateISO, 3);
        const suggestionMessages = suggestions.length > 0 ? [
            `Nao ha horarios disponiveis para ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatbot$2f$dateParser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDatePtBr"])(parsed)}.`,
            `Proximos dias disponiveis: ${suggestions.map((s)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatbot$2f$dateParser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDatePtBr"])(new Date(s + "T12:00:00"))).join(", ")}`
        ] : [
            `Nao ha horarios disponiveis para ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatbot$2f$dateParser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDatePtBr"])(parsed)}. Tente outra data.`
        ];
        const suggestionReplies = suggestions.map((s)=>({
                label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatbot$2f$dateParser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDatePtBr"])(new Date(s + "T12:00:00")),
                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatbot$2f$dateParser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDatePtBr"])(new Date(s + "T12:00:00"))
            }));
        suggestionReplies.push({
            label: "Outra data",
            value: "outra"
        });
        return {
            messages: suggestionMessages,
            context: {
                ...context,
                state: "SELECT_DATE"
            },
            quickReplies: suggestionReplies
        };
    }
    return {
        messages: [
            `Horarios disponiveis para ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatbot$2f$dateParser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDatePtBr"])(parsed)}:`,
            "Escolha um horario:"
        ],
        context: {
            ...context,
            state: "SHOW_SLOTS",
            selectedDate: dateISO,
            availableSlots: slots
        },
        quickReplies: slots.map((s)=>({
                label: formatSlotTime(s.start_time),
                value: s.start_time
            }))
    };
}
async function findNextAvailableDays(fromDate, count) {
    const results = [];
    let current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(new Date(fromDate + "T12:00:00"), 1);
    for(let i = 0; i < 30 && results.length < count; i++){
        const dateStr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatbot$2f$dateParser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDateISO"])(current);
        const slots = await fetchAvailableSlots(dateStr);
        if (slots.length > 0) {
            results.push(dateStr);
        }
        current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(current, 1);
    }
    return results;
}
function handleValidateDate(context) {
    return {
        messages: [
            "Buscando horarios disponiveis..."
        ],
        context,
        quickReplies: []
    };
}
function handleShowSlots(input, context) {
    const matchedSlot = context.availableSlots.find((s)=>s.start_time === input || formatSlotTime(s.start_time) === input);
    if (!matchedSlot) {
        return {
            messages: [
                "Por favor, escolha um dos horarios disponiveis:"
            ],
            context: {
                ...context,
                state: "SHOW_SLOTS"
            },
            quickReplies: context.availableSlots.map((s)=>({
                    label: formatSlotTime(s.start_time),
                    value: s.start_time
                }))
        };
    }
    const typeLabel = context.appointmentType === "FIRST_VISIT" ? "Primeira Consulta" : "Retorno";
    const dateFormatted = context.selectedDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatbot$2f$dateParser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDatePtBr"])(new Date(context.selectedDate + "T12:00:00")) : "";
    return {
        messages: [
            "Por favor, confirme os dados do agendamento:",
            `Tipo: ${typeLabel}`,
            `Data: ${dateFormatted}`,
            `Horario: ${formatSlotTime(matchedSlot.start_time)} - ${formatSlotTime(matchedSlot.end_time)}`,
            "Deseja confirmar?"
        ],
        context: {
            ...context,
            state: "CONFIRM",
            selectedSlot: matchedSlot
        },
        quickReplies: [
            {
                label: "Confirmar",
                value: "sim"
            },
            {
                label: "Escolher outro horario",
                value: "outro_horario"
            },
            {
                label: "Cancelar",
                value: "cancelar"
            }
        ]
    };
}
async function handleConfirm(input, context) {
    if (input === "sim" || input === "confirmar" || input.includes("confirm")) {
        if (!context.selectedDate || !context.selectedSlot || !context.appointmentType) {
            return {
                messages: [
                    "Erro: dados do agendamento incompletos. Vamos comecar de novo."
                ],
                context: {
                    ...context,
                    state: "SELECT_TYPE",
                    selectedDate: null,
                    selectedSlot: null,
                    appointmentType: null
                },
                quickReplies: TYPE_REPLIES
            };
        }
        const result = await bookAppointment({
            date: context.selectedDate,
            start_time: context.selectedSlot.start_time,
            end_time: context.selectedSlot.end_time,
            type: context.appointmentType
        });
        if (result.success) {
            const dateFormatted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatbot$2f$dateParser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDatePtBr"])(new Date(context.selectedDate + "T12:00:00"));
            return {
                messages: [
                    "Consulta agendada com sucesso!",
                    `Data: ${dateFormatted} as ${formatSlotTime(context.selectedSlot.start_time)}`,
                    "Voce recebera uma confirmacao em breve. Posso ajudar com mais alguma coisa?"
                ],
                context: {
                    ...context,
                    state: "ANYTHING_ELSE",
                    selectedDate: null,
                    selectedSlot: null,
                    appointmentType: null,
                    availableSlots: []
                },
                quickReplies: ANYTHING_ELSE_REPLIES
            };
        }
        return {
            messages: [
                `Nao foi possivel agendar: ${result.error}`,
                "Deseja tentar novamente?"
            ],
            context: {
                ...context,
                state: "ANYTHING_ELSE"
            },
            quickReplies: [
                {
                    label: "Tentar novamente",
                    value: "agendar"
                },
                {
                    label: "Voltar ao menu",
                    value: "menu"
                }
            ]
        };
    }
    if (input === "outro_horario" || input.includes("outro")) {
        return {
            messages: [
                "Escolha outro horario:"
            ],
            context: {
                ...context,
                state: "SHOW_SLOTS",
                selectedSlot: null
            },
            quickReplies: context.availableSlots.map((s)=>({
                    label: formatSlotTime(s.start_time),
                    value: s.start_time
                }))
        };
    }
    if (input === "cancelar" || input.includes("cancel")) {
        return {
            messages: [
                "Agendamento cancelado. Posso ajudar com mais alguma coisa?"
            ],
            context: {
                ...context,
                state: "ANYTHING_ELSE",
                selectedDate: null,
                selectedSlot: null,
                appointmentType: null,
                availableSlots: []
            },
            quickReplies: ANYTHING_ELSE_REPLIES
        };
    }
    return {
        messages: [
            "Por favor, confirme ou cancele o agendamento:"
        ],
        context,
        quickReplies: [
            {
                label: "Confirmar",
                value: "sim"
            },
            {
                label: "Cancelar",
                value: "cancelar"
            }
        ]
    };
}
function handleBooking(context) {
    return {
        messages: [
            "Processando seu agendamento..."
        ],
        context,
        quickReplies: []
    };
}
function handleAnythingElse(input, context) {
    if (input === "sim" || input.includes("sim") || input.includes("ajuda")) {
        return {
            messages: [
                "Como posso te ajudar?"
            ],
            context: {
                ...context,
                state: "MENU"
            },
            quickReplies: MENU_REPLIES
        };
    }
    if (input === "login") {
        return {
            messages: [
                "Para fazer login, acesse a pagina de login clicando no botao 'Entrar' no topo do site.",
                "Apos o login, volte aqui e eu poderei te ajudar a agendar sua consulta!",
                "Posso ajudar com mais alguma coisa?"
            ],
            context: {
                ...context,
                state: "ANYTHING_ELSE"
            },
            quickReplies: ANYTHING_ELSE_REPLIES
        };
    }
    return handleFarewell(context);
}
function handleFarewell(context) {
    return {
        messages: [
            "Obrigado por usar o MageBot! Ate a proxima! Se precisar de algo, e so me chamar."
        ],
        context: {
            ...context,
            state: "FAREWELL"
        },
        quickReplies: [
            {
                label: "Voltar ao menu",
                value: "menu"
            }
        ]
    };
}
function handleViewAppointments(context) {
    if (!context.isAuthenticated) {
        return {
            messages: [
                "Para ver seus agendamentos, voce precisa estar logado.",
                "Acesse a area do paciente para ver suas consultas."
            ],
            context: {
                ...context,
                state: "ANYTHING_ELSE"
            },
            quickReplies: [
                {
                    label: "Fazer login",
                    value: "login"
                },
                {
                    label: "Voltar ao menu",
                    value: "menu"
                }
            ]
        };
    }
    return {
        messages: [
            "Voce pode ver todos os seus agendamentos na area do paciente.",
            "Acesse /paciente para ver suas consultas, cancelar ou agendar novas.",
            "Posso ajudar com mais alguma coisa?"
        ],
        context: {
            ...context,
            state: "ANYTHING_ELSE"
        },
        quickReplies: ANYTHING_ELSE_REPLIES
    };
}
function handleServicesInfo(context) {
    return {
        messages: [
            "Nossos servicos incluem:",
            "- Consulta Nutricional (Primeira Visita): Avaliacao completa, anamnese, plano alimentar personalizado.",
            "- Retorno Nutricional: Acompanhamento, ajuste do plano alimentar, avaliacao de progresso.",
            "Gostaria de agendar uma consulta?"
        ],
        context: {
            ...context,
            state: "ANYTHING_ELSE"
        },
        quickReplies: [
            {
                label: "Agendar consulta",
                value: "agendar"
            },
            {
                label: "Voltar ao menu",
                value: "menu"
            }
        ]
    };
}
function handleContactInfo(context) {
    return {
        messages: [
            "Informacoes de contato:",
            "Renan Martins - Nutricionista",
            "Acesse a secao de contato no site para mais informacoes sobre telefone, endereco e horario de funcionamento.",
            "Posso ajudar com mais alguma coisa?"
        ],
        context: {
            ...context,
            state: "ANYTHING_ELSE"
        },
        quickReplies: ANYTHING_ELSE_REPLIES
    };
}
function getGreetingResponse(context) {
    return handleGreeting(context);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/supabase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
function createClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://dvrwltbunfwnymoqrqzg.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2cndsdGJ1bmZ3bnltb3FycXpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1ODA1OTYsImV4cCI6MjA4ODE1NjU5Nn0.dAOqu824PidFe-KtDxSPaMV42JUaziZII9BVNh5izDw"));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useMageBot.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMageBot",
    ()=>useMageBot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatbot$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/chatbot/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatbot$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/chatbot/engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function generateId() {
    return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}
const SESSION_KEY = "magebot_session";
const TYPING_DELAY = 600;
function loadGuestSession() {
    try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed.messages && parsed.context) {
            parsed.messages = parsed.messages.map((m)=>({
                    ...m,
                    timestamp: new Date(m.timestamp)
                }));
            return parsed;
        }
        return null;
    } catch  {
        return null;
    }
}
function saveGuestSession(messages, context) {
    try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({
            messages,
            context
        }));
    } catch  {}
}
function useMageBot() {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [context, setContext] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatbot$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createInitialContext"])());
    const [quickReplies, setQuickReplies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [unreadCount, setUnreadCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const hasGreeted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const authChecked = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMageBot.useEffect": ()=>{
            const checkAuth = {
                "useMageBot.useEffect.checkAuth": async ()=>{
                    if (authChecked.current) return;
                    authChecked.current = true;
                    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                    const { data: { user } } = await supabase.auth.getUser();
                    let newContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatbot$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createInitialContext"])();
                    if (user) {
                        const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user.id).single();
                        const profileName = profile?.full_name;
                        newContext = {
                            ...newContext,
                            isAuthenticated: true,
                            userId: user.id,
                            userName: profileName || user.email?.split("@")[0] || null
                        };
                    }
                    const saved = loadGuestSession();
                    if (saved && saved.messages.length > 0) {
                        setMessages(saved.messages);
                        setContext({
                            ...saved.context,
                            isAuthenticated: newContext.isAuthenticated,
                            userId: newContext.userId,
                            userName: newContext.userName
                        });
                        hasGreeted.current = true;
                    } else {
                        setContext(newContext);
                    }
                }
            }["useMageBot.useEffect.checkAuth"];
            checkAuth();
        }
    }["useMageBot.useEffect"], []);
    const addBotMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMageBot.useCallback[addBotMessages]": (texts, newContext, newReplies)=>{
            setIsTyping(true);
            const botMessages = texts.map({
                "useMageBot.useCallback[addBotMessages].botMessages": (text)=>({
                        id: generateId(),
                        role: "bot",
                        text,
                        timestamp: new Date()
                    })
            }["useMageBot.useCallback[addBotMessages].botMessages"]);
            setTimeout({
                "useMageBot.useCallback[addBotMessages]": ()=>{
                    setIsTyping(false);
                    setMessages({
                        "useMageBot.useCallback[addBotMessages]": (prev)=>{
                            const updated = [
                                ...prev,
                                ...botMessages
                            ];
                            saveGuestSession(updated, newContext);
                            return updated;
                        }
                    }["useMageBot.useCallback[addBotMessages]"]);
                    setContext(newContext);
                    setQuickReplies(newReplies);
                    if (!isOpen) {
                        setUnreadCount({
                            "useMageBot.useCallback[addBotMessages]": (c)=>c + botMessages.length
                        }["useMageBot.useCallback[addBotMessages]"]);
                    }
                }
            }["useMageBot.useCallback[addBotMessages]"], TYPING_DELAY);
        }
    }["useMageBot.useCallback[addBotMessages]"], [
        isOpen
    ]);
    const greet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMageBot.useCallback[greet]": ()=>{
            if (hasGreeted.current) return;
            hasGreeted.current = true;
            const response = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatbot$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGreetingResponse"])(context);
            addBotMessages(response.messages, response.context, response.quickReplies);
        }
    }["useMageBot.useCallback[greet]"], [
        context,
        addBotMessages
    ]);
    const toggleOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMageBot.useCallback[toggleOpen]": ()=>{
            setIsOpen({
                "useMageBot.useCallback[toggleOpen]": (prev)=>{
                    const next = !prev;
                    if (next) {
                        setUnreadCount(0);
                        if (!hasGreeted.current) {
                            setTimeout({
                                "useMageBot.useCallback[toggleOpen]": ()=>greet()
                            }["useMageBot.useCallback[toggleOpen]"], 100);
                        }
                    }
                    return next;
                }
            }["useMageBot.useCallback[toggleOpen]"]);
        }
    }["useMageBot.useCallback[toggleOpen]"], [
        greet
    ]);
    const setOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMageBot.useCallback[setOpen]": (open)=>{
            setIsOpen(open);
            if (open) {
                setUnreadCount(0);
                if (!hasGreeted.current) {
                    setTimeout({
                        "useMageBot.useCallback[setOpen]": ()=>greet()
                    }["useMageBot.useCallback[setOpen]"], 100);
                }
            }
        }
    }["useMageBot.useCallback[setOpen]"], [
        greet
    ]);
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMageBot.useCallback[sendMessage]": async (text)=>{
            const trimmed = text.trim();
            if (!trimmed) return;
            const userMsg = {
                id: generateId(),
                role: "user",
                text: trimmed,
                timestamp: new Date()
            };
            setMessages({
                "useMageBot.useCallback[sendMessage]": (prev)=>[
                        ...prev,
                        userMsg
                    ]
            }["useMageBot.useCallback[sendMessage]"]);
            setQuickReplies([]);
            setIsTyping(true);
            try {
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$chatbot$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["processMessage"])(trimmed, context);
                addBotMessages(response.messages, response.context, response.quickReplies);
            } catch  {
                addBotMessages([
                    "Desculpe, ocorreu um erro. Tente novamente."
                ], {
                    ...context,
                    state: "MENU"
                }, [
                    {
                        label: "Voltar ao menu",
                        value: "menu"
                    }
                ]);
            }
        }
    }["useMageBot.useCallback[sendMessage]"], [
        context,
        addBotMessages
    ]);
    return {
        messages,
        quickReplies,
        isTyping,
        isOpen,
        unreadCount,
        sendMessage,
        toggleOpen,
        setOpen
    };
}
_s(useMageBot, "QERIwtF22m3LflkOCqVJtZ4W1ss=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 44,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/chatbot/ChatWindow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatWindow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function TypingIndicator() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-1 px-4 py-2",
        "data-testid": "typing-indicator",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1 bg-muted rounded-md px-3 py-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce",
                    style: {
                        animationDelay: "0ms"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce",
                    style: {
                        animationDelay: "150ms"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce",
                    style: {
                        animationDelay: "300ms"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = TypingIndicator;
function MessageBubble({ message }) {
    const isBot = message.role === "bot";
    const time = message.timestamp instanceof Date ? message.timestamp.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    }) : "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex ${isBot ? "justify-start" : "justify-end"} px-3 py-0.5`,
        "data-testid": `message-${message.role}-${message.id}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `max-w-[85%] rounded-md px-3 py-2 text-sm ${isBot ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "whitespace-pre-wrap break-words",
                    children: message.text
                }, void 0, false, {
                    fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `text-[10px] mt-1 block ${isBot ? "text-muted-foreground" : "text-primary-foreground/70"}`,
                    children: time
                }, void 0, false, {
                    fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_c1 = MessageBubble;
function ChatWindow({ messages, quickReplies, isTyping, onSend, onClose }) {
    _s();
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["ChatWindow.useEffect"], [
        messages,
        isTyping
    ]);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (!input.trim()) return;
        onSend(input);
        setInput("");
    };
    const handleQuickReply = (reply)=>{
        onSend(reply.value);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-20 right-4 z-50 flex flex-col bg-background border border-border rounded-md shadow-lg w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[80vh]",
        "data-testid": "chat-window",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-t-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm font-bold",
                                children: "M"
                            }, void 0, false, {
                                fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-semibold",
                                        "data-testid": "text-chatbot-name",
                                        children: "MageBot"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-primary-foreground/70",
                                        children: "Assistente Virtual"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        size: "icon",
                        variant: "ghost",
                        className: "text-primary-foreground hover:bg-primary-foreground/10",
                        onClick: onClose,
                        "data-testid": "button-close-chat",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto py-3 space-y-1",
                children: [
                    messages.map((msg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MessageBubble, {
                            message: msg
                        }, msg.id, false, {
                            fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this)),
                    isTyping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TypingIndicator, {}, void 0, false, {
                        fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                        lineNumber: 115,
                        columnNumber: 22
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: messagesEndRef
                    }, void 0, false, {
                        fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            quickReplies.length > 0 && !isTyping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-1.5 px-3 py-2 border-t border-border",
                "data-testid": "quick-replies",
                children: quickReplies.map((reply)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: ()=>handleQuickReply(reply),
                        "data-testid": `button-quick-reply-${reply.value}`,
                        children: reply.label
                    }, reply.value, false, {
                        fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                        lineNumber: 122,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                lineNumber: 120,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "flex items-center gap-2 px-3 py-2 border-t border-border",
                "data-testid": "chat-input-form",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: inputRef,
                        type: "text",
                        value: input,
                        onChange: (e)=>setInput(e.target.value),
                        placeholder: "Digite sua mensagem...",
                        className: "flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none h-9 px-3 border border-input rounded-md",
                        "data-testid": "input-chat-message"
                    }, void 0, false, {
                        fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "submit",
                        size: "icon",
                        disabled: !input.trim(),
                        "data-testid": "button-send-message",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/chatbot/ChatWindow.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_s(ChatWindow, "z+8YXE0r4x0YDACvmHFK3txB7x0=");
_c2 = ChatWindow;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "TypingIndicator");
__turbopack_context__.k.register(_c1, "MessageBubble");
__turbopack_context__.k.register(_c2, "ChatWindow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/chatbot/MageBotWidget.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MageBotWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMageBot$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useMageBot.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$chatbot$2f$ChatWindow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/chatbot/ChatWindow.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function MageBotWidget() {
    _s();
    const { messages, quickReplies, isTyping, isOpen, unreadCount, sendMessage, toggleOpen, setOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMageBot$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMageBot"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$chatbot$2f$ChatWindow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                messages: messages,
                quickReplies: quickReplies,
                isTyping: isTyping,
                onSend: sendMessage,
                onClose: ()=>setOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/components/chatbot/MageBotWidget.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: toggleOpen,
                className: "fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95",
                "data-testid": "button-magebot-widget",
                "aria-label": "Abrir chat",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                        className: "w-6 h-6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/chatbot/MageBotWidget.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[11px] font-bold flex items-center justify-center",
                        "data-testid": "badge-unread-count",
                        children: unreadCount > 9 ? "9+" : unreadCount
                    }, void 0, false, {
                        fileName: "[project]/src/components/chatbot/MageBotWidget.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/chatbot/MageBotWidget.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(MageBotWidget, "5Vx+wUDQTuw8rUDmCc5s2lkOdKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useMageBot$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMageBot"]
    ];
});
_c = MageBotWidget;
var _c;
__turbopack_context__.k.register(_c, "MageBotWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_f9623ac5._.js.map
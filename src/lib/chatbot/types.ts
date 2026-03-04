export interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
  timestamp: Date;
}

export interface QuickReply {
  label: string;
  value: string;
}

export interface Slot {
  start_time: string;
  end_time: string;
}

export type ChatStateKey =
  | "GREETING"
  | "MENU"
  | "AUTH_CHECK"
  | "SELECT_TYPE"
  | "SELECT_DATE"
  | "VALIDATE_DATE"
  | "SHOW_SLOTS"
  | "CONFIRM"
  | "BOOKING"
  | "ANYTHING_ELSE"
  | "FAREWELL"
  | "VIEW_APPOINTMENTS"
  | "SERVICES_INFO"
  | "CONTACT_INFO";

export interface ChatContext {
  state: ChatStateKey;
  isAuthenticated: boolean;
  userId: string | null;
  userName: string | null;
  appointmentType: "FIRST_VISIT" | "RETURN" | null;
  selectedDate: string | null;
  selectedSlot: Slot | null;
  availableSlots: Slot[];
}

export interface EngineResponse {
  messages: string[];
  context: ChatContext;
  quickReplies: QuickReply[];
}

export function createInitialContext(): ChatContext {
  return {
    state: "GREETING",
    isAuthenticated: false,
    userId: null,
    userName: null,
    appointmentType: null,
    selectedDate: null,
    selectedSlot: null,
    availableSlots: [],
  };
}

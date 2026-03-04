export interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
  timestamp: Date;
  isPassword?: boolean;
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
  | "LOGIN_EMAIL"
  | "LOGIN_PASSWORD"
  | "SELECT_TYPE"
  | "SELECT_DATE"
  | "SHOW_SLOTS"
  | "CONFIRM"
  | "BOOKING_READY"
  | "ANYTHING_ELSE"
  | "FAREWELL";

export interface ChatContext {
  state: ChatStateKey;
  isAuthenticated: boolean;
  userId: string | null;
  userName: string | null;
  accessToken: string | null;
  loginEmail: string | null;
  appointmentType: "FIRST_VISIT" | "RETURN" | null;
  selectedDate: string | null;
  selectedSlot: Slot | null;
  availableSlots: Slot[];
}

export interface EngineResponse {
  messages: string[];
  context: ChatContext;
  quickReplies: QuickReply[];
  needsBooking?: boolean;
}

export function createInitialContext(): ChatContext {
  return {
    state: "GREETING",
    isAuthenticated: false,
    userId: null,
    userName: null,
    accessToken: null,
    loginEmail: null,
    appointmentType: null,
    selectedDate: null,
    selectedSlot: null,
    availableSlots: [],
  };
}

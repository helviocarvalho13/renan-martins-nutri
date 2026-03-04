export type UserRole = "ADMIN" | "PATIENT";
export type AppointmentType = "FIRST_VISIT" | "RETURN";
export type AppointmentStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED" | "NO_SHOW";
export type NotificationType =
  | "APPOINTMENT_CREATED"
  | "APPOINTMENT_CONFIRMED"
  | "APPOINTMENT_CANCELLED"
  | "APPOINTMENT_REMINDER"
  | "APPOINTMENT_COMPLETED"
  | "GENERAL";

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  phone: string | null;
  cpf: string | null;
  date_of_birth: string | null;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProfileInsert {
  id: string;
  role?: UserRole;
  full_name?: string;
  phone?: string | null;
  cpf?: string | null;
  date_of_birth?: string | null;
  avatar_url?: string | null;
  is_active?: boolean;
}

export interface ProfileUpdate {
  role?: UserRole;
  full_name?: string;
  phone?: string | null;
  cpf?: string | null;
  date_of_birth?: string | null;
  avatar_url?: string | null;
  is_active?: boolean;
}

export interface Appointment {
  id: string;
  patient_id: string;
  date: string;
  start_time: string;
  end_time: string;
  type: AppointmentType;
  status: AppointmentStatus;
  notes: string | null;
  return_suggested_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface AppointmentInsert {
  patient_id: string;
  date: string;
  start_time: string;
  end_time: string;
  type?: AppointmentType;
  status?: AppointmentStatus;
  notes?: string | null;
  return_suggested_date?: string | null;
}

export interface AppointmentUpdate {
  date?: string;
  start_time?: string;
  end_time?: string;
  type?: AppointmentType;
  status?: AppointmentStatus;
  notes?: string | null;
  return_suggested_date?: string | null;
}

export interface AppointmentWithProfile extends Appointment {
  profiles: Profile;
}

export interface ScheduleConfig {
  id: string;
  admin_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_duration_min: number;
  break_duration_min: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ScheduleConfigInsert {
  admin_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_duration_min?: number;
  break_duration_min?: number;
  is_active?: boolean;
}

export interface ScheduleConfigUpdate {
  day_of_week?: number;
  start_time?: string;
  end_time?: string;
  slot_duration_min?: number;
  break_duration_min?: number;
  is_active?: boolean;
}

export interface BlockedSlot {
  id: string;
  admin_id: string;
  date: string;
  start_time: string | null;
  end_time: string | null;
  all_day: boolean;
  reason: string | null;
  created_at: string;
}

export interface BlockedSlotInsert {
  admin_id: string;
  date: string;
  start_time?: string | null;
  end_time?: string | null;
  all_day?: boolean;
  reason?: string | null;
}

export interface Testimonial {
  id: string;
  patient_id: string | null;
  content: string;
  rating: number;
  is_approved: boolean;
  created_at: string;
}

export interface TestimonialInsert {
  patient_id?: string | null;
  content: string;
  rating: number;
  is_approved?: boolean;
}

export interface SiteContent {
  id: string;
  section: string;
  title: string;
  content: Record<string, any>;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteContentInsert {
  section: string;
  title?: string;
  content?: Record<string, any>;
  is_active?: boolean;
  sort_order?: number;
}

export interface SiteContentUpdate {
  section?: string;
  title?: string;
  content?: Record<string, any>;
  is_active?: boolean;
  sort_order?: number;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  appointment_id: string | null;
  created_at: string;
}

export interface NotificationInsert {
  user_id: string;
  type?: NotificationType;
  title: string;
  message: string;
  is_read?: boolean;
  appointment_id?: string | null;
}

export interface ChatbotSession {
  id: string;
  user_id: string | null;
  session_token: string;
  current_state: string;
  context: Record<string, any>;
  messages: Record<string, any>[];
  created_at: string;
  updated_at: string;
}

export interface ChatbotSessionInsert {
  user_id?: string | null;
  session_token: string;
  current_state?: string;
  context?: Record<string, any>;
  messages?: Record<string, any>[];
}

export interface ChatbotSessionUpdate {
  current_state?: string;
  context?: Record<string, any>;
  messages?: Record<string, any>[];
}

export interface ServiceItem {
  name: string;
  description: string;
  duration_minutes: number;
  price_cents: number;
  icon: string;
  type: AppointmentType;
}

export interface HeroStat {
  icon: string;
  value: string;
  label: string;
}

export interface HeroContent {
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
  badge: string;
  stats: HeroStat[];
}

export interface AboutContent {
  subtitle: string;
  description: string;
  description_2: string;
  credentials: string[];
  years_experience: number;
}

export interface ServicesContent {
  subtitle: string;
  description: string;
  items: ServiceItem[];
}

export interface ContactContent {
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  instagram: string;
  working_hours: string;
  cta_title: string;
  cta_description: string;
}

export interface FooterContent {
  copyright: string;
  links: { label: string; href: string }[];
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
      appointments: {
        Row: Appointment;
        Insert: AppointmentInsert;
        Update: AppointmentUpdate;
      };
      schedule_config: {
        Row: ScheduleConfig;
        Insert: ScheduleConfigInsert;
        Update: ScheduleConfigUpdate;
      };
      blocked_slots: {
        Row: BlockedSlot;
        Insert: BlockedSlotInsert;
      };
      testimonials: {
        Row: Testimonial;
        Insert: TestimonialInsert;
      };
      site_content: {
        Row: SiteContent;
        Insert: SiteContentInsert;
        Update: SiteContentUpdate;
      };
      notifications: {
        Row: Notification;
        Insert: NotificationInsert;
      };
      chatbot_sessions: {
        Row: ChatbotSession;
        Insert: ChatbotSessionInsert;
        Update: ChatbotSessionUpdate;
      };
    };
    Enums: {
      user_role: UserRole;
      appointment_type: AppointmentType;
      appointment_status: AppointmentStatus;
      notification_type: NotificationType;
    };
  };
}

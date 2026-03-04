export type UserRole = "admin" | "patient";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
  is_active: boolean;
  icon: string;
}

export interface TimeSlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
}

export interface Appointment {
  id: string;
  patient_id?: string;
  service_id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  notes?: string;
  created_at: string;
  service?: Service;
}

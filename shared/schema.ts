import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, date, time, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const roleEnum = pgEnum("role", ["admin", "patient"]);
export const appointmentStatusEnum = pgEnum("appointment_status", ["pending", "confirmed", "cancelled", "completed"]);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  role: roleEnum("role").notNull().default("patient"),
});

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  durationMinutes: integer("duration_minutes").notNull().default(60),
  price: integer("price").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  icon: text("icon"),
});

export const timeSlots = pgTable("time_slots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  dayOfWeek: integer("day_of_week").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const appointments = pgTable("appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  patientId: varchar("patient_id").references(() => users.id),
  serviceId: varchar("service_id").references(() => services.id).notNull(),
  date: date("date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  status: appointmentStatusEnum("status").notNull().default("pending"),
  patientName: text("patient_name").notNull(),
  patientEmail: text("patient_email").notNull(),
  patientPhone: text("patient_phone").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  phone: true,
  role: true,
});

export const insertServiceSchema = createInsertSchema(services).pick({
  name: true,
  description: true,
  durationMinutes: true,
  price: true,
  isActive: true,
  icon: true,
});

export const insertTimeSlotSchema = createInsertSchema(timeSlots).pick({
  dayOfWeek: true,
  startTime: true,
  endTime: true,
  isActive: true,
});

export const insertAppointmentSchema = createInsertSchema(appointments).pick({
  patientId: true,
  serviceId: true,
  date: true,
  startTime: true,
  endTime: true,
  patientName: true,
  patientEmail: true,
  patientPhone: true,
  notes: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;
export type InsertTimeSlot = z.infer<typeof insertTimeSlotSchema>;
export type TimeSlot = typeof timeSlots.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

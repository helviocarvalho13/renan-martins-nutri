import {
  pgTable,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  date,
  time,
  jsonb,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

const genId = sql`gen_random_uuid()`;

export const user = pgTable("user", {
  id: varchar("id", { length: 36 }).primaryKey().default(genId),
  name: text("name").notNull().default(""),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("PATIENT"),
  phone: text("phone"),
  cpf: text("cpf").unique(),
  dateOfBirth: text("date_of_birth"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const passwordResetToken = pgTable("password_reset_token", {
  id: varchar("id", { length: 36 }).primaryKey().default(genId),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const appointments = pgTable(
  "appointments",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(genId),
    patientId: varchar("patient_id", { length: 36 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    startTime: time("start_time").notNull(),
    endTime: time("end_time").notNull(),
    type: text("type").notNull().default("FIRST_VISIT"),
    status: text("status").notNull().default("PENDING"),
    notes: text("notes"),
    returnSuggestedDate: date("return_suggested_date"),
    googleCalendarEventId: text("google_calendar_event_id"),
    modality: text("modality").notNull().default("PRESENCIAL"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("unique_appointment_slot").on(t.date, t.startTime)]
);

export const scheduleConfig = pgTable(
  "schedule_config",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(genId),
    adminId: varchar("admin_id", { length: 36 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    dayOfWeek: integer("day_of_week").notNull(),
    startTime: time("start_time").notNull(),
    endTime: time("end_time").notNull(),
    slotDurationMin: integer("slot_duration_min").notNull().default(50),
    breakDurationMin: integer("break_duration_min").notNull().default(10),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("unique_admin_day").on(t.adminId, t.dayOfWeek)]
);

export const blockedSlots = pgTable("blocked_slots", {
  id: varchar("id", { length: 36 }).primaryKey().default(genId),
  adminId: varchar("admin_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  startTime: time("start_time"),
  endTime: time("end_time"),
  allDay: boolean("all_day").notNull().default(false),
  reason: text("reason"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id", { length: 36 }).primaryKey().default(genId),
  patientId: varchar("patient_id", { length: 36 }).references(() => user.id, {
    onDelete: "set null",
  }),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5),
  isApproved: boolean("is_approved").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const siteContent = pgTable("site_content", {
  id: varchar("id", { length: 36 }).primaryKey().default(genId),
  section: text("section").notNull(),
  title: text("title").notNull().default(""),
  content: jsonb("content").notNull().default({}),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: varchar("id", { length: 36 }).primaryKey().default(genId),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: text("type").notNull().default("GENERAL"),
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  appointmentId: varchar("appointment_id", { length: 36 }).references(
    () => appointments.id,
    { onDelete: "set null" }
  ),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const chatbotSessions = pgTable("chatbot_sessions", {
  id: varchar("id", { length: 36 }).primaryKey().default(genId),
  userId: varchar("user_id", { length: 36 }).references(() => user.id, {
    onDelete: "set null",
  }),
  sessionToken: text("session_token").notNull().unique(),
  currentState: text("current_state").notNull().default("WELCOME"),
  context: jsonb("context").notNull().default({}),
  messages: jsonb("messages").notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
  appointments: many(appointments),
  scheduleConfigs: many(scheduleConfig),
  blockedSlots: many(blockedSlots),
  notifications: many(notifications),
}));

export const appointmentRelations = relations(appointments, ({ one }) => ({
  patient: one(user, { fields: [appointments.patientId], references: [user.id] }),
}));

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;
export type ScheduleConfig = typeof scheduleConfig.$inferSelect;
export type BlockedSlot = typeof blockedSlots.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type SiteContent = typeof siteContent.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type ChatbotSession = typeof chatbotSessions.$inferSelect;

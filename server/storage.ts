import { eq, and, desc } from "drizzle-orm";
import { db } from "./db";
import {
  users,
  services,
  timeSlots,
  appointments,
  type User,
  type InsertUser,
  type Service,
  type InsertService,
  type TimeSlot,
  type InsertTimeSlot,
  type Appointment,
  type InsertAppointment,
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;

  getTimeSlots(): Promise<TimeSlot[]>;
  createTimeSlot(slot: InsertTimeSlot): Promise<TimeSlot>;

  getAppointments(): Promise<Appointment[]>;
  getAppointment(id: string): Promise<Appointment | undefined>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointmentStatus(id: string, status: string): Promise<Appointment | undefined>;
  getBookedSlots(date: string): Promise<string[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getServices(): Promise<Service[]> {
    return db.select().from(services);
  }

  async getService(id: string): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async createService(service: InsertService): Promise<Service> {
    const [created] = await db.insert(services).values(service).returning();
    return created;
  }

  async getTimeSlots(): Promise<TimeSlot[]> {
    return db.select().from(timeSlots);
  }

  async createTimeSlot(slot: InsertTimeSlot): Promise<TimeSlot> {
    const [created] = await db.insert(timeSlots).values(slot).returning();
    return created;
  }

  async getAppointments(): Promise<Appointment[]> {
    return db.select().from(appointments).orderBy(desc(appointments.createdAt));
  }

  async getAppointment(id: string): Promise<Appointment | undefined> {
    const [appointment] = await db.select().from(appointments).where(eq(appointments.id, id));
    return appointment;
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const [created] = await db.insert(appointments).values(appointment).returning();
    return created;
  }

  async updateAppointmentStatus(id: string, status: string): Promise<Appointment | undefined> {
    const [updated] = await db
      .update(appointments)
      .set({ status: status as any })
      .where(eq(appointments.id, id))
      .returning();
    return updated;
  }

  async getBookedSlots(date: string): Promise<string[]> {
    const booked = await db
      .select({ startTime: appointments.startTime })
      .from(appointments)
      .where(
        and(
          eq(appointments.date, date),
          eq(appointments.status, "confirmed"),
        )
      );
    const pendingBooked = await db
      .select({ startTime: appointments.startTime })
      .from(appointments)
      .where(
        and(
          eq(appointments.date, date),
          eq(appointments.status, "pending"),
        )
      );
    return [...booked, ...pendingBooked].map((b) => b.startTime);
  }
}

export const storage = new DatabaseStorage();

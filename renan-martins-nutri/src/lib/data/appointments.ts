import { db } from "@/lib/db";
import { appointments, user } from "@/lib/schema";
import { eq, and, inArray, gte, lte, desc } from "drizzle-orm";
import type { AppointmentStatus } from "@/lib/types";

export async function getAppointmentById(id: string) {
  const rows = await db
    .select()
    .from(appointments)
    .where(eq(appointments.id, id))
    .limit(1);
  return rows[0] ?? null;
}

export async function getAppointmentsByPatient(
  patientId: string,
  statuses?: AppointmentStatus[]
) {
  const conditions = [eq(appointments.patientId, patientId)];
  if (statuses && statuses.length > 0) {
    conditions.push(inArray(appointments.status, statuses));
  }
  return db
    .select()
    .from(appointments)
    .where(and(...conditions))
    .orderBy(desc(appointments.date));
}

export async function getUpcomingAppointmentByPatient(patientId: string) {
  const today = new Date().toISOString().split("T")[0];
  const rows = await db
    .select()
    .from(appointments)
    .where(
      and(
        eq(appointments.patientId, patientId),
        inArray(appointments.status, ["PENDING", "CONFIRMED"]),
        gte(appointments.date, today)
      )
    )
    .orderBy(appointments.date)
    .limit(1);
  return rows[0] ?? null;
}

export async function getAppointmentsByDate(date: string, statuses?: AppointmentStatus[]) {
  const conditions = [eq(appointments.date, date)];
  if (statuses && statuses.length > 0) {
    conditions.push(inArray(appointments.status, statuses));
  }
  return db
    .select({
      appointment: appointments,
      patient: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    })
    .from(appointments)
    .innerJoin(user, eq(appointments.patientId, user.id))
    .where(and(...conditions))
    .orderBy(appointments.startTime);
}

export async function getAppointmentsInRange(startDate: string, endDate: string) {
  return db
    .select({
      appointment: appointments,
      patient: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    })
    .from(appointments)
    .innerJoin(user, eq(appointments.patientId, user.id))
    .where(and(gte(appointments.date, startDate), lte(appointments.date, endDate)))
    .orderBy(appointments.date, appointments.startTime);
}

export async function checkSlotConflict(
  date: string,
  startTime: string,
  excludeId?: string
) {
  const conditions = [
    eq(appointments.date, date),
    eq(appointments.startTime, startTime),
    inArray(appointments.status, ["PENDING", "CONFIRMED"] as AppointmentStatus[]),
  ];
  const rows = await db
    .select({ id: appointments.id })
    .from(appointments)
    .where(and(...conditions));
  if (excludeId) return rows.some((r) => r.id !== excludeId);
  return rows.length > 0;
}

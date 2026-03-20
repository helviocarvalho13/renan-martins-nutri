import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { eq, ilike, or, and, ne } from "drizzle-orm";

export async function getPatientById(id: string) {
  const rows = await db
    .select()
    .from(user)
    .where(and(eq(user.id, id), eq(user.role, "PATIENT")))
    .limit(1);
  return rows[0] ?? null;
}

export async function getPatientByEmail(email: string) {
  const rows = await db
    .select()
    .from(user)
    .where(and(eq(user.email, email.toLowerCase()), eq(user.role, "PATIENT")))
    .limit(1);
  return rows[0] ?? null;
}

export async function searchPatients(query: string, limit = 20) {
  const q = `%${query}%`;
  return db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      cpf: user.cpf,
      dateOfBirth: user.dateOfBirth,
      isActive: user.isActive,
      createdAt: user.createdAt,
    })
    .from(user)
    .where(
      and(
        eq(user.role, "PATIENT"),
        or(ilike(user.name, q), ilike(user.email, q))
      )
    )
    .limit(limit);
}

export async function getAllPatients() {
  return db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      cpf: user.cpf,
      dateOfBirth: user.dateOfBirth,
      isActive: user.isActive,
      createdAt: user.createdAt,
    })
    .from(user)
    .where(eq(user.role, "PATIENT"))
    .orderBy(user.name);
}

export async function getAdminUser() {
  const rows = await db
    .select()
    .from(user)
    .where(eq(user.role, "ADMIN"))
    .limit(1);
  return rows[0] ?? null;
}

import { db } from "./db";
import { users, services, timeSlots } from "@shared/schema";
import { eq } from "drizzle-orm";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export async function seedDatabase() {
  const existingAdmin = await db.select().from(users).where(eq(users.username, "admin"));
  if (existingAdmin.length > 0) {
    return;
  }

  console.log("Seeding database...");

  const hashedPassword = await hashPassword("admin123");
  await db.insert(users).values({
    username: "admin",
    password: hashedPassword,
    name: "Renan Martins",
    email: "contato@renanmartins.com.br",
    phone: "(11) 99999-9999",
    role: "admin",
  });

  await db.insert(services).values([
    {
      name: "Consulta Individual",
      description: "Avaliacao nutricional completa com anamnese, avaliacao antropometrica e prescricao de plano alimentar personalizado.",
      durationMinutes: 60,
      price: 25000,
      isActive: true,
      icon: "apple",
    },
    {
      name: "Acompanhamento Nutricional",
      description: "Consulta de retorno para acompanhar progresso, ajustar plano alimentar e tirar duvidas sobre a dieta.",
      durationMinutes: 40,
      price: 18000,
      isActive: true,
      icon: "target",
    },
    {
      name: "Nutricao Esportiva",
      description: "Planejamento alimentar especifico para praticantes de atividades fisicas e atletas, visando melhor performance.",
      durationMinutes: 60,
      price: 30000,
      isActive: true,
      icon: "activity",
    },
    {
      name: "Reeducacao Alimentar",
      description: "Programa de mudanca de habitos alimentares com foco em qualidade de vida e emagrecimento saudavel.",
      durationMinutes: 50,
      price: 22000,
      isActive: true,
      icon: "heart",
    },
  ]);

  const slotData = [];
  for (let day = 1; day <= 6; day++) {
    const hours = ["08:00:00", "09:00:00", "10:00:00", "11:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00"];
    for (const hour of hours) {
      const [h] = hour.split(":");
      const endHour = `${String(parseInt(h) + 1).padStart(2, "0")}:00:00`;
      slotData.push({
        dayOfWeek: day,
        startTime: hour,
        endTime: endHour,
        isActive: true,
      });
    }
  }
  await db.insert(timeSlots).values(slotData);

  console.log("Database seeded successfully!");
}

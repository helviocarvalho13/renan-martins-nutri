import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { seedDatabase } from "./seed";
import { insertAppointmentSchema } from "@shared/schema";
import passport from "passport";

function requireAuth(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Nao autorizado" });
  }
  next();
}

function requireAdmin(req: any, res: any, next: any) {
  if (!req.isAuthenticated() || req.user.role !== "admin") {
    return res.status(403).json({ message: "Acesso negado" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupAuth(app);

  await seedDatabase();

  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: info?.message || "Credenciais invalidas" });
      }
      req.logIn(user, (err) => {
        if (err) return next(err);
        const { password, ...safeUser } = user;
        return res.json(safeUser);
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ message: "Erro ao sair" });
      res.json({ message: "Logout realizado" });
    });
  });

  app.get("/api/auth/me", requireAuth, (req, res) => {
    const { password, ...safeUser } = req.user!;
    res.json(safeUser);
  });

  app.get("/api/services", async (_req, res) => {
    const allServices = await storage.getServices();
    res.json(allServices);
  });

  app.get("/api/time-slots", async (_req, res) => {
    const slots = await storage.getTimeSlots();
    res.json(slots);
  });

  app.get("/api/appointments/booked/:date", async (req, res) => {
    const booked = await storage.getBookedSlots(req.params.date);
    res.json(booked);
  });

  app.post("/api/appointments", async (req, res) => {
    const parsed = insertAppointmentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Dados invalidos" });
    }

    if (!parsed.data.startTime || !parsed.data.endTime) {
      return res.status(400).json({ message: "Horario de inicio e fim sao obrigatorios" });
    }

    const service = await storage.getService(parsed.data.serviceId);
    if (!service) {
      return res.status(404).json({ message: "Servico nao encontrado" });
    }

    const allSlots = await storage.getTimeSlots();
    const matchingSlot = allSlots.find(
      (s) => s.startTime === parsed.data.startTime && s.endTime === parsed.data.endTime && s.isActive
    );
    if (!matchingSlot) {
      return res.status(400).json({ message: "Horario invalido" });
    }

    const booked = await storage.getBookedSlots(parsed.data.date);
    if (booked.includes(parsed.data.startTime)) {
      return res.status(409).json({ message: "Horario ja reservado" });
    }

    const appointment = await storage.createAppointment(parsed.data);
    res.status(201).json(appointment);
  });

  app.get("/api/appointments", requireAdmin, async (_req, res) => {
    const allAppointments = await storage.getAppointments();
    res.json(allAppointments);
  });

  app.patch("/api/appointments/:id", requireAdmin, async (req, res) => {
    const { status } = req.body;
    if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      return res.status(400).json({ message: "Status invalido" });
    }
    const updated = await storage.updateAppointmentStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ message: "Agendamento nao encontrado" });
    }
    res.json(updated);
  });

  return httpServer;
}

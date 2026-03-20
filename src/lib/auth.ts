import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/lib/schema";

const replitDomain = process.env.REPLIT_DOMAINS
  ? `https://${process.env.REPLIT_DOMAINS}`
  : null;

const appBaseUrl =
  process.env.BETTER_AUTH_URL ||
  replitDomain ||
  "http://localhost:5000";

const trustedOrigins = [
  "http://localhost:5000",
  ...(replitDomain ? [replitDomain] : []),
];

export const auth = betterAuth({
  baseURL: appBaseUrl,
  secret: process.env.SESSION_SECRET,
  trustedOrigins,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
    minPasswordLength: 6,
    sendResetPasswordToken: async (
      { user, url }: { user: { email: string; id: string; name: string }; url: string; token: string }
    ) => {
      try {
        const { sendEmail } = await import("@/lib/email/sender");
        const { passwordReset } = await import("@/lib/email/templates");
        const { subject, html } = passwordReset(user.name, url);
        await sendEmail(user.email, subject, html);
        console.log(`[forgot-password] Reset email sent to ${user.email}`);
      } catch (err) {
        console.error("[forgot-password] Failed to send reset email:", err);
      }
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "PATIENT",
        required: true,
        input: false,
      },
      phone: {
        type: "string",
        required: false,
        input: true,
      },
      cpf: {
        type: "string",
        required: false,
        input: true,
      },
      dateOfBirth: {
        type: "string",
        required: false,
        input: true,
      },
      isActive: {
        type: "boolean",
        defaultValue: true,
        required: true,
        input: false,
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;

/** Extended user type including app-specific additional fields */
export interface AppUser {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  phone?: string | null;
  cpf?: string | null;
  dateOfBirth?: string | null;
  isActive: boolean;
}

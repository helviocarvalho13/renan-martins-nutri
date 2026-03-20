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
    sendResetPasswordToken: async ({ user, url }) => {
      console.log(`[forgot-password] Reset link for ${user.email}: ${url}`);
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
        fieldName: "date_of_birth",
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

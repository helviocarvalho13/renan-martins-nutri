import { createAuthClient } from "better-auth/react";
import type { AppUser } from "@/lib/auth";

export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000",
});

export const { useSession, signIn, signOut, signUp } = authClient;

/** Extended sign-up input including app-specific additional fields */
export interface SignUpWithProfileInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  cpf?: string;
  dateOfBirth?: string;
}

/**
 * Wraps authClient.signUp.email to accept additional profile fields.
 * better-auth's additionalFields (input: true) stores these on the user record.
 * The spread cast is required because the generated client type doesn't include
 * our custom fields (phone, cpf, dateOfBirth) in its Parameters type.
 */
export async function signUpWithProfile(input: SignUpWithProfileInput) {
  type SignUpBody = Parameters<typeof authClient.signUp.email>[0];
  return authClient.signUp.email({ ...input } as SignUpBody);
}

export type { AppUser };

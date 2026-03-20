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
 */
export async function signUpWithProfile(input: SignUpWithProfileInput) {
  return authClient.signUp.email(
    input as unknown as Parameters<typeof authClient.signUp.email>[0]
  );
}

export type { AppUser };

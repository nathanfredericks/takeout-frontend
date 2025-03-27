"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function login(
  email: string,
  password: string,
  callbackUrl?: string,
) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || "/",
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    if (error instanceof AuthError) {
      return {
        error:
          error.type === "CredentialsSignin"
            ? "Invalid credentials"
            : "An error with Auth.js occurred",
        type: error.type,
      };
    }

    return {
      error: "Something went wrong",
      type: "UnknownError",
    };
  }
}

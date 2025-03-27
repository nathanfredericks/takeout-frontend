"use server";

import { api } from "@/api/client";
import { components } from "@/api/schema";
import { login } from "../login/actions";

export async function register(
  name: string,
  email: string,
  password: string,
  phoneNumber: string,
  role: components["schemas"]["UserRole"],
) {
  const { error, response } = await api.POST("/api/register", {
    body: {
      name,
      email,
      password,
      phone_number: phoneNumber,
      role,
    },
  });

  if (error) {
    if (error.detail && response.status === 422) {
      const errorMessage = error.detail[0].msg;
      return {
        error: errorMessage,
        type: "ValidationError",
      };
    }

    return {
      error: "Something went wrong",
      type: "UnknownError",
    };
  }

  return await login(email, password);
}

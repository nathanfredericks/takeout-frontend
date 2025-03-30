"use server";

import { api } from "@/api/client";
import { components } from "@/api/schema";

export async function createMerchant(
  merchant: components["schemas"]["MerchantCreateSchema"],
) {
  const { error } = await api.POST("/api/merchants", {
    body: merchant,
  });

  if (error) {
    throw new Error("Failed to create merchant");
  }
}

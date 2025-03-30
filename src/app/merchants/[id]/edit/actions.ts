"use server";

import { api } from "@/api/client";
import { components } from "@/api/schema";

export async function editMerchant(
  id: string,
  merchant: components["schemas"]["MerchantUpdateSchema"],
) {
  const { error } = await api.PATCH("/api/merchants/{merchant_id}", {
    body: merchant,
    params: {
      path: {
        merchant_id: parseInt(id),
      },
    },
  });

  if (error) {
    throw new Error("Failed to create merchant");
  }
}

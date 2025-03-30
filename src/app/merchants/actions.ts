"use server";
import { api } from "@/api/client";

export async function deleteMerchant(id: string) {
  const { error } = await api.DELETE(`/api/merchants/{merchant_id}`, {
    params: {
      path: {
        merchant_id: parseInt(id),
      },
    },
  });

  if (error) {
    throw new Error("Failed to delete merchant");
  }
}

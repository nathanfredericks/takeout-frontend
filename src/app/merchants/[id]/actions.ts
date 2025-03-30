"use server";
import { api } from "@/api/client";

export async function deleteItem(merchantId: string, itemId: string) {
  const { error } = await api.DELETE(
    `/api/merchants/{merchant_id}/items/{item_id}`,
    {
      params: {
        path: {
          merchant_id: parseInt(merchantId),
          item_id: parseInt(itemId),
        },
      },
    },
  );

  if (error) {
    throw new Error("Failed to delete item");
  }
}

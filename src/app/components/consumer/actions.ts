"use server";

import { api } from "@/api/client";
import { components } from "@/api/schema";

export async function cancelOrder(merchantId: number, orderId: number) {
  await api.PATCH(`/api/merchants/{merchant_id}/orders/{order_id}`, {
    params: {
      path: {
        merchant_id: merchantId,
        order_id: orderId,
      },
    },
    body: {
      status: "cancelled",
    },
  });
}

export async function checkout(
  merchantId: number,
  deliveryAddress: string,
  orderInstructions: string,
  items: components["schemas"]["OrderItemCreateSchema"][],
) {
  await api.POST("/api/merchants/{merchant_id}/orders", {
    params: {
      path: {
        merchant_id: merchantId,
      },
    },
    body: {
      delivery_address: deliveryAddress,
      order_instructions: orderInstructions,
      items: items,
    },
  });
}

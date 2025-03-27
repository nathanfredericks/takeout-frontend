"use server";

import { api } from "@/api/client";

export async function pickupOrder(merchantId: number, orderId: number) {
  await api.PATCH(`/api/merchants/{merchant_id}/orders/{order_id}`, {
    params: {
      path: {
        merchant_id: merchantId,
        order_id: orderId,
      },
    },
    body: {
      status: "in_transit",
    },
  });
}

export async function deliverOrder(merchantId: number, orderId: number) {
  await api.PATCH(`/api/merchants/{merchant_id}/orders/{order_id}`, {
    params: {
      path: {
        merchant_id: merchantId,
        order_id: orderId,
      },
    },
    body: {
      status: "delivered",
    },
  });
}

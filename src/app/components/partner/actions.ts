"use server";

import { api } from "@/api/client";
import { redirect } from "next/navigation";

export async function acceptOrder(merchantId: number, orderId: number) {
  await api.PATCH("/api/merchants/{merchant_id}/orders/{order_id}", {
    body: {
      status: "accepted",
    },
    params: {
      path: {
        merchant_id: merchantId,
        order_id: orderId,
      },
    },
  });
  redirect("/merchants/" + merchantId);
}

export async function readyForPickup(merchantId: number, orderId: number) {
  await api.PATCH("/api/merchants/{merchant_id}/orders/{order_id}", {
    body: {
      status: "ready_for_pickup",
    },
    params: {
      path: {
        merchant_id: merchantId,
        order_id: orderId,
      },
    },
  });
  redirect("/merchants/" + merchantId);
}

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
  redirect("/merchants/" + merchantId);
}

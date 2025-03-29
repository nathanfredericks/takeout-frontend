"use client";
import { createClientApi } from "@/api/client";
import { DataSource, DataModelId } from "@toolpad/core";
import { Session } from "next-auth";
import OrderStatusChip from "../../OrderStatusChip";
import { components } from "@/api/schema";

export type Order = components["schemas"]["OrderReadSchema"];

export function createOrdersDataSource(
  session: Session | null,
  merchantId: string | number
): DataSource<Order> {
  const clientApi = createClientApi(session);
  const merchantIdNumber = typeof merchantId === "string" ? parseInt(merchantId) : merchantId;

  return {
    fields: [
      { field: "id", headerName: "ID" },
      {
        field: "status",
        headerName: "Status",
        renderCell: (params) => {
          return <OrderStatusChip status={params.value} />;
        },
        minWidth: 150,
      },
      {
        field: "order_instructions",
        headerName: "Order Instructions",
        flex: 1,
      },
      { field: "delivery_address", headerName: "Delivery Address", flex: 1 },
      {
        field: "created_at",
        headerName: "Created At",
        type: "dateTime",
        valueGetter: (created_at) => new Date(created_at),
        flex: 1,
      },
      {
        field: "delivered_at",
        headerName: "Delivered At",
        type: "dateTime",
        valueGetter: (delivered_at) => delivered_at ? new Date(delivered_at) : null,
        flex: 1,
      },
    ],
    getMany: async () => {
      const { data } = await clientApi.GET(
        "/api/merchants/{merchant_id}/orders",
        {
          params: {
            path: {
              merchant_id: merchantIdNumber,
            },
          },
        }
      );

      return {
        items: data?.sort((a, b) => {
          return (
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
          );
        }) || [],
        itemCount: data?.length || 0,
      };
    },
    getOne: async (id: DataModelId) => {
      const { data } = await clientApi.GET(
        "/api/merchants/{merchant_id}/orders/{order_id}",
        {
          params: {
            path: {
              merchant_id: merchantIdNumber,
              order_id: id as number,
            },
          },
        }
      );
      return data!;
    },
  };
}

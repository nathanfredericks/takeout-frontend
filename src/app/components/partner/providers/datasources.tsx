"use client";

import { components } from "@/api/schema";
import { DataModelId, DataSource } from "@toolpad/core";
import { Session } from "next-auth";
import { createClientApi } from "@/api/client";
import { formatCurrency } from "@/utils/format";
import OrderStatusChip from "../../OrderStatusChip";
import * as yup from "yup";

type Merchant = components["schemas"]["MerchantReadSchema"];
type Item = components["schemas"]["ItemReadSchema"];
type Order = components["schemas"]["OrderReadSchema"];

const merchantSchema = yup.object({
  name: yup.string().required("Name is required"),
  location: yup.string().required("Location is required"),
  description: yup.string(),
});

const itemSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string(),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be non-negative"),
});

export function createMerchantsDataSource(
  session: Session | null,
): DataSource<Merchant> {
  const clientApi = createClientApi(session);

  return {
    fields: [
      { field: "name", headerName: "Name", flex: 1 },
      { field: "description", headerName: "Description", flex: 1 },
      { field: "location", headerName: "Location", flex: 1 },
    ],
    validate: (formValues) => {
      try {
        merchantSchema.validateSync(formValues, { abortEarly: false });
        return { issues: [] };
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const issues = err.inner.map((validationError) => ({
            message: validationError.message,
            path: [validationError.path as keyof Merchant],
          }));
          return { issues };
        }
        return { issues: [] };
      }
    },
    getMany: async () => {
      const { data } = await clientApi.GET("/api/merchants");

      return {
        items: data || [],
        itemCount: data?.length || 0,
      };
    },
    getOne: async (id: DataModelId) => {
      const { data } = await clientApi.GET(`/api/merchants/{merchant_id}`, {
        params: {
          path: {
            merchant_id: id as number,
          },
        },
      });

      return data!;
    },
    createOne: async (merchant: Partial<Omit<Merchant, "id">>) => {
      const { data } = await clientApi.POST("/api/merchants", {
        body: {
          name: merchant.name || "",
          location: merchant.location || "",
          description: merchant.description,
        },
      });

      return data!;
    },
    updateOne: async (
      id: DataModelId,
      merchant: Partial<Omit<Merchant, "id">>,
    ) => {
      const { data } = await clientApi.PATCH(`/api/merchants/{merchant_id}`, {
        body: merchant,
        params: {
          path: {
            merchant_id: id as number,
          },
        },
      });

      return data!;
    },
    deleteOne: async (id: DataModelId) => {
      await clientApi.DELETE(`/api/merchants/{merchant_id}`, {
        params: {
          path: {
            merchant_id: id as number,
          },
        },
      });
    },
  };
}

export function createItemsDataSource(
  session: Session | null,
  merchantId: string | number,
): DataSource<Item> {
  const clientApi = createClientApi(session);
  const merchantIdNumber =
    typeof merchantId === "string" ? parseInt(merchantId) : merchantId;

  return {
    fields: [
      { field: "name", headerName: "Name", flex: 1 },
      { field: "description", headerName: "Description", flex: 1 },
      {
        field: "price",
        headerName: "Price",
        type: "number",
        valueFormatter: (price) => {
          return formatCurrency(price);
        },
      },
    ],
    validate: (formValues) => {
      try {
        itemSchema.validateSync(formValues, { abortEarly: false });
        return { issues: [] };
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const issues = err.inner.map((validationError) => ({
            message: validationError.message,
            path: [validationError.path as keyof Item],
          }));
          return { issues };
        }
        return { issues: [] };
      }
    },
    getMany: async () => {
      const { data } = await clientApi.GET(
        "/api/merchants/{merchant_id}/items",
        {
          params: {
            path: {
              merchant_id: merchantIdNumber,
            },
          },
        },
      );

      return {
        items: data || [],
        itemCount: data?.length || 0,
      };
    },
    getOne: async (id: DataModelId) => {
      const { data } = await clientApi.GET(
        `/api/merchants/{merchant_id}/items/{item_id}`,
        {
          params: {
            path: {
              item_id: id as number,
              merchant_id: merchantIdNumber,
            },
          },
        },
      );

      return data!;
    },
    createOne: async (item: Partial<Omit<Item, "id">>) => {
      const { data } = await clientApi.POST(
        "/api/merchants/{merchant_id}/items",
        {
          body: {
            name: item.name || "",
            description: item.description || "",
            price: item.price || 0,
          },
          params: {
            path: {
              merchant_id: merchantIdNumber,
            },
          },
        },
      );

      return data!;
    },
    updateOne: async (id: DataModelId, item: Partial<Omit<Item, "id">>) => {
      const { data } = await clientApi.PATCH(
        `/api/merchants/{merchant_id}/items/{item_id}`,
        {
          body: {
            name: item.name || "",
            description: item.description || "",
            price: item.price || 0,
          },
          params: {
            path: {
              item_id: id as number,
              merchant_id: merchantIdNumber,
            },
          },
        },
      );

      return data!;
    },
    deleteOne: async (id: DataModelId) => {
      await clientApi.DELETE(`/api/merchants/{merchant_id}/items/{item_id}`, {
        params: {
          path: {
            item_id: id as number,
            merchant_id: merchantIdNumber,
          },
        },
      });
    },
  };
}

export function createOrdersDataSource(
  session: Session | null,
  merchantId: string | number,
): DataSource<Order> {
  const clientApi = createClientApi(session);
  const merchantIdNumber =
    typeof merchantId === "string" ? parseInt(merchantId) : merchantId;

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
        valueGetter: (delivered_at) =>
          delivered_at ? new Date(delivered_at) : null,
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
        },
      );

      return {
        items:
          data?.sort((a, b) => {
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
        },
      );
      return data!;
    },
  };
}

"use client";
import { createClientApi } from "@/api/client";
import { formatCurrency } from "@/utils/format";
import { DataSource, DataModelId } from "@toolpad/core";
import { Session } from "next-auth";
import * as yup from "yup";
import { components } from "@/api/schema";

type Item = components["schemas"]["ItemReadSchema"];

const itemSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().nullable(),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be non-negative"),
});

export function createItemsDataSource(
  session: Session | null,
  merchantId: string | number
): DataSource<Item> {
  const clientApi = createClientApi(session);
  const merchantIdNumber = typeof merchantId === "string" ? parseInt(merchantId) : merchantId;

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
        flex: 1,
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
        }
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
        }
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
        }
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
        }
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

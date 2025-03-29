"use client";
import { createClientApi } from "@/api/client";
import { DataSource, DataModelId } from "@toolpad/core";
import { Session } from "next-auth";
import * as yup from "yup";
import { components } from "@/api/schema";

type Merchant = components["schemas"]["MerchantReadSchema"];

const merchantSchema = yup.object({
  name: yup.string().required("Name is required"),
  location: yup.string().required("Location is required"),
  description: yup.string().nullable(),
});

export function createMerchantsDataSource(
  session: Session | null
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
      merchant: Partial<Omit<Merchant, "id">>
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
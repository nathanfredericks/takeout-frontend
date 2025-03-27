"use client";

import { useSession } from "next-auth/react";
import {
  CrudProvider,
  DataSource,
  DataSourceCache,
  LocalizationProvider,
} from "@toolpad/core";
import { useEffect, useState } from "react";
import { components } from "@/api/schema";
import { createMerchantsDataSource } from "@/app/components/partner/providers/datasources";

type Merchant = components["schemas"]["MerchantReadSchema"];

export default function MerchantsCRUDProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  const [merchantsDataSource, setMerchantsDataSource] =
    useState<DataSource<Merchant> | null>(null);
  const [merchantsDataSourceCache, setMerchantsDataSourceCache] =
    useState<DataSourceCache | null>(null);

  useEffect(() => {
    const dataSource = createMerchantsDataSource(session);
    const dataSourceCache = new DataSourceCache();

    setMerchantsDataSource(dataSource);
    setMerchantsDataSourceCache(dataSourceCache);
  }, [session]);

  if (!merchantsDataSource || !merchantsDataSourceCache) {
    return null;
  }

  return (
    <LocalizationProvider
      localeText={{
        createSuccessMessage: "Merchant created successfully",
        createErrorMessage: "Failed to create merchant",
        editSuccessMessage: "Merchant edited successfully",
        editErrorMessage: "Failed to edit merchant",
        deleteConfirmTitle: "Delete merchant?",
        deleteConfirmMessage: "Are you sure you want to delete this merchant?",
        deleteSuccessMessage: "Merchant deleted successfully",
        deleteErrorMessage: "Failed to delete merchant",
        deletedItemMessage: "Merchant deleted",
      }}
    >
      <CrudProvider
        dataSource={merchantsDataSource}
        dataSourceCache={merchantsDataSourceCache}
      >
        {children}
      </CrudProvider>
    </LocalizationProvider>
  );
}

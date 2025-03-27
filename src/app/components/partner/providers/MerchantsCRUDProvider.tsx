"use client";

import { useSession } from "next-auth/react";
import { CrudProvider, DataSource, DataSourceCache } from "@toolpad/core";
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

  // Initialize state for datasource and cache
  const [merchantsDataSource, setMerchantsDataSource] =
    useState<DataSource<Merchant> | null>(null);
  const [merchantsDataSourceCache, setMerchantsDataSourceCache] =
    useState<DataSourceCache | null>(null);

  // Use useEffect to initialize after component mount
  useEffect(() => {
    const dataSource = createMerchantsDataSource(session);
    const dataSourceCache = new DataSourceCache();

    setMerchantsDataSource(dataSource);
    setMerchantsDataSourceCache(dataSourceCache);
  }, [session]);

  // Only render children when data is ready
  if (!merchantsDataSource || !merchantsDataSourceCache) {
    return null; // Could also return a loading indicator here
  }

  return (
    <CrudProvider
      dataSource={merchantsDataSource}
      dataSourceCache={merchantsDataSourceCache}
    >
      {children}
    </CrudProvider>
  );
}

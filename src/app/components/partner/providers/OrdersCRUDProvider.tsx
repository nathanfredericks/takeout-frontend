"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { createOrdersDataSource } from "../datasources/orders";
import { CrudProvider, DataSource, DataSourceCache } from "@toolpad/core";
import { useEffect, useState } from "react";
import { components } from "@/api/schema";

export default function OrdersCRUDProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const params = useParams<{ id: string; order_id?: string }>();

  const [ordersDataSource, setOrdersDataSource] = useState<DataSource<
    components["schemas"]["OrderReadSchema"]
  > | null>(null);
  const [ordersDataSourceCache, setOrdersDataSourceCache] =
    useState<DataSourceCache | null>(null);

  useEffect(() => {
    const dataSource = createOrdersDataSource(session, params.id);
    const dataSourceCache = new DataSourceCache();

    setOrdersDataSource(dataSource);
    setOrdersDataSourceCache(dataSourceCache);
  }, [session, params.id]);

  if (!ordersDataSource || !ordersDataSourceCache) {
    return null;
  }

  return (
    <CrudProvider
      dataSource={ordersDataSource}
      dataSourceCache={ordersDataSourceCache}
    >
      {children}
    </CrudProvider>
  );
}

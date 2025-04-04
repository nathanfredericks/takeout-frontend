"use client";

import { useSession } from "next-auth/react";
import { createItemsDataSource } from "../datasources/items";
import {
  CrudProvider,
  DataSource,
  DataSourceCache,
  LocalizationProvider,
} from "@toolpad/core";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { components } from "@/api/schema";

export default function ItemsCRUDProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const params = useParams<{ id: string }>();

  const [itemsDataSource, setItemsDataSource] = useState<DataSource<
    components["schemas"]["ItemReadSchema"]
  > | null>(null);
  const [itemsDataSourceCache, setItemsDataSourceCache] =
    useState<DataSourceCache | null>(null);

  useEffect(() => {
    const dataSource = createItemsDataSource(session, params.id);
    const dataSourceCache = new DataSourceCache();

    setItemsDataSource(dataSource);
    setItemsDataSourceCache(dataSourceCache);
  }, [session, params.id]);

  if (!itemsDataSource || !itemsDataSourceCache) {
    return null;
  }

  return (
    <LocalizationProvider
      localeText={{
        createNewButtonLabel: "Add new",
        createLabel: "Add",
        createSuccessMessage: "Item created successfully",
        createErrorMessage: "Failed to create item",
        editSuccessMessage: "Item edited successfully",
        editErrorMessage: "Failed to edit item",
        deleteConfirmTitle: "Delete item?",
        deleteConfirmMessage: "Are you sure you want to delete this item?",
        deleteSuccessMessage: "Item deleted successfully",
        deleteErrorMessage: "Failed to delete item",
        deletedItemMessage: "Item deleted",
      }}
    >
      <CrudProvider
        dataSource={itemsDataSource}
        dataSourceCache={itemsDataSourceCache}
      >
        {children}
      </CrudProvider>
    </LocalizationProvider>
  );
}

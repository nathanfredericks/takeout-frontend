"use client";
import { List } from "@toolpad/core";
import { useRouter } from "next/navigation";

export default function MerchantList() {
  const router = useRouter();

  return (
    <List
      onRowClick={(id) => router.push(`/merchants/${id}`)}
      onCreateClick={() => router.push(`/merchants/new`)}
      onEditClick={(id) => router.push(`/merchants/${id}/edit`)}
      slotProps={{
        dataGrid: {
          disableColumnFilter: true,
          disableColumnSorting: true,
          disableColumnMenu: true,
          disableColumnResize: true,
          hideFooter: true,
          slots: {
            toolbar: () => null,
          },
        },
      }}
    />
  );
}

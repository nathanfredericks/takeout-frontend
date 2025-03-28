"use client";
import { List, Show } from "@toolpad/core";
import { useParams, useRouter } from "next/navigation";
import ItemsCRUDProvider from "../providers/ItemsCRUDProvider";
import { Typography } from "@mui/material";
import OrdersCRUDProvider from "@/app/components/partner/providers/OrdersCRUDProvider";

export default function Merchant() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  return (
    <>
      <Show
        id={params.id}
        onEditClick={() => router.push(`/merchants/${params.id}/edit`)}
        onDelete={() => {}}
      />

      <ItemsCRUDProvider>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Items
        </Typography>
        <List
          onCreateClick={() => router.push(`/merchants/${params.id}/items/new`)}
          onEditClick={(id) =>
            router.push(`/merchants/${params.id}/items/${id}/edit`)
          }
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
      </ItemsCRUDProvider>

      <OrdersCRUDProvider>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Orders
        </Typography>
        <List
          onRowClick={(id) =>
            router.push(`/merchants/${params.id}/orders/${id}`)
          }
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
      </OrdersCRUDProvider>
    </>
  );
}

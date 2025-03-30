"use client";
import { useDialogs, useNotifications } from "@toolpad/core";
import { useParams, useRouter } from "next/navigation";
import ItemsCRUDProvider from "../providers/ItemsCRUDProvider";
import { Typography } from "@mui/material";
import OrdersCRUDProvider from "@/app/components/partner/providers/OrdersCRUDProvider";
import List from "../../crud/List";
import { components } from "@/api/schema";
import { formatCurrency } from "@/utils/format";
import OrderStatusChip from "../../OrderStatusChip";
import { deleteItem } from "@/app/merchants/[id]/actions";
import Show from "../../crud/Show";
import { deleteMerchant } from "@/app/merchants/actions";

interface MerchantProps {
  merchant: components["schemas"]["MerchantReadSchema"];
  items: components["schemas"]["ItemReadSchema"][];
  orders: components["schemas"]["OrderReadSchema"][];
}

export default function Merchant(props: MerchantProps) {
  const { merchant, items, orders } = props;
  const router = useRouter();
  const { id: merchantId } = useParams<{ id: string }>();
  const dialogs = useDialogs();
  const notifications = useNotifications();

  return (
    <>
      <Show
        data={merchant}
        onEditClick={() => router.push(`/merchants/${merchantId}/edit`)}
        onDelete={async () => {
          const confirmed = await dialogs.confirm(
            "Are you sure you want to delete this merchant?",
            {
              title: "Delete merchant?",
              severity: "error",
              okText: "Delete",
              cancelText: "Cancel",
            },
          );

          if (!confirmed) {
            return;
          }

          try {
            await deleteMerchant(merchantId);
            notifications.show("Merchant deleted successfully", {
              severity: "success",
              autoHideDuration: 3000,
            });
            router.push("/merchants");
          } catch {
            notifications.show("Failed to delete merchant", {
              severity: "error",
              autoHideDuration: 3000,
            });
          }
        }}
      />

      <ItemsCRUDProvider>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Items
        </Typography>
        <List
          data={items}
          onCreateClick={() =>
            router.push(`/merchants/${merchantId}/items/new`)
          }
          onEditClick={(itemId) =>
            router.push(`/merchants/${merchantId}/items/${itemId}/edit`)
          }
          onDelete={async (itemId) => {
            const confirmed = await dialogs.confirm(
              "Are you sure you want to delete this item?",
              {
                title: "Delete item?",
                severity: "error",
                okText: "Delete",
                cancelText: "Cancel",
              },
            );

            if (!confirmed) {
              return;
            }

            try {
              await deleteItem(merchantId, itemId);
              notifications.show("Item deleted successfully", {
                severity: "success",
                autoHideDuration: 3000,
              });
              router.refresh();
            } catch {
              notifications.show("Failed to delete item", {
                severity: "error",
                autoHideDuration: 3000,
              });
            }
          }}
          slotProps={{
            dataGrid: {
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
          data={orders}
          onRowClick={(orderId) =>
            router.push(`/merchants/${merchantId}/orders/${orderId}`)
          }
          slotProps={{
            dataGrid: {
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

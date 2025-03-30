"use client";
import { components } from "@/api/schema";
import { deleteMerchant } from "@/app/merchants/actions";
import { useRouter } from "next/navigation";
import List from "../../crud/List";
import { useDialogs, useNotifications } from "@toolpad/core";

interface MerchantListProps {
  merchants: components["schemas"]["MerchantReadSchema"][];
}

export default function MerchantList(props: MerchantListProps) {
  const { merchants } = props;
  const router = useRouter();
  const dialogs = useDialogs();
  const notifications = useNotifications();

  return (
    <List
      data={merchants}
      onRowClick={(id) => router.push(`/merchants/${id}`)}
      onCreateClick={() => router.push(`/merchants/new`)}
      onEditClick={(id) => router.push(`/merchants/${id}/edit`)}
      onDelete={async (id) => {
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
          await deleteMerchant(id.toString());
          notifications.show("Merchant deleted successfully", {
            severity: "success",
            autoHideDuration: 3000,
          });
          router.refresh();
        } catch {
          notifications.show("Failed to delete merchant", {
            severity: "error",
            autoHideDuration: 3000,
          });
        }
      }}
    />
  );
}

import { auth } from "@/auth";
import PartnerNewItem from "../../../../../components/partner/items/EditItem";
import { DashboardLayout, PageContainer } from "@toolpad/core";
import { api } from "@/api/client";

export default async function EditItemPage({
  params,
}: {
  params: Promise<{
    id: string;
    item_id: string;
  }>;
}) {
  const { id, item_id } = await params;
  const session = await auth();

  if (session?.user.role !== "partner") {
    return null;
  }

  const { data: merchant, error: merchantError } = await api.GET(
    "/api/merchants/{merchant_id}",
    {
      params: {
        path: {
          merchant_id: parseInt(id),
        },
      },
    },
  );

  const { data: item, error: itemError } = await api.GET(
    "/api/merchants/{merchant_id}/items/{item_id}",
    {
      params: {
        path: {
          merchant_id: parseInt(id),
          item_id: parseInt(item_id),
        },
      },
    },
  );

  if (merchantError || itemError || !merchant || !item) {
    return null;
  }

  return (
    <DashboardLayout hideNavigation>
      <PageContainer
        title={"Edit " + item.name}
        breadcrumbs={[
          { title: "Merchants", path: "/merchants" },
          {
            title: merchant.name,
            path: "/merchants/" + id,
          },
          {
            title: "Edit " + item.name,
            path: "/merchants/" + id + "/items/" + item_id + "/edit",
          },
        ]}
      >
        <PartnerNewItem />
      </PageContainer>
    </DashboardLayout>
  );
}

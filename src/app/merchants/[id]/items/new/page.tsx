import { auth } from "@/auth";
import NewItem from "../../../../components/partner/items/NewItem";
import { DashboardLayout, PageContainer } from "@toolpad/core";
import { api } from "@/api/client";

export default async function NewItemPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const session = await auth();

  if (session?.user.role !== "partner") {
    return null;
  }

  const { data, error } = await api.GET("/api/merchants/{merchant_id}", {
    params: {
      path: {
        merchant_id: parseInt(id),
      },
    },
  });

  if (error || !data) {
    return null;
  }

  return (
    <DashboardLayout hideNavigation>
      <PageContainer
        title="New Item"
        breadcrumbs={[
          { title: "Merchants", path: "/merchants" },
          { title: data.name, path: "/merchants/" + id },
          { title: "New Item", path: "/merchants/" + id + "/items/new" },
        ]}
      >
        <NewItem />
      </PageContainer>
    </DashboardLayout>
  );
}

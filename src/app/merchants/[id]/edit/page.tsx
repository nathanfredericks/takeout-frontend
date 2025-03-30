import { auth } from "@/auth";
import PartnerEditMerchant from "../../../components/partner/merchants/EditMerchant";
import { DashboardLayout, PageContainer } from "@toolpad/core";
import { api } from "@/api/client";

export default async function EditMerchantPage({
  params,
}: {
  params: Promise<{ id: string }>;
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
        title="Edit Merchant"
        breadcrumbs={[
          { title: "Merchants", path: "/merchants" },
          { title: "Edit Merchant", path: "/merchants/[id]/edit" },
        ]}
      >
        <PartnerEditMerchant merchant={data} />
      </PageContainer>
    </DashboardLayout>
  );
}

import { auth } from "@/auth";
import PartnerEditMerchant from "../../../components/partner/merchants/EditMerchant";
import { DashboardLayout, PageContainer } from "@toolpad/core";

export default async function EditMerchantPage() {
  const session = await auth();

  if (session?.user.role !== "partner") {
    return null;
  }

  return (
    <DashboardLayout>
      <PageContainer
        title="Edit Merchant"
        breadcrumbs={[
          { title: "Merchants", path: "/merchants" },
          { title: "Edit Merchant", path: "/merchants/[id]/edit" },
        ]}
      >
        <PartnerEditMerchant />
      </PageContainer>
    </DashboardLayout>
  );
}

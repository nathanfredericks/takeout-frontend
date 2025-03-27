import { auth } from "@/auth";
import NewMerchant from "../../components/partner/merchants/NewMerchant";
import { DashboardLayout, PageContainer } from "@toolpad/core";

export default async function NewMerchantPage() {
  const session = await auth();

  if (session?.user.role !== "partner") {
    return null;
  }

  return (
    <DashboardLayout>
      <PageContainer
        title="New Merchant"
        breadcrumbs={[
          { title: "Merchants", path: "/merchants" },
          { title: "New Merchant", path: "/merchants/new" },
        ]}
      >
        <NewMerchant />
      </PageContainer>
    </DashboardLayout>
  );
}

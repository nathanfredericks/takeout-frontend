import { api } from "@/api/client";
import ConsumerMerchantList from "../components/consumer/MerchantList";
import { DashboardLayout, PageContainer } from "@toolpad/core";
import { auth } from "@/auth";
import PartnerMerchantList from "../components/partner/merchants/MerchantList";
import { Alert } from "@mui/material";

export default async function MerchantsPage() {
  const session = await auth();

  if (session?.user.role === "consumer") {
    const { data, error } = await api.GET("/api/merchants");

    if (error || !data) {
      return null;
    }

    return (
      <DashboardLayout>
        <PageContainer
          breadcrumbs={[{ title: "Merchants", path: "/merchants" }]}
        >
          {!data.length && <Alert severity="info">No merchants found</Alert>}
          <ConsumerMerchantList merchants={data} />
        </PageContainer>
      </DashboardLayout>
    );
  }

  if (session?.user.role === "partner") {
    return (
      <DashboardLayout hideNavigation>
        <PageContainer
          breadcrumbs={[{ title: "Merchants", path: "/merchants" }]}
        >
          <PartnerMerchantList />
        </PageContainer>
      </DashboardLayout>
    );
  }

  return null;
}

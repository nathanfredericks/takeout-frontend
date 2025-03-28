import { api } from "@/api/client";
import ConsumerMerchant from "@/app/components/consumer/Merchant";
import { CartProvider } from "@/contexts/CartContext";
import { DashboardLayout, PageContainer } from "@toolpad/core";
import { auth } from "@/auth";
import PartnerMerchant from "@/app/components/partner/merchants/Merchant";

export default async function MerchantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;

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

  if (merchantError || !merchant) {
    return null;
  }

  if (session?.user.role === "consumer") {
    const { data: items, error: itemsError } = await api.GET(
      "/api/merchants/{merchant_id}/items",
      {
        params: {
          path: {
            merchant_id: parseInt(id),
          },
        },
      },
    );

    if (itemsError || !items) {
      return null;
    }

    return (
      <DashboardLayout>
        <CartProvider>
          <ConsumerMerchant merchant={merchant} items={items} />
        </CartProvider>
      </DashboardLayout>
    );
  }

  if (session?.user.role === "partner") {
    return (
      <>
        <DashboardLayout hideNavigation>
          <PageContainer
            title={merchant.name}
            breadcrumbs={[
              { title: "Merchants", path: "/merchants" },
              {
                title: merchant.name,
                path: `/merchants/${id}`,
              },
            ]}
          >
            <PartnerMerchant />
          </PageContainer>
        </DashboardLayout>
      </>
    );
  }

  return null;
}

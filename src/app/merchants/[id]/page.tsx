import { api } from "@/api/client";
import ConsumerMerchant from "@/app/components/consumer/Merchant";
import { CartProvider } from "@/app/components/consumer/contexts/CartContext";
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

  if (session?.user.role === "consumer") {
    return (
      <DashboardLayout>
        <CartProvider>
          <ConsumerMerchant merchant={merchant} items={items} />
        </CartProvider>
      </DashboardLayout>
    );
  }

  if (session?.user.role === "partner") {
    const { data: orders, error: ordersError } = await api.GET(
      "/api/merchants/{merchant_id}/orders",
      {
        params: {
          path: {
            merchant_id: parseInt(id),
          },
        },
      },
    );

    if (ordersError || !orders) {
      return null;
    }

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
            <PartnerMerchant
              merchant={merchant}
              items={items}
              orders={orders}
            />
          </PageContainer>
        </DashboardLayout>
      </>
    );
  }

  return null;
}

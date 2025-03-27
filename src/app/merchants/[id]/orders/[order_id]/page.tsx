import { auth } from "@/auth";
// import Order from "../../../../components/partner/orders/Order";
import { DashboardLayout, PageContainer } from "@toolpad/core";
import { api } from "@/api/client";
import Order from "@/app/components/partner/orders/Order";

export default async function NewItem({
  params,
}: {
  params: Promise<{
    id: string;
    order_id: string;
  }>;
}) {
  const session = await auth();
  const { id, order_id } = await params;

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

  const { data: order, error: orderError } = await api.GET(
    "/api/merchants/{merchant_id}/orders/{order_id}",
    {
      params: {
        path: {
          merchant_id: parseInt(id),
          order_id: parseInt(order_id),
        },
      },
    },
  );

  if (merchantError || orderError || !merchant || !order) {
    return null;
  }

  return (
    <DashboardLayout>
      <PageContainer
        title={order.merchant_name + " #" + order_id}
        breadcrumbs={[
          { title: "Merchants", path: "/merchants" },
          {
            title: merchant.name,
            path: "/merchants/" + id,
          },
          {
            title: order.merchant_name + " #" + order_id,
            path: "/merchants/" + id + "/orders/" + order_id,
          },
        ]}
      >
        <Order order={order} />
      </PageContainer>
    </DashboardLayout>
  );
}

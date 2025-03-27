import { api } from "@/api/client";
import ConsumerOrder from "@/app/components/consumer/Order";
import CourierOrder from "@/app/components/courier/Order";
import { DashboardLayout, PageContainer } from "@toolpad/core";
import { auth } from "@/auth";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;

  if (session?.user.role !== "consumer" && session?.user.role !== "courier") {
    return null;
  }

  const { data, error } = await api.GET(`/api/orders/{order_id}`, {
    params: {
      path: {
        order_id: parseInt(id),
      },
    },
  });

  if (error || !data) {
    return null;
  }

  const Order = session?.user.role === "courier" ? CourierOrder : ConsumerOrder;

  return (
    <DashboardLayout>
      <PageContainer
        title={`${data.merchant_name} #${data.id}`}
        breadcrumbs={[
          { title: "Orders", path: "/orders" },
          {
            title: `${data.merchant_name} #${data.id}`,
            path: `/orders/${data.id}`,
          },
        ]}
      >
        <Order order={data} />
      </PageContainer>
    </DashboardLayout>
  );
}

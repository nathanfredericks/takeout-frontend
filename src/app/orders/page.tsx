import { api } from "@/api/client";
import { DashboardLayout, PageContainer } from "@toolpad/core";
import { auth } from "@/auth";
import ConsumerOrderList from "@/app/components/consumer/OrderList";
import CourierOrderList from "@/app/components/courier/OrderList";

export default async function OrdersPage() {
  const session = await auth();

  if (session?.user.role === "consumer" || session?.user.role === "courier") {
    const { data, error } = await api.GET("/api/orders");

    if (error || !data) {
      return null;
    }

    const sortedOrders = data.sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

    return (
      <DashboardLayout>
        <PageContainer breadcrumbs={[{ title: "Orders", path: "/orders" }]}>
          {session?.user.role === "courier" ? (
            <CourierOrderList orders={sortedOrders} />
          ) : (
            <ConsumerOrderList orders={sortedOrders} />
          )}
        </PageContainer>
      </DashboardLayout>
    );
  }

  return null;
}

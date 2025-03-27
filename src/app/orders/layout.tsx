import OrdersCRUDProvider from "../components/partner/providers/OrdersCRUDProvider";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OrdersCRUDProvider>{children}</OrdersCRUDProvider>;
}

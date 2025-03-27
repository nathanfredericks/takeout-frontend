import OrdersCRUDProvider from "@/app/components/partner/providers/OrdersCRUDProvider";

export default function MerchantOrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OrdersCRUDProvider>{children}</OrdersCRUDProvider>;
}

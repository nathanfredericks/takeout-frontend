import MerchantsCRUDProvider from "@/app/components/partner/providers/MerchantsCRUDProvider";

export default function MerchantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MerchantsCRUDProvider>{children}</MerchantsCRUDProvider>;
}

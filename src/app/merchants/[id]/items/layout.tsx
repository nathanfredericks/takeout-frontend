import ItemsCRUDProvider from "../../../components/partner/providers/ItemsCRUDProvider";

export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ItemsCRUDProvider>{children}</ItemsCRUDProvider>;
}

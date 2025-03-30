"use client";

import { ReactNode } from "react";
import CrudProvider from "../../crud/providers/CrudProvider";
import OrderStatusChip from "../../OrderStatusChip";

export default function OrdersCRUDProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CrudProvider
      fields={[
        { field: "id", headerName: "ID" },
        {
          field: "status",
          headerName: "Status",
          renderCell: (params) => {
            return <OrderStatusChip status={params.value} />;
          },
          minWidth: 150,
        },
        {
          field: "order_instructions",
          headerName: "Order Instructions",
          flex: 1,
        },
        {
          field: "delivery_address",
          headerName: "Delivery Address",
          flex: 1,
        },
        {
          field: "created_at",
          headerName: "Created At",
          type: "dateTime",
          valueGetter: (created_at) => new Date(created_at),
          flex: 1,
        },
        {
          field: "delivered_at",
          headerName: "Delivered At",
          type: "dateTime",
          valueGetter: (delivered_at) =>
            delivered_at ? new Date(delivered_at) : null,
          flex: 1,
        },
      ]}
    >
      {children}
    </CrudProvider>
  );
}

// export default function OrdersCRUDProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { data: session } = useSession();
//   const params = useParams<{ id: string; order_id?: string }>();

//   const [ordersDataSource, setOrdersDataSource] = useState<DataSource<
//     components["schemas"]["OrderReadSchema"]
//   > | null>(null);
//   const [ordersDataSourceCache, setOrdersDataSourceCache] =
//     useState<DataSourceCache | null>(null);

//   useEffect(() => {
//     const dataSource = createOrdersDataSource(session, params.id);
//     const dataSourceCache = new DataSourceCache();

//     setOrdersDataSource(dataSource);
//     setOrdersDataSourceCache(dataSourceCache);
//   }, [session, params.id]);

//   if (!ordersDataSource || !ordersDataSourceCache) {
//     return null;
//   }

//   return (
//     <CrudProvider
//       dataSource={ordersDataSource}
//       dataSourceCache={ordersDataSourceCache}
//     >
//       {children}
//     </CrudProvider>
//   );
// }

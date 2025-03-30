"use client";

import { ReactNode } from "react";
import { components } from "@/api/schema";
import CrudProvider from "../../crud/providers/CrudProvider";

export default function MerchantsCRUDProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CrudProvider
      fields={[
        { field: "name", headerName: "Name", flex: 1 },
        { field: "description", headerName: "Description", flex: 1 },
        { field: "location", headerName: "Location", flex: 1 },
      ]}
    >
      {children}
    </CrudProvider>
  );
}

// export default function MerchantsCRUDProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { data: session } = useSession();

//   const [merchantsDataSource, setMerchantsDataSource] =
//     useState<DataSource<Merchant> | null>(null);
//   const [merchantsDataSourceCache, setMerchantsDataSourceCache] =
//     useState<DataSourceCache | null>(null);

//   useEffect(() => {
//     const dataSource = createMerchantsDataSource(session);
//     const dataSourceCache = new DataSourceCache();

//     setMerchantsDataSource(dataSource);
//     setMerchantsDataSourceCache(dataSourceCache);
//   }, [session]);

//   if (!merchantsDataSource || !merchantsDataSourceCache) {
//     return null;
//   }

//   return (
//     <LocalizationProvider
//       localeText={{
//         createSuccessMessage: "Merchant created successfully",
//         createErrorMessage: "Failed to create merchant",
//         editSuccessMessage: "Merchant edited successfully",
//         editErrorMessage: "Failed to edit merchant",
//         deleteConfirmTitle: "Delete merchant?",
//         deleteConfirmMessage: "Are you sure you want to delete this merchant?",
//         deleteSuccessMessage: "Merchant deleted successfully",
//         deleteErrorMessage: "Failed to delete merchant",
//         deletedItemMessage: "Merchant deleted",
//       }}
//     >
//       <CrudProvider
//         dataSource={merchantsDataSource}
//         dataSourceCache={merchantsDataSourceCache}
//       >
//         {children}
//       </CrudProvider>
//     </LocalizationProvider>
//   );
// }

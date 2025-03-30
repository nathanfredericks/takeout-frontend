"use client";
import { useParams, useRouter } from "next/navigation";
import { Edit } from "../../crud/Edit";
import { components } from "@/api/schema";

interface EditMerchantProps {
  merchant: components["schemas"]["MerchantReadSchema"];
}

export default function EditMerchant(props: EditMerchantProps) {
  const { merchant } = props;

  return <Edit data={merchant} onSubmit={() => alert("Edit")} />;
}

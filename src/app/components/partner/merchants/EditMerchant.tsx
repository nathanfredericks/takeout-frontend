"use client";
import { Edit } from "@toolpad/core";
import { useParams, useRouter } from "next/navigation";

export default function EditMerchant() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  return (
    <Edit id={params.id} onSubmitSuccess={() => router.push("/merchants")} />
  );
}

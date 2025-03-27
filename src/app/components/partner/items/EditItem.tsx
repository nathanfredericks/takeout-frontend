"use client";
import { Edit } from "@toolpad/core";
import { useParams, useRouter } from "next/navigation";

export default function EditItem() {
  const router = useRouter();
  const params = useParams<{ id: string; item_id: string }>();

  return (
    <Edit
      id={params.item_id}
      onSubmitSuccess={() => router.push("/merchants/" + params.id)}
    />
  );
}

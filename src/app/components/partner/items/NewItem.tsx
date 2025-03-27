"use client";
import { Create } from "@toolpad/core";
import { useParams, useRouter } from "next/navigation";

export default function NewItem() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  return (
    <Create
      onSubmitSuccess={() => router.push("/merchants/" + params.id)}
      resetOnSubmit
    />
  );
}

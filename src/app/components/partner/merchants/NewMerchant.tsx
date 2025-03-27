"use client";
import { Create } from "@toolpad/core";
import { useRouter } from "next/navigation";

export default function NewMerchant() {
  const router = useRouter();

  return (
    <Create onSubmitSuccess={() => router.push("/merchants")} resetOnSubmit />
  );
}

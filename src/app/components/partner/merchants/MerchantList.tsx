"use client";
import { List } from "@toolpad/core";
import { useRouter } from "next/navigation";

export default function MerchantList() {
  const router = useRouter();

  return (
    <List
      onRowClick={(id) => router.push(`/merchants/${id}`)}
      onCreateClick={() => router.push(`/merchants/new`)}
      onEditClick={(id) => router.push(`/merchants/${id}/edit`)}
    />
  );
}

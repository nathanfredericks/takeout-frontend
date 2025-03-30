"use client";
import { Create } from "../../crud/Create";

export default function NewMerchant() {
  return <Create onSubmit={() => alert("Create")} />;
}

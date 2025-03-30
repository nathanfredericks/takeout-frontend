import { redirect } from "next/navigation";
import { auth } from "@/auth";
import RegisterForm from "./RegisterForm";

export default async function RegisterPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return <RegisterForm />;
}

import { redirect } from "next/navigation";
// import Profile from "./profile";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  if (session?.user.role !== "courier") {
    redirect("/merchants");
  } else {
    redirect("/orders");
  }

  // return <Profile />
}

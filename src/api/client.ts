import createFetch, { Middleware } from "openapi-fetch";
import type { paths } from "./schema";
import { auth, signOut } from "@/auth";

const serverAuthMiddleware: Middleware = {
  async onRequest({ request }) {
    const session = await auth();
    if (session) {
      request.headers.set(
        "Authorization",
        `Bearer ${session?.user.accessToken}`,
      );
    }
    return request;
  },
  async onResponse({ response }) {
    if (response.status === 401) {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: await fetch('/api/auth/csrf').then(rs => rs.text())
      })
    }
  },
};

export const api = createFetch<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  credentials: "include" as RequestCredentials,
});
api.use(serverAuthMiddleware);

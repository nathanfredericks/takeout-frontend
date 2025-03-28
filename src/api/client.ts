import createFetch, { Middleware } from "openapi-fetch";
import type { paths } from "./schema";
import { auth } from "@/auth";
import { Session } from "next-auth";

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
};

const createClientAuthMiddleware = (session: Session | null): Middleware => ({
  async onRequest({ request }) {
    if (session?.user) {
      request.headers.set(
        "Authorization",
        `Bearer ${session.user.accessToken}`,
      );
    }
    return request;
  },
  async onResponse({ response }) {
    if (response.status === 401) {
      if (typeof window !== "undefined") {
        const currentUrl = encodeURIComponent(
          window.location.pathname + window.location.search,
        );
        window.location.href = `/login?expired=true&callbackUrl=${currentUrl}`;
      }
    }
    return response;
  },
});

const config = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  credentials: "include" as RequestCredentials,
};

export const api = createFetch<paths>(config);
api.use(serverAuthMiddleware);

export const createClientApi = (session: Session | null) => {
  const clientApi = createFetch<paths>(config);
  clientApi.use(createClientAuthMiddleware(session));
  return clientApi;
};

import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import { components } from "./api/schema";
import { api } from "./api/client";

declare module "next-auth" {
  interface Session {
    user: {
      role: components["schemas"]["UserRole"];
      accessToken: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: components["schemas"]["UserRole"];
    accessToken: string;
  }
}

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { type: "email" },
      password: {},
    },
    authorize: async ({ email, password }) => {
      if (!email || !password) {
        return null;
      }

      const { data, error } = await api.POST("/api/login", {
        body: {
          email: email as string,
          password: password as string,
        },
      });

      if (error || !data) {
        return null;
      }

      const { data: userData, error: userError } = await api.GET("/api/me", {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      if (userError || !userData) {
        return null;
      }

      return {
        id: String(userData.id),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        accessToken: data.access_token,
      };
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  }
  return { id: provider.id, name: provider.name };
});

export const options = NextAuth({
  providers,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as components["schemas"]["UserRole"];
        session.user.accessToken = token.accessToken as string;
      }

      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
  },
  session: {
    maxAge: 30 * 60,
  },
  trustHost: true,
});

export const { handlers, auth, signIn, signOut } = options;

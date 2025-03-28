import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    const isProtectedRoute = !request.nextUrl.pathname.match(
      /^\/api|^\/login|^\/register|^\/_next/,
    );
    if (isProtectedRoute) {
      const callbackUrl = encodeURIComponent(
        request.nextUrl.pathname + request.nextUrl.search,
      );
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${callbackUrl}`, request.url),
      );
    }
  }
  if (session?.user) {
    const token =
      request.cookies.get("next-auth.session-token")?.value ||
      request.cookies.get("__Secure-next-auth.session-token")?.value;

    if (token) {
      try {
        const authTimestamp = request.cookies.get("last-logged-in")?.value;

        if (authTimestamp) {
          const loginTime = parseInt(authTimestamp, 10);
          const currentTime = Date.now();

          if (currentTime - loginTime > 30 * 60 * 1000) {
            const callbackUrl = encodeURIComponent(
              request.nextUrl.pathname + request.nextUrl.search,
            );
            return NextResponse.redirect(
              new URL(`/login?callbackUrl=${callbackUrl}`, request.url),
            );
          }
        } else {
          const response = NextResponse.next();
          response.cookies.set("last-logged-in", Date.now().toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
          });
          return response;
        }
      } catch (error) {
        console.error("Error checking session expiration:", error);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

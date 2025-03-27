import theme from "@/app/theme";
import { LinearProgress } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Navigation } from "@toolpad/core";
import { NextAppProvider } from "@toolpad/core/nextjs";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import React, { Suspense } from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StorefrontIcon from "@mui/icons-material/Storefront";
// import PersonIcon from "@mui/icons-material/Person";
import { SessionProvider, signIn, signOut } from "next-auth/react";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Takeout",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const BRANDING = {
  title: "Takeout",
  logo: "",
};

const AUTHENTICATION = {
  signIn,
  signOut,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const getNavigation = (): Navigation => {
    switch (session?.user.role) {
      case "consumer":
        return [
          // { segment: "", title: "Profile", icon: <PersonIcon /> },
          {
            segment: "merchants",
            title: "Merchants",
            icon: <StorefrontIcon />,
          },
          { segment: "orders", title: "Orders", icon: <ReceiptIcon /> },
        ];
      case "partner":
        return [
          // { segment: "", title: "Profile", icon: <PersonIcon /> },
          {
            segment: "merchants",
            title: "Merchants",
            icon: <StorefrontIcon />,
          },
        ];
      case "courier":
        return [
          // { segment: "", title: "Profile", icon: <PersonIcon /> },
          { segment: "orders", title: "Orders", icon: <ReceiptIcon /> },
        ];
      default:
        return [];
    }
  };

  return (
    <html data-toolpad-color-scheme="light" lang="en">
      <body className={roboto.className}>
        <SessionProvider session={session}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <Suspense fallback={<LinearProgress />}>
              <NextAppProvider
                theme={theme}
                branding={BRANDING}
                navigation={getNavigation()}
                session={session}
                authentication={AUTHENTICATION}
              >
                {children}
              </NextAppProvider>
            </Suspense>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

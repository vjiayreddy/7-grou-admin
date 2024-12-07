import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxStateProviders } from "@/redux/provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import MuiThemeProvider from "@/theme/provider/ThemeProvider";
import NextAuthSessionProvider from "./api/auth/[...nextauth]/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "No 7 Groups",
  description: "Matka King",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxStateProviders>
          <AppRouterCacheProvider>
            <MuiThemeProvider>
              <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
            </MuiThemeProvider>
          </AppRouterCacheProvider>
        </ReduxStateProviders>
      </body>
    </html>
  );
}

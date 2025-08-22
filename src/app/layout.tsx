import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NoSSR } from '@/components/theme/NoSSR'
import { FloatingThemeToggle } from '@/components/theme/ThemeToggle'
import { ThemeProvider } from "@/providers/theme.provider";
import { SessionProvider } from "@/providers/auth/SessionProvider";
import { QueryProvider } from "@/providers/query.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your App",
  description: "Your App Description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <SessionProvider>
          <QueryProvider>
            <ThemeProvider>
              {children}
              <NoSSR>
                <FloatingThemeToggle />
              </NoSSR>
            </ThemeProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
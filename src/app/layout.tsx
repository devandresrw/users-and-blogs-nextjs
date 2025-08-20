import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme.provider";
import { SessionProvider } from "@/providers/auth/SessionProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Tu App",
 description: "Descripción de tu app",
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <html lang="es" suppressHydrationWarning>
   <body className={inter.className} suppressHydrationWarning>
    <SessionProvider>
     <ThemeProvider>
      {children}

     </ThemeProvider>
    </SessionProvider>
   </body>
  </html>
 );
}
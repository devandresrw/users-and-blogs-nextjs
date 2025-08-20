"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface ThemeProviderProps {
 children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
 return (
  <NextThemesProvider
   attribute="class"
   defaultTheme="system"
   enableSystem={false} // Cambiar a false para evitar hidratación
   disableTransitionOnChange={true}
   storageKey="theme"
  >
   {children}
  </NextThemesProvider>
 );
}
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
   defaultTheme="light" // ✅ Usar un tema fijo por defecto
   enableSystem={false}
   disableTransitionOnChange={false} // ✅ Permitir transiciones después de hidratación
   storageKey="theme"
  >
   {children}
  </NextThemesProvider>
 );
}
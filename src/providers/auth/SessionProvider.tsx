// filepath: src/providers/auth/SessionProvider.tsx
"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface SessionProviderProps {
 children: React.ReactNode;
 session?: Session | null;
}

export function SessionProvider({ children, session }: SessionProviderProps) {
 return (
  <NextAuthSessionProvider session={session}>
   {children}
  </NextAuthSessionProvider>
 );
}
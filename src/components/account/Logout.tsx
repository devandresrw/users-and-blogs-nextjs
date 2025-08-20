'use client'
import { signOut } from "next-auth/react";

export const SignOutButton = () => {
 return (
  <button
   onClick={() => signOut()}
   className="px-4 py-2 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors rounded-md border border-border hover:bg-accent"
  >
   Cerrar sesión
  </button>
 );
}
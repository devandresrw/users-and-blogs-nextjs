"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function FloatingThemeToggle() {
 const { theme, setTheme } = useTheme();
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
  setMounted(true);
 }, []);

 // No renderizar nada hasta que esté montado
 if (!mounted) {
  return (
   <div className="fixed bottom-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg">
    <div className="w-6 h-6" />
   </div>
  );
 }

 return (
  <button
   onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
   className="fixed bottom-4 right-4 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all z-50"
   aria-label="Toggle theme"
  >
   {theme === 'dark' ? '🌞' : '🌙'}
  </button>
 );
}
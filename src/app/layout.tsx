import './globals.css'
import { ThemeProvider } from '@/providers/theme.provider'
import { FloatingThemeToggle } from '@/components/theme/ThemeToggle'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
 children,
}: {
 children: React.ReactNode
}) {
 return (
  <html lang="es" suppressHydrationWarning>
   <body className={inter.className}>
    <ThemeProvider
     attribute="class"
     defaultTheme="system"
     enableSystem
     disableTransitionOnChange
    >

     {children}
     <FloatingThemeToggle />
    </ThemeProvider>
   </body>
  </html>
 )
}
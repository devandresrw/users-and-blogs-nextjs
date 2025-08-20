import './globals.css'
import { ThemeProvider } from '@/providers/theme.provider'
import { SessionProvider } from '@/providers/auth/SessionProvider'
import { FloatingThemeToggle } from '@/components/theme/ThemeToggle'
import { Inter } from 'next/font/google'
import { auth } from '@/auth'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
 children,
}: {
 children: React.ReactNode
}) {
 const session = await auth()

 return (
  <html lang="es" suppressHydrationWarning>
   <body className={inter.className}>
    <SessionProvider session={session}>
     <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
     >
      {children}
      <FloatingThemeToggle />
     </ThemeProvider>
    </SessionProvider>
   </body>
  </html>
 )
}
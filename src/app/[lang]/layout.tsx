export async function generateStaticParams() {
  return [{ lang: 'en-US' }, { lang: 'es' }]
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: 'en-US' | 'es' }>
}>) {
  return (
    <html lang={(await params).lang}>
      <body>{children}</body>
    </html>
  )
}
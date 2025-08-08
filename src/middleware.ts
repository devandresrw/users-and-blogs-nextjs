import { NextResponse } from "next/server";
import { auth } from "@/auth";
import type { NextRequest } from "next/server";
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['en', 'es']
const defaultLocale = 'es'

function getLocale(request: Request) {
 const negotiatorHeaders: Record<string, string> = {}
 request.headers.forEach((value, key) => {
  negotiatorHeaders[key] = value
 })
 const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
 return match(languages, locales, defaultLocale)
}

export async function middleware(request: NextRequest) {
 const { pathname } = request.nextUrl

 const pathnameHasLocale = locales.some(
  (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
 )

 let currentLocale = defaultLocale
 let pathWithoutLocale = pathname

 if (pathnameHasLocale) {
  const localeMatch = pathname.match(/^\/([^\/]+)/)
  if (localeMatch && locales.includes(localeMatch[1])) {
   currentLocale = localeMatch[1]
   pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/'
  }
 } else {
  const detectedLocale = getLocale(request)
  request.nextUrl.pathname = `/${detectedLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
 }

 const session = await auth()

 const protectedRoutes = ['/admin-panel', '/account']
 const loginRoute = '/in'

 if (pathWithoutLocale.startsWith(loginRoute) && session?.user) {
  return NextResponse.redirect(new URL(`/${currentLocale}/account`, request.url))
 }

 if (!session?.user) {
  if (protectedRoutes.some(route => pathWithoutLocale.startsWith(route))) {
   return NextResponse.redirect(new URL(`/${currentLocale}${loginRoute}`, request.url))
  }
  return NextResponse.next()
 }

 // Usar solo el rol del token/session, no consultar la API ni la base de datos
 const userRole = session.user.role

 if (pathWithoutLocale.startsWith('/admin-panel') && userRole !== "ADMINISTRADOR") {
  return NextResponse.redirect(new URL(`/${currentLocale}/account`, request.url))
 }

 return NextResponse.next()
}

export const config = {
 matcher: [
  '/((?!_next|api|static|favicon.ico).*)',
 ]
}
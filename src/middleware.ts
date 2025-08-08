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

 // Extraer el locale del pathname si existe
 const pathnameHasLocale = locales.some(
  (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
 )

 let currentLocale = defaultLocale
 let pathWithoutLocale = pathname

 if (pathnameHasLocale) {
  // Extraer el locale actual del pathname
  const localeMatch = pathname.match(/^\/([^\/]+)/)
  if (localeMatch && locales.includes(localeMatch[1])) {
   currentLocale = localeMatch[1]
   pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/'
  }
 } else {
  // Si no hay locale, detectarlo y redirigir
  const detectedLocale = getLocale(request)
  request.nextUrl.pathname = `/${detectedLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
 }

 // Verificar autenticación - SOLO auth() sin servicios adicionales
 const session = await auth()

 // Rutas que requieren autenticación (sin locale)
 const protectedRoutes = ['/admin-panel', '/account']
 const loginRoute = '/in'

 // Si el usuario está autenticado y trata de ir a /in, redirige a /account
 if (pathWithoutLocale.startsWith(loginRoute) && session?.user) {
  return NextResponse.redirect(new URL(`/${currentLocale}/account`, request.url))
 }

 // Si no hay sesión, protege /admin-panel y /account
 if (!session?.user) {
  if (protectedRoutes.some(route => pathWithoutLocale.startsWith(route))) {
   return NextResponse.redirect(new URL(`/${currentLocale}${loginRoute}`, request.url))
  }
  return NextResponse.next()
 }

 // Protege /admin-panel solo para administrador
 if (pathWithoutLocale.startsWith('/admin-panel') && session.user.role !== "ADMINISTRADOR") {
  return NextResponse.redirect(new URL(`/${currentLocale}/account`, request.url))
 }

 // Permite el acceso a otras rutas
 return NextResponse.next()
}

export const config = {
 matcher: [
  '/((?!_next|api|static|favicon.ico).*)',
 ],
 runtime: 'nodejs',
}
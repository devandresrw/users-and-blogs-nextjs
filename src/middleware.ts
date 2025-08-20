import { NextResponse } from "next/server";
import { auth } from "@/auth";
import type { NextRequest } from "next/server";
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['en', 'es']
const defaultLocale = 'es'

// Definir permisos por ruta
const ROUTE_PERMISSIONS = {
 '/admin-panel': ['COLABORADOR', 'ADMINISTRADOR', 'ROOT'],
 '/admin-panel/users': ['ADMINISTRADOR', 'ROOT'],
 '/admin-panel/system': ['ROOT'],
 '/account': ['USER', 'LECTOR', 'COLABORADOR', 'ADMINISTRADOR', 'ROOT'],
} as const

function getLocale(request: Request) {
 const negotiatorHeaders: Record<string, string> = {}
 request.headers.forEach((value, key) => {
  negotiatorHeaders[key] = value
 })
 const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
 return match(languages, locales, defaultLocale)
}

function hasPermissionForRoute(userRole: string, path: string): boolean {
 // Buscar la ruta más específica que coincida
 const matchingRoute = Object.keys(ROUTE_PERMISSIONS)
  .sort((a, b) => b.length - a.length) // Ordenar por longitud descendente
  .find(route => path.startsWith(route))

 if (!matchingRoute) return true // Si no hay restricciones, permitir acceso

 const allowedRoles = ROUTE_PERMISSIONS[matchingRoute as keyof typeof ROUTE_PERMISSIONS]
 return allowedRoles.includes(userRole as any)
}

export async function middleware(request: NextRequest) {
 const { pathname } = request.nextUrl

 // Excluir completamente todas las rutas de API de NextAuth y otras APIs
 if (pathname.startsWith('/api/')) {
  return NextResponse.next()
 }

 // Excluir archivos estáticos y recursos del sistema
 if (
  pathname.startsWith('/_next/') ||
  pathname.startsWith('/favicon.ico') ||
  pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|css|js)$/)
 ) {
  return NextResponse.next()
 }

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

 // Obtener la sesión con manejo de errores
 let session;
 try {
  session = await auth()
 } catch (error) {
  console.error('Error getting session in middleware:', error)
  // Si hay error obteniendo la sesión, permitir continuar sin autenticación
  session = null
 }

 const protectedRoutes = ['/admin-panel', '/account']
 const loginRoute = '/in'

 // Redirigir usuarios autenticados que intentan acceder al login
 if (pathWithoutLocale.startsWith(loginRoute) && session?.user) {
  return NextResponse.redirect(new URL(`/${currentLocale}/account`, request.url))
 }

 // Verificar autenticación para rutas protegidas
 if (!session?.user) {
  if (protectedRoutes.some(route => pathWithoutLocale.startsWith(route))) {
   return NextResponse.redirect(new URL(`/${currentLocale}${loginRoute}`, request.url))
  }
  return NextResponse.next()
 }

 // Verificar permisos basados en roles
 const userRole = session.user.role || 'USER'

 if (!hasPermissionForRoute(userRole, pathWithoutLocale)) {
  console.log(`Access denied for user ${session.user.email} with role ${userRole} to ${pathWithoutLocale}`)
  return NextResponse.redirect(new URL(`/${currentLocale}/account`, request.url))
 }

 return NextResponse.next()
}

export const config = {
 matcher: [
  /*
   * Match all request paths except for the ones starting with:
   * - api (all API routes including NextAuth)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * - static assets
   */
  '/((?!api|_next/static|_next/image|favicon.ico).*)',
  '/((?!.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
 ]
}
import { NextResponse } from "next/server";
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['en-US', 'es-ES']
const defaultLocale = 'es-ES'

function getLocale(request: Request) {
 const negotiatorHeaders: Record<string, string> = {}
 request.headers.forEach((value, key) => {
  negotiatorHeaders[key] = value
 })
 const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
 return match(languages, locales, defaultLocale)
}

export function middleware(request: any) {
 const { pathname } = request.nextUrl
 const pathnameHasLocale = locales.some(
  (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
 )

 if (pathnameHasLocale) return

 const locale = getLocale(request)
 request.nextUrl.pathname = `/${locale}${pathname}`
 return NextResponse.redirect(request.nextUrl)
}

export const config = {
 matcher: [
  '/((?!_next).*)',
 ],
}
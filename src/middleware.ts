import isAuthenticated from '@/auth/authenticated';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './i18n.config';

const unauthorizedRoutes = ['/auth/sign-in', '/auth/register', '/auth/forgot-password', '/auth/reset-password'];

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const cookie = request.cookies.get('lang');

  // @ts-expect-error locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (matchLocale(cookie?.value, locales, i18n.defaultLocale) === cookie?.value) {
    return cookie?.value;
  }
  return matchLocale(languages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameParts = pathname.split('/');
  const pathnameHasLocale = i18n.locales.includes(pathnameParts[1] as 'en' | 'es');

  let locale = getLocale(request);

  if (!pathnameHasLocale) {
    // Redirect if there is no locale
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  } else {
    // Extract the locale from the pathname
    locale = pathnameParts[1];
  }

  const isUnauthorizedRoute = unauthorizedRoutes.some((route) => pathname.startsWith(`/${locale}${route}`));
  const isAuthLoginPage = pathname === `/${locale}/auth/sign-in`;

  if (!isAuthenticated() && !isUnauthorizedRoute && !isAuthLoginPage) {
    return NextResponse.redirect(new URL(`/${locale}/auth/sign-in`, request.url));
  }

  if (isAuthenticated() && isUnauthorizedRoute) {
    return NextResponse.redirect(new URL(`/${locale}/`, request.url));
  }

  // For authorized routes, continue without redirecting
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

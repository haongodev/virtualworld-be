import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { DefaultLanguage, LanguagesSupport } from './constant';

// const matchAuthUri = [
//   "account",
//   "checkout",
//   "orders",
// ];

export default async function middleware(request) {
  // Step 1: Use the incoming request
  const defaultLocale = request.headers.get('x-default-locale') || DefaultLanguage;
  // Step 2: Create and call the next-intl middleware
  const handleI18nRouting = createIntlMiddleware({
    locales: LanguagesSupport,
    defaultLocale:'',
    localeDetection: false,
  });
  const response = handleI18nRouting(request);
  // Step 3: Alter the response
  response.headers.set('x-default-locale', defaultLocale);
  return response;
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!api|_next|management|.*\\..*).*)']
};
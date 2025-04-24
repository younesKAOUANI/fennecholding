import createMiddleware from 'next-intl/middleware';
import { i18n } from './i18n';

export default createMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false, // Disable automatic detection to prevent redirect loops
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'], // Exclude API routes and static files
};
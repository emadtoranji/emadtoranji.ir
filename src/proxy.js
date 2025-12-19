import { NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import crypto from 'crypto';
import { fallbackLng, languages, cookieName, headerName } from '@i18n/settings';

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    // All routes enter middleware EXCEPT these listed paths and files
    // These paths are loaded directly and do NOT go through proxy
    '/((?!_next/static|_next/image|assets|styles|images|fonts|manifest.json|sitemap.xml|robots.txt|favicon.ico|sw.js).*)',
  ],
};

export async function proxy(req) {
  const path = req.nextUrl.pathname;

  // skip icons, chrome resources
  if (path.includes('icon') || path.includes('chrome'))
    return NextResponse.next();

  if (path === '/') return NextResponse.next();

  let lng;
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName).value);
  }
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lng) lng = fallbackLng;

  const segments = path.split('/').filter(Boolean);

  const firstSegment = segments[0];

  if (!languages.includes(firstSegment)) {
    const newPath = `/${fallbackLng}`;
    return NextResponse.redirect(new URL(newPath, req.url), { status: 301 });
  }

  const headers = new Headers(req.headers);
  headers.set(headerName, firstSegment);

  const nonce = crypto.randomBytes(16).toString('base64');
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' http://*.google.com https://*.google.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' http://*.w3.org https://*.w3.org data:",
    "connect-src 'self' http://*.google.com https://*.google.com data:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    'frame-src http://*.google.com https://*.google.com data:',
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; ');

  headers.set('Content-Security-Policy', csp);
  headers.set('x-nonce', nonce);

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer'));
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next({ headers });
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next({ headers });
}

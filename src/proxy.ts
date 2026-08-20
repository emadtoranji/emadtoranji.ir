import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import crypto from 'crypto';
import { fallbackLng, languages, cookieName, headerName } from '@i18n/settings';

export const runtime = 'edge'; // For Using Cloudflare Workers

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    // All routes enter middleware EXCEPT these listed paths and files
    // These paths are loaded directly and do NOT go through proxy
    '/((?!_next/static|_next/image|assets|styles|images|fonts|manifest.json|sitemap.xml|robots.txt|llms.txt|favicon.ico|sw.js).*)',
  ],
};

export async function proxy(req: NextRequest): Promise<NextResponse> {
  const path = req.nextUrl.pathname;

  // skip icons, chrome resources
  if (path.includes('icon') || path.includes('chrome')) return NextResponse.next();

  if (path === '/') return NextResponse.next();

  let lng: string | null = null;
  if (req.cookies.has(cookieName)) {
    const cookieVal = req.cookies.get(cookieName)?.value;
    if (cookieVal) {
      lng = acceptLanguage.get(cookieVal);
    }
  }
  if (!lng) {
    const acceptHeader = req.headers.get('Accept-Language');
    if (acceptHeader) {
      lng = acceptLanguage.get(acceptHeader);
    }
  }
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
  const isDev = process.env.NODE_ENV === 'development';
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ''}https://*.google.com https://*.gstatic.com https://*.cloudflareinsights.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' http://*.w3.org https://*.w3.org data:",
    "connect-src 'self' https://*.google.com data:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    'frame-src https://*.google.com data:',
    "form-action 'self'",
    ...(isDev ? [] : ['upgrade-insecure-requests']),
  ].join('; ');

  headers.set('Content-Security-Policy', csp);
  headers.set('x-nonce', nonce);

  if (req.headers.has('referer')) {
    const refererHeader = req.headers.get('referer');
    if (refererHeader) {
      try {
        const refererUrl = new URL(refererHeader);
        const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
        const response = NextResponse.next({ headers });
        if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
        return response;
      } catch {
        // invalid referer URL, ignore
      }
    }
  }

  return NextResponse.next({ headers });
}

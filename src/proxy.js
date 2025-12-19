import { NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName, headerName } from '@i18n/settings';

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    // This rule applies the middleware to every route EXCEPT the listed static folders or files
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

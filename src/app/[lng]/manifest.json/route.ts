import { fallbackLng, languages } from '@i18n/settings';
import BaseUrlAddress from '@utils/BaseUrlAddress';
import globalSettings from '@utils/globalSettings';

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const dynamic = 'force-static';

export async function GET(_request: Request, { params }: { params: Promise<{ lng?: string }> }) {
  const { lng } = (await params) || { lng: null };
  const currentLang = lng && languages.includes(lng) ? lng : fallbackLng;

  const commonData = await import(`@i18n/locales/${currentLang}/common.json`);
  const metaData = await import(`@i18n/locales/${currentLang}/meta.json`);

  const response = {
    id: `/${currentLang}`,
    name: commonData.general?.siteFullName || globalSettings.site.name,
    short_name: commonData.general?.siteName || globalSettings.site.name,
    description: metaData.general?.description || globalSettings.site.descriptionEn,
    lang: currentLang,
    dir: currentLang === 'fa' ? 'rtl' : 'ltr',
    start_url: `/${currentLang}`,
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0f172a',
    theme_color: '#1e3a8a',
    icons: [
      {
        src: `${BaseUrlAddress}images/icons/16/app-logo.webp`,
        sizes: '16x16',
        type: 'image/webp',
        purpose: 'any',
      },
      {
        src: `${BaseUrlAddress}images/icons/32/app-logo.webp`,
        sizes: '32x32',
        type: 'image/webp',
        purpose: 'any',
      },
      {
        src: `${BaseUrlAddress}images/icons/180/app-logo.webp`,
        sizes: '180x180',
        type: 'image/webp',
        purpose: 'any',
      },
      {
        src: `${BaseUrlAddress}images/icons/1200/app-logo.webp`,
        sizes: '1200x630',
        type: 'image/webp',
        purpose: 'any',
      },
      {
        src: `${BaseUrlAddress}images/app-logo.webp`,
        sizes: '512x512',
        type: 'image/webp',
        purpose: 'any maskable',
      },
    ],
    categories: Array.isArray(metaData.general?.keywords)
      ? metaData.general.keywords.slice(0, 10)
      : ['resume', 'portfolio', 'developer'],
    related_applications: [],
    prefer_related_applications: false,
  };

  return Response.json(response, {
    status: 200,
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}

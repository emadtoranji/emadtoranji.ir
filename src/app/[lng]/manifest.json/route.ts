import { fallbackLng, languages } from '@i18n/settings';
import BaseUrlAddress from '@utils/BaseUrlAddress';
import globalSettings from '@utils/globalSettings';

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const dynamic = 'force-static';

const CLEAR_CACHE_VERSION = '?v=' + globalSettings.clearCacheVersion;

export async function GET(_request: Request, { params }: { params: Promise<{ lng?: string }> }) {
  const { lng } = (await params) || { lng: null };
  const currentLang = lng && languages.includes(lng) ? lng : fallbackLng;

  // Static translations dictionary or dynamic import with high performance
  const commonData = await import(`@i18n/locales/${currentLang}/common.json`);
  const metaData = await import(`@i18n/locales/${currentLang}/meta.json`);

  const response = {
    name: commonData.general?.siteFullName || '',
    short_name: commonData.general?.siteName || '',
    description: metaData.general?.description || '',
    lang: currentLang,
    start_url: '/',
    display: 'standalone',
    scope: '/',
    orientation: 'portrait',
    background_color: '#212529',
    theme_color: '#212529',
    icons: [
      {
        src: BaseUrlAddress + 'images/icons/16/app-logo.webp' + CLEAR_CACHE_VERSION,
        sizes: '16x16',
        type: 'image/webp',
      },
      {
        src: BaseUrlAddress + 'images/icons/32/app-logo.webp' + CLEAR_CACHE_VERSION,
        sizes: '32x32',
        type: 'image/webp',
      },
      {
        src: BaseUrlAddress + 'images/icons/180/app-logo.webp' + CLEAR_CACHE_VERSION,
        sizes: '180x180',
        type: 'image/webp',
      },
      {
        src: BaseUrlAddress + 'images/icons/512/app-logo.webp' + CLEAR_CACHE_VERSION,
        sizes: '512x512',
        type: 'image/webp',
      },
    ],
    categories: Array.isArray(metaData.general?.keywords) ? metaData.general.keywords : [],
    related_applications: [],
    prefer_related_applications: false,
  };

  return Response.json(response, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=2678400, immutable',
    },
  });
}

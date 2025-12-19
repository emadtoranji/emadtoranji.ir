import { getT } from '@i18n/server';
import { languages } from '@i18n/settings';
import BaseUrlAddress from '@utils/BaseUrlAddress';

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const dynamic = 'force-static';

export async function GET(request, { params }) {
  const { lng } = (await params) || { lng: null };
  let CommonT = await getT(lng);
  CommonT = CommonT.t;
  const { t, i18n } = await getT(lng, 'meta');
  const currentLang = i18n?.language || fallbackLng;
  const keywords = t('general.keywords', { returnObjects: true });

  const response = {
    name: CommonT('general.siteFullName', ''),
    short_name: CommonT('general.siteName', ''),
    description: t('general.description', ''),
    lang: currentLang || fallbackLng,
    start_url: '/',
    display: 'standalone',
    scope: '/',
    orientation: 'portrait',
    background_color: '#212529',
    theme_color: '#212529',
    icons: [
      {
        src: BaseUrlAddress + 'images/icons/16/app-logo.webp',
        sizes: '16x16',
        type: 'image/webp',
      },
      {
        src: BaseUrlAddress + 'images/icons/32/app-logo.webp',
        sizes: '32x32',
        type: 'image/webp',
      },
      {
        src: BaseUrlAddress + 'images/icons/180/app-logo.webp',
        sizes: '180x180',
        type: 'image/webp',
      },
      {
        src: BaseUrlAddress + 'images/icons/512/app-logo.webp',
        sizes: '512x512',
        type: 'image/webp',
      },
    ],
    categories: Array.isArray(keywords) ? keywords : [],
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

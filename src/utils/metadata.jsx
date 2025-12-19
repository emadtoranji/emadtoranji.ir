import { getT } from '@i18n/server';
import { fallbackLng, languages } from '@i18n/settings';
import BaseUrlAddress from '@utils/BaseUrlAddress';

const site = {
  name: 'Emad Toranji',
  domain: BaseUrlAddress,
  twitter: '@emadtoranji',
};

const CLEAR_CACHE_VERSION = '?v=' + process.env.NEXT_PUBLIC_CLEAR_CACHE_VERSION;

const buildUrl = (path = '') => `${site.domain}${path}`;

const extractPageName = (params, forcedPage) => {
  if (forcedPage) return forcedPage;
  if (!params) return 'home';

  const values = Object.values(params).filter(Boolean);

  if (values.length === 0) return 'home';
  if (values.length === 1) return 'home';

  return values[1];
};

const imageBySize = (size) => {
  if (!size) return `images/app-logo.webp${CLEAR_CACHE_VERSION}`;
  return `images/icons/${size}/app-logo.webp${CLEAR_CACHE_VERSION}`;
};

const merge = (page = {}, general = {}) => ({
  title: page?.title || general?.title || site?.name || '',
  description: page?.description || general?.description || '',
  keywords: page?.keywords || general?.keywords || [],
  category: page?.category || general?.category || 'General',
});

export async function generateMetadata(
  { params },
  forcedPage = null,
  robotsFollow = true,
  robotsIndex = true
) {
  const { lng } = (await params) || { lng: null };
  const { t, i18n } = await getT(lng, 'meta');
  const currentLang = i18n?.language || fallbackLng;
  let commonT = await getT(currentLang);
  commonT = commonT.t;
  const pageName = extractPageName(params, forcedPage);

  const general = t('general', { returnObjects: true }) || {};
  const page = t(pageName, { returnObjects: true }) || {};

  const meta = merge(page, general);

  const siteName = commonT('general.siteName');
  meta.title = String(meta.title).replace('{{siteName}}', siteName);
  meta.description = String(meta.description).replace('{{siteName}}', siteName);

  const canonical = buildUrl(
    pageName === 'home' ? currentLang : `${currentLang}/${pageName}`
  );

  const image1200 = buildUrl(imageBySize(1200));
  const image512 = buildUrl(imageBySize(512));
  const image180 = buildUrl(imageBySize(180));
  const image32 = buildUrl(imageBySize(32));
  const image16 = buildUrl(imageBySize(16));

  const alternates = {};
  for (const l of languages) {
    alternates[l] = buildUrl(pageName === 'home' ? l : `${l}/${pageName}`);
  }

  return {
    metadataBase: new URL(site.domain),

    title: {
      default: meta.title,
      template: `%s`,
    },

    description: meta.description,
    keywords: meta.keywords,
    category: meta.category,

    themeColor: site.themeColor,
    manifest: `/${currentLang}/manifest.json${CLEAR_CACHE_VERSION}`,

    alternates: {
      canonical,
      languages: alternates,
    },

    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: site.name,
      type: 'website',
      locale: currentLang,
      images: [
        {
          url: image1200,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [image1200],
      site: site.twitter,
    },

    icons: {
      icon: [
        { url: image32, sizes: '32x32' },
        { url: image16, sizes: '16x16' },
      ],
      apple: [{ url: image180, sizes: '180x180' }],
    },

    robots: {
      index: robotsIndex,
      follow: robotsFollow,
    },

    meta: [
      { charSet: 'UTF-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'author', content: 'Emad Toranji' },
      { name: 'theme-color', content: 'var(--main-bg)' },
    ],

    applicationName: site.name,
    creator: site.name,
    publisher: site.name,
  };
}

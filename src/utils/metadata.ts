import type { Metadata } from 'next';
import { getT } from '@i18n/server';
import { fallbackLng, languages } from '@i18n/settings';
import BaseUrlAddress from '@utils/BaseUrlAddress';
import globalSettings from '@utils/globalSettings';

const site = {
  name: globalSettings.site.name,
  domain: BaseUrlAddress,
  twitter: globalSettings.site.twitter,
};

const CLEAR_CACHE_VERSION = '?v=' + globalSettings.clearCacheVersion;

const buildUrl = (path: string = ''): string => `${site.domain}${path}`;

const extractPageName = (
  params?: Record<string, string | string[] | undefined> | null,
  forcedPage?: string | null,
): string => {
  if (forcedPage) return forcedPage;
  if (!params) return 'home';

  const values = Object.values(params).filter(Boolean);

  if (values.length === 0) return 'home';
  if (values.length === 1) return 'home';

  const secondVal = values[1];
  return Array.isArray(secondVal) ? secondVal[0] : String(secondVal);
};

const imageBySize = (size?: number | string): string => {
  if (!size) return `images/app-logo.webp${CLEAR_CACHE_VERSION}`;
  return `images/icons/${size}/app-logo.webp${CLEAR_CACHE_VERSION}`;
};

interface MetaContent {
  title?: string;
  description?: string;
  keywords?: string[];
  category?: string;
}

const merge = (page: Partial<MetaContent> = {}, general: Partial<MetaContent> = {}): MetaContent => ({
  title: page?.title || general?.title || site?.name || '',
  description: page?.description || general?.description || '',
  keywords: page?.keywords || general?.keywords || [],
  category: page?.category || general?.category || 'General',
});

interface GenerateMetadataProps {
  params: Promise<{ lng?: string; [key: string]: any }> | { lng?: string; [key: string]: any };
}

export async function generateMetadata(
  { params }: GenerateMetadataProps,
  forcedPage: string | null = null,
  robotsFollow: boolean = true,
  robotsIndex: boolean = true,
): Promise<Metadata> {
  const resolvedParams = await params;
  const lng = resolvedParams?.lng || null;
  const { t, i18n } = await getT(lng, 'meta');
  const currentLang = i18n?.language || fallbackLng;
  const commonTRes = await getT(currentLang);
  const commonT = commonTRes.t;
  const pageName = extractPageName(resolvedParams, forcedPage);

  const general = (t('general', { returnObjects: true }) as unknown as MetaContent) || {};
  const page = (t(pageName, { returnObjects: true }) as unknown as MetaContent) || {};

  const meta = merge(page, general);

  const siteName = commonT('general.siteName');
  meta.title = String(meta.title).replace('{{siteName}}', siteName);
  meta.description = String(meta.description).replace('{{siteName}}', siteName);

  const canonical = buildUrl(pageName === 'home' ? currentLang : `${currentLang}/${pageName}`);

  const image1200 = buildUrl(imageBySize(1200));
  const image180 = buildUrl(imageBySize(180));
  const image32 = buildUrl(imageBySize(32));
  const image16 = buildUrl(imageBySize(16));

  const alternates: Record<string, string> = {};
  for (const l of languages) {
    alternates[l] = buildUrl(pageName === 'home' ? l : `${l}/${pageName}`);
  }

  return {
    metadataBase: new URL(site.domain),

    title: {
      default: meta.title || site.name,
      template: `%s`,
    },

    description: meta.description,
    keywords: meta.keywords,
    category: meta.category,

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

    applicationName: site.name,
    creator: site.name,
    publisher: site.name,
  };
}

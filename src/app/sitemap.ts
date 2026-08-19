import type { MetadataRoute } from 'next';
import { languages, fallbackLng } from '@i18n/settings';
import BaseUrlAddress from '@utils/BaseUrlAddress';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const languageAlternates: Record<string, string> = {
    'x-default': `${BaseUrlAddress}${fallbackLng}`,
  };

  languages.forEach((lng: string) => {
    languageAlternates[lng] = `${BaseUrlAddress}${lng}`;
  });

  const rootEntry: MetadataRoute.Sitemap[number] = {
    url: `${BaseUrlAddress}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 1.0,
    alternates: {
      languages: languageAlternates,
    },
  };

  const localizedEntries: MetadataRoute.Sitemap = languages.map((lng: string) => ({
    url: `${BaseUrlAddress}${lng}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: lng === fallbackLng ? 1.0 : 0.9,
    alternates: {
      languages: languageAlternates,
    },
  }));

  return [rootEntry, ...localizedEntries];
}

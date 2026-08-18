import type { MetadataRoute } from 'next';
import { languages, fallbackLng } from '@i18n/settings';
import BaseUrlAddress from '@utils/BaseUrlAddress';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = BaseUrlAddress.replace(/\/$/, '');
  const now = new Date();
  const lastModified = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const languageAlternates: Record<string, string> = {};
  for (const lng of languages) {
    languageAlternates[lng] = `${base}/${lng}`;
  }
  languageAlternates['x-default'] = `${base}/${fallbackLng}`;

  const entries: MetadataRoute.Sitemap = [
    // Root URL
    {
      url: `${base}/`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: languageAlternates,
      },
    },
    // Persian Page
    {
      url: `${base}/fa`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: languageAlternates,
      },
    },
    // English Page
    {
      url: `${base}/en`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: languageAlternates,
      },
    },
  ];

  return entries;
}

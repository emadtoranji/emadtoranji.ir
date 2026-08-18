import type { MetadataRoute } from 'next';
import BaseUrlAddress from '@utils/BaseUrlAddress';
import globalSettings from '@utils/globalSettings';

const disallow: string[] = ['/api/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      {
        userAgent: ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider', 'YandexBot'],
        allow: '/',
        disallow,
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'Meta-ExternalAgent',
          'Meta-ExternalFetcher',
          'CCBot',
          'Amazonbot',
          'Applebot',
        ],
        allow: '/',
        disallow,
      },
    ],
    sitemap: `${BaseUrlAddress}sitemap.xml`,
    host: globalSettings.baseUrl.replace(/\/$/, ''),
  };
}

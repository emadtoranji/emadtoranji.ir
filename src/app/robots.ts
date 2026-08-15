import BaseUrlAddress from '@utils/BaseUrlAddress';
import type { MetadataRoute } from 'next';

const disallow: string[] = ['/api/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: disallow,
      },
      {
        userAgent: ['Googlebot', 'Bingbot', 'Slurp'],
        allow: '/',
        disallow: disallow,
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
        ],
        allow: '/',
        disallow: disallow,
      },
    ],
    sitemap: `${BaseUrlAddress}sitemap.xml`,
  };
}

import type { MetadataRoute } from 'next';
import BaseUrlAddress from '@utils/BaseUrlAddress';
import globalSettings from '@utils/globalSettings';

const baseDisallow: string[] = ['/api/', '/_next/data/', '/private/', '/*?*preview=', '/*?*draft='];

export default function robots(): MetadataRoute.Robots {
  const cleanBaseUrl = (BaseUrlAddress || globalSettings.baseUrl).replace(/\/$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/llms.txt',
          '/_next/static/css/',
          '/_next/static/chunks/',
          '/_next/static/media/',
          '/_next/image',
          '/images/',
          '/icons/',
        ],
        disallow: baseDisallow,
      },
      {
        userAgent: ['Googlebot', 'Googlebot-Image', 'Bingbot', 'DuckDuckBot', 'Baiduspider', 'YandexBot'],
        allow: ['/', '/llms.txt', '/_next/static/', '/_next/image'],
        disallow: baseDisallow,
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Perplexity-Search',
          'Google-Extended',
          'GoogleOther',
          'Meta-ExternalAgent',
          'Meta-ExternalFetcher',
          'Applebot',
          'Applebot-Extended',
          'Amazonbot',
          'Bytespider',
          'cohere-ai',
          'Diffbot',
          'CCBot',
        ],
        allow: ['/', '/llms.txt', '/fa', '/en'],
        disallow: baseDisallow,
      },
    ],
    sitemap: [`${cleanBaseUrl}/sitemap.xml`],
    host: cleanBaseUrl,
  };
}

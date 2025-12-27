import BaseUrlAddress from '@utils/BaseUrlAddress';

export const revalidate = 3600 * 24 * 30; // 30 days

export default function robots() {
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
    sitemap: `${BaseUrlAddress}/sitemap.xml`,
  };
}

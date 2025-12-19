import BaseUrlAddress from '@utils/BaseUrlAddress';

export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BaseUrlAddress}sitemap.xml`,
  };
}

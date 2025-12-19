import BaseUrlAddress from '@utils/BaseUrlAddress';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BaseUrlAddress}sitemap.xml`,
  };
}

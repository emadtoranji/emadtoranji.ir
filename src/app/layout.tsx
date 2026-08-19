import React from 'react';
import { headers } from 'next/headers';
import { getT } from '@i18n/server';
import '@styles/general/globals.css';
import { Roboto, Vazirmatn } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-roboto',
});

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-vazirmatn',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const lng = headerList.get('x-i18next-current-language') || 'fa';
  const isRTL = ['fa', 'ar'].includes(lng);
  const { t } = await getT(lng);
  const skipText = t('home.skip-to-content') as string;

  return (
    <html
      lang={lng}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${vazirmatn.className} ${roboto.className} scroll-smooth leading-[1.8]`}
    >
      <body className='m-0 p-0 min-h-screen bg-[#e8edfb] text-[#212529] selection:bg-[#1e3a8a]/20'>
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#1e3a8a] focus:text-[#facc15] focus:rounded-lg focus:shadow-lg focus:font-bold focus:outline-2 focus:outline-offset-2 focus:outline-[#facc15] no-underline'
        >
          {skipText}
        </a>
        {children}
      </body>
    </html>
  );
}

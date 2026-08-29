import React from 'react';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='fa'
      dir='rtl'
      className={`${vazirmatn.className} ${roboto.className} scroll-smooth leading-[1.8]`}
    >
      <body className='m-0 p-0 min-h-screen bg-[#e8edfb] text-[#212529] selection:bg-[#1e3a8a]/20'>
        {children}
      </body>
    </html>
  );
}

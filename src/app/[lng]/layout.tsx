import type { Metadata, Viewport } from 'next';
import type { GenerateMetadataProps } from '@utils/metadata';
import { fallbackLng, languages } from '@i18n/settings';
import { getT } from '@i18n/server';
import React from 'react';

export async function generateStaticParams(): Promise<{ lng: string }[]> {
  return languages.map((lng) => ({ lng }));
}

export const viewport: Viewport = { themeColor: '#1e3a8a', width: 'device-width', initialScale: 1, maximumScale: 5 };

export const generateMetadata = (props: GenerateMetadataProps): Promise<Metadata> =>
  import('@utils/metadata').then((m) => m.generateMetadata(props, 'home'));

interface LngLayoutProps {
  children: React.ReactNode;
  params?: Promise<{ lng?: string }> | { lng?: string };
}

export default async function LngLayout({ children, params }: LngLayoutProps) {
  const resolvedParams = await params;
  const lng = resolvedParams?.lng || null;
  const { t, i18n } = await getT(lng);
  const currentLang = i18n?.language || fallbackLng;
  const isRTL = ['fa', 'ar'].includes(currentLang);
  const skipText = t('home.skip-to-content') as string;

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={
        isRTL
          ? 'font-[var(--font-vazirmatn),B_Yekan,B_Nazanin,sans-serif]! [direction:rtl]'
          : 'font-[var(--font-roboto),Times_New_Roman,sans-serif] [direction:ltr]'
      }
    >
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:fixed focus:top-3 focus:inset-s-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#1e3a8a] focus:text-[#facc15] focus:rounded-lg focus:shadow-lg focus:font-bold focus:outline-2 focus:outline-offset-2 focus:outline-[#facc15] no-underline'
      >
        {skipText}
      </a>
      <div className='bg-[#e8edfb] text-[#212529] min-h-screen print:min-h-0 print:h-[297mm] print:overflow-hidden'>
        {children}
      </div>
    </div>
  );
}

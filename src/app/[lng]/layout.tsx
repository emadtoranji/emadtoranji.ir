import type { Metadata, Viewport } from 'next';
import type { GenerateMetadataProps } from '@utils/metadata';
import { fallbackLng, languages } from '@i18n/settings';
import { getT } from '@i18n/server';
import React from 'react';

export async function generateStaticParams(): Promise<{ lng: string }[]> {
  return languages.map((lng) => ({ lng }));
}

export const viewport: Viewport = {
  themeColor: '#1e3a8a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const generateMetadata = (props: GenerateMetadataProps): Promise<Metadata> =>
  import('@utils/metadata').then((m) => m.generateMetadata(props, 'home'));

interface LngLayoutProps {
  children: React.ReactNode;
  params?: Promise<{ lng?: string }> | { lng?: string };
}

export default async function LngLayout({ children, params }: LngLayoutProps) {
  const resolvedParams = await params;
  const lng = resolvedParams?.lng || null;
  const { i18n } = await getT(lng);
  const currentLang = i18n?.language || fallbackLng;
  const isRTL = ['fa', 'ar'].includes(currentLang);

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={
        isRTL
          ? 'font-[var(--font-vazirmatn),B_Yekan,B_Nazanin,sans-serif]! [direction:rtl]'
          : 'font-[var(--font-roboto),Times_New_Roman,sans-serif] [direction:ltr]'
      }
    >
      <main id='main-content' className='bg-[#e8edfb] text-[#212529] min-h-screen print:bg-white print:text-[#0f172a] print:m-0 print:p-0'>{children}</main>
    </div>
  );
}

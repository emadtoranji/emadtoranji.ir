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
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          html, body {
            width: 210mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background-color: #e8edfb !important;
            overflow: hidden !important;
          }
          .print-a4-page {
            width: 1200px !important;
            zoom: 0.655 !important;
            margin: 0 auto !important;
            padding: 16px 20px !important;
            box-sizing: border-box !important;
          }
          @supports not (zoom: 1) {
            .print-a4-page {
              width: 1200px !important;
              transform: scale(0.655) !important;
              transform-origin: top center !important;
            }
          }
        }
      `,
        }}
      />
      <div className='bg-[#e8edfb] text-[#212529] min-h-screen print:min-h-0 print:h-[297mm] print:overflow-hidden'>
        {children}
      </div>
    </div>
  );
}

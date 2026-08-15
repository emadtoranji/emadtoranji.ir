import type { Metadata } from 'next';
import { fallbackLng, languages } from '@i18n/settings';
import { getT } from '@i18n/server';
import React from 'react';

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const generateMetadata = (props: any): Promise<Metadata> =>
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
    <div className={`theme-${isRTL ? 'rtl' : 'ltr'}`}>
      <main>{children}</main>
    </div>
  );
}

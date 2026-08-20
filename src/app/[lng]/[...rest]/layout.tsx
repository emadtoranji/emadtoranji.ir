import type { Metadata } from 'next';
import type { GenerateMetadataProps } from '@utils/metadata';
import React from 'react';
import { languages } from '@i18n/settings';

export const generateMetadata = (props: GenerateMetadataProps): Promise<Metadata> =>
  import('@utils/metadata').then((m) => m.generateMetadata(props, 'not-found', false, false));

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const routes: { lng: string; rest: string[] }[] = [];

  for (const lng of languages) {
    routes.push({ lng, rest: ['not-found'] });
  }

  return routes;
}

export default function NotFoundLayout({ children }: { children: React.ReactNode }) {
  return children;
}

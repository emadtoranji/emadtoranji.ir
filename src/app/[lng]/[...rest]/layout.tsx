import type { Metadata } from 'next';
import type { GenerateMetadataProps } from '@utils/metadata';
import React from 'react';

export const generateMetadata = (props: GenerateMetadataProps): Promise<Metadata> =>
  import('@utils/metadata').then((m) => m.generateMetadata(props, 'not-found', false, false));

export const dynamic = 'force-static';

export default function NotFoundLayout({ children }: { children: React.ReactNode }) {
  return children;
}

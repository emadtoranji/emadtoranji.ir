import type { Metadata } from 'next';
import React from 'react';

export const generateMetadata = (props: any): Promise<Metadata> =>
  import('@utils/metadata').then((m) => m.generateMetadata(props, 'not-found', false, false));

export const dynamic = 'force-static';

export default function NotFoundLayout({ children }: { children: React.ReactNode }) {
  return children;
}

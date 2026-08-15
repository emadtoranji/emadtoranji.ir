'use client';

import { useT } from '@i18n/client';
import { fallbackLng } from '@i18n/settings';
import Problems from '@components/Problems';

export default function ErrorPage() {
  const { t, i18n } = useT('error');
  const currentLang: string = i18n?.language || fallbackLng;

  const content = {
    title: t('error.title') as string,
    button: t('error.button') as string,
  };

  return (
    <Problems
      content={content}
      code={500}
      currentLang={currentLang}
    />
  );
}

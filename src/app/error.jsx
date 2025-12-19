'use client';

import { useT } from '@i18n/client';
import { fallbackLng } from '@i18n/settings';
import Problems from '@components/Problems';

export default function Index() {
  const { t, i18n } = useT('error');
  const currentLang = i18n?.language || fallbackLng;

  const content = {
    title: t('error.title'),
    button: t('error.button'),
  };

  return <Problems content={content} code={500} currentLang={currentLang} />;
}

'use client';

import i18next from '@i18n/i18next';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useTranslation, UseTranslationResponse, UseTranslationOptions } from 'react-i18next';
import { fallbackLng } from '@i18n/settings';

const isServer = typeof window === 'undefined';

export function useT(ns?: string | string[], options?: UseTranslationOptions<any>): UseTranslationResponse<any, any> {
  const params = useParams();
  const rawLng = params?.lng;
  const lng: string = typeof rawLng === 'string' ? rawLng : Array.isArray(rawLng) ? rawLng[0] : fallbackLng;

  if (typeof lng !== 'string') {
    throw new Error('useT is only available inside /app/[lng]');
  }

  const hasChangedLanguage = useRef(false);

  if (isServer && i18next.resolvedLanguage !== lng) {
    i18next.changeLanguage(lng);
  }

  useEffect(() => {
    if (i18next.resolvedLanguage === lng) {
      hasChangedLanguage.current = true;
      return;
    }

    if (!hasChangedLanguage.current) {
      hasChangedLanguage.current = true;
      return;
    }

    i18next.changeLanguage(lng);
  }, [lng]);

  return useTranslation(ns, options);
}

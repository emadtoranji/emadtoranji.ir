import { i18n as I18nInstance, TFunction } from 'i18next';
import { fallbackLng, languages, headerName, defaultNS } from '@i18n/settings';
import { createServerI18n } from '@i18n/i18next';

export interface GetTResult {
  t: TFunction;
  i18n: I18nInstance;
  lng: string;
}

export async function getT(
  lng?: string | null,
  ns?: string | string[],
  options?: { keyPrefix?: string },
): Promise<GetTResult> {
  let finalLng = lng || fallbackLng;

  if (!finalLng) {
    try {
      const { headers } = await import('next/headers');
      const headerList = await headers();
      const headerLng = headerList.get(headerName);

      if (headerLng && languages.includes(headerLng)) {
        finalLng = headerLng;
      }
    } catch {
      finalLng = fallbackLng;
    }
  }

  const namespaces: string[] = Array.isArray(ns) ? ns : ns ? [ns] : [defaultNS];

  const i18nInstance = await createServerI18n(finalLng, namespaces);

  return {
    t: i18nInstance.getFixedT(finalLng, namespaces[0], options?.keyPrefix),
    i18n: i18nInstance,
    lng: finalLng,
  };
}

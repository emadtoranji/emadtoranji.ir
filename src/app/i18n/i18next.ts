import i18next, { createInstance, i18n as I18nInstance, TFunction } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { fallbackLng, languages, defaultNS, headerName } from '@i18n/settings';

const runsOnServerSide = typeof window === 'undefined';

// Client-side shared instance
const initClientI18next = () => {
  const instance = i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) => import(`@i18n/locales/${language}/${namespace}.json`),
      ),
    );

  instance.init({
    supportedLngs: languages,
    fallbackLng,
    fallbackNS: defaultNS,
    defaultNS,
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    preload: runsOnServerSide ? languages : [],
  });

  return instance;
};

if (!i18next.isInitialized) {
  initClientI18next();
}

export default i18next;

// Server-side isolated instance creator for full concurrency safety & SSG
export const createServerI18n = async (lng: string, namespaces: string[]): Promise<I18nInstance> => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) => import(`@i18n/locales/${language}/${namespace}.json`),
      ),
    )
    .init({
      lng,
      fallbackLng,
      supportedLngs: languages,
      fallbackNS: defaultNS,
      defaultNS,
      ns: namespaces,
      preload: languages,
    });

  return i18nInstance;
};

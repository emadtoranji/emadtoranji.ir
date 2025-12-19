import i18next from '@i18n/i18next'
import { fallbackLng, languages, headerName } from '@i18n/settings'

export async function getT(lng, ns, options) {
  let finalLng = lng || fallbackLng

  if (!finalLng) {
    try {
      const { headers } = await import('next/headers')
      const headerList = await headers()
      const headerLng = headerList.get(headerName)

      if (headerLng && languages.includes(headerLng)) {
        finalLng = headerLng
      }
    } catch {
      finalLng = fallbackLng
    }
  }

  if (i18next.language !== finalLng) {
    await i18next.changeLanguage(finalLng)
  }

  const namespaces = Array.isArray(ns)
    ? ns
    : ns
      ? [ns]
      : [i18next.options.defaultNS]

  for (const n of namespaces) {
    if (!i18next.hasLoadedNamespace(n)) {
      await i18next.loadNamespaces(n)
    }
  }

  return {
    t: i18next.getFixedT(finalLng, namespaces[0], options?.keyPrefix),
    i18n: i18next,
    lng: finalLng
  }
}

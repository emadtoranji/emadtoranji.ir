import { fallbackLng, languages } from '@i18n/settings';
import { getT } from '@i18n/server';

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const generateMetadata = (props) =>
  import('@utils/metadata').then((m) => m.generateMetadata(props, 'home'));

export default async function LngLayout({ children, params }) {
  const { lng } = (await params) || { lng: null };
  const { i18n } = await getT(lng);
  const currentLang = i18n?.language || fallbackLng;
  const isRTL = ['fa', 'ar'].includes(currentLang);

  return (
    <div className={`theme-${isRTL ? 'rtl' : 'ltr'}`}>
      <main>{children}</main>
    </div>
  );
}

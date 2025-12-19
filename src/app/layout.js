import '@styles/general/globals.css';
import '@styles/general/colors.css';
import '@styles/general/rtl.css';
import '@styles/general/ltr.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
import { Roboto, Vazirmatn, Gulzar } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-roboto',
});

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-vazirmatn',
});

const gulzar = Gulzar({
  subsets: ['arabic'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-gulzar',
});

export default function RootLayout({ children }) {
  return (
    <html
      lang='auto'
      dir='auto'
      className={`${vazirmatn.variable} ${roboto.variable} ${gulzar.variable}`}
    >
      <body className='container-fluid m-0 p-0 min-h-screen'>{children}</body>
    </html>
  );
}

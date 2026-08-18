export const globalSettings = {
  baseUrl: 'https://emadtoranji.ir/',
  site: {
    name: 'Emad Toranji',
    nameFa: 'عماد ترنجی',
    titleEn: 'Emad Toranji - Full-Stack Web Developer',
    titleFa: 'رزومه عماد ترنجی - توسعه‌دهنده فول‌استک وب',
    descriptionEn:
      'Full-stack developer since 2018 based in Tehran, Iran. Engineering web applications, Telegram mini-apps, and cloud platforms using Next.js, TypeScript, React, Node.js, and Tailwind CSS.',
    descriptionFa:
      'توسعه‌دهنده فول‌استک وب از سال ۱۳۹۷ در تهران، ایران. فعال در زمینه طراحی و توسعه وب‌اپلیکیشن‌ها، سامانه‌های ابری مالی (مال آرا) و مینی‌اپ‌های تلگرام با Next.js، TypeScript، React و Tailwind CSS.',
    twitter: '@emadtoranji',
    github: 'https://github.com/emadtoranji',
    linkedin: 'https://www.linkedin.com/in/emadtoranji/',
    telegram: 'https://t.me/emadtoranji',
    email: 'emadtoranji6@gmail.com',
    phone: '+989126497501',
    phoneDisplay: '۰۹۱۲۶۴۹۷۵۰۱',
    locationEn: 'Tehran, Iran',
    locationFa: 'ایران، تهران',
  },
  geo: {
    region: 'IR-07',
    placename: 'Tehran',
    position: '35.6892;51.3890',
    latitude: 35.6892,
    longitude: 51.389,
    icbm: '35.6892, 51.3890',
    country: 'IR',
  },
  cache: {
    staticMaxAge: 31536000,
    pageMaxAge: 86400,
    staleWhileRevalidate: 604800,
  },
} as const;

export default globalSettings;

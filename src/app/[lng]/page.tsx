import React from 'react';
import Link from 'next/link';
import { getT } from '@i18n/server';
import { fallbackLng, languages } from '@i18n/settings';
import { numberToFarsi } from '@utils/numbers';
import globalSettings from '@utils/globalSettings';
import ContactIcon from '@components/ContactIcon';
import SocialIcon from '@components/SocialIcon';
import { ExternalLink, Languages } from 'lucide-react';

export async function generateStaticParams(): Promise<{ lng: string }[]> {
  return languages.map((lng) => ({ lng }));
}

export const dynamic = 'force-static';

interface SectionCardProps {
  id: string;
  title: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ id, title, action, className = '', children }) => (
  <section
    className={`w-full group animate-[fadeInScale_0.5s_ease-in-out] bg-white border border-[#212529]/10 shadow-xs hover:shadow-sm px-4 py-3 md:px-5 md:py-4 rounded-xl text-base transition-shadow duration-200 print:p-[2.5px_5px] print:mb-[1.5px] print:rounded-[3px] print:border-[0.5px] print:border-[#64748b] print:shadow-none print:bg-white print:break-inside-avoid ${className}`}
    id={id}
    aria-labelledby={`${id}-heading`}
  >
    <div className='relative flex items-center justify-between gap-2 pb-1.5 mb-2.5 text-[#212529] border-b-2 border-[#facc15] print:text-[7.3pt] print:font-bold print:text-[#0f172a] print:mb-[1.5px] print:pb-[0.5px] print:leading-[1.12] print:border-b-[1.2px] print:border-[#0f172a] after:content-[""] after:absolute after:bottom-[-2px] after:h-[2px] after:w-[12%] after:bg-[#1e3a8a] after:transition-[width] after:duration-350 after:ease-[cubic-bezier(0.4,0,0.2,1)] ltr:after:left-0 rtl:after:right-0 group-hover:after:w-[24%] hover:after:w-[24%] print:after:hidden'>
      <h2
        id={`${id}-heading`}
        className='text-lg md:text-xl font-bold m-0 flex-1 leading-snug print:text-[7.3pt] print:font-bold print:text-[#0f172a] print:leading-[1.12]'
      >
        {title}
      </h2>
      {action && <div className='shrink-0 print:hidden'>{action}</div>}
    </div>
    <div className='px-1'>{children}</div>
  </section>
);

interface ContactItemProps {
  id?: string;
  icon: string;
  label: string;
  children: React.ReactNode;
}

const ContactItem: React.FC<ContactItemProps> = ({ id, icon, label, children }) => (
  <div
    id={id}
    className='flex items-center gap-2 text-[#212529] py-0.5 transition-all duration-200 ease-in-out hover:font-extrabold ltr:hover:translate-x-1! rtl:hover:-translate-x-1! print:text-[6.2pt] print:mb-[0.5px] print:p-0 print:text-[#0f172a] print:transform-none'
  >
    <ContactIcon
      name={icon}
      className='w-5 h-5 text-[#1e3a8a] shrink-0 print:w-[8px] print:h-[8px] print:text-[#0f172a]'
      strokeWidth={2.5}
      aria-hidden='true'
    />
    <div className='flex items-center gap-1 flex-wrap print:text-[6.3pt] print:leading-[1.14] print:text-[#0f172a]'>
      <strong className='font-normal text-[#212529]/80 print:text-[#0f172a]'>{label}:</strong> {children}
    </div>
  </div>
);

interface SocialLinkProps {
  id?: string;
  href: string;
  icon: string;
  label?: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ id, href, icon, label }) => (
  <div className='flex justify-center transition-transform duration-200 ease-in-out hover:-translate-y-1 print:transform-none'>
    <a
      id={id}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={label || 'Social Link'}
      className='text-[#1e3a8a] hover:text-[#facc15] transition-colors p-1 inline-flex items-center justify-center no-underline text-inherit print:p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a] rounded-md'
    >
      <SocialIcon
        name={icon}
        className='w-8 h-8 md:w-9 md:h-9 print:w-[9.5px] print:h-[9.5px] print:text-[#0f172a]'
      />
      <span className='sr-only'>{label || 'Social Link'}</span>
    </a>
  </div>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className='mb-2 select-all leading-relaxed text-justify text-pretty print:text-[6.3pt] print:leading-[1.14] print:mb-[0.5px] print:text-[#1e293b]'>{children}</li>
);

interface ListItemData {
  title?: string;
  url?: string;
  description?: string;
  values?: string[];
}

function ListItems({ item, idPrefix }: { section?: string; item: ListItemData; idPrefix?: string }) {
  let type: 'string' | 'array' | undefined;
  if (item?.description) {
    type = 'string';
  } else if (Array.isArray(item?.values)) {
    type = 'array';
  } else {
    return undefined;
  }

  const count = item?.values?.length || item?.description?.length || 0;

  return count && item?.title ? (
    <article
      id={idPrefix ? `${idPrefix}-${item.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}` : undefined}
      className='relative py-1.5 after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[0.5px] after:w-full after:bg-[#212529]/20 last:after:hidden print:py-[0.5px] print:m-0 print:after:h-[0.4px] print:after:bg-[#94a3b8] print:after:opacity-60'
    >
      <div className='flex items-center justify-between gap-2'>
        <h3 className='font-bold text-sm md:text-base m-0 select-all text-[#212529] print:text-[6.8pt] print:font-bold print:text-[#0f172a] print:m-0 print:leading-[1.12]'>{item.title}</h3>
        {item?.url ? (
          <a
            href={item.url}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Visit ${item.title}`}
            className='text-[#1e3a8a] hover:text-[#facc15] transition-colors inline-flex items-center p-1 animate-pulse print:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a] rounded-md'
          >
            <ExternalLink
              className='w-5 h-5'
              strokeWidth={2.5}
              aria-hidden='true'
            />
            <span className='sr-only'>{`مشاهده آنلاین ${item.title}`}</span>
          </a>
        ) : undefined}
      </div>
      <div
        style={type === 'array' ? { direction: 'ltr', textAlign: 'left' } : {}}
        className='flex flex-wrap gap-x-1.5 gap-y-1 mt-1 text-sm md:text-base'
      >
        {type === 'string' ? (
          <p className='text-justify text-pretty mx-1 mb-1 select-all text-sm md:text-base leading-relaxed text-[#212529] print:text-[6.3pt] print:leading-[1.14] print:mb-[0.5px] print:text-[#1e293b]'>{item.description}</p>
        ) : (
          item.values?.map((i, index) => {
            return (
              <div
                key={index}
                role='button'
                className='transition-transform duration-200 ease-in-out hover:-translate-y-1 select-all cursor-default print:text-[6.3pt] print:leading-[1.14] print:text-[#0f172a] print:transform-none'
              >
                <span>{i}</span>
                {index < (item.values?.length || 0) - 1 ? <span className='me-1'>,</span> : ''}
              </div>
            );
          })
        )}
      </div>
    </article>
  ) : undefined;
}

interface IndexProps {
  params?: Promise<{ lng?: string }> | { lng?: string };
}

interface PersonalItem {
  label?: string;
  logo: string;
  value: string;
  href?: string;
}

interface SocialItem {
  logo: string;
  href: string;
  name?: string;
}

export default async function Index({ params }: IndexProps) {
  const resolvedParams = params ? await params : undefined;
  const lng = resolvedParams?.lng || null;
  const { t, i18n } = await getT(lng);
  const currentLang = i18n?.language || fallbackLng;

  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - 2018;
  const experienceYearsFA = numberToFarsi(experienceYears, currentLang);

  const personalItems = (t('home.personal-items', { returnObjects: true }) as PersonalItem[]) || [];
  const socialItems = (t('home.social-items', { returnObjects: true }) as SocialItem[]) || [];
  const skillsItems = (t('home.skills-items', { returnObjects: true }) as ListItemData[]) || [];
  const experienceItems = (t('home.experience-items', { returnObjects: true }) as string[]) || [];
  const portfolioItems = (t('home.portfolio-items', { returnObjects: true }) as ListItemData[]) || [];
  const educationItems = (t('home.education-items', { returnObjects: true }) as string[]) || [];

  const isFa = currentLang === 'fa';
  const targetLang = isFa ? 'en' : 'fa';
  const targetLangLabel = isFa ? 'Switch to English' : 'تغییر به زبان فارسی';
  const targetLangTitle = isFa ? 'English' : 'فارسی';

  const faqItems = isFa
    ? [
        {
          question: 'عماد ترنجی کیست؟',
          answer:
            'عماد ترنجی توسعه‌دهنده فول‌استک وب ساکن تهران با بیش از ۷ سال سابقه حرفه‌ای در طراحی و استقرار سامانه‌های ابری (مال آرا) و مینی اپ‌های تلگرام بر پایه Next.js، TypeScript و React است.',
        },
        {
          question: 'عماد ترنجی چه مهارت‌های تخصصی دارد؟',
          answer:
            'عماد ترنجی مسلط به Next.js App Router، TypeScript، React، Tailwind CSS، Node.js، PHP، پایگاه‌های داده PostgreSQL و MySQL، RESTful API، WebSocket و Next-Auth است.',
        },
        {
          question: 'سامانه ابری مال آرا (MalAra) چیست؟',
          answer:
            'مال آرا پلتفرم ابری مدیریت مالی، حسابداری و انبارداری توسعه‌یافته توسط عماد ترنجی است که شامل صدور فاکتور رسمی، کاردکس انبارداری و ثبت چک صیادی می‌باشد.',
        },
        {
          question: 'چگونه می‌توان با عماد ترنجی ارتباط برقرار کرد؟',
          answer:
            'شما می‌توانید از طریق ایمیل emadtoranji6@gmail.com، شماره تماس ۰۹۱۲۶۴۹۷۵۰۱ یا آیدی تلگرام @emadtoranji با عماد ترنجی در ارتباط باشید.',
        },
      ]
    : [
        {
          question: 'Who is Emad Toranji?',
          answer:
            'Emad Toranji is a Senior Full-Stack Web Developer based in Tehran, Iran with over 7 years of professional experience building cloud platforms (MalAra), web apps, and Telegram Mini Apps using Next.js, React, TypeScript, Node.js, and PHP.',
        },
        {
          question: 'What are the core technical skills of Emad Toranji?',
          answer:
            'Emad Toranji specializes in Next.js App Router, TypeScript, React, Tailwind CSS, Node.js, PHP, PostgreSQL, MySQL, RESTful APIs, WebSockets, and Next-Auth authentication pipelines.',
        },
        {
          question: 'What is MalAra?',
          answer:
            'MalAra is a cloud financial and inventory management platform developed by Emad Toranji, featuring official invoice generation, multi-warehouse stock tracking, and Sayad cheque management.',
        },
        {
          question: 'How can I contact Emad Toranji?',
          answer:
            'You can contact Emad Toranji via email at emadtoranji6@gmail.com, phone at +989126497501, or Telegram @emadtoranji.',
        },
      ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${globalSettings.baseUrl}#person`,
        name: globalSettings.site.name,
        alternateName: globalSettings.site.nameFa,
        jobTitle: isFa ? 'توسعه‌دهنده فول‌استک وب' : 'Full-Stack Web Developer',
        description: isFa ? globalSettings.site.descriptionFa : globalSettings.site.descriptionEn,
        url: globalSettings.baseUrl,
        email: `mailto:${globalSettings.site.email}`,
        telephone: globalSettings.site.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: globalSettings.geo.placename,
          addressRegion: globalSettings.geo.region,
          addressCountry: globalSettings.geo.country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: globalSettings.geo.latitude,
          longitude: globalSettings.geo.longitude,
        },
        sameAs: [
          globalSettings.site.github,
          globalSettings.site.linkedin,
          globalSettings.site.telegram,
          `https://x.com/${globalSettings.site.twitter.replace('@', '')}`,
        ],
        knowsAbout: [
          'Next.js',
          'React',
          'TypeScript',
          'JavaScript',
          'Tailwind CSS',
          'PHP',
          'Node.js',
          'REST APIs',
          'PostgreSQL',
          'MySQL',
          'MalAra (مال آرا)',
          'Telegram Mini Apps',
          'Full-Stack Architecture',
        ],
      },
      {
        '@type': 'ProfilePage',
        '@id': `${globalSettings.baseUrl}${currentLang}`,
        url: `${globalSettings.baseUrl}${currentLang}`,
        name: isFa ? globalSettings.site.titleFa : globalSettings.site.titleEn,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${globalSettings.baseUrl}#website`,
          name: globalSettings.site.name,
          url: globalSettings.baseUrl,
        },
        mainEntity: {
          '@id': `${globalSettings.baseUrl}#person`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${globalSettings.baseUrl}${currentLang}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: isFa ? 'صفحه اصلی' : 'Home',
            item: `${globalSettings.baseUrl}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: isFa ? 'رزومه عماد ترنجی' : 'Emad Toranji Resume',
            item: `${globalSettings.baseUrl}${currentLang}`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${globalSettings.baseUrl}${currentLang}#faq`,
        mainEntity: faqItems.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  const languageButton = (
    <Link
      id='lang-switcher-btn'
      href={`/${targetLang}`}
      aria-label={targetLangLabel}
      title={targetLangTitle}
      className='inline-flex items-center justify-center w-8 h-8 rounded-lg text-[#1e3a8a] bg-[#1e3a8a]/5 hover:bg-[#1e3a8a]/20 transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer print:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a]'
    >
      <Languages
        className='w-4 h-4'
        strokeWidth={2.5}
        aria-hidden='true'
      />
      <span className='sr-only'>{targetLangLabel}</span>
    </Link>
  );

  return (
    <main id='main-content' className='print:m-0 print:p-0 print:bg-white print:text-[#0f172a]'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className='container mx-auto px-4 py-4 mb-2 max-w-7xl print:max-w-full print:w-full print:p-0 print:m-0'>
        <header
          id='header-section'
          className='bg-[#1e3a8a] text-[#facc15] shadow-[0_4px_15px_rgba(30,58,138,0.2)] sticky top-3 z-40 text-center px-4 py-3.5 rounded-xl mb-4 transition-all duration-200 print:p-[2.5px_8px] print:mb-[2px] print:rounded-[3px] print:bg-[#f1f5f9] print:text-[#0f172a] print:border-[0.8px] print:border-[#64748b] print:shadow-none'
        >
          <h1 className='text-xl md:text-2xl font-bold uppercase tracking-wider m-0 print:text-[10pt] print:font-extrabold print:text-[#0f172a] print:leading-[1.1] print:m-0'>{t('home.header-title')}</h1>
        </header>

        <div className='grid grid-cols-1 xl:grid-cols-12 gap-4 print:grid print:grid-cols-[70.5%_28.5%] print:gap-[2.5mm] print:w-full print:max-h-[280mm] print:overflow-hidden print:m-0 print:p-0'>
          <aside
            id='sidebar-column'
            className='col-span-1 xl:col-span-4 xl:order-last print:order-1'
          >
            <div
              className='xl:sticky xl:top-20 space-y-4 self-start flex flex-col w-full'
            >
              <SectionCard
                id='sidebar'
                title={t('home.personal-details-title')}
                action={languageButton}
              >
                <address className='grid grid-cols-1 gap-2.5 not-italic text-sm md:text-base m-0'>
                  {personalItems.map((item, index) => {
                    const finalVal = <span className='select-all font-medium print:text-[6.3pt] print:text-[#0f172a]'>{item?.value}</span>;
                    return (
                      <ContactItem
                        key={index}
                        id={`contact-item-${index}`}
                        icon={item?.logo}
                        label={item?.label || ''}
                      >
                        {item?.href ? (
                          <a
                            href={item?.href}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='hover:text-[#1e3a8a] transition-colors no-underline text-inherit'
                          >
                            {finalVal}
                          </a>
                        ) : (
                          finalVal
                        )}
                      </ContactItem>
                    );
                  })}
                </address>

                <nav
                  aria-label='Social Media Links'
                  className='flex items-center justify-center gap-3.5 md:gap-4.5 mt-4 pt-3 border-t border-[#212529]/10 max-w-[280px] mx-auto w-full print:flex print:visible print:opacity-100 print:mt-[1.5px] print:mb-0 print:pt-[1.5px] print:gap-[3px] print:border-t-[0.4px] print:border-[#94a3b8]'
                >
                  {socialItems.map((item, index) => (
                    <SocialLink
                      key={index}
                      id={`social-link-${index}`}
                      href={item.href}
                      icon={item?.logo}
                      label={item.href}
                    />
                  ))}
                </nav>
              </SectionCard>

              <SectionCard
                id='skills'
                title={t('home.skills-title')}
              >
                <div className='flex flex-col gap-3 pt-1'>
                  {skillsItems.map((group, gIndex) => (
                    <div key={`skill-group-${gIndex}`} className='space-y-1.5'>
                      {group.title && (
                        <h3 className='text-xs font-bold text-[#1e3a8a] uppercase tracking-wider flex items-center gap-1.5 m-0 print:text-[6.3pt] print:text-[#0f172a]'>
                          <span className='w-1.5 h-1.5 rounded-full bg-[#facc15] shrink-0 inline-block print:bg-[#0f172a] print:w-[2.5px] print:h-[2.5px]'></span>
                          <span className='select-all'>{group.title}</span>
                        </h3>
                      )}
                      <div className='flex flex-wrap gap-1.5' dir='ltr'>
                        {group.values?.map((skill, sIndex) => (
                          <button
                            key={`skill-${gIndex}-${sIndex}`}
                            type='button'
                            aria-label={`Skill: ${skill}`}
                            className='inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#f8f9fa] text-[#1e293b] border border-[#212529]/15 shadow-2xs hover:bg-[#1e3a8a] hover:text-[#facc15] hover:border-[#1e3a8a] hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer select-none group/skill print:p-[0.5px_3px] print:text-[5.6pt] print:font-semibold print:rounded-[2px] print:border-[0.4px] print:border-[#64748b] print:bg-[#f8fafc] print:text-[#0f172a] print:shadow-none print:m-[0.4px] print:transform-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a]'
                          >
                            <span className='w-1.5 h-1.5 rounded-full bg-[#1e3a8a] group-hover/skill:bg-[#facc15] transition-colors shrink-0 print:bg-[#0f172a] print:w-[2.5px] print:h-[2.5px]' aria-hidden='true'></span>
                            <span className='select-all'>{skill}</span>
                            <span className='sr-only'>{isFa ? ` (مهارت: ${skill})` : ` (Skill: ${skill})`}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </aside>

          <div
            id='content-column'
            className='col-span-1 xl:col-span-8 print:p-0'
          >
            <div className='flex flex-col gap-4 print:gap-[0.12rem]'>
              <SectionCard
                id='summary'
                title={t('home.summary-title')}
              >
                <p
                  className='text-justify text-pretty select-all m-0 text-sm md:text-base leading-relaxed print:text-[6.3pt] print:leading-[1.14] print:mb-[0.5px] print:text-[#1e293b]'
                  dangerouslySetInnerHTML={{
                    __html: t('home.summary-text', {
                      experienceYears: currentLang === 'fa' ? experienceYearsFA : experienceYears,
                    }),
                  }}
                />
              </SectionCard>

              <SectionCard
                id='experience'
                title={t('home.experience-title')}
              >
                <h3 className='text-sm md:text-base font-bold mb-2 text-[#212529] print:text-[6.8pt] print:font-bold print:text-[#0f172a] print:m-0 print:leading-[1.12]'>
                  <span className='select-all'>{t('home.experience-description')}</span>
                </h3>
                <ul className='list-disc px-5 space-y-1.5 m-0 text-sm md:text-base print:m-0 print:px-[7px]'>
                  {experienceItems.map((item, index) => (
                    <ListItem key={`experience-${index}`}>{item}</ListItem>
                  ))}
                </ul>
              </SectionCard>

              <SectionCard
                id='portfolio'
                title={t('home.portfolio-title')}
              >
                {portfolioItems.map((item, index) => (
                  <ListItems
                    key={`portfolio-${index}`}
                    idPrefix='portfolio'
                    item={item}
                  />
                ))}
              </SectionCard>

              <SectionCard
                id='education'
                title={t('home.education-title')}
              >
                <ul className='list-disc px-5 space-y-1.5 m-0 text-sm md:text-base print:m-0 print:px-[7px]'>
                  {educationItems.map((item, index) => (
                    <ListItem key={`education-${index}`}>{item}</ListItem>
                  ))}
                </ul>
              </SectionCard>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

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
    className={`w-full group animate-[fadeInScale_0.5s_ease-in-out] bg-white border border-[#212529]/10 shadow-xs hover:shadow-sm px-4 py-3 md:px-5 print:px-4 md:py-4 print:py-2.5 rounded-xl text-base transition-shadow duration-200 print:break-inside-avoid print:shadow-none print:border-[#212529]/15 ${className}`}
    id={id}
    aria-labelledby={`${id}-heading`}
  >
    <div className='relative flex items-center justify-between gap-2 pb-1.5 mb-2 print:pb-1 print:mb-1.5 text-[#212529] border-b-2 border-[#facc15] after:content-[""] after:absolute after:bottom-[-2px] after:h-[2px] after:w-[12%] after:bg-[#1e3a8a] after:transition-[width] after:duration-350 after:ease-[cubic-bezier(0.4,0,0.2,1)] ltr:after:left-0 rtl:after:right-0 group-hover:after:w-[24%] hover:after:w-[24%] print:after:bg-[#1e3a8a] print:after:w-[18%] print:after:h-[1.5px] print:after:bottom-[-1.5px]'>
      <h2
        id={`${id}-heading`}
        className='text-lg md:text-xl print:text-lg font-bold m-0 flex-1 leading-snug'
      >
        {title}
      </h2>
      {action && <div className='shrink-0 print:hidden'>{action}</div>}
    </div>
    <div className='px-1 print:px-0'>{children}</div>
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
    className='flex items-center gap-2 text-[#212529] py-0.5 print:py-0.5 transition-all duration-200 ease-in-out hover:font-extrabold ltr:hover:translate-x-1! rtl:hover:-translate-x-1!'
  >
    <ContactIcon
      name={icon}
      className='w-5 h-5 print:w-4.5 print:h-4.5 text-[#1e3a8a] shrink-0'
      strokeWidth={2.5}
      aria-hidden='true'
    />
    <div className='flex items-center gap-1 flex-wrap print:text-sm'>
      <strong className='font-normal text-[#212529]/80'>{label}:</strong> {children}
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
  <div className='flex justify-center transition-transform duration-200 ease-in-out hover:-translate-y-1'>
    <a
      id={id}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={label || 'Social Link'}
      className='text-[#1e3a8a] hover:text-[#facc15] transition-colors p-1 print:p-0.5 inline-flex items-center justify-center no-underline text-inherit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a] rounded-md'
    >
      <SocialIcon
        name={icon}
        className='w-8 h-8 md:w-9 md:h-9 print:w-7 print:h-7'
      />
      <span className='sr-only'>{label || 'Social Link'}</span>
    </a>
  </div>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className='mb-2 print:mb-1 select-all leading-relaxed text-justify text-pretty print:text-sm print:leading-normal'>
    {children}
  </li>
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
      className='relative py-1.5 print:py-1 after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[0.5px] after:w-full after:bg-[#212529]/20 last:after:hidden print:after:h-[0.4px] print:after:bg-[#94a3b8] print:after:opacity-60'
    >
      <div className='flex items-center justify-between gap-2'>
        <h3 className='font-bold text-sm md:text-base print:text-sm m-0 select-all text-[#212529]'>{item.title}</h3>
        {item?.url ? (
          <a
            href={item.url}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Visit ${item.title}`}
            className='text-[#1e3a8a] hover:text-[#facc15] transition-colors inline-flex items-center p-1 print:p-0 animate-pulse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a] rounded-md'
          >
            <ExternalLink
              className='w-5 h-5 print:w-4 print:h-4'
              strokeWidth={2.5}
              aria-hidden='true'
            />
            <span className='sr-only'>{`View ${item.title} online`}</span>
          </a>
        ) : undefined}
      </div>
      <div
        style={type === 'array' ? { direction: 'ltr', textAlign: 'left' } : {}}
        className='flex flex-wrap gap-x-1.5 gap-y-1 mt-1 text-sm md:text-base print:text-xs'
      >
        {type === 'string' ? (
          <p className='text-justify text-pretty mx-1 mb-1 select-all text-sm md:text-base print:text-xs leading-relaxed text-[#212529]'>
            {item.description}
          </p>
        ) : (
          item.values?.map((i, index) => {
            return (
              <div
                key={index}
                role='button'
                className='transition-transform duration-200 ease-in-out hover:-translate-y-1 select-all cursor-default'
              >
                <span>{i}</span> {index < (item.values?.length || 0) - 1 ? <span className='me-1'>,</span> : ''}
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
  const targetLangLabel = t('home.language-switcher.switch-to-en') as string;
  const targetLangTitle = t('home.language-switcher.en-title') as string;

  const faqItems = (t('home.faq', { returnObjects: true }) as Array<{ question: string; answer: string }>) || [];

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
        mainEntity: { '@id': `${globalSettings.baseUrl}#person` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${globalSettings.baseUrl}${currentLang}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: t('home.breadcrumb.home') as string,
            item: `${globalSettings.baseUrl}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: t('home.breadcrumb.resume') as string,
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
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
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
      className='inline-flex items-center justify-center w-8 h-8 rounded-lg text-[#1e3a8a] bg-[#1e3a8a]/5 hover:bg-[#1e3a8a]/20 transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a]'
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
    <main id='main-content'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className='container mx-auto px-4 py-4 mb-2 max-w-7xl print-a4-page'>
        <header
          id='header-section'
          className='bg-[#1e3a8a] text-[#facc15] shadow-[0_4px_15px_rgba(30,58,138,0.2)] sticky print:static top-3 z-40 text-center px-4 py-3.5 print:py-2.5 rounded-xl mb-4 print:mb-3 transition-all duration-200 print:shadow-none'
        >
          <h1 className='text-xl md:text-2xl print:text-xl font-bold uppercase tracking-wider m-0'>
            {t('home.header-title')}
          </h1>
        </header>
        <div className='grid grid-cols-1 xl:grid-cols-12 print:!grid-cols-12 gap-4 print:!gap-4 items-start'>
          <aside
            id='sidebar-column'
            className='col-span-1 xl:col-span-4 print:!col-span-4 xl:order-last print:!order-last'
          >
            <div className='xl:sticky print:static xl:top-20 space-y-4 print:space-y-3.5 self-start flex flex-col w-full'>
              <SectionCard
                id='sidebar'
                title={t('home.personal-details-title')}
                action={languageButton}
              >
                <address className='grid grid-cols-1 gap-2.5 print:gap-1.5 not-italic text-sm md:text-base m-0'>
                  {personalItems.map((item, index) => {
                    const finalVal = <span className='select-all font-medium'>{item?.value}</span>;
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
                  aria-label={t('home.social.aria-label') as string}
                  className='flex items-center justify-center gap-3.5 md:gap-4.5 print:gap-3.5 mt-4 print:mt-2.5 pt-3 print:pt-2 border-t border-[#212529]/10 max-w-[280px] mx-auto w-full'
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
                <div className='flex flex-col gap-3 print:gap-2 pt-1 print:pt-0'>
                  {skillsItems.map((group, gIndex) => (
                    <div
                      key={`skill-group-${gIndex}`}
                      className='space-y-1.5 print:space-y-1'
                    >
                      {group.title && (
                        <h3 className='text-xs print:text-xs font-bold text-[#1e3a8a] uppercase tracking-wider flex items-center gap-1.5 m-0 mb-2'>
                          <span className='w-1.5 h-1.5 rounded-full bg-[#facc15] shrink-0 inline-block'></span>
                          <span className='select-all mt-[1px]'>{group.title}</span>
                        </h3>
                      )}
                      <div
                        className='flex flex-wrap gap-1.5 print:gap-1.5 px-1'
                        dir='ltr'
                      >
                        {group.values?.map((skill, sIndex) => (
                          <button
                            key={`skill-${gIndex}-${sIndex}`}
                            type='button'
                            aria-label={`Skill: ${skill}`}
                            className='inline-flex items-center gap-1.5 px-2.5 py-1 print:px-2 print:py-0.5 text-xs print:text-xs font-semibold rounded-lg bg-[#f8f9fa] text-[#1e293b] border border-[#212529]/15 shadow-2xs hover:bg-[#1e3a8a] hover:text-[#facc15] hover:border-[#1e3a8a] hover:shadow-xs transition-all duration-200 cursor-pointer select-none group/skill focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a] print:shadow-none'
                          >
                            <span
                              className='w-1.5 h-1.5 rounded-full bg-[#1e3a8a] group-hover/skill:bg-[#facc15] transition-colors shrink-0'
                              aria-hidden='true'
                            ></span>
                            <span className='inline-flex items-center select-all leading-none'>{skill}</span>
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
            className='col-span-1 xl:col-span-8 print:!col-span-8'
          >
            <div className='flex flex-col gap-4 print:gap-3.5'>
              <SectionCard
                id='summary'
                title={t('home.summary-title')}
              >
                <p
                  className='text-justify text-pretty select-all m-0 text-sm md:text-base print:text-sm leading-relaxed'
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
                <h3 className='text-sm md:text-base print:text-sm font-bold mb-2 print:mb-1.5 text-[#212529]'>
                  <span className='select-all'>{t('home.experience-description')}</span>
                </h3>
                <ul className='list-disc px-5 print:px-4 space-y-1.5 print:space-y-1 m-0 text-sm md:text-base'>
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
                <ul className='list-disc px-5 print:px-4 space-y-1.5 print:space-y-1 m-0 text-sm md:text-base'>
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

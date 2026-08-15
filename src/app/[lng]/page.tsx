import React from 'react';
import { getT } from '@i18n/server';
import { fallbackLng, languages } from '@i18n/settings';
import { numberToFarsi } from '@utils/numbers';

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const dynamic = 'force-static';

interface SectionCardProps {
  id?: string;
  title: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ id, title, children }) => (
  <div
    className='w-100 animation-fade-in bg-white border border-secondary border-opacity-10 shadow-sm px-4 p-3 rounded-3 fs-6'
    id={id}
  >
    <h3 className='section-title line-range position-relative pb-1 fs-5 fw-bolder'>{title}</h3>
    <div className='px-1'>{children}</div>
  </div>
);

interface ContactItemProps {
  icon: string;
  label: string;
  children: React.ReactNode;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, label, children }) => (
  <div className='d-flex gap-1 contact-item transform-left-on-hover'>
    <i className={`fs-5 d-flex align-items-center bi ${icon}`}></i>
    <strong className='fw-normal'>{label}:</strong> {children}
  </div>
);

interface SocialLinkProps {
  href: string;
  icon: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => (
  <div className='d-flex justify-content-center transform-up-on-hover'>
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
    >
      <i className={`bi ${icon}`}></i>
    </a>
  </div>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className='mb-2 user-select-all'>{children}</li>
);

interface ListItemData {
  title?: string;
  url?: string;
  description?: string;
  values?: string[];
}

function ListItems({ item }: { section?: string; item: ListItemData }) {
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
    <div className='line-seperator-range position-relative py-1'>
      <div className='fw-light d-flex align-items-center justify-content-between'>
        <div className='fw-bold '>{item.title}</div>
        {item?.url ? (
          <a
            href={item.url}
            target='_blank'
            rel='noopener noreferrer'
            className='animate__animated animate__pulse animate__infinite'
          >
            <i className='bi bi-link-45deg fs-3 text-primary'></i>
          </a>
        ) : undefined}
      </div>
      <div
        style={type === 'array' ? { direction: 'ltr', textAlign: 'left' } : {}}
        className='d-flex flex-wrap'
      >
        {type === 'string' ? (
          <div className='text-justify mx-1 user-select-all'>{item.description}</div>
        ) : (
          item.values?.map((i, index) => {
            return (
              <div
                key={index}
                role='button'
                className='transform-up-on-hover user-select-all'
              >
                <span className=''>{i}</span>
                {index < (item.values?.length || 0) - 1 ? <span className='me-1'>,</span> : ''}
              </div>
            );
          })
        )}
      </div>
    </div>
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
}

export default async function Index({ params }: IndexProps) {
  const resolvedParams = await params;
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

  return (
    <main>
      <div className='container py-4 mb-2'>
        <header className='header text-center px-4 py-3 rounded-3 mb-3'>
          <h1 className='text-uppercase fw-bold'>{t('home.header-title')}</h1>
        </header>

        <div className='resume-wrapper row g-4'>
          <aside className='col-12 col-xl-5 col-xxl-4 order-xl-last'>
            <div
              className='sticky-lg-top overflow-y-auto align-self-start d-flex'
              style={{ top: '1rem' }}
            >
              <SectionCard
                id='sidebar'
                title={t('home.personal-details-title')}
              >
                <div className='row g-2 fs-6'>
                  {personalItems.map((item, index) => {
                    const finalVal = <span className='user-select-all'>{item?.value}</span>;
                    return (
                      <ContactItem
                        key={index}
                        icon={item?.logo}
                        label={item?.label || ''}
                      >
                        {item?.href ? (
                          <a
                            href={item?.href}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            {finalVal}
                          </a>
                        ) : (
                          finalVal
                        )}
                      </ContactItem>
                    );
                  })}
                </div>

                <div className='row row-cols-4 mx-auto mt-3 mt-md-4 mb-0 mb-sm-1 fs-2 social-media text-dark justify-content-center'>
                  {socialItems.map((item, index) => (
                    <SocialLink
                      key={index}
                      href={item.href}
                      icon={item?.logo}
                    />
                  ))}
                </div>
              </SectionCard>
            </div>
          </aside>

          <div className='content col'>
            <div className='d-flex flex-column gap-4'>
              <SectionCard
                id='summary'
                title={t('home.summary-title')}
              >
                <p
                  className='text-justify user-select-all'
                  dangerouslySetInnerHTML={{
                    __html: t('home.summary-text', {
                      experienceYears: currentLang === 'fa' ? experienceYearsFA : experienceYears,
                    }),
                  }}
                />
              </SectionCard>

              <SectionCard
                id='skills'
                title={t('home.skills-title')}
              >
                {skillsItems.map((item, index) => (
                  <ListItems
                    key={`experience-${index}`}
                    section='skills'
                    item={item}
                  />
                ))}
              </SectionCard>

              <SectionCard
                id='experience'
                title={t('home.experience-title')}
              >
                <p>
                  <strong className='user-select-all'>{t('home.experience-description')}</strong>
                </p>
                <ul className='px-2'>
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
                    item={item}
                  />
                ))}
              </SectionCard>

              <SectionCard
                id='education'
                title={t('home.education-title')}
              >
                <ul className='px-2'>
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

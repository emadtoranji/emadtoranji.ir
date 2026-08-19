import { NextResponse } from 'next/server';
import globalSettings from '@utils/globalSettings';
import { getT } from '@i18n/server';

export const dynamic = 'force-static';
export const revalidate = false;

interface PersonalItem {
  label: string;
  logo: string;
  value: string;
  href?: string;
}

interface SocialItem {
  logo: string;
  href: string;
}

interface SkillItem {
  title: string;
  values: string[];
}

interface PortfolioItem {
  title: string;
  url: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

async function generateLlmsText(): Promise<string> {
  const { t: tFa } = await getT('fa');
  const { t: tEn } = await getT('en');

  const { site, geo, baseUrl } = globalSettings;
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  const personalItems = tFa('home.personal-items', { returnObjects: true }) as PersonalItem[];
  const socialItems = tFa('home.social-items', { returnObjects: true }) as SocialItem[];
  const skillItems = tFa('home.skills-items', { returnObjects: true }) as SkillItem[];
  const portfolioItems = tFa('home.portfolio-items', { returnObjects: true }) as PortfolioItem[];
  const experienceItems = tFa('home.experience-items', { returnObjects: true }) as string[];
  const faqItems = tFa('home.faq', { returnObjects: true }) as FaqItem[];
  const educationItems = tFa('home.education-items', { returnObjects: true }) as string[];

  const summaryText = (tFa('home.summary-text') as string) || site.descriptionFa;
  const experienceRole = (tFa('home.experience-role') as string) || site.jobTitleFa;
  const experienceDesc = (tFa('home.experience-description') as string) || 'مهر ۱۳۹۷ – تاکنون';
  const cleanExperienceDuration =
    experienceDesc.includes('(') && experienceDesc.includes(')')
      ? experienceDesc.slice(experienceDesc.indexOf('(') + 1, experienceDesc.lastIndexOf(')'))
      : experienceDesc;

  const faTitle = (tFa('home.language-switcher.fa-title') as string) || 'فارسی';
  const enTitle = (tEn('home.language-switcher.en-title') as string) || 'English';

  const personalItemsMap = new Map<string, string>();
  if (Array.isArray(personalItems)) {
    personalItems.forEach((item) => {
      personalItemsMap.set(item.label, item.value);
    });
  }

  const socialLinksMap = new Map<string, string>();
  if (Array.isArray(socialItems)) {
    socialItems.forEach((item) => {
      socialLinksMap.set(item.logo, item.href);
    });
  }

  const phoneValue = personalItemsMap.get('شماره تماس') || site.phone;
  const addressValue = personalItemsMap.get('آدرس') || site.locationFa;
  const emailValue = personalItemsMap.get('ایمیل') || site.email;
  const xLink = socialLinksMap.get('x') || `https://x.com/${site.twitter.replace('@', '')}`;
  const githubLink = socialLinksMap.get('github') || site.github;
  const linkedinLink = socialLinksMap.get('linkedin') || site.linkedin;
  const telegramLink = socialLinksMap.get('telegram') || site.telegram;

  const skillsBlocks = Array.isArray(skillItems)
    ? skillItems
        .map((skillGroup) => {
          const items = skillGroup.values.map((val) => `- ${val}`).join('\n');
          return `### ${skillGroup.title}\n${items}`;
        })
        .join('\n\n')
    : '';

  const portfolioBlocks = Array.isArray(portfolioItems)
    ? portfolioItems
        .map((project, index) => {
          return `${index + 1}. **${project.title}**\n   - URL: ${project.url}\n   - Description: ${project.description}`;
        })
        .join('\n\n')
    : '';

  const experienceBlocks = Array.isArray(experienceItems) ? experienceItems.map((exp) => `- ${exp}`).join('\n') : '';

  const faqBlocks = Array.isArray(faqItems)
    ? faqItems.map((item) => `Q: ${item.question}\nA: ${item.answer}`).join('\n\n')
    : '';

  const educationBlocks = Array.isArray(educationItems) ? educationItems.map((edu) => `- ${edu}`).join('\n') : '';

  return `# ${site.name} (${site.nameFa}) - ${site.jobTitleEn}

> ${summaryText}

## Profile Summary
- Full Name: ${site.name} (${site.nameFa})
- Professional Role: ${site.jobTitleEn} (${site.jobTitleFa})
- Experience: ${experienceDesc}
- Location: ${site.locationEn} / ${addressValue} (${geo.region} / Coordinates: ${geo.latitude}° N, ${geo.longitude}° E)
- Email: ${emailValue}
- Phone: ${phoneValue}
- Website: ${cleanBaseUrl}
- GitHub: ${githubLink}
- LinkedIn: ${linkedinLink}
- Telegram: ${telegramLink}
- X (Twitter): ${xLink}

## Core Technical Stack & Skills
${skillsBlocks}

## Professional Experience
### ${experienceRole} (${cleanExperienceDuration})
${experienceBlocks}

## Featured Portfolio Projects
${portfolioBlocks}

## Frequently Asked Questions (GEO & AEO Knowledge)
${faqBlocks}

## Education
${educationBlocks}

## Language Support
- ${faTitle} (Native): ${cleanBaseUrl}/fa
- ${enTitle} (Professional): ${cleanBaseUrl}/en
`;
}

export async function GET() {
  const llmsText = await generateLlmsText();

  return new NextResponse(llmsText, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': `public, max-age=${globalSettings.cache.pageMaxAge}, stale-while-revalidate=${globalSettings.cache.staleWhileRevalidate}`,
    },
  });
}

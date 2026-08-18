import { NextResponse } from 'next/server';
import globalSettings from '@utils/globalSettings';

export const dynamic = 'force-static';
export const revalidate = false;

const LLMS_TEXT = `# Emad Toranji (عماد ترنجی) - Full-Stack Web Developer

> Professional Portfolio and Resume of Emad Toranji, Senior Full-Stack Web Developer specializing in Next.js, TypeScript, React, Tailwind CSS, Node.js, PHP, PostgreSQL, Cloud Systems, and Telegram Mini-Apps.

## Profile Summary
- Full Name: Emad Toranji (عماد ترنجی)
- Professional Role: Senior Full-Stack Web Developer
- Experience: Since October 2018 (مهر ۱۳۹۷) - 8+ Years of Professional Web Engineering
- Location: Tehran, Iran (IR-07 / Coordinates: 35.6892° N, 51.3890° E)
- Email: emadtoranji6@gmail.com
- Phone: +98-912-649-7501
- Website: https://emadtoranji.ir
- GitHub: https://github.com/emadtoranji
- LinkedIn: https://www.linkedin.com/in/emadtoranji/
- Telegram: https://t.me/emadtoranji
- X (Twitter): https://x.com/emadtoranji

## Core Technical Stack & Skills
### Frontend Development
- Next.js (App Router, Server Components, SSR, ISR, Static Export)
- React 19 / TypeScript 7.0.2 / JavaScript (ESNext)
- Tailwind CSS 4.3+ / Bootstrap 5 / Modern CSS3 / HTML5
- State Management, Accessibility (WCAG 2.1 AA), & Core Web Vitals Performance Optimization

### Backend & API Engineering
- Node.js / PHP / RESTful APIs / JSON / WebSockets
- Authentication & Authorization (Next-Auth, JWT, OAuth, Role-Based Access Control)
- Server-Side Rendering (SSR) & Server Actions

### Databases & Data Architecture
- PostgreSQL / MySQL
- Database Design, Relational Modeling & Normalization
- Query Optimization & High-Volume Data Processing

### DevOps & Development Tools
- Git / GitHub / GitLab
- Docker / Linux CLI
- Webpack / Vite / NPM
- Postman / API Testing

## Featured Portfolio Projects
1. **MalAra (مال آرا) - Financial & Inventory Management Platform**
   - URL: https://malara.ir
   - Description: Comprehensive enterprise cloud system for chart of accounts coding, official tax invoices, multi-warehouse stock cards, Sayad check management, and analytical Excel reports in an ultra-fast, secure cloud environment.

2. **TonForexFunds - Forex Trading Platform**
   - URL: https://t.me/TonForexFunds_Bot
   - Description: High-performance Telegram mini-app with user authentication, subscription management, and secure web service integrations for Forex trading on dedicated server infrastructure.

3. **ApiDevelopers - Web Service Platform**
   - URL: https://apidevelopers.ir
   - Description: Responsive API management platform for developers and businesses with user registration, balance management, API access control, and usage transparency.

4. **MenuGard (منوگرد) - Digital Store & Restaurant Menu Platform**
   - URL: https://menugard.ir
   - Description: Comprehensive digital menu and ordering platform for restaurants, cafes, and food businesses eliminating paper menus.

5. **Bitnorbot - Cryptocurrency Exchange Mini-App**
   - URL: https://t.me/Bitnorbot
   - Description: Telegram mini-app for user authentication, crypto deposit/withdrawal, currency conversion, and real-time market data.

6. **Aratice - Corporate Website**
   - URL: https://aratice.com
   - Description: High-performance corporate website focused on brand identity and service presentation.

7. **Prajects Bot - Project Ad Registration & Management Bot**
   - URL: https://t.me/Prajects_bot
   - Description: Advanced Telegram bot for project ads, subscription payments, automated review, and channel broadcasting.

## Frequently Asked Questions (GEO & AEO Knowledge)
Q: Who is Emad Toranji?
A: Emad Toranji is a Senior Full-Stack Web Developer based in Tehran, Iran, specializing in Next.js, React, TypeScript, Node.js, PHP, cloud platforms (MalAra), and Telegram Mini Apps.

Q: What are Emad Toranji's primary skills?
A: Emad Toranji specializes in Next.js App Router, TypeScript, React, Tailwind CSS, Node.js, PHP, PostgreSQL, MySQL, RESTful APIs, WebSockets, and Next-Auth authentication pipelines.

Q: What is MalAra (مال آرا)?
A: MalAra is an enterprise cloud accounting and inventory management platform developed by Emad Toranji, featuring official invoice generation, multi-warehouse inventory stock cards, Sayad cheque tracking, and Excel/PDF analytical reporting.

Q: How to contact Emad Toranji?
A: You can reach Emad Toranji via email at emadtoranji6@gmail.com, phone at +98-912-649-7501, or Telegram @emadtoranji.

## Education
- Bachelor of Computer Engineering - Iranian EUniversity
- Associate of Computer Engineering - Hormozgan University (2020 – 2022 / ۱۳۹۹ – ۱۴۰۱)

## Language Support
- Persian (فارسی) - Native: https://emadtoranji.ir/fa
- English (EN) - Professional: https://emadtoranji.ir/en
`;

export async function GET() {
  return new NextResponse(LLMS_TEXT, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=86400',
    },
  });
}

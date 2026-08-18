# 🚀 Next.js Modern Open-Source Resume & Portfolio Template

[![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![i18n](https://img.shields.io/badge/i18n-Persian%20%2F%20English-emerald?style=for-the-badge)](src/app/i18n/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A high-performance, fully accessible, bilingual (FA/EN) **Resume and Portfolio Web Application** template built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS 4**, and **TypeScript**. 

Designed specifically for developers, engineers, and creators who want a ultra-fast, professional online presence optimized for search engines (**SEO**), AI generative engines (**GEO**), answer engines (**AEO**), screen reader accessibility, and A4 print export.

---

## ✨ Key Features

- 🌐 **Bilingual & i18n Ready**: Native support for **Persian (RTL)** and **English (LTR)** with seamless route-based language switching (`/fa`, `/en`).
- 💡 **Creative Acronym Tooltips**: Hover over technology abbreviations (`SEO`, `SSR`, `RSC`, `JWT`, `RBAC`, `TMA`, `JSON-LD`, etc.) to trigger interactive floating explanation tooltips with smooth animations.
- ♿ **Accessibility First (`sr-only`)**: Every interactive button and link features screen-reader-only labels for full WCAG compliance.
- 🚀 **SEO, GEO & AEO Optimized**:
  - **Structured Data (JSON-LD)**: Rich schema for `Person`, `ProfilePage`, `WebSite`, `FAQPage`, and `SpeakableSpecification`.
  - **LLM Ready (`llms.txt`)**: Integrated plain-text representation for AI crawlers like Gemini, ChatGPT, Claude, and Perplexity.
  - **Meta Tags**: OpenGraph cards, Twitter cards, geo-coordinates, hreflang alternates, and automatic sitemap generation.
- 🎨 **Tailwind CSS 4 & Custom Aesthetics**: High-contrast, clean layout with responsive grid, hover micro-interactions, and custom scrollbar controls.
- 📜 **Scrollable Sidebar (`no-scrollbar`)**: Sticky sidebar that scrolls smoothly without cluttering the screen with visible scrollbars.
- 🖨️ **A4 Print Engine**: Optimized CSS stylesheet for saving or printing clean, single/multi-page PDF resumes directly from the browser.

---

## 📁 Project Directory Structure

```text
├── public/
│   ├── images/               # Application logos, social cards & avatars
│   ├── styles/general/       # Global CSS stylesheets (Tailwind v4, globals, colors)
│   └── llms.txt              # Plaintext context for LLM crawlers
├── src/
│   ├── app/
│   │   ├── [lng]/            # Dynamic route handler for languages (fa / en)
│   │   │   ├── page.tsx      # Main resume & portfolio page
│   │   │   └── layout.tsx    # Language wrapper layout
│   │   ├── i18n/             # Translations & i18next configuration
│   │   │   └── locales/      # FA & EN JSON translation dictionaries
│   │   ├── robots.ts         # Automated SEO robot directives
│   │   └── sitemap.ts        # Automated XML sitemap generator
│   ├── components/
│   │   ├── AbbrTooltip.tsx   # Creative acronym hover tooltip component
│   │   ├── ContactIcon.tsx   # Contact method icons
│   │   └── SocialIcon.tsx    # Social platform icons
│   └── utils/
│       ├── globalSettings.ts # Central project configuration & site settings
│       ├── metadata.ts       # Meta tags & OpenGraph generator
│       └── numbers.ts        # Farsi number converters
```

---

## 🛠️ Quick Start & Installation

### Prerequisites
- **Node.js**: `v22.0.0` or higher
- **Package Manager**: `npm`, `yarn`, `pnpm`, or `bun`

### 1. Fork & Clone the Repository
Click the **Fork** button at the top right of the GitHub page, then clone your fork:

```bash
git clone https://github.com/emadtoranji/emadtoranji.ir.git
cd emadtoranji.ir
```

### 2. Install Dependencies
```bash
npm install
# or
bun install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory:

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the live preview.

---

## ✏️ Customization Tutorial

Follow these simple steps to adapt this template for your personal or client portfolio:

### Step 1: Update Global Site Configuration
Open `src/utils/globalSettings.ts` and replace the generic information with your details:

```typescript
export const globalSettings = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com/',
  site: {
    name: 'YOUR NAME',
    nameFa: 'نام شما',
    titleEn: 'Your Name - Full-Stack Engineer',
    titleFa: 'رزومه نام شما - مهندس نرم‌افزار',
    descriptionEn: 'Your English bio and summary...',
    descriptionFa: 'توضیحات فارسی درباره شما...',
    twitter: '@yourusername',
    github: 'https://github.com/yourusername',
    linkedin: 'https://www.linkedin.com/in/yourusername/',
    telegram: 'https://t.me/yourusername',
    email: 'your.email@example.com',
    phone: '+1234567890',
    locationEn: 'City, Country',
    locationFa: 'شهر، کشور',
  },
  geo: {
    region: 'YOUR-REGION',
    placename: 'Your City',
    latitude: 35.6892,
    longitude: 51.3890,
    country: 'IR',
  },
};
```

### Step 2: Edit Translations & Resume Content
All localized resume text (Work Experience, Skills, Portfolio Projects, Education, Contact Labels) is stored in clean JSON files:

- **English Translations**: `src/app/i18n/locales/en/common.json`
- **Persian Translations**: `src/app/i18n/locales/fa/common.json`

Example `common.json`:
```json
{
  "home": {
    "header-title": "YOUR NAME",
    "summary-title": "Professional Summary",
    "summary-text": "Experienced engineer specializing in Next.js, React, and Node.js...",
    "skills-title": "Skills",
    "portfolio-title": "Featured Projects"
  }
}
```

### Step 3: Add / Modify Tech Acronyms & Tooltips
To add new acronyms or update existing explanations, edit `src/components/AbbrTooltip.tsx`:

```typescript
export const ABBREVIATIONS_MAP: Record<string, AbbrInfo> = {
  SEO: {
    fullEn: 'Search Engine Optimization',
    descFa: 'بهینه‌سازی وب‌سایت برای موتورهای جستجو',
    descEn: 'Optimizing web content for search engines.',
  },
  // Add your custom acronyms here!
};
```

Any acronym matching the dictionary in your text or skill badges will automatically render with an interactive floating tooltip.

---

## ⚡ Available NPM Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local development server on port 3000 |
| `npm run build` | Builds optimized production static output |
| `npm run start` | Runs the compiled production server |
| `npm run lint` | Runs ESLint syntax and code quality checks |
| `npm run prettier` | Formats code styling according to project rules |

---

## 🚀 Deployment Guide

### Deploying to Vercel (Recommended)
1. Push your code to GitHub.
2. Connect your repository to [Vercel](https://vercel.com).
3. Set `NEXT_PUBLIC_BASE_URL` in environment variables.
4. Click **Deploy**.

### Deploying with Docker
A `Dockerfile` can be used to run the application in containerized environments like Google Cloud Run or AWS ECS:

```bash
docker build -t my-resume-app .
docker run -p 3000:3000 my-resume-app
```

---

## 📄 License

This project is open-source software licensed under the **[MIT License](LICENSE)**. Feel free to fork, customize, and share!

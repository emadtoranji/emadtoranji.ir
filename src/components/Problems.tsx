import React from 'react';
import { fallbackLng } from '@i18n/settings';
import Link from 'next/link';

interface ProblemsContent {
  title: string;
  button: string;
}

interface ProblemProps {
  content: ProblemsContent;
  code?: number | string;
  currentLang?: string;
}

export default function Problem({ content, code = 404, currentLang = fallbackLng }: ProblemProps) {
  return (
    <div className='flex items-center justify-center min-h-screen py-12 bg-[#e8edfb] text-[#212529] px-4'>
      <div className='max-w-md w-full text-center space-y-6 bg-white border border-[#212529]/10 p-8 rounded-2xl shadow-sm'>
        <div>
          <h1 className='text-6xl md:text-8xl font-black text-[#1e3a8a] tracking-tight m-0'>{code}</h1>
        </div>
        <div>
          <p className='text-base md:text-lg text-[#212529]/80 m-0'>{content.title}</p>
        </div>
        <div>
          <Link
            className='inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#1e3a8a] text-[#facc15] font-semibold hover:bg-[#1e3a8a]/90 transition-all shadow-xs active:scale-95 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a8a]'
            href={`/${currentLang}`}
            aria-label={content.button}
          >
            <span>{content.button}</span>
            <span className='sr-only'>{` - Return to home page in ${currentLang}`}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

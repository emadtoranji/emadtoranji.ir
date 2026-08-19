import React from 'react';

interface SectionCardProps {
  id: string;
  title: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({ id, title, action, className = '', children }) => (
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

export default SectionCard;

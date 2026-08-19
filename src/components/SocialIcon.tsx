import Image from 'next/image';
import React from 'react';

interface SocialIconProps {
  name: string;
  className?: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ name, className = 'w-6 h-6' }) => {
  const normalized = name.toLowerCase().trim();

  if (normalized.includes('telegram') || normalized === 'tg') {
    return (
      <Image
        src='/images/icons/social/telegram.svg'
        alt='Telegram Icon'
        width={16}
        height={16}
        className={className}
        aria-hidden='true'
      />
    );
  }

  if (normalized.includes('linkedin')) {
    return (
      <Image
        src='/images/icons/social/linkedin.svg'
        alt='LinkedIn Icon'
        width={16}
        height={16}
        className={className}
        aria-hidden='true'
      />
    );
  }

  if (normalized.includes('github') || normalized.includes('git')) {
    return (
      <Image
        src='/images/icons/social/github.svg'
        alt='Github Icon'
        width={16}
        height={16}
        className={className}
        aria-hidden='true'
      />
    );
  }

  if (normalized.includes('twitter') && !normalized.includes(' x') && normalized !== 'x') {
    return (
      <Image
        src='/images/icons/social/x.svg'
        alt='X/Twitter Icon'
        width={16}
        height={16}
        className={className}
        aria-hidden='true'
      />
    );
  }

  if (normalized.includes('x') || normalized.includes('twitter')) {
    return (
      <Image
        src='/images/icons/social/x.svg'
        alt='X/Twitter Icon'
        width={16}
        height={16}
        className={className}
        aria-hidden='true'
      />
    );
  }

  if (normalized.includes('instagram') || normalized.includes('insta')) {
    return (
      <Image
        src='/images/icons/social/instagram.svg'
        alt='Instagram Icon'
        width={16}
        height={16}
        className={className}
        aria-hidden='true'
      />
    );
  }

  if (normalized.includes('youtube')) {
    return (
      <Image
        src='/images/icons/social/youtube.svg'
        alt='Youtube Icon'
        width={16}
        height={16}
        className={className}
        aria-hidden='true'
      />
    );
  }

  if (normalized.includes('whatsapp')) {
    return (
      <Image
        src='/images/icons/social/whatsapp.svg'
        alt='Whatsapp Icon'
        width={16}
        height={16}
        className={className}
        aria-hidden='true'
      />
    );
  }

  if (normalized.includes('discord')) {
    return (
      <Image
        src='/images/icons/social/discord.svg'
        alt='Discord Icon'
        width={16}
        height={16}
        className={className}
        aria-hidden='true'
      />
    );
  }

  if (normalized.includes('gitlab')) {
    return (
      <Image
        src='/images/icons/social/gitlab.svg'
        alt='Gitlab Icon'
        width={16}
        height={16}
        className={className}
        aria-hidden='true'
      />
    );
  }

  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
      aria-hidden='true'
    >
      <circle
        cx='12'
        cy='12'
        r='10'
      />
      <path d='M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20' />
      <path d='M2 12h20' />
    </svg>
  );
};

export default SocialIcon;

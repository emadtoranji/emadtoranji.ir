import React from 'react';
import { User, Mail, Phone, MapPin, ExternalLink, LucideProps } from 'lucide-react';

export interface ContactIconProps extends LucideProps {
  name: string;
}

export const ContactIcon: React.FC<ContactIconProps> = ({
  name,
  className = 'w-5 h-5',
  strokeWidth = 2.5,
  ...props
}) => {
  const normalized = name.toLowerCase();

  if (normalized.includes('person') || normalized.includes('user') || normalized.includes('name')) {
    return (
      <User
        className={className}
        strokeWidth={strokeWidth}
        {...props}
      />
    );
  }

  if (normalized.includes('envelope') || normalized.includes('mail') || normalized.includes('email')) {
    return (
      <Mail
        className={className}
        strokeWidth={strokeWidth}
        {...props}
      />
    );
  }

  if (normalized.includes('phone') || normalized.includes('tel') || normalized.includes('call')) {
    return (
      <Phone
        className={className}
        strokeWidth={strokeWidth}
        {...props}
      />
    );
  }

  if (
    normalized.includes('geo') ||
    normalized.includes('map') ||
    normalized.includes('address') ||
    normalized.includes('location')
  ) {
    return (
      <MapPin
        className={className}
        strokeWidth={strokeWidth}
        {...props}
      />
    );
  }

  return (
    <ExternalLink
      className={className}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
};

export default ContactIcon;

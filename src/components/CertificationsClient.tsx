'use client';

import { useState, useCallback } from 'react';
import type { Certification } from '@/lib/types';
import CertificationBadge from './CertificationBadge';
import SectionHeading from './SectionHeading';

interface CertificationsClientProps {
  certifications: Certification[];
}

const LEVEL_STYLES: { [key: string]: string } = {
  professional: 'text-accent',
  specialty: 'text-steel',
  associate: 'text-muted',
  foundational: 'text-muted',
  basic: 'text-muted',
};

export default function CertificationsClient({ certifications }: CertificationsClientProps) {
  const [badgeStates, setBadgeStates] = useState<{ [key: number]: boolean }>({});

  const getProviderDisplayName = (provider: string) => {
    switch (provider) {
      case 'aws':
        return 'AWS';
      case 'azure':
        return 'Azure';
      case 'gcp':
        return 'Google Cloud';
      default:
        return provider.charAt(0).toUpperCase() + provider.slice(1);
    }
  };

  const getCertificationBadgeImage = (certName: string) => {
    // Derive the badge filename from the certification name (see CLAUDE.md)
    const fileName = certName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const basePath = process.env.NODE_ENV === 'production' ? '/work-history' : '';
    return `${basePath}/${fileName}.png`;
  };

  const handleBadgeLoad = useCallback((index: number, hasImage: boolean) => {
    setBadgeStates(prev => ({ ...prev, [index]: hasImage }));
  }, []);

  return (
    <section id="certifications" className="scroll-mt-20 py-14">
      <SectionHeading eyebrow="Certifications" title="保有資格" />

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {certifications.map((cert, index) => (
          <div
            key={index}
            data-print-avoid-break
            className={`flex items-center border border-line bg-surface p-3.5 ${
              badgeStates[index] !== false ? 'gap-3.5' : 'gap-0'
            }`}
          >
            <CertificationBadge
              certName={cert.name}
              badgeImageSrc={getCertificationBadgeImage(cert.name)}
              onImageLoad={(hasImage) => handleBadgeLoad(index, hasImage)}
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium leading-snug text-ink">{cert.name}</h3>
              <p className="mt-1.5 font-mono text-[11px] tracking-[0.06em] text-muted">
                <span className={`uppercase ${LEVEL_STYLES[cert.level] || LEVEL_STYLES.basic}`}>
                  {cert.level}
                </span>
                {' ・ '}
                {getProviderDisplayName(cert.category)}
                {' ・ '}
                {cert.date}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted">
        最新の資格情報は{' '}
        <a
          href="https://www.credly.com/users/keisuke-hiraki"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline decoration-line underline-offset-4 hover:decoration-accent"
        >
          Credly
        </a>{' '}
        をご参照ください。
      </p>
    </section>
  );
}

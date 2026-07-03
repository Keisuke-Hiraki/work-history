'use client';

import { useState, useCallback } from 'react';
import type { Certification } from '@/lib/types';
import CertificationBadge from './CertificationBadge';
import SectionHeading from './SectionHeading';

interface CertificationsClientProps {
  certifications: Certification[];
}

const LEVEL_STYLES: { [key: string]: string } = {
  foundational: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  associate: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  professional: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  specialty: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  basic: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400',
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
    // 資格名から画像ファイル名を生成（スペースや特殊文字を除去し、小文字に変換）
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
    <section id="certifications" className="scroll-mt-16 py-14">
      <SectionHeading eyebrow="Certifications" title="保有資格" />

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {certifications.map((cert, index) => (
          <div
            key={index}
            data-print-avoid-break
            className={`flex items-start rounded-xl border border-line bg-surface p-4 shadow-sm ${
              badgeStates[index] !== false ? 'gap-4' : 'gap-0'
            }`}
          >
            <CertificationBadge
              certName={cert.name}
              badgeImageSrc={getCertificationBadgeImage(cert.name)}
              onImageLoad={(hasImage) => handleBadgeLoad(index, hasImage)}
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium leading-snug text-ink">{cert.name}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    LEVEL_STYLES[cert.level] || LEVEL_STYLES.basic
                  }`}
                >
                  {cert.level}
                </span>
                <span className="font-mono text-xs text-muted">
                  {getProviderDisplayName(cert.category)} ・ {cert.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted">
        最新の資格情報は{' '}
        <a
          href="https://www.credly.com/users/keisuke-hiraki"
          className="text-accent hover:underline"
        >
          Credly
        </a>{' '}
        をご参照ください。
      </p>
    </section>
  );
}

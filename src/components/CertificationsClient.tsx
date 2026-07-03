'use client';

import { useState, useCallback } from 'react';
import type { Certification } from '@/lib/types';
import CertificationBadge from './CertificationBadge';

interface CertificationsClientProps {
  certifications: Certification[];
}

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
    <section id="certifications" className="scroll-mt-16 border-t border-rule py-16">
      <h2 className="font-heading text-2xl text-ink">保有資格</h2>

      <div className="mt-8 divide-y divide-rule">
        {certifications.map((cert, index) => (
          <div
            key={index}
            data-print-avoid-break
            className={`flex items-start py-4 ${badgeStates[index] !== false ? 'gap-4' : 'gap-0'}`}
          >
            <CertificationBadge
              certName={cert.name}
              badgeImageSrc={getCertificationBadgeImage(cert.name)}
              onImageLoad={(hasImage) => handleBadgeLoad(index, hasImage)}
            />
            <div className="min-w-0 flex-1">
              <h3 className="leading-tight text-ink">{cert.name}</h3>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 font-mono text-xs text-ink-muted">
                <span>{getProviderDisplayName(cert.category)}</span>
                <span>[{cert.level}]</span>
                <span>{cert.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-ink-muted">
        最新の資格情報は{' '}
        <a
          href="https://www.credly.com/users/keisuke-hiraki"
          className="text-accent underline decoration-rule underline-offset-4 hover:decoration-accent"
        >
          Credly
        </a>{' '}
        をご参照ください。
      </p>
    </section>
  );
}

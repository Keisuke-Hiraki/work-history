'use client';

import { useState } from 'react';

interface CertificationBadgeProps {
  certName: string;
  badgeImageSrc: string;
  onImageLoad?: (hasImage: boolean) => void;
}

export default function CertificationBadge({ certName, badgeImageSrc, onImageLoad }: CertificationBadgeProps) {
  const [imageExists, setImageExists] = useState(true);

  const handleImageError = () => {
    setImageExists(false);
    onImageLoad?.(false);
  };

  const handleImageSuccess = () => {
    setImageExists(true);
    onImageLoad?.(true);
  };

  if (!imageExists) {
    return null;
  }

  return (
    <div className="flex-shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={badgeImageSrc}
        alt={`${certName} バッジ`}
        className="w-16 h-16 object-contain rounded-lg bg-white dark:bg-slate-800 p-1"
        onError={handleImageError}
        onLoad={handleImageSuccess}
      />
    </div>
  );
}
'use client';

import { useState } from 'react';

interface CertificationBadgeProps {
  badgeImageSrc: string;
  badgeAlt: string;
  onImageLoad?: (hasImage: boolean) => void;
}

export default function CertificationBadge({ badgeImageSrc, badgeAlt, onImageLoad }: CertificationBadgeProps) {
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
        alt={badgeAlt}
        className="h-14 w-14 rounded-[3px] object-contain"
        onError={handleImageError}
        onLoad={handleImageSuccess}
      />
    </div>
  );
}
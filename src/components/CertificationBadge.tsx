'use client';

interface CertificationBadgeProps {
  certName: string;
  badgeImageSrc: string;
}

export default function CertificationBadge({ certName, badgeImageSrc }: CertificationBadgeProps) {
  return (
    <div className="flex-shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={badgeImageSrc}
        alt={`${certName} バッジ`}
        className="w-16 h-16 object-contain rounded-lg bg-white dark:bg-slate-800 p-1"
        onError={(e) => {
          // バッジ画像が見つからない場合は非表示にする
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    </div>
  );
}
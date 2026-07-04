'use client';

import { useLanguage } from './LanguageProvider';

export default function PrintButton() {
  const { t } = useLanguage();

  return (
    <button
      onClick={() => window.print()}
      className="whitespace-nowrap border border-accent bg-accent px-3 py-1.5 font-mono text-xs font-medium tracking-[0.06em] text-white transition-opacity hover:opacity-85 dark:text-[#0E1216]"
    >
      {t.header.printLabel}
    </button>
  );
}

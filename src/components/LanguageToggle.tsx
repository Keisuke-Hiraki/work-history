'use client';

import { useLanguage } from './LanguageProvider';

export default function LanguageToggle() {
  const { locale, toggleLocale, t } = useLanguage();
  const nextLocaleLabel = locale === 'ja' ? 'EN' : 'JA';

  return (
    <button
      onClick={toggleLocale}
      className="whitespace-nowrap border border-line px-2 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted transition-colors hover:border-accent hover:text-accent"
      aria-label={t.header.languageToggleAria}
    >
      {nextLocaleLabel}
    </button>
  );
}

'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { ResumeData } from '@/lib/resumeData';
import { translations, type Locale, type Translations } from '@/lib/i18n';

const STORAGE_KEY = 'locale';

interface LanguageContextValue {
  locale: Locale;
  toggleLocale: () => void;
  data: ResumeData;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  dataJa: ResumeData;
  dataEn: ResumeData;
  children: ReactNode;
}

export default function LanguageProvider({ dataJa, dataEn, children }: LanguageProviderProps) {
  // Default to Japanese so the initial client render matches the server-rendered markup;
  // the saved preference (if any) is applied right after mount, mirroring DarkModeScript's approach.
  const [locale, setLocale] = useState<Locale>('ja');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'ja' || saved === 'en') {
      setLocale(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const toggleLocale = () => {
    setLocale((prev) => {
      const next: Locale = prev === 'ja' ? 'en' : 'ja';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  const value: LanguageContextValue = {
    locale,
    toggleLocale,
    data: locale === 'ja' ? dataJa : dataEn,
    t: translations[locale],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

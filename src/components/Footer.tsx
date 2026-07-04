'use client';

import { useLanguage } from './LanguageProvider';

export default function Footer() {
  const { data: resumeData } = useLanguage();
  const { lastUpdated, socialLinks } = resumeData;

  return (
    <footer className="print:hidden border-t border-line">
      <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
        <p className="font-mono text-xs tracking-[0.06em] text-muted">LAST UPDATED: {lastUpdated}</p>

        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted transition-colors hover:text-accent"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

'use client';

import DarkModeToggle from './DarkModeToggle';
import PrintButton from './PrintButton';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from './LanguageProvider';

export default function Header() {
  const { locale, t } = useLanguage();

  const navLinks = [
    { href: '#profile', label: t.nav.profile },
    { href: '#experience', label: t.nav.experience },
    { href: '#skills', label: t.nav.skills },
    { href: '#certifications', label: t.nav.certifications },
    { href: '#community', label: t.nav.community },
  ];

  const resumeMdFile = locale === 'en' ? 'resume.en.md' : 'resume.md';
  const resumeMdHref = `${process.env.NODE_ENV === 'production' ? '/work-history' : ''}/${resumeMdFile}`;

  return (
    <header className="print:hidden sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 overflow-x-auto px-6 py-3">
        <a
          href="#profile"
          className="flex shrink-0 items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink"
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-[1px] bg-accent" />
          Hiraki Keisuke
        </a>

        <div className="flex shrink-0 items-center gap-5">
          <nav className="flex gap-4 text-sm text-muted">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 border-l border-line pl-4">
            <a
              href={resumeMdHref}
              className="whitespace-nowrap font-mono text-xs text-muted transition-colors hover:text-accent"
            >
              .md
            </a>
            <PrintButton />
            <LanguageToggle />
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

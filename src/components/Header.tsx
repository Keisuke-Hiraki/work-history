import DarkModeToggle from './DarkModeToggle';
import PrintButton from './PrintButton';

const NAV_LINKS = [
  { href: '#profile', label: '概要' },
  { href: '#experience', label: '職務経歴' },
  { href: '#skills', label: 'スキル' },
  { href: '#certifications', label: '資格' },
  { href: '#community', label: '社外活動' },
];

export default function Header() {
  const resumeMdHref = `${process.env.NODE_ENV === 'production' ? '/work-history' : ''}/resume.md`;

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
            {NAV_LINKS.map((link) => (
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
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

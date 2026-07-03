import DarkModeToggle from './DarkModeToggle';
import PrintButton from './PrintButton';

const NAV_LINKS = [
  { href: '#personal', label: '基本情報' },
  { href: '#experience', label: '職務経歴' },
  { href: '#skills', label: 'スキル' },
  { href: '#certifications', label: '資格' },
];

export default function Header() {
  const resumeMdHref = `${process.env.NODE_ENV === 'production' ? '/work-history' : ''}/resume.md`;

  return (
    <header className="print:hidden sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 overflow-x-auto px-6 py-3">
        <a href="#personal" className="shrink-0 font-display text-sm font-bold tracking-tight text-ink">
          Keisuke Hiraki
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
              className="whitespace-nowrap text-sm text-muted transition-colors hover:text-ink"
            >
              Markdown
            </a>
            <PrintButton />
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

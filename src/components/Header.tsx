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
    <header className="print:hidden sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 overflow-x-auto px-6 py-4">
        <span className="shrink-0 font-heading text-lg text-ink">平木 佳介</span>

        <div className="flex shrink-0 items-center gap-6">
          <nav className="flex gap-5 text-sm text-ink-muted">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4 border-l border-rule pl-4">
            <a
              href={resumeMdHref}
              className="whitespace-nowrap text-sm text-ink-muted transition-colors hover:text-accent"
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

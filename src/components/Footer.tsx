import { getResumeData } from '@/lib/resumeData';
import Seal from './Seal';

export default function Footer() {
  const resumeData = getResumeData();
  const { lastUpdated, socialLinks } = resumeData;

  return (
    <footer className="print:hidden mx-auto max-w-2xl border-t border-rule px-6 py-12">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <Seal size="sm" />
          <p className="font-mono text-xs text-ink-muted">最終更新日: {lastUpdated}</p>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {socialLinks.slice(0, 4).map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ink-muted transition-colors hover:text-accent"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      <p className="mt-8 text-xs text-ink-muted">
        このサイトは{' '}
        <a
          href="https://keisuke-hiraki.github.io/work-history/"
          className="underline decoration-rule underline-offset-2 hover:text-accent"
        >
          GitHub Pages
        </a>{' '}
        で公開されています。
      </p>
    </footer>
  );
}

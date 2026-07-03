import { getResumeData } from '@/lib/resumeData';

export default function Footer() {
  const resumeData = getResumeData();
  const { lastUpdated, socialLinks } = resumeData;

  return (
    <footer className="print:hidden border-t border-line">
      <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
        <p className="font-mono text-xs text-muted">最終更新日: {lastUpdated}</p>

        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {socialLinks.slice(0, 4).map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 pb-8">
        <p className="text-xs text-muted">
          このサイトは{' '}
          <a
            href="https://keisuke-hiraki.github.io/work-history/"
            className="text-accent hover:underline"
          >
            GitHub Pages
          </a>{' '}
          で公開されています。
        </p>
      </div>
    </footer>
  );
}

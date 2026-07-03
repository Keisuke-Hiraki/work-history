import { getResumeData } from '@/lib/resumeData';
import Seal from './Seal';

export default function PersonalInfo() {
  const resumeData = getResumeData();
  const { personalInfo, socialLinks } = resumeData;

  return (
    <section id="personal" className="scroll-mt-16 py-16">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl leading-tight text-ink md:text-5xl">
            {personalInfo.name.japanese}
          </h1>
          {personalInfo.name.english && (
            <p className="mt-1 font-mono text-sm text-ink-muted">
              {personalInfo.name.english}
            </p>
          )}
          <p className="mt-4 text-ink-muted">{personalInfo.role}</p>
        </div>
        <Seal />
      </div>

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-rule pt-6">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent"
          >
            {link.name}
          </a>
        ))}
      </div>
    </section>
  );
}

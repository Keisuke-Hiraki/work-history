'use client';

import { useLanguage } from './LanguageProvider';
import { renderInlineMarkdownText } from './InlineMarkdownText';

function SpecRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-line py-3 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[130px_1fr] md:gap-4">
      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-steel">{label}</dt>
      <dd className="text-sm leading-relaxed text-ink">{children}</dd>
    </div>
  );
}

export default function PersonalInfo() {
  const { data: resumeData, t } = useLanguage();
  const { personalInfo, socialLinks, certifications, awards, personalActivities, careerSummary, workExperience } =
    resumeData;

  const awsCertCount = certifications.filter((cert) => cert.category === 'aws').length;
  const currentCompany = careerSummary.find((item) => item.status === 'current')?.description;

  return (
    <section id="profile" className="scroll-mt-20 pt-14 pb-16 md:pt-20 md:pb-20">
      <div className="rise">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel">
          Career History <span className="text-muted">/</span> {t.personalInfo.eyebrowSuffix}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink md:text-[3.4rem] md:leading-[1.1]">
          {personalInfo.name.japanese}
        </h1>
        {personalInfo.name.english && (
          <p className="mt-3 font-mono text-sm tracking-[0.08em] text-muted">{personalInfo.name.english}</p>
        )}
      </div>

      <div className="rise rise-2 mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-lg font-medium text-ink">{personalInfo.role}</p>
        {currentCompany && (
          <p className="flex items-center gap-2 text-sm text-muted">
            <span className="node-current inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            {currentCompany} {t.personalInfo.present}
          </p>
        )}
      </div>

      {workExperience.overviewText && (
        <p className="rise rise-3 mt-6 max-w-2xl leading-relaxed text-muted">
          {renderInlineMarkdownText(workExperience.overviewText)}
        </p>
      )}

      <dl className="frame rise rise-4 mt-12 bg-surface p-5 md:p-6">
        <span className="frame-tag">Profile</span>

        <SpecRow label="Focus">
          {t.personalInfo.focus}
        </SpecRow>

        <SpecRow label="AWS Certified">
          {t.personalInfo.awsCertified(awsCertCount)}
        </SpecRow>

        {awards.length > 0 && (
          <SpecRow label="Awards">
            <ul className="space-y-1">
              {awards.map((award, index) => (
                <li key={index}>
                  {award.url ? (
                    <a
                      href={award.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                    >
                      {award.name}
                    </a>
                  ) : (
                    award.name
                  )}
                  <span className="ml-2 font-mono text-xs text-muted">{award.year}</span>
                </li>
              ))}
            </ul>
          </SpecRow>
        )}

        <SpecRow label="Community">
          {t.personalInfo.community(personalActivities.speaking.length, personalActivities.eventOrganizing.length)}
        </SpecRow>

        <SpecRow label="Links">
          <span className="flex flex-wrap gap-x-4 gap-y-1.5">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted transition-colors hover:text-accent"
              >
                {link.name} ↗
              </a>
            ))}
          </span>
        </SpecRow>
      </dl>
    </section>
  );
}

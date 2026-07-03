import { getResumeData } from '@/lib/resumeData';
import SectionHeading from './SectionHeading';

export default function Awards() {
  const resumeData = getResumeData();
  const { awards } = resumeData;

  return (
    <section className="py-14">
      <SectionHeading eyebrow="Awards" title="表彰" />

      <div className="mt-8 divide-y divide-line border-y border-line">
        {awards.map((award, index) => (
          <div
            key={index}
            data-print-avoid-break
            className="flex items-baseline justify-between gap-4 py-4"
          >
            <h3 className="font-medium text-ink">
              {award.url ? (
                <a
                  href={award.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {award.name} <span aria-hidden="true" className="text-muted">↗</span>
                </a>
              ) : (
                award.name
              )}
            </h3>
            <span className="shrink-0 font-mono text-xs text-muted">{award.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

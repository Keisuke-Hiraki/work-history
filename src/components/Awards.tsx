import { getResumeData } from '@/lib/resumeData';

export default function Awards() {
  const resumeData = getResumeData();
  const { awards } = resumeData;

  return (
    <section className="border-t border-rule py-16">
      <h2 className="font-heading text-2xl text-ink">表彰</h2>

      <div className="mt-8 divide-y divide-rule">
        {awards.map((award, index) => (
          <div key={index} data-print-avoid-break className="flex items-baseline justify-between gap-4 py-4">
            <h3 className="text-ink">
              {award.url ? (
                <a
                  href={award.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  {award.name}
                </a>
              ) : (
                award.name
              )}
            </h3>
            <span className="shrink-0 font-mono text-xs text-ink-muted">{award.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

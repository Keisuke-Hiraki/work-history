import { getResumeData } from '@/lib/resumeData';

export default function CareerSummary() {
  const resumeData = getResumeData();
  const { careerSummary } = resumeData;

  return (
    <section className="border-t border-rule py-16">
      <h2 className="font-heading text-2xl text-ink">職務経歴概略</h2>
      <div className="mt-8 divide-y divide-rule">
        {careerSummary.map((item, index) => (
          <div key={index} className="flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:gap-6">
            <span className="shrink-0 font-mono text-sm text-ink-muted md:w-56">
              {item.period}
            </span>
            <span className="text-ink">{item.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

import { getResumeData } from '@/lib/resumeData';
import SectionHeading from './SectionHeading';

export default function CareerSummary() {
  const resumeData = getResumeData();
  const { careerSummary } = resumeData;

  return (
    <section className="py-14">
      <SectionHeading eyebrow="Career" title="職務経歴概略" />
      <div className="mt-8 divide-y divide-line border-y border-line">
        {careerSummary.map((item, index) => (
          <div key={index} className="flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:gap-8">
            <span className="flex shrink-0 items-center gap-2 font-mono text-sm text-muted md:w-64">
              {item.period}
              {item.status === 'current' && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  在籍中
                </span>
              )}
            </span>
            <span className="font-medium text-ink">{item.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

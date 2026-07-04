'use client';

import { useLanguage } from './LanguageProvider';
import SectionHeading from './SectionHeading';
import type { Translations } from '@/lib/i18n';

function getCategoryDisplayName(category: string, categories: Translations['skills']['categories']): string {
  return categories[category] || category;
}

function SkillTable({ tag, rows }: { tag: string; rows: Array<[string, string[]]> }) {
  return (
    <div className="frame bg-surface p-5 md:p-6">
      <span className="frame-tag">{tag}</span>
      <dl>
        {rows.map(([label, items]) => (
          <div
            key={label}
            className="grid gap-1 border-t border-line py-2.5 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[240px_1fr] md:gap-4"
          >
            <dt className="text-sm font-medium text-ink">{label}</dt>
            <dd className="font-mono text-xs leading-relaxed text-muted">{items.join(' / ')}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function Skills() {
  const { data: resumeData, t } = useLanguage();
  const { skills } = resumeData;

  const awsRows: Array<[string, string[]]> = Object.entries(skills.aws).map(([category, list]) => [
    getCategoryDisplayName(category, t.skills.categories),
    list,
  ]);

  const otherRows: Array<[string, string[]]> = [
    ...(skills.iac.length > 0 ? ([['IaC', skills.iac]] as Array<[string, string[]]>) : []),
    ...(skills.os.length > 0 ? ([['OS', skills.os]] as Array<[string, string[]]>) : []),
    ...Object.entries(skills.saas).map(([vendor, tools]): [string, string[]] => [`SaaS — ${vendor}`, tools]),
  ];

  return (
    <section id="skills" className="scroll-mt-20 py-14">
      <SectionHeading eyebrow="Skills" title={t.skills.title} />

      <div className="mt-8 space-y-10">
        <SkillTable tag="AWS" rows={awsRows} />
        <SkillTable tag="Other" rows={otherRows} />
      </div>
    </section>
  );
}

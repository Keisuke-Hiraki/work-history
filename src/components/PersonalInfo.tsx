import { getResumeData } from '@/lib/resumeData';

function NodeDiagram() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 360 240"
      className="print:hidden pointer-events-none absolute -top-4 right-0 hidden h-56 w-80 text-accent md:block"
    >
      <g stroke="currentColor" strokeWidth="1" strokeOpacity="0.18" fill="none">
        <path d="M40 200 L120 140 L230 170 L320 90" />
        <path d="M120 140 L150 60 L260 40" />
        <path d="M230 170 L260 40" />
        <path d="M150 60 L40 40" />
      </g>
      <g fill="currentColor" fillOpacity="0.3">
        <rect x="36" y="196" width="8" height="8" rx="1.5" />
        <rect x="116" y="136" width="8" height="8" rx="1.5" />
        <rect x="226" y="166" width="8" height="8" rx="1.5" />
        <rect x="316" y="86" width="8" height="8" rx="1.5" />
        <rect x="146" y="56" width="8" height="8" rx="1.5" />
        <rect x="256" y="36" width="8" height="8" rx="1.5" />
        <rect x="36" y="36" width="8" height="8" rx="1.5" />
      </g>
    </svg>
  );
}

export default function PersonalInfo() {
  const resumeData = getResumeData();
  const { personalInfo, socialLinks, certifications, awards, personalActivities } = resumeData;

  const stats = [
    { label: '保有資格', value: certifications.length },
    { label: '表彰', value: awards.length },
    { label: '登壇', value: personalActivities.speaking.length },
  ];

  return (
    <section id="personal" className="relative scroll-mt-16 py-16 md:py-20">
      <NodeDiagram />

      <div className="relative">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Resume / 職務経歴書</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
          {personalInfo.name.japanese}
        </h1>
        {personalInfo.name.english && (
          <p className="mt-2 font-mono text-sm text-muted">{personalInfo.name.english}</p>
        )}
        <p className="mt-4 text-lg text-muted">{personalInfo.role}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      <dl className="mt-12 grid grid-cols-3 divide-x divide-line border-y border-line">
        {stats.map((stat) => (
          <div key={stat.label} className="px-6 py-5 first:pl-0">
            <dd className="font-display text-3xl font-bold tabular-nums tracking-tight text-ink">
              {stat.value}
            </dd>
            <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

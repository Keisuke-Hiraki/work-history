'use client';

import { useLanguage } from './LanguageProvider';
import SectionHeading from './SectionHeading';
import { renderInlineMarkdownText } from './InlineMarkdownText';

function TechChip({ children }: { children: string }) {
  return (
    <span className="whitespace-nowrap border border-line bg-canvas px-2 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-[0.1em] leading-6 text-steel">
        {label}
      </span>
      <div className="min-w-0 flex-1 text-sm leading-6 text-muted">{children}</div>
    </div>
  );
}

export default function WorkExperience() {
  const { data: resumeData, t } = useLanguage();
  const { workExperience, companies, careerSummary } = resumeData;

  return (
    <section id="experience" className="scroll-mt-20 py-14">
      <SectionHeading eyebrow="Work Experience" title={t.workExperience.title} />

      {workExperience.overview.length > 0 && (
        <ul className="mt-8 max-w-3xl space-y-2">
          {workExperience.overview.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-[1px] bg-steel" aria-hidden="true" />
              <span>{renderInlineMarkdownText(item)}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Compact career timeline */}
      <div className="frame mt-10 bg-surface p-5 md:p-6">
        <span className="frame-tag">Timeline</span>
        <ol>
          {careerSummary.map((item, index) => (
            <li
              key={index}
              className="flex flex-col gap-0.5 border-t border-line py-2.5 first:border-t-0 first:pt-0 last:pb-0 md:flex-row md:items-baseline md:gap-6"
            >
              <span className="flex shrink-0 items-center gap-2.5 font-mono text-xs text-muted md:w-56">
                {item.status === 'current' ? (
                  <span className="node-current h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                ) : (
                  <span className="h-2 w-2 shrink-0 rounded-full border border-dash bg-canvas" aria-hidden="true" />
                )}
                {item.period}
              </span>
              <span className="pl-[18px] text-sm font-medium text-ink md:pl-0">
                {item.description}
                {item.status === 'current' && (
                  <span className="ml-2 font-mono text-xs text-accent">{t.workExperience.presentSuffix}</span>
                )}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Companies drawn as architecture-diagram groups connected by a spine */}
      <div className="relative mt-12 space-y-12 md:before:absolute md:before:top-2 md:before:bottom-2 md:before:-left-6 md:before:border-l md:before:border-dash">
        {companies.map((company, index) => (
          <div key={index} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-[-7px] -left-[29.5px] hidden h-2 w-2 rounded-full border border-steel bg-canvas md:block"
            />
            <div data-print-avoid-break className="frame bg-surface p-5 pt-7 md:p-7 md:pt-8">
              <span className="frame-tag">{company.period}</span>

              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <h3 className="text-xl font-bold tracking-tight text-ink">{company.name}</h3>
                <span className="whitespace-nowrap font-mono text-xs text-muted">{company.employment}</span>
              </div>
              <p className="mt-1.5 text-sm text-muted">
                {renderInlineMarkdownText(company.description)}
                {company.employees && ` ／ ${company.employees}`}
              </p>

              {company.projects.length > 0 && (
                <div className="mt-7 space-y-5">
                  {company.projects.map((project, projectIndex) => (
                    <article
                      key={projectIndex}
                      data-print-avoid-break
                      className="border border-line border-l-2 border-l-steel bg-canvas p-4 md:p-5"
                    >
                      {project.period && (
                        <p className="font-mono text-xs text-muted">{project.period}</p>
                      )}
                      <h4 className="mt-1 font-semibold text-ink">{project.title}</h4>
                      {project.overview && (
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">
                          {renderInlineMarkdownText(project.overview)}
                        </p>
                      )}

                      {(project.technologies.infrastructure?.length || project.technologies.serverSide?.length) ? (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {(project.technologies.infrastructure ?? []).map((tech) => (
                            <TechChip key={tech}>{tech}</TechChip>
                          ))}
                          {(project.technologies.serverSide ?? []).map((tech) => (
                            <TechChip key={tech}>{tech}</TechChip>
                          ))}
                        </div>
                      ) : null}

                      <div className="mt-4 space-y-2">
                        {project.role && <FieldRow label="Role">{project.role}</FieldRow>}
                        {project.processes.length > 0 && (
                          <FieldRow label="Scope">{project.processes.join('、')}</FieldRow>
                        )}
                        {project.tasks.length > 0 && (
                          <FieldRow label="Tasks">
                            <ul className="space-y-1">
                              {project.tasks.map((task, taskIndex) => (
                                <li key={taskIndex} className="flex items-start gap-2">
                                  <span
                                    className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-dash"
                                    aria-hidden="true"
                                  />
                                  <span>{renderInlineMarkdownText(task)}</span>
                                </li>
                              ))}
                            </ul>
                          </FieldRow>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {company.otherActivities && company.otherActivities.length > 0 && (
                <div className="mt-5 border border-line border-l-2 border-l-dash bg-canvas p-4">
                  <h4 className="font-mono text-[11px] uppercase tracking-[0.1em] text-steel">
                    {t.workExperience.otherActivities}
                  </h4>
                  <ul className="mt-2 space-y-1 text-sm text-muted">
                    {company.otherActivities.map((activity, activityIndex) => (
                      <li key={activityIndex} className="flex items-start gap-2">
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-dash" aria-hidden="true" />
                        <span>{renderInlineMarkdownText(activity)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

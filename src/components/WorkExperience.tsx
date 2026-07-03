import { getResumeData } from '@/lib/resumeData';
import SectionHeading from './SectionHeading';

function TechChip({ children }: { children: string }) {
  return (
    <span className="whitespace-nowrap rounded-md border border-line bg-canvas px-2 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

export default function WorkExperience() {
  const resumeData = getResumeData();
  const { workExperience, companies } = resumeData;

  return (
    <section id="experience" className="scroll-mt-16 py-14">
      <SectionHeading eyebrow="Experience" title="職務経歴" />
      <p className="mt-6 max-w-2xl text-muted">
        現在は、AWSクラウドソリューションアーキテクトとして主にAWSを活用した設計構築・コンサルティング支援を行っております。
      </p>

      {workExperience.overview.length > 0 && (
        <ul className="mt-6 grid gap-2 md:grid-cols-2">
          {workExperience.overview.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm text-muted">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-[2px] bg-accent/60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 space-y-8">
        {companies.map((company, index) => (
          <div
            key={index}
            data-print-avoid-break
            className="rounded-xl border border-line bg-surface p-6 shadow-sm md:p-8"
          >
            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
              <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                {company.name}
              </h3>
              <span className="whitespace-nowrap font-mono text-xs text-muted">
                {company.period} ・ {company.employment}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted">
              {company.description} / {company.employees}
            </p>

            {company.projects.length > 0 && (
              <div className="mt-8 space-y-8 border-l border-line pl-6">
                {company.projects.map((project, projectIndex) => (
                  <div key={projectIndex} data-print-avoid-break className="relative">
                    <span className="absolute -left-[29px] top-1 h-2.5 w-2.5 rounded-[2px] border border-accent bg-surface" />
                    {project.period && (
                      <p className="font-mono text-xs text-muted">{project.period}</p>
                    )}
                    <h4 className="mt-1.5 font-medium text-ink">{project.title}</h4>
                    {project.overview && (
                      <p className="mt-2 text-sm text-muted">{project.overview}</p>
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

                    <div className="mt-4 space-y-2 text-sm">
                      {project.role && (
                        <div className="flex gap-3">
                          <span className="w-20 shrink-0 text-xs font-medium uppercase tracking-wide text-muted/70">役割</span>
                          <span className="text-muted">{project.role}</span>
                        </div>
                      )}
                      {project.processes.length > 0 && (
                        <div className="flex gap-3">
                          <span className="w-20 shrink-0 text-xs font-medium uppercase tracking-wide text-muted/70">担当工程</span>
                          <span className="text-muted">{project.processes.join('、')}</span>
                        </div>
                      )}
                      {project.tasks.length > 0 && (
                        <div className="flex gap-3">
                          <span className="w-20 shrink-0 text-xs font-medium uppercase tracking-wide text-muted/70">主な業務</span>
                          <ul className="flex-1 space-y-1 text-muted">
                            {project.tasks.map((task, taskIndex) => (
                              <li key={taskIndex}>・{task}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {company.otherActivities && company.otherActivities.length > 0 && (
              <div className="mt-6 rounded-lg border border-line bg-canvas p-4">
                <h4 className="text-xs font-medium uppercase tracking-wide text-muted/70">その他の業務</h4>
                <ul className="mt-2 space-y-1 text-sm text-muted">
                  {company.otherActivities.map((activity, activityIndex) => (
                    <li key={activityIndex}>・{activity}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

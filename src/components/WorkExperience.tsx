import { getResumeData } from '@/lib/resumeData';

export default function WorkExperience() {
  const resumeData = getResumeData();
  const { workExperience, companies } = resumeData;

  return (
    <section id="experience" className="scroll-mt-16 border-t border-rule py-16">
      <h2 className="font-heading text-2xl text-ink">職務経歴</h2>
      <p className="mt-6 text-ink-muted">
        現在は、AWSクラウドソリューションアーキテクトとして主にAWSを活用した設計構築・コンサルティング支援を行っております。
      </p>

      {workExperience.overview.length > 0 && (
        <div className="mt-8">
          <h3 className="font-heading text-lg text-ink">主な業務経験</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            {workExperience.overview.map((item, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-accent">・</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-14 space-y-16">
        {companies.map((company, index) => (
          <div key={index} data-print-avoid-break>
            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
              <h3 className="font-heading text-xl text-ink">{company.name}</h3>
              <span className="whitespace-nowrap font-mono text-xs text-ink-muted">
                {company.period} ・ {company.employment}
              </span>
            </div>
            <p className="mt-2 text-sm text-ink-muted">
              {company.description}　/　{company.employees}
            </p>

            {company.projects.length > 0 && (
              <div className="mt-8 space-y-10 border-l border-rule pl-6">
                {company.projects.map((project, projectIndex) => (
                  <div key={projectIndex} data-print-avoid-break className="relative">
                    <span className="absolute -left-7 top-1.5 h-2 w-2 rounded-full bg-accent" />
                    {project.period && (
                      <p className="font-mono text-xs text-ink-muted">{project.period}</p>
                    )}
                    <h4 className="mt-1 font-heading text-base text-ink">{project.title}</h4>
                    {project.overview && (
                      <p className="mt-2 text-sm text-ink">{project.overview}</p>
                    )}

                    <dl className="mt-4 space-y-2 text-sm">
                      {project.role && (
                        <div className="flex gap-3">
                          <dt className="w-20 shrink-0 font-mono text-xs text-ink-muted">役割</dt>
                          <dd className="text-ink-muted">{project.role}</dd>
                        </div>
                      )}
                      {project.processes.length > 0 && (
                        <div className="flex gap-3">
                          <dt className="w-20 shrink-0 font-mono text-xs text-ink-muted">担当工程</dt>
                          <dd className="text-ink-muted">{project.processes.join('、')}</dd>
                        </div>
                      )}
                      {project.technologies.infrastructure && project.technologies.infrastructure.length > 0 && (
                        <div className="flex gap-3">
                          <dt className="w-20 shrink-0 font-mono text-xs text-ink-muted">インフラ</dt>
                          <dd className="text-ink-muted">{project.technologies.infrastructure.join('、')}</dd>
                        </div>
                      )}
                      {project.technologies.serverSide && project.technologies.serverSide.length > 0 && (
                        <div className="flex gap-3">
                          <dt className="w-20 shrink-0 font-mono text-xs text-ink-muted">サーバーサイド</dt>
                          <dd className="text-ink-muted">{project.technologies.serverSide.join('、')}</dd>
                        </div>
                      )}
                      {project.tasks.length > 0 && (
                        <div className="flex gap-3">
                          <dt className="w-20 shrink-0 font-mono text-xs text-ink-muted">主な業務</dt>
                          <dd className="flex-1 text-ink-muted">
                            <ul className="space-y-1">
                              {project.tasks.map((task, taskIndex) => (
                                <li key={taskIndex}>・{task}</li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                ))}
              </div>
            )}

            {company.otherActivities && company.otherActivities.length > 0 && (
              <div className="mt-6 pl-6">
                <h4 className="font-mono text-xs text-ink-muted">その他の業務</h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-muted">
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

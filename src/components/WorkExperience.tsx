import { getResumeData } from '@/lib/resumeData';

export default function WorkExperience() {
  const resumeData = getResumeData();
  const { workExperience, companies } = resumeData;

  return (
    <section id="experience" className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">業務経験</h2>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          現在は、AWSクラウドソリューションアーキテクトとして主にAWSを活用した設計構築・コンサルティング支援を行っております。
        </p>
        
        {workExperience.overview.length > 0 && (
          <>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">主な業務経験</h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-8">
              {workExperience.overview.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </>
        )}

        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">職務経歴詳細</h3>
        <div className="space-y-8">
          {companies.map((company, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-6">
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
                {company.name}
              </h4>
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-4 space-y-1">
                <p><span className="font-medium">事業内容:</span> {company.description}</p>
                <p><span className="font-medium">従業員:</span> {company.employees}</p>
                <p><span className="font-medium">在籍期間:</span> {company.period}</p>
                <p><span className="font-medium">雇用形態:</span> {company.employment}</p>
              </div>
              
              {company.projects.length > 0 && (
                <div className="space-y-4">
                  {company.projects.map((project, projectIndex) => (
                    <div key={projectIndex} className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                      <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        {project.title}
                      </h5>
                      {project.overview && (
                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">
                          <span className="font-medium">概要:</span> {project.overview}
                        </p>
                      )}
                      {project.period && (
                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">
                          <span className="font-medium">期間:</span> {project.period}
                        </p>
                      )}
                      {project.role && (
                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">
                          <span className="font-medium">役割:</span> {project.role}
                        </p>
                      )}
                      {project.tasks.length > 0 && (
                        <div className="mt-2">
                          <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">主な業務:</span>
                          <ul className="text-slate-600 dark:text-slate-400 text-sm mt-1 space-y-1">
                            {project.tasks.map((task, taskIndex) => (
                              <li key={taskIndex}>• {task}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {company.otherActivities && company.otherActivities.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">その他の業務</h5>
                  <ul className="text-slate-600 dark:text-slate-300 text-sm space-y-1">
                    {company.otherActivities.map((activity, activityIndex) => (
                      <li key={activityIndex}>• {activity}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
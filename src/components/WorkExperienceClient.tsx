'use client';

import { useState } from 'react';
import type { Company } from '@/lib/types';

interface WorkExperienceClientProps {
  workExperience: {
    overview: string[];
  };
  companies: Company[];
}

export default function WorkExperienceClient({ workExperience, companies }: WorkExperienceClientProps) {
  // 最初の会社（最新の勤務先）をデフォルトで展開
  const [expandedCompanies, setExpandedCompanies] = useState<Set<number>>(new Set([0]));

  const toggleCompany = (index: number) => {
    const newExpanded = new Set(expandedCompanies);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCompanies(newExpanded);
  };

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
        <div className="space-y-6">
          {companies.map((company, index) => (
            <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleCompany(index)}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-left flex items-center justify-between"
              >
                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    {company.name}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {company.period} | {company.employment}
                  </p>
                </div>
                <svg
                  className={`w-5 h-5 text-slate-600 dark:text-slate-400 transition-transform duration-200 ${
                    expandedCompanies.has(index) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                expandedCompanies.has(index) ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-4 space-y-1">
                    <p><span className="font-medium">事業内容:</span> {company.description}</p>
                    <p><span className="font-medium">従業員:</span> {company.employees}</p>
                  </div>
                  
                  {company.projects.length > 0 && (
                    <div className="space-y-4">
                      {company.projects.map((project, projectIndex) => (
                        <div key={projectIndex} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-4">
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
                          {project.processes.length > 0 && (
                            <div className="mt-2">
                              <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">担当工程:</span>
                              <ul className="text-slate-600 dark:text-slate-400 text-sm mt-1 space-y-1">
                                {project.processes.map((process, processIndex) => (
                                  <li key={processIndex}>• {process}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {(project.technologies.infrastructure || project.technologies.serverSide) && (
                            <div className="mt-2">
                              <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">使用技術:</span>
                              <div className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                                {project.technologies.infrastructure && (
                                  <p>• インフラ: {project.technologies.infrastructure.join(', ')}</p>
                                )}
                                {project.technologies.serverSide && (
                                  <p>• サーバーサイド: {project.technologies.serverSide.join(', ')}</p>
                                )}
                              </div>
                            </div>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
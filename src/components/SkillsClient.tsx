'use client';

import { useState } from 'react';
import type { Skills } from '@/lib/markdownParser';

interface SkillsClientProps {
  skills: Skills;
}

export default function SkillsClient({ skills }: SkillsClientProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['aws']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <section id="skills" className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">スキル・経験</h2>
      
      <div className="space-y-6">
        {/* AWS Section */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('aws')}
            className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-left flex items-center justify-between"
          >
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">AWS</h3>
            <svg
              className={`w-5 h-5 text-slate-600 dark:text-slate-400 transition-transform ${
                expandedSections.has('aws') ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedSections.has('aws') && (
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700">
              <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                {Object.entries(skills.aws).map(([category, skillList]) => (
                  <div key={category} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-4 min-h-fit">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full whitespace-nowrap">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* その他の技術 Section */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('other')}
            className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-left flex items-center justify-between"
          >
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">その他の技術</h3>
            <svg
              className={`w-5 h-5 text-slate-600 dark:text-slate-400 transition-transform ${
                expandedSections.has('other') ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedSections.has('other') && (
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700">
              <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                {skills.iac.length > 0 && (
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">IaC</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.iac.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full whitespace-nowrap">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {skills.os.length > 0 && (
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">OS</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.os.map((os) => (
                        <span key={os} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm rounded-full whitespace-nowrap">
                          {os}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {Object.keys(skills.saas).length > 0 && (
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-4 min-h-fit" style={{ gridColumn: Object.keys(skills.saas).length > 3 ? 'span 2' : 'span 1' }}>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">SaaS</h4>
                    <div className="space-y-3">
                      {Object.entries(skills.saas).map(([vendor, tools]) => (
                        <div key={vendor}>
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{vendor}</p>
                          <div className="flex flex-wrap gap-2">
                            {tools.map((tool) => (
                              <span key={tool} className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs rounded-full whitespace-nowrap">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
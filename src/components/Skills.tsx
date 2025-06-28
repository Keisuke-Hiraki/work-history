import { getResumeData } from '@/lib/resumeData';

export default function Skills() {
  const resumeData = getResumeData();
  const { skills } = resumeData;

  return (
    <section id="skills" className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">スキル・経験</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">AWS</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills.aws).map(([category, skillList]) => (
              <div key={category} className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">その他の技術</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {skills.iac.length > 0 && (
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">IaC</h4>
                <div className="space-y-1">
                  {skills.iac.map((tech) => (
                    <span key={tech} className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded mr-2 mb-1">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {skills.os.length > 0 && (
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">OS</h4>
                <div className="space-y-1">
                  {skills.os.map((os) => (
                    <span key={os} className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm rounded mr-2 mb-1">
                      {os}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {Object.keys(skills.saas).length > 0 && (
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">SaaS</h4>
                <div className="space-y-2">
                  {Object.entries(skills.saas).map(([vendor, tools]) => (
                    <div key={vendor}>
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{vendor}</p>
                      <div className="flex flex-wrap gap-1">
                        {tools.map((tool) => (
                          <span key={tool} className="inline-block px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs rounded">
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
      </div>
    </section>
  );
}
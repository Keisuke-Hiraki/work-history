import { getResumeData } from '@/lib/resumeData';

export default function Awards() {
  const resumeData = getResumeData();
  const { awards } = resumeData;

  return (
    <section className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">表彰</h2>
      
      <div className="space-y-4">
        {awards.map((award, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border-l-4 border-yellow-500">
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                {award.url ? (
                  <a href={award.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {award.name}
                  </a>
                ) : (
                  award.name
                )}
              </h3>
            </div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{award.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
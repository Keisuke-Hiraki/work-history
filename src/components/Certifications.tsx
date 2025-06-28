import { getResumeData } from '@/lib/resumeData';

export default function Certifications() {
  const resumeData = getResumeData();
  const { certifications } = resumeData;

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'aws':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700';
      case 'azure':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700';
      default:
        return 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600';
    }
  };

  const getLevelBadge = (level: string) => {
    const levelColors = {
      foundational: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      associate: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      professional: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
      specialty: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
      basic: 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
    };

    return levelColors[level as keyof typeof levelColors] || levelColors.basic;
  };

  return (
    <section id="certifications" className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">保有資格</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        {certifications.map((cert, index) => (
          <div key={index} className={`p-4 rounded-lg border ${getProviderColor(cert.provider)}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">{cert.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400 capitalize">{cert.provider}</span>
                  <span className={`px-2 py-1 text-xs rounded ${getLevelBadge(cert.level)}`}>
                    {cert.level}
                  </span>
                </div>
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{cert.date}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          最新の資格情報は <a href="https://www.credly.com/users/keisuke-hiraki" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">Credly</a> をご参照ください。
        </p>
      </div>
    </section>
  );
}
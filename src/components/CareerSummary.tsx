import { getResumeData } from '@/lib/resumeData';

export default function CareerSummary() {
  const resumeData = getResumeData();
  const { careerSummary } = resumeData;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-green-50 dark:bg-green-900/20 border-green-500';
      case 'graduated':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-500';
      default:
        return 'bg-slate-50 dark:bg-slate-700/50 border-slate-400';
    }
  };

  return (
    <section className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">職務経歴概略</h2>
      <div className="space-y-4">
        {careerSummary.map((item, index) => (
          <div 
            key={index}
            className={`flex justify-between items-center p-4 rounded-lg border-l-4 ${getStatusStyle(item.status)}`}
          >
            <span className="text-slate-700 dark:text-slate-300">{item.period}</span>
            <span className="text-slate-900 dark:text-slate-100 font-medium">{item.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
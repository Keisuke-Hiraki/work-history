import { getResumeData } from '@/lib/resumeData';

export default function PersonalActivities() {
  const resumeData = getResumeData();
  const { personalActivities } = resumeData;

  return (
    <section className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">個人活動</h2>
      
      <div className="space-y-8">
        {personalActivities.speaking.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">登壇</h3>
            <div className="space-y-4">
              {personalActivities.speaking.map((speakingItem, index) => (
                <div key={index} className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    <a href={speakingItem.eventUrl} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      {speakingItem.event}
                    </a>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">{speakingItem.title}</p>
                  <a href={speakingItem.slideUrl} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
                    スライドを見る →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}


        {personalActivities.eventOrganizing.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">イベント開催</h3>
            <div className="space-y-4">
              {personalActivities.eventOrganizing.map((event, index) => (
                <div key={index} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{event.event}</h4>
                  {event.reportUrl && (
                    <a href={event.reportUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
                      開催報告を見る →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
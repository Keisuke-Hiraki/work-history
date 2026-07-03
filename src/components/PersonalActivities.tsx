import { getResumeData } from '@/lib/resumeData';

export default function PersonalActivities() {
  const resumeData = getResumeData();
  const { personalActivities } = resumeData;

  return (
    <section className="border-t border-rule py-16">
      <h2 className="font-heading text-2xl text-ink">個人活動</h2>

      <div className="mt-8 space-y-12">
        {personalActivities.speaking.length > 0 && (
          <div>
            <h3 className="font-heading text-lg text-ink">登壇</h3>
            <div className="mt-4 divide-y divide-rule">
              {personalActivities.speaking.map((speakingItem, index) => (
                <div key={index} className="py-4">
                  <h4 className="text-ink">
                    <a
                      href={speakingItem.eventUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline decoration-rule underline-offset-4 hover:decoration-accent"
                    >
                      {speakingItem.event}
                    </a>
                  </h4>
                  <p className="mt-1 text-sm text-ink-muted">{speakingItem.title}</p>
                  <a
                    href={speakingItem.slideUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-sm text-ink-muted underline decoration-rule underline-offset-4 hover:text-accent hover:decoration-accent"
                  >
                    スライドを見る →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {personalActivities.eventOrganizing.length > 0 && (
          <div>
            <h3 className="font-heading text-lg text-ink">イベント開催</h3>
            <div className="mt-4 divide-y divide-rule">
              {personalActivities.eventOrganizing.map((event, index) => (
                <div key={index} className="py-4">
                  <h4 className="text-ink">{event.event}</h4>
                  {event.reportUrl && (
                    <a
                      href={event.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm text-ink-muted underline decoration-rule underline-offset-4 hover:text-accent hover:decoration-accent"
                    >
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

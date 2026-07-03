import { getResumeData } from '@/lib/resumeData';
import SectionHeading from './SectionHeading';

export default function PersonalActivities() {
  const resumeData = getResumeData();
  const { personalActivities } = resumeData;

  return (
    <section className="py-14">
      <SectionHeading eyebrow="Activities" title="個人活動" />

      <div className="mt-8 space-y-10">
        {personalActivities.speaking.length > 0 && (
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wide text-muted/70">登壇</h3>
            <div className="mt-3 divide-y divide-line border-y border-line">
              {personalActivities.speaking.map((speakingItem, index) => (
                <div key={index} className="py-4">
                  <h4 className="font-medium text-ink">
                    <a
                      href={speakingItem.eventUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-accent"
                    >
                      {speakingItem.event} <span aria-hidden="true" className="text-muted">↗</span>
                    </a>
                  </h4>
                  <p className="mt-1 text-sm text-muted">{speakingItem.title}</p>
                  <a
                    href={speakingItem.slideUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-sm text-accent hover:underline"
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
            <h3 className="text-xs font-medium uppercase tracking-wide text-muted/70">イベント開催</h3>
            <div className="mt-3 divide-y divide-line border-y border-line">
              {personalActivities.eventOrganizing.map((event, index) => (
                <div key={index} className="py-4">
                  <h4 className="font-medium text-ink">{event.event}</h4>
                  {event.reportUrl && (
                    <a
                      href={event.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm text-accent hover:underline"
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

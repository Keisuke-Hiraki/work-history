import { getResumeData } from '@/lib/resumeData';
import SectionHeading from './SectionHeading';

export default function PersonalActivities() {
  const resumeData = getResumeData();
  const { personalActivities } = resumeData;

  return (
    <section id="community" className="scroll-mt-20 py-14">
      <SectionHeading eyebrow="Community" title="社外活動" />

      <div className="mt-8 space-y-10">
        {personalActivities.speaking.length > 0 && (
          <div className="frame bg-surface p-5 md:p-6">
            <span className="frame-tag">Speaking</span>
            <div className="divide-y divide-line">
              {personalActivities.speaking.map((speakingItem, index) => (
                <div key={index} className="py-3.5 first:pt-0 last:pb-0">
                  <p className="font-mono text-xs text-muted">
                    <a
                      href={speakingItem.eventUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-accent"
                    >
                      {speakingItem.event} ↗
                    </a>
                  </p>
                  <h4 className="mt-1 text-sm font-medium leading-relaxed text-ink">
                    {speakingItem.slideUrl ? (
                      <a
                        href={speakingItem.slideUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                      >
                        {speakingItem.title}
                      </a>
                    ) : (
                      speakingItem.title
                    )}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}

        {personalActivities.eventOrganizing.length > 0 && (
          <div className="frame bg-surface p-5 md:p-6">
            <span className="frame-tag">Organizing</span>
            <div className="divide-y divide-line">
              {personalActivities.eventOrganizing.map((event, index) => (
                <div key={index} className="py-3.5 first:pt-0 last:pb-0">
                  <h4 className="text-sm font-medium leading-relaxed text-ink">{event.event}</h4>
                  {event.reportUrl && (
                    <a
                      href={event.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block font-mono text-xs text-accent transition-colors hover:underline"
                    >
                      開催報告 ↗
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

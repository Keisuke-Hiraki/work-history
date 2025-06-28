import { getResumeData } from '@/lib/resumeData';

export default function PersonalInfo() {
  const resumeData = getResumeData();
  const { personalInfo, socialLinks } = resumeData;

  return (
    <section id="personal" className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">基本情報</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">プロフィール</h3>
          <div className="space-y-2">
            <p className="text-slate-600 dark:text-slate-300">
              <span className="font-medium">名前:</span> {personalInfo.name.japanese}
              {personalInfo.name.english && `（${personalInfo.name.english}）`}
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              <span className="font-medium">職種:</span> {personalInfo.role}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">ソーシャルリンク</h3>
          <div className="space-y-2">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url} 
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
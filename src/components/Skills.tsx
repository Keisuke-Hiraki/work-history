import { getResumeData } from '@/lib/resumeData';

const CATEGORY_DISPLAY_NAMES: { [key: string]: string } = {
  computing: 'コンピューティング',
  storage: 'ストレージ',
  database: 'データベース',
  networkingAndContentDelivery: 'ネットワーキング&コンテンツ配信',
  securityIdentityCompliance: 'セキュリティ・アイデンティティ・コンプライアンス',
  managementGovernance: '管理・ガバナンス',
  analytics: '分析',
  applicationIntegration: 'アプリケーション統合',
  developerTools: '開発者ツール',
  multiAccountManagement: 'マルチアカウント管理',
  businessApplications: 'ビジネスアプリケーション',
  cloudFinancialManagement: 'クラウド財務管理',
  mobileWebAppDevelopment: 'モバイル・ウェブアプリ開発',
  migrationTransfer: '移行・転送',
};

function getCategoryDisplayName(category: string): string {
  return CATEGORY_DISPLAY_NAMES[category] || category;
}

function SkillTag({ children }: { children: string }) {
  return (
    <span className="whitespace-nowrap rounded-[3px] border border-rule px-2 py-0.5 font-mono text-xs text-ink-muted">
      {children}
    </span>
  );
}

export default function Skills() {
  const resumeData = getResumeData();
  const { skills } = resumeData;

  return (
    <section id="skills" className="scroll-mt-16 border-t border-rule py-16">
      <h2 className="font-heading text-2xl text-ink">スキル・経験</h2>

      <div className="mt-10">
        <h3 className="font-heading text-lg text-ink">AWS</h3>
        <div className="mt-6 space-y-6">
          {Object.entries(skills.aws).map(([category, skillList]) => (
            <div key={category}>
              <h4 className="font-mono text-xs text-ink-muted">
                {getCategoryDisplayName(category)}
              </h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {skillList.map((skill) => (
                  <SkillTag key={skill}>{skill}</SkillTag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h3 className="font-heading text-lg text-ink">その他の技術</h3>
        <div className="mt-6 space-y-6">
          {skills.iac.length > 0 && (
            <div>
              <h4 className="font-mono text-xs text-ink-muted">IaC</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.iac.map((tech) => (
                  <SkillTag key={tech}>{tech}</SkillTag>
                ))}
              </div>
            </div>
          )}

          {skills.os.length > 0 && (
            <div>
              <h4 className="font-mono text-xs text-ink-muted">OS</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.os.map((os) => (
                  <SkillTag key={os}>{os}</SkillTag>
                ))}
              </div>
            </div>
          )}

          {Object.keys(skills.saas).length > 0 && (
            <div>
              <h4 className="font-mono text-xs text-ink-muted">SaaS</h4>
              <div className="mt-3 space-y-3">
                {Object.entries(skills.saas).map(([vendor, tools]) => (
                  <div key={vendor} className="flex flex-col gap-2 md:flex-row md:items-start md:gap-4">
                    <span className="shrink-0 text-sm text-ink-muted md:w-32">{vendor}</span>
                    <div className="flex flex-wrap gap-2">
                      {tools.map((tool) => (
                        <SkillTag key={tool}>{tool}</SkillTag>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import { getResumeData } from '@/lib/resumeData';
import SectionHeading from './SectionHeading';

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

function SkillChip({ children }: { children: string }) {
  return (
    <span className="whitespace-nowrap rounded-md border border-line bg-canvas px-2 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

function SkillGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-5 shadow-sm">
      <h4 className="text-sm font-medium text-ink">{title}</h4>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <SkillChip key={item}>{item}</SkillChip>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const resumeData = getResumeData();
  const { skills } = resumeData;

  return (
    <section id="skills" className="scroll-mt-16 py-14">
      <SectionHeading eyebrow="Skills" title="スキル・経験" />

      <h3 className="mt-8 text-xs font-medium uppercase tracking-wide text-muted/70">AWS</h3>
      <div className="mt-3 grid gap-4 md:grid-cols-2">
        {Object.entries(skills.aws).map(([category, skillList]) => (
          <SkillGroup
            key={category}
            title={getCategoryDisplayName(category)}
            items={skillList}
          />
        ))}
      </div>

      <h3 className="mt-10 text-xs font-medium uppercase tracking-wide text-muted/70">その他の技術</h3>
      <div className="mt-3 grid gap-4 md:grid-cols-2">
        {skills.iac.length > 0 && <SkillGroup title="IaC" items={skills.iac} />}
        {skills.os.length > 0 && <SkillGroup title="OS" items={skills.os} />}
        {Object.entries(skills.saas).map(([vendor, tools]) => (
          <SkillGroup key={vendor} title={`SaaS — ${vendor}`} items={tools} />
        ))}
      </div>
    </section>
  );
}

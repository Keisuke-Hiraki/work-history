import { getResumeData } from '@/lib/resumeData';
import SectionHeading from './SectionHeading';

const CATEGORY_DISPLAY_NAMES: { [key: string]: string } = {
  computing: 'コンピューティング',
  storage: 'ストレージ',
  database: 'データベース',
  networkingAndContentDelivery: 'ネットワーキング・コンテンツ配信',
  securityIdentityCompliance: 'セキュリティ・コンプライアンス',
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

function SkillTable({ tag, rows }: { tag: string; rows: Array<[string, string[]]> }) {
  return (
    <div className="frame bg-surface p-5 md:p-6">
      <span className="frame-tag">{tag}</span>
      <dl>
        {rows.map(([label, items]) => (
          <div
            key={label}
            className="grid gap-1 border-t border-line py-2.5 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[240px_1fr] md:gap-4"
          >
            <dt className="text-sm font-medium text-ink">{label}</dt>
            <dd className="font-mono text-xs leading-relaxed text-muted">{items.join(' / ')}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function Skills() {
  const resumeData = getResumeData();
  const { skills } = resumeData;

  const awsRows: Array<[string, string[]]> = Object.entries(skills.aws).map(([category, list]) => [
    getCategoryDisplayName(category),
    list,
  ]);

  const otherRows: Array<[string, string[]]> = [
    ...(skills.iac.length > 0 ? ([['IaC', skills.iac]] as Array<[string, string[]]>) : []),
    ...(skills.os.length > 0 ? ([['OS', skills.os]] as Array<[string, string[]]>) : []),
    ...Object.entries(skills.saas).map(([vendor, tools]): [string, string[]] => [`SaaS — ${vendor}`, tools]),
  ];

  return (
    <section id="skills" className="scroll-mt-20 py-14">
      <SectionHeading eyebrow="Skills" title="スキル・経験" />

      <div className="mt-8 space-y-10">
        <SkillTable tag="AWS" rows={awsRows} />
        <SkillTable tag="Other" rows={otherRows} />
      </div>
    </section>
  );
}

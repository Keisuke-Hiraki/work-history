// UI copy for the language toggle. This only covers chrome/labels that are not
// part of the resume data itself (see resumeData.ts / data/resume*.json for the
// bilingual resume content).
export type Locale = 'ja' | 'en';

export interface Translations {
  nav: {
    profile: string;
    experience: string;
    skills: string;
    certifications: string;
    community: string;
  };
  header: {
    printLabel: string;
    darkModeAria: string;
    languageToggleAria: string;
  };
  personalInfo: {
    eyebrowSuffix: string;
    present: string;
    focus: string;
    awsCertified: (count: number) => string;
    community: (speakingCount: number, eventCount: number) => string;
  };
  workExperience: {
    title: string;
    presentSuffix: string;
    otherActivities: string;
  };
  skills: {
    title: string;
    categories: { [key: string]: string };
  };
  certifications: {
    title: string;
    badgeAlt: (name: string) => string;
    footnotePrefix: string;
    footnoteLinkLabel: string;
    footnoteSuffix: string;
  };
  personalActivities: {
    title: string;
    eventReport: string;
  };
}

export const translations: Record<Locale, Translations> = {
  ja: {
    nav: {
      profile: '概要',
      experience: '職務経歴',
      skills: 'スキル',
      certifications: '資格',
      community: '社外活動',
    },
    header: {
      printLabel: '印刷 / PDF',
      darkModeAria: 'ダークモード切り替え',
      languageToggleAria: '英語表示に切り替え',
    },
    personalInfo: {
      eyebrowSuffix: '職務経歴書',
      present: '在籍中',
      focus: 'AI ・ クラウド ・ サイバーセキュリティのコンサルティング',
      awsCertified: (count) => `AWS認定 ${count}資格を保有（全区分取得）`,
      community: (speakingCount, eventCount) =>
        `登壇 ${speakingCount}回 ・ イベント主催 ${eventCount}回 ・ 技術ブログ執筆`,
    },
    workExperience: {
      title: '職務経歴',
      presentSuffix: '— 在籍中',
      otherActivities: 'その他の業務',
    },
    skills: {
      title: 'スキル・経験',
      categories: {
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
      },
    },
    certifications: {
      title: '保有資格',
      badgeAlt: (name) => `${name} バッジ`,
      footnotePrefix: '最新の資格情報は',
      footnoteLinkLabel: 'Credly',
      footnoteSuffix: ' をご参照ください。',
    },
    personalActivities: {
      title: '社外活動',
      eventReport: '開催報告',
    },
  },
  en: {
    nav: {
      profile: 'Profile',
      experience: 'Experience',
      skills: 'Skills',
      certifications: 'Certifications',
      community: 'Community',
    },
    header: {
      printLabel: 'Print / PDF',
      darkModeAria: 'Toggle dark mode',
      languageToggleAria: 'Switch to Japanese',
    },
    personalInfo: {
      eyebrowSuffix: 'Resume',
      present: '(Present)',
      focus: 'AI, Cloud, and Cybersecurity Consulting',
      awsCertified: (count) => `${count} AWS Certifications held (all categories)`,
      community: (speakingCount, eventCount) =>
        `${speakingCount} talks · ${eventCount} events organized · tech blog writing`,
    },
    workExperience: {
      title: 'Work Experience',
      presentSuffix: '— Present',
      otherActivities: 'Other Work',
    },
    skills: {
      title: 'Skills & Experience',
      categories: {
        computing: 'Compute',
        storage: 'Storage',
        database: 'Database',
        networkingAndContentDelivery: 'Networking & Content Delivery',
        securityIdentityCompliance: 'Security, Identity & Compliance',
        managementGovernance: 'Management & Governance',
        analytics: 'Analytics',
        applicationIntegration: 'Application Integration',
        developerTools: 'Developer Tools',
        multiAccountManagement: 'Multi-Account Management',
        businessApplications: 'Business Applications',
        cloudFinancialManagement: 'Cloud Financial Management',
        mobileWebAppDevelopment: 'Mobile & Web App Development',
        migrationTransfer: 'Migration & Transfer',
      },
    },
    certifications: {
      title: 'Certifications',
      badgeAlt: (name) => `${name} badge`,
      footnotePrefix: 'For the latest certification info, please see',
      footnoteLinkLabel: 'Credly',
      footnoteSuffix: '.',
      // Rendered directly after the link with no separating space, unlike the ja variant.
    },
    personalActivities: {
      title: 'Community',
      eventReport: 'Event Report',
    },
  },
};

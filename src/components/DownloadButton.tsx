'use client';

import { useState } from 'react';

export default function DownloadButton() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const generateMarkdownContent = () => {
    // Fallback static content since getResumeData() doesn't work in production build
    return `最終更新日: 2025年6月28日

# 基本情報

| Key | Value |
| --- | --- |
| 名前 | 平木佳介（Keisuke Hiraki） |
| 職種 | AWSクラウドソリューションアーキテクト |

# アカウント

- [DevelopersIO](https://dev.classmethod.jp/author/hiraki-keisuke/)
- [GitHub](https://github.com/keisuke-hiraki)
- [LinkedIn](https://www.linkedin.com/in/keisuke-hiraki)
- [X(@hirakikeisuke)](https://x.com/hirakikeisuke)
- [SpeakerDeck](https://speakerdeck.com/hirakikeisuke)
- [Credly](https://www.credly.com/users/keisuke-hiraki)

# 職務経歴概略

| 期間 | 説明 |
| --- | --- |
| 2023年5月〜現在 | クラスメソッド株式会社 |
| 2019年4月〜2023年4月 | 内定通知株式会社 |
| 2015年4月〜2019年3月 | 大学（中退） |

# 業務経験概略

現在は、AWSクラウドソリューションアーキテクトとして主にAWSを活用した設計構築・コンサルティング支援を行っております。

主な業務経験としては以下です。

- AWSクラウド基盤設計・構築・運用支援
- サーバレスアーキテクチャの設計・実装支援
- IaC（Infrastructure as Code）を用いたインフラ自動化
- DevOps・CI/CDパイプライン構築支援
- セキュリティ基盤設計・実装支援
- エンジニア向けコンテンツ制作・ブログ執筆
- コミュニティ活動・登壇・イベント開催

この内容は簡略版です。最新の詳細情報については、Webサイトをご覧ください。
`;
  };

  const handleDownload = (format: 'pdf' | 'markdown') => {
    if (format === 'pdf') {
      window.print();
    } else if (format === 'markdown') {
      try {
        const markdownContent = generateMarkdownContent();
        if (!markdownContent) {
          throw new Error('Empty markdown content');
        }
        
        const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'hiraki-keisuke-resume.md';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the URL object
        setTimeout(() => URL.revokeObjectURL(url), 100);
      } catch (error) {
        console.error('Markdown download failed:', error);
        alert('Markdownファイルのダウンロードに失敗しました。');
      }
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>ダウンロード</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-slate-200 dark:border-slate-700 z-10">
          <div className="py-1">
            <button
              className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center space-x-2"
              onClick={() => handleDownload('pdf')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>PDF形式でダウンロード</span>
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center space-x-2"
              onClick={() => handleDownload('markdown')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Markdown形式でダウンロード</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
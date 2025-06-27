# 職務経歴書 - 平木 佳介

🌐 **[オンライン版を見る](https://keisuke-hiraki.github.io/work-history/)**

## 📄 概要

AWS Solution Architect として活動している平木佳介の職務経歴書です。
モダンなデザインとレスポンシブ対応で、Web・PDF・Markdown形式で提供しています。

## ✨ 特徴

- 🎨 **モダンデザイン**: プロフェッショナルな見た目と使いやすさを重視
- 📱 **レスポンシブ対応**: PC・タブレット・スマートフォンで最適表示
- 📥 **多形式ダウンロード**: PDF・Markdown・印刷対応
- ⚡ **高速表示**: 最適化されたコードとCDN配信
- 🔄 **自動更新**: GitHub Actionsによる自動デプロイ

## 🛠️ 技術スタック

- **フロントエンド**: Jekyll + Custom CSS
- **ホスティング**: GitHub Pages
- **CI/CD**: GitHub Actions
- **PDF生成**: md-to-pdf
- **デザイン**: カスタムCSS (Font Awesome Icons使用)

## 📁 プロジェクト構成

```
work-history/
├── docs/                    # Jekyll サイト
│   ├── _data/              # 📄 コンテンツデータ (YAML)
│   │   └── resume.yml      # 🎯 メイン編集ファイル
│   ├── _layouts/           # レイアウトテンプレート
│   ├── _includes/          # コンポーネント・セクション
│   │   ├── components/     # UI部品
│   │   └── sections/       # ページセクション
│   ├── _sass/              # SCSS ファイル
│   ├── assets/             # 静的アセット
│   ├── README.md           # メインページ (軽量)
│   └── resume-for-pdf.md   # PDF生成用
├── pdf-config/             # PDF生成設定
├── .github/workflows/      # GitHub Actions
└── package.json           # Node.js 設定
```

## 🚀 ローカル開発

### 必要な環境

- Node.js 18+
- Ruby 3.1+
- Jekyll

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/Keisuke-Hiraki/work-history.git
cd work-history

# 依存関係をインストール
npm install
cd docs && bundle install && cd ..

# 開発サーバー起動
npm run serve
```

### 利用可能なコマンド

```bash
# 開発サーバー起動
npm run serve

# Jekyll ビルド
npm run build

# PDF生成
npm run build:pdf

# リント実行
npm run lint

# フォーマット実行
npm run format
```

## 📋 更新方法

### 基本的なコンテンツ更新

1. **`docs/_data/resume.yml`** でコンテンツを更新
   - 基本情報: `personal` セクション
   - 職務経歴: `experience` セクション  
   - スキル: `skills` セクション
   - 資格: `certifications` セクション
   - 個人活動: `activities` セクション

2. **GitHubの Web UI から直接編集可能** 💻
   - `docs/_data/resume.yml` をクリック
   - 鉛筆アイコンで編集開始
   - YAML形式で簡単更新

3. **自動デプロイ** 🚀
   - `git push` でGitHub Actionsが自動実行
   - Web版とPDF版が同時に更新

### 高度なカスタマイズ

- **デザイン変更**: `docs/_sass/main.scss`
- **レイアウト調整**: `docs/_includes/` 配下のテンプレート
- **新セクション追加**: `docs/_includes/sections/` に新ファイル作成

## 🎯 今後の予定

- [ ] 多言語対応（英語版）
- [ ] ダークモード対応
- [ ] パフォーマンス最適化
- [ ] SEO最適化
- [ ] アニメーション追加

## 📄 ライセンス

このプロジェクトは個人利用目的で作成されています。

---

💼 **AWS Solution Architect | 平木 佳介**  
📧 Contact via [LinkedIn](https://www.linkedin.com/in/k-hiraki/)  
📝 技術ブログ: [DevelopersIO](https://dev.classmethod.jp/author/hiraki-keisuke/)

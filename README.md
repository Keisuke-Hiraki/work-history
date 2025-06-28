# 平木佳介 職務経歴書サイト

Next.js + Tailwind CSS で構築された職務経歴書Webサイトです。

## 公開URL

**https://keisuke-hiraki.github.io/work-history/**

## コンテンツ更新方法

**`data/resume.md` ファイルを編集するだけで全ての情報が自動更新されます。**

### 更新手順

1. `data/resume.md` を編集
2. 変更をコミット・プッシュ

```bash
git add .
git commit -m "feat: 職務経歴を更新"
git push origin main
```

### 更新例

```markdown
# 新しい職場を追加
| 期間 | 説明 |
| --- | --- |
| 2025年4月〜現在 | 新しい会社名 |
```

## 開発

```bash
# インストール
npm install

# 開発サーバー
npm run dev

# ビルド
npm run build
```

## 技術スタック

- Next.js 14 (静的サイト生成)
- TypeScript
- Tailwind CSS
- GitHub Pages + GitHub Actions

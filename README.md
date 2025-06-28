# 平木佳介 職務経歴書サイト

Next.js + Tailwind CSS で構築された職務経歴書Webサイトです。

## 公開URL

**https://keisuke-hiraki.github.io/work-history/**

## 更新方法

`data/resume.md` を編集後、以下を実行してください。

```bash
npm run sync
git add .
git commit -m "feat: 職務経歴を更新"
git push origin main
```

## 開発

```bash
npm install
npm run dev
npm run build
```

## 技術スタック

- Next.js 15.3.4
- TypeScript  
- Tailwind CSS
- GitHub Pages
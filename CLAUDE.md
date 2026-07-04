# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal resume/CV website (職務経歴書サイト) for Keisuke Hiraki, built with Next.js (App Router) + TypeScript + Tailwind CSS v4, statically exported and deployed to GitHub Pages at https://keisuke-hiraki.github.io/work-history/.

## Commands

```bash
npm install
npm run dev     # dev server with turbopack
npm run build   # static export to ./out (output: 'export' in next.config.ts)
npm run lint    # next lint
npm run sync    # regenerate data/resume.json from data/resume.md
```

There is no test suite in this repo.

## Updating resume content

`data/resume.md` is the single source of truth for all resume content (Japanese). Do not hand-edit `data/resume.json` — it is generated.

```bash
# edit data/resume.md, then:
npm run sync
git add .
git commit -m "feat: 職務経歴を更新"
git push origin main
```

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm run build` and deploys `./out` to GitHub Pages.

## Data pipeline architecture

`scripts/sync-resume.js` — plain JS `ResumeMarkdownParser`, run via `npm run sync`. It reads `data/resume.md` and writes `data/resume.json`, and also copies `data/resume.md` to `public/resume.md` (served as the "download as markdown" link in `Header.tsx`). This is the only parser in the repo — if you touch the parsing logic, changes belong here (and the JSON shape it emits).

Runtime data flow: `data/resume.json` → `src/lib/resumeData.ts` (`getResumeData()`, module-level cached, reads the JSON at build/request time and reshapes it into the `ResumeData` type used by components) → page components. Types for the reshaped data live in `src/lib/types.ts`.

Both parsers key off exact Japanese markdown section headers in `resume.md` (`# 基本情報`, `# アカウント`, `# 職務経歴概略`, `# 職務経歴詳細` with `## 会社名` / `### 案件名` subsections, `# スキル・経験`, `# 保有資格`, `# 表彰`, `# コミュニティ活動`) and specific field labels (`事業内容：`, `在籍期間：`, etc.). If you change these headers/labels in `resume.md`, update `scripts/sync-resume.js` accordingly.

## Component pattern

Sections under `src/components/` follow a server/client split: a server component (e.g. `Certifications.tsx`, `Skills.tsx`, `WorkExperience.tsx`) calls `getResumeData()` and passes data as props into a paired `*Client.tsx` component (e.g. `CertificationsClient.tsx`) marked `'use client'` for interactivity (state, hooks). Follow this pairing when adding new sections rather than fetching data inside a client component.

## Static export gotchas

- `next.config.ts` sets `basePath`/`assetPrefix` to `/work-history` only when `NODE_ENV === 'production'` (GitHub Pages project site). Any code building asset URLs client-side must replicate this same conditional (see `CertificationsClient.tsx`'s `getCertificationBadgeImage`, and `Header.tsx`'s `resumeMdHref`), since Next's automatic basePath injection doesn't apply to manually constructed strings.
- The "download as markdown" link in `Header.tsx` just points at `public/resume.md`, a static copy that `npm run sync` regenerates from `data/resume.md` — always run `npm run sync` after editing `resume.md` so the two don't drift.
- Certification badge images live in `public/*.png`; the filename is derived from the certification name by `getCertificationBadgeImage()` in `CertificationsClient.tsx` (lowercased, non `[a-z0-9-]` stripped, spaces→hyphens). When adding a certification to `resume.md`, add a matching PNG to `public/` with that exact slug — a mismatched slug (e.g. a stray suffix in the filename) silently hides the badge instead of erroring.

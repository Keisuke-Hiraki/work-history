---
name: translate-resume
description: data/resume.md（日本語の原本）から data/resume.en.md（英語版職務経歴書）を再生成する。data/resume.md を編集した後に英語版を作成・同期し直すとき、またはユーザーが「英訳して」「英語版を更新して」「resume.en.md を再生成して」「sync the English resume」などと言ったときに必ず使うこと。職務経歴の英訳をその場しのぎで手動翻訳してはいけない — 翻訳ルールの一貫性を保つため、必ずこのスキルを経由すること。
---

# Translate Resume (ja → en)

Generate or update `data/resume.en.md` as a professional English translation of `data/resume.md`.

## Why the odd format

Both files are parsed by the same parser (`scripts/sync-resume.js`), which keys off **exact Japanese section headings and field labels**. The English file therefore keeps all structural Japanese strings byte-identical to the source, and translates only the *values*. Breaking a heading or label silently produces empty sections in `data/resume.en.json` — there is no error.

## Workflow

1. Read `data/resume.md` (source of truth) and, if present, the existing `data/resume.en.md`.
2. If `data/resume.en.md` exists, translate incrementally: keep existing English wording for unchanged content (stable phrasing across regenerations), translate only added/changed parts, delete removed parts.
3. Write `data/resume.en.md` with identical markdown structure: same heading levels, same table shapes, same bullet nesting, same line ordering.
4. Run `npm run sync` and confirm it emits `data/resume.en.json` and `public/resume.en.md` without errors.
5. Verify structure parity (see Verification below).

## Keep in Japanese, byte-identical to the source

- Structural headings: `# 基本情報`, `# アカウント`, `# 職務経歴概略`, `# 業務経験概略`, `# 職務経歴詳細`, `# スキル・経験`, `## スキル`, `## 保有資格`, `## 表彰`, `## コミュニティ活動`, `### ブログ`, `### 登壇`, `### イベント開催`, `### AWS`, `### IaC`, `### OS`, `### SaaS`, all `#### <AWSカテゴリ>` skill-category headings (e.g. `#### コンピューティング`), and `### 案件外業務/単発業務`.
- Field labels: `事業内容：`, `従業員：`, `在籍期間：`, `雇用形態：`, `概要`, `期間`, `経験した職種・役割`, `担当工程`, `使用技術`, `業務内容`, `インフラ：`, `サーバーサイド：`, `資料：`, `開催報告：`, `名前`, `職種`.
- Table header rows: `| Key | Value |`, `| 期間 | 説明 |`, `|資格名 | 取得日 |`, `| 名前 | 年 |`.
- The top line label: `最終更新日: <date>` (date value unchanged).
- All URLs, exactly as-is (including romanized-Japanese SpeakerDeck slugs — they are part of the URL).

## Translate into natural professional English

Everything else — the values. Concise resume style, verb-first bullets ("Designed and built…", "Led…"), no first person.

- Company headings (`## …` under `# 職務経歴詳細`) and project headings (`### …`) are content: translate them.
- Period values: `2023年4月 ～ 現在` → `Apr 2023 – Present` (en dash, consistent style; normalize 〜/～/- variants).
- `正社員` → `Full-time`.
- Talk/event titles under `### 登壇`: translate the link text, keep the URL.
- Content that is already English (AWS service lists, SaaS tool names, most certification names) is copied verbatim.

### Fixed glossary — always use these renderings

| Japanese | English |
| --- | --- |
| 平木 佳介（Hiraki Keisuke） | Keisuke Hiraki |
| サイバーセキュリティコンサルタント | Cybersecurity Consultant |
| クラスメソッド株式会社 | Classmethod, Inc. |
| 株式会社サイバーセキュリティクラウド | Cyber Security Cloud, Inc. |
| 株式会社夢テクノロジー（現 株式会社オープンアップITエンジニア） | Yume Technology, Inc. (now OpenUp IT Engineer, Inc.) |
| 静岡大学 工学部 機械工学科（中途退学） | Shizuoka University, Faculty of Engineering, Mechanical Engineering (withdrew) |
| Python 3 エンジニア認定基礎試験 | Python 3 Certified Engineer Basic Examination |
| ソリューションアーキテクト | Solutions Architect |
| AWSエンジニア | AWS Engineer |
| コンサルティング | Consulting |
| 設計構築 | Design and implementation |

If a new proper noun appears (company, award, event), look up its official English name before improvising; add it to this glossary when settled.

## Verification

After `npm run sync`, check parity between the two generated JSONs — every section populated in ja must be populated in en:

```bash
node -e "
const ja = require('./data/resume.json');
const en = require('./data/resume.en.json');
const count = (d) => ({
  companies: d.workExperience.companies.length,
  projects: d.workExperience.companies.map(c => c.projects.length),
  awsCats: Object.keys(d.skills.aws).length,
  certs: d.certifications.length,
  speaking: d.personalActivities.speaking.length,
});
console.log('ja:', JSON.stringify(count(ja)));
console.log('en:', JSON.stringify(count(en)));
"
```

The two lines must be identical. If en shows zeros where ja has counts, a Japanese heading or label was altered — diff the headings of both markdown files to find it:

```bash
diff <(grep -E '^#{1,4} |^\| ' data/resume.md | head -60) \
     <(grep -E '^#{1,4} |^\| ' data/resume.en.md | head -60)
```

(Structural headings/table headers should match; content headings like company/project names are expected to differ.)

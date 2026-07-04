---
name: update-certifications
description: Credlyの取得済みバッジ（AWS/Microsoft認定資格、AWS Community Builders、Japan AWS Top Engineersなど）を実際に取得し、data/resume.md と data/resume.en.md の「保有資格」「表彰」テーブルを最新状態に同期する。ユーザーが「資格を最新化して」「Credlyを確認して」「資格状況を更新して」「新しい資格バッジを反映して」「期限切れの資格を確認して」のように明示的に依頼したときに使うこと。保有資格・表彰の内容はCredlyの実データを見ずに記憶や推測だけで編集してはいけない — 必ずこのスキル経由でCredlyの現況を取得してから反映すること。
---

# 資格状況の更新 (Credly → resume.md)

Credlyのプロフィールページ（`https://www.credly.com/users/<username>`）はJavaScript必須で直接スクレイピングできない。同じデータはCredlyの公開JSONエンドポイントから取得できるので、それを使う。

## 手順

### 1. バッジ一覧を取得・分類する

```bash
python3 .claude/skills/update-certifications/scripts/fetch_credly_badges.py --username keisuke-hiraki
```

このスクリプトは以下を1回のリクエストでまとめて行う:
- Credlyの全バッジを取得
- `AWS Certified` / `Microsoft Certified` / `Google Cloud Certified` で始まるものを**資格 (certifications)** として、同名バッジを取得日最古・有効期限最新でグルーピング（再認定でバッジが分かれていても1件にまとまる）し、今日の日付と比較した `expired` フラグを付与
- `Top Engineer` / `Community Builder` / `All Certifications Engineers` を含むものを**表彰 (awards)** として分離
- それ以外（パートナー向けトレーニングバッジ、無関係なコミュニティバッジ等）は **other** に隔離し、自動反映はしない

出力される `expired` フラグと日付をそのまま信用してよい。バッジ名の表記（ハイフン vs enダッシュなど）もCredly側の表記をそのまま使う。

### 2. 現在の resume.md と突き合わせる

`data/resume.md` の `## 保有資格` テーブルと `## 表彰` テーブルを読み、スクリプトの出力と比較する。

- **新規資格**: `certifications` にあって表に無い名前 → 取得日順（既存の並び順）に行を追加する。
- **期限切れへの変化**: 表にある行がスクリプト側で `expired: true` になっている場合、資格名の末尾に `（有効期限切れ）` を追記する（すでに付いていれば何もしない）。
- **再認定による解消**: 表の行に `（有効期限切れ）` が付いているのに、スクリプト側では同名資格が `expired: false` になっている場合（再受験・再認定された）→ マーカーを外す。
- **表彰 (awards) の扱い**: `awards` に出てきたバッジ（例: `2026 Japan AWS Top Engineers`）は資格テーブルではなく `## 表彰` テーブルに追加する。バッジの `description` に部門名（例: Security部門）が書かれていることがあるので、該当すれば `2026 Japan AWS Top Engineers（Security部門）` のように括弧書きで補う。リンクは badge の `badge_url` ではなく、公式ブログ記事（`https://aws.amazon.com/jp/blogs/psa/...`）が既存の表彰リンクの慣習なので、Web検索や既存の表彰リンクのパターンを参考に対応するブログ記事を探して使う。
- **other バケット**: 自動反映しない。中身をユーザーに一覧で見せて、関連しそうなものがあれば個別に相談する（トレーニングバッジ等は通常無視してよい）。

年数範囲の表彰（例: `AWS Community Builders | 2024 - 2025`）は、Credly上で継続が確認できた最新年まで範囲を延ばす。

### 3. 英語版にも同じ変更を反映する

`data/resume.en.md` は `data/resume.md` と構造的に同一（同じ日本語の見出し・ラベル）で値だけ英語、というルールになっている（詳細は `translate-resume` スキル参照）。資格名・企業名などの固有名詞は英語版でも基本そのまま（証明書名は英語のため）。`（有効期限切れ）` は英語版では `(Expired)` に置き換える。

### 4. 反映後は必ず検証する

```bash
npm run sync && npm run lint && npm run build
```

`npm run sync` は `data/resume.md` と `data/resume.en.md` の両方から JSON を再生成する。生成された `data/resume.json` / `data/resume.en.json` を見て、資格数・表彰数が意図通り増えているか、期限切れマーカーが正しく付いた資格名にも `category`/`level` が正しく判定されているか（`scripts/sync-resume.js` の `determineCertificationCategory` / `determineCertificationLevel` は部分一致判定なので、末尾に文言を追記しても壊れない）を確認する。

### 5. 変更内容をユーザーに要約する

「新規追加した資格」「新たに期限切れと判定した資格」「表彰に追加した項目」「反映しなかった other の中身」を簡潔にまとめて報告する。証明書バッジ画像（`public/*.png`）が必要な資格を追加した場合は、対応する画像ファイルが `public/` に存在するか確認し、無ければユーザーに知らせる（`CertificationsClient.tsx` の `getCertificationBadgeImage` はスラッグが一致しないと画像を静かに非表示にするだけでエラーにならないため、気づかれにくい）。

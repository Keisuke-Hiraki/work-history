# SaaS Modern Redesign — Design Spec

Date: 2026-07-03

## Background

The previous "paper and ink" design (cream background, Shippori Mincho headings,
vermillion seal accent) was rejected by the owner as too quiet, too Japanese-styled,
monotonous in information hierarchy, and unappealing in color. This redesign replaces
it with a modern SaaS-product aesthetic (Stripe / Linear register) while keeping the
site structure, data pipeline, and features intact.

Explicit constraint from the owner: **avoid the generic AI-generated look** — no
gradient text headlines, no blurred gradient orbs, no glassmorphism, no purple-gradient
overload, no pill-color soup. Color is used only where it encodes meaning.

## Design tokens (globals.css `:root` / `.dark` + `@theme inline`)

| Token   | Light      | Dark        | Usage |
|---------|------------|-------------|-------|
| canvas  | `#FAFAFB`  | `#0B1220`   | page background |
| surface | `#FFFFFF`  | `#121A2E`   | card background |
| ink     | `#18181B`  | `#E2E8F0`   | primary text |
| muted   | `#6E6E78`  | `#94A3B8`   | secondary text |
| line    | `#E7E7EC`  | `#243044`   | borders / keylines |
| accent  | `#2B4EE6`  | `#8FA8FF`   | links, markers, CTA |

Functional tints (meaning-bearing only):
- Certification level: foundational=green, associate=blue, professional=violet,
  specialty=rose — small tinted badges.
- Career status `current`: green dot + tint.

Cards: `bg-surface border border-line rounded-xl` with a barely-there shadow
(`shadow-sm` at most). No large blob radii, no heavy drop shadows.

## Typography (next/font/google)

- Display/headings: **Inter** (600/700/800), `tracking-tight` on large sizes.
- Body: **Noto Sans JP** (400/500/700).
- Dates, tags, eyebrows: **JetBrains Mono** (400/500), uppercase eyebrows with
  `tracking-widest`.
- Japanese fonts cannot use `subsets: ['japanese']` — use `subsets: ['latin']` +
  `display: 'swap'` (CJK glyphs stream via unicode-range).

## Signature element: architecture-diagram motif

The subject is a cloud solutions architect, so the one distinctive device is drawn
from architecture diagrams:

1. Hero background carries a faint SVG node-and-edge pattern (dots connected by thin
   lines, accent color at ~6–8% opacity), clipped to the hero, invisible in print.
2. The work-experience timeline uses square diagram-node markers on a thin rail
   instead of round bullets.
3. Stats band under the hero: certification / award / talk counts computed from
   resume data, big tabular-nums figures separated by keylines (not cards).

Everything else stays quiet and disciplined.

## Layout

- Content width `max-w-4xl`, sections separated by whitespace + eyebrow labels
  (mono small-caps) + bold heading. No section numbering (order carries no meaning).
- Header: sticky, `bg-canvas/80 backdrop-blur`, border-bottom keyline. Nav links,
  Markdown link, solid-accent print button (small), dark-mode toggle.
- Hero (PersonalInfo): eyebrow role label, large name (Inter 800 for latin,
  bold JP), social links as bordered chips. Node pattern behind.
- Career summary: keyline rows with status dot.
- Work experience: company cards; projects as timeline entries with square node
  markers; tech tags as neutral mono chips.
- Skills: 2-column grid of category groups, neutral mono chips.
- Certifications: 2-column card grid; badge image logic (slug + manual basePath +
  onError fallback) unchanged; level as functional tinted badge.
- Awards / Activities: keyline list rows with mono years and external-link arrows.
- Footer: keyline top border, muted, no seal. `Seal.tsx` is deleted.

## Kept unchanged

- Data layer (`data/*`, `src/lib/*`), metadata in `layout.tsx`.
- Dark mode mechanism (DarkModeScript + toggle + `.dark` class strategy).
- Print CSS approach (tokens forced to white/black, break control, header hidden).
- `public/resume.md` direct link, `window.print()` PDF flow.
- Badge image slug generation and manual basePath handling.

## Out of scope

- No content changes, no data-pipeline changes, no new pages.

import { Fragment } from 'react';

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * resume.mdの地の文には `[label](url)` 形式のMarkdownリンクがそのまま
 * 埋め込まれることがある。JSXの素の文字列展開ではエスケープされて記号が
 * そのまま表示されてしまうため、ここでリンク部分だけ<a>に変換する。
 */
export function renderInlineMarkdownText(text: string): React.ReactNode {
  const parts = text.split(MARKDOWN_LINK);

  if (parts.length === 1) {
    return text;
  }

  const nodes: React.ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) {
      nodes.push(<Fragment key={i}>{parts[i]}</Fragment>);
    }
    const label = parts[i + 1];
    const url = parts[i + 2];
    if (label && url) {
      nodes.push(
        <a
          key={i + 1}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          {label}
        </a>
      );
    }
  }
  return nodes;
}

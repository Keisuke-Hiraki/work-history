'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="whitespace-nowrap text-sm text-ink-muted hover:text-accent transition-colors"
    >
      印刷 / PDF
    </button>
  );
}

'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="whitespace-nowrap border border-accent bg-accent px-3 py-1.5 font-mono text-xs font-medium tracking-[0.06em] text-white transition-opacity hover:opacity-85 dark:text-[#0E1216]"
    >
      印刷 / PDF
    </button>
  );
}

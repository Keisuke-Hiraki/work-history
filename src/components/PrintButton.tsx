'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="whitespace-nowrap rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-85 dark:text-[#0B1220]"
    >
      印刷 / PDF
    </button>
  );
}

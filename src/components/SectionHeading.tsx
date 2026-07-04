interface SectionHeadingProps {
  eyebrow: string;
  title: string;
}

export default function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-4">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">{eyebrow}</p>
        <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-ink md:text-[1.75rem]">{title}</h2>
      </div>
      <span aria-hidden="true" className="mt-6 flex-1 border-t border-line" />
      <span aria-hidden="true" className="mt-6 h-2 w-2 shrink-0 rounded-[1px] border border-steel bg-canvas" />
    </div>
  );
}

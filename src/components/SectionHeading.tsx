interface SectionHeadingProps {
  eyebrow: string;
  title: string;
}

export default function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
        {title}
      </h2>
    </div>
  );
}

interface SealProps {
  size?: 'sm' | 'md';
}

export default function Seal({ size = 'md' }: SealProps) {
  const dimension = size === 'md' ? 'w-11 h-11' : 'w-8 h-8';
  const textSize = size === 'md' ? 'text-base' : 'text-xs';

  return (
    <span
      aria-hidden="true"
      className={`inline-flex ${dimension} shrink-0 rotate-2 items-center justify-center rounded-[3px] bg-accent print:[print-color-adjust:exact] print:[-webkit-print-color-adjust:exact]`}
    >
      <span
        className={`${textSize} font-heading leading-none text-paper`}
        style={{ writingMode: 'vertical-rl' }}
      >
        平木
      </span>
    </span>
  );
}

import { Reveal } from '@/components/Reveal'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal variant="blur">
      <div className="max-w-2xl">
        <p className="eyebrow mb-4">
          <span className="text-ink-faint">{index} /</span> {eyebrow}
        </p>
        <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-ink">
          {title}
        </h2>
        {description ? (
          <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-muted">{description}</p>
        ) : null}
      </div>
    </Reveal>
  )
}

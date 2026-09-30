import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { method } from '@/data/constellation'

export function Method() {
  return (
    <section id="metodo" className="hairline-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeading
          index="03"
          eyebrow="Cómo trabajo"
          title="Un método, no improvisación."
          description="Así abordo un sistema, del primer contacto al soporte continuo."
        />

        <Reveal delay={0.08}>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {method.map((step) => (
              <article key={step.index} className="bg-panel p-7">
                <span className="font-display text-3xl font-semibold text-accent">{step.index}</span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">{step.text}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

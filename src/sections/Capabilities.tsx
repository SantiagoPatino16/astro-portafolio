import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { capabilities } from '@/data/constellation'

export function Capabilities() {
  return (
    <section id="capacidades" className="hairline-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeading
          index="05"
          eyebrow="Capacidades"
          title="Tecnología organizada por lo que resuelve."
          description="Nada de logos sueltos: cada herramienta está donde la uso y para qué."
        />

        <Reveal delay={0.08}>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {capabilities.map((group) => (
              <article key={group.name} className="rounded-lg border border-line bg-panel p-6">
                <h3 className="font-display text-lg font-semibold text-ink">{group.name}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] text-ink"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm text-ink-muted">{group.note}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { services } from '@/data/constellation'

export function Services() {
  return (
    <section id="servicios" className="hairline-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeading
          index="06"
          eyebrow="Servicios"
          title="Lo que puedo hacer por tu empresa."
          description="Tres líneas de servicio, todas conectadas: construyo, automatizo y mantengo."
        />

        <Reveal delay={0.08}>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.id} className="flex flex-col rounded-lg border border-line bg-panel p-6">
                <h3 className="font-display text-xl font-semibold text-ink">{service.name}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-ink-muted">
                      <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

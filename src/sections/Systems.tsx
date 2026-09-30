import { Link } from 'react-router-dom'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { StatusBadge } from '@/components/StatusBadge'
import { caseStudies, otherSystems } from '@/data/constellation'

export function Systems() {
  const featured = caseStudies.filter((c) => c.featured)

  return (
    <section id="sistemas" className="hairline-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeading
          index="04"
          eyebrow="Sistemas"
          title="Software real, en producción."
          description="No demos ni prototipos: sistemas que empresas usan para operar. Cada uno con su problema, sus decisiones y su estado actual."
        />

        <div className="mt-14 space-y-3">
          {featured.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.07}>
              <Link
                to={`/sistema/${c.id}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-lg border border-line bg-panel p-6 transition-colors hover:border-line-strong md:gap-8 md:p-8"
              >
                <span className="font-mono text-sm text-ink-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl font-semibold text-ink md:text-3xl">
                      {c.name}
                    </h3>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="mt-2 text-[0.95rem] text-ink-muted">{c.tagline}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.stack.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="rounded border border-line px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-ink-muted"
                      >
                        {s}
                      </span>
                    ))}
                    {c.stack.length > 4 ? (
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-ink-faint">
                        +{c.stack.length - 4}
                      </span>
                    ) : null}
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className="font-display text-2xl text-ink-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent-ink"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="eyebrow mb-6">Otros sistemas</h3>
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {otherSystems.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05} className="bg-panel p-5">
                <h4 className="font-medium text-ink">{s.name}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.what}</p>
                <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-ink-faint">
                  {s.stack}
                </p>
                <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-accent-ink">
                  {s.status}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

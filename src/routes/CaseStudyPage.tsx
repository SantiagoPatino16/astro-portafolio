import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { caseStudies } from '@/data/constellation'
import { StatusBadge } from '@/components/StatusBadge'
import { Screenshot } from '@/components/Screenshot'
import { NotFound } from '@/routes/NotFound'

export function CaseStudyPage() {
  const { id } = useParams()
  const study = caseStudies.find((c) => c.id === id)

  useEffect(() => {
    if (study) document.title = `${study.name} — Astro, Inc`
  }, [study])

  if (!study) return <NotFound />

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <Link
        to="/#sistemas"
        className="mono-label inline-flex items-center gap-2 transition-colors hover:text-ink"
      >
        ← Volver a los sistemas
      </Link>

      <header className="mt-10 max-w-3xl">
        <p className="eyebrow mb-4">{study.kindLabel}</p>
        <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tight text-ink">
          {study.name}
        </h1>
        <p className="mt-4 text-[1.15rem] leading-relaxed text-ink-muted">{study.tagline}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <StatusBadge status={study.status} />
          <span className="mono-label">{study.period}</span>
        </div>
      </header>

      <div className="mt-14 grid gap-12 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <dl className="space-y-6 border-l border-line pl-5">
            <div>
              <dt className="mono-label mb-1">Rol</dt>
              <dd className="text-sm text-ink-muted">{study.role}</dd>
            </div>
            <div>
              <dt className="mono-label mb-1">Tipo</dt>
              <dd className="text-sm text-ink-muted">{study.kindLabel}</dd>
            </div>
            <div>
              <dt className="mono-label mb-1">Estado</dt>
              <dd className="text-sm text-ink-muted">{study.statusLabel}</dd>
            </div>
          </dl>
        </aside>

        <div className="min-w-0 space-y-16">
          <section>
            <h2 className="eyebrow mb-4">Resumen</h2>
            <p className="text-[1.05rem] leading-relaxed text-ink-muted">{study.summary}</p>
          </section>

          <section>
            <h2 className="eyebrow mb-4">El problema</h2>
            <p className="max-w-2xl text-[1.05rem] leading-relaxed text-ink">{study.problem}</p>
          </section>

          <section>
            <h2 className="eyebrow mb-4">La solución</h2>
            <p className="max-w-2xl text-[1.05rem] leading-relaxed text-ink">{study.solution}</p>
          </section>

          {study.shots.length > 0 ? (
            <section>
              <h2 className="eyebrow mb-6">Capturas</h2>
              <div
                className={`grid gap-6 ${
                  study.shots.length === 1 ? 'max-w-xl' : 'sm:grid-cols-2'
                }`}
              >
                {study.shots.map((shot) => (
                  <Screenshot key={shot.base} base={shot.base} alt={shot.alt} caption={shot.caption} />
                ))}
              </div>
            </section>
          ) : null}

          <section>
            <h2 className="eyebrow mb-6">Decisiones</h2>
            <div className="space-y-6">
              {study.decisions.map((d) => (
                <div key={d.title} className="border-l border-line pl-5">
                  <h3 className="font-display text-lg font-semibold text-ink">{d.title}</h3>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-muted">{d.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="eyebrow mb-6">Arquitectura</h2>
            <div className="overflow-hidden rounded-lg border border-line">
              {study.architecture.map((layer, i) => (
                <div
                  key={layer.layer}
                  className={`flex flex-col gap-1 p-5 sm:flex-row sm:items-baseline sm:gap-6 ${
                    i > 0 ? 'border-t border-line' : ''
                  }`}
                >
                  <span className="w-36 shrink-0 font-mono text-sm text-accent">{layer.layer}</span>
                  <span className="text-[0.95rem] text-ink-muted">{layer.detail}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="eyebrow mb-4">Stack</h2>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] text-ink"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="eyebrow mb-4">Lo destacable</h2>
            <ul className="space-y-2">
              {study.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-[0.98rem] text-ink-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="eyebrow mb-4">Evolución</h2>
            <p className="max-w-2xl text-[1.05rem] leading-relaxed text-ink">{study.evolution}</p>
          </section>

          <section className="rounded-lg border border-line bg-panel p-6">
            <h2 className="eyebrow mb-3">Resultado</h2>
            <p className="text-[1.05rem] leading-relaxed text-ink">{study.result}</p>
          </section>
        </div>
      </div>
    </div>
  )
}

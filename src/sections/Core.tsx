import { Link } from 'react-router-dom'
import { contact } from '@/data/contact'

export function Core() {
  return (
    <section id="nucleo" className="bg-grid relative flex min-h-[92vh] items-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 40%, transparent 0%, var(--color-void) 100%)',
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-32 md:px-8 md:pt-40">
        <p className="eyebrow mb-6">Astro, Inc · Sistemas de software</p>

        <h1 className="font-display max-w-4xl text-[clamp(2.5rem,7vw,5.25rem)] font-semibold leading-[1.02] tracking-tight text-ink">
          Construyo el software con el que una empresa trabaja.
        </h1>

        <p className="mt-7 max-w-xl text-[1.1rem] leading-relaxed text-ink-muted">
          Sistemas de escritorio y web que quedan en producción: de la base de datos al soporte,
          todo el ciclo de vida.
        </p>

        <p className="mt-6 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-ink-faint">
          AstroCred · AstroNova · AstroRise — en producción y evolución
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/#sistemas"
            className="rounded-full bg-accent px-6 py-3 font-mono text-[0.74rem] uppercase tracking-[0.12em] text-void transition-opacity hover:opacity-90"
          >
            Ver los sistemas
          </Link>
          <Link
            to="/#contacto"
            className="rounded-full border border-line-strong px-6 py-3 font-mono text-[0.74rem] uppercase tracking-[0.12em] text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Contáctame
          </Link>
        </div>

        <p className="mt-16 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint">
          {contact.name} · dueño
        </p>
      </div>
    </section>
  )
}

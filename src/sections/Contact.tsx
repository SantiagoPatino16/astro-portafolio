import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { contact } from '@/data/contact'

export function Contact() {
  return (
    <section id="contacto" className="hairline-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="eyebrow mb-5">
            <span className="text-ink-faint">07 /</span> Contacto
          </p>
          <h2 className="font-display max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-ink">
            ¿Necesitas un sistema, una automatización o soporte?
          </h2>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-muted">
            Cuéntame qué problema tienes y te digo cómo lo resolvería. Respondo directo, sin
            presentaciones de ventas.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${contact.email}`}
            className="rounded-full bg-accent px-6 py-3 font-mono text-[0.74rem] uppercase tracking-[0.12em] text-void transition-opacity hover:opacity-90"
          >
            {contact.email}
          </a>
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line-strong px-6 py-3 font-mono text-[0.74rem] uppercase tracking-[0.12em] text-ink transition-colors hover:border-accent hover:text-accent"
          >
            WhatsApp
          </a>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="group bg-panel p-5 transition-colors hover:bg-elevated"
          >
            <p className="mono-label mb-2">GitHub</p>
            <p className="truncate text-sm text-ink-muted group-hover:text-ink">santiagopatino16</p>
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group bg-panel p-5 transition-colors hover:bg-elevated"
          >
            <p className="mono-label mb-2">LinkedIn</p>
            <p className="truncate text-sm text-ink-muted group-hover:text-ink">
              /in/santiagopatinodev
            </p>
          </a>
          <Link to="/cv" className="group bg-panel p-5 transition-colors hover:bg-elevated">
            <p className="mono-label mb-2">Hoja de vida</p>
            <p className="text-sm text-ink-muted group-hover:text-ink">Ver y descargar</p>
          </Link>
        </div>
        </Reveal>
      </div>
    </section>
  )
}

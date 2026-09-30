import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { contact } from '@/data/contact'

export function CVPage() {
  useEffect(() => {
    document.title = 'Hoja de vida — Astro, Inc'
  }, [])

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <Link to="/#contacto" className="mono-label inline-flex items-center gap-2 transition-colors hover:text-ink">
        ← Volver
      </Link>

      <header className="mt-10">
        <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.02] tracking-tight text-ink">
          Hoja de vida
        </h1>
        <p className="mt-4 text-[1.05rem] text-ink-muted">
          {contact.name} · {contact.role}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/cv.pdf"
            download
            className="rounded-full bg-accent px-5 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-void transition-opacity hover:opacity-90"
          >
            Descargar PDF
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line-strong px-5 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Abrir en pestaña nueva
          </a>
        </div>
      </header>

      <div className="mt-10 overflow-hidden rounded-lg border border-line bg-panel">
        <iframe
          src="/cv.pdf"
          title="Hoja de vida de Santiago Patiño Riaño"
          className="h-[70vh] w-full"
        />
      </div>

      <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-faint">
        Si el visor no carga, usa «Abrir en pestaña nueva».
      </p>
    </div>
  )
}

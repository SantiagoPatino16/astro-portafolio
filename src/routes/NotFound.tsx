import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function NotFound() {
  useEffect(() => {
    document.title = 'Página no encontrada — Astro, Inc'
  }, [])

  return (
    <div className="bg-grid flex min-h-[80vh] items-center justify-center px-5 pt-20">
      <div className="text-center">
        <p className="eyebrow mb-4">404</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          No hay nada en esta órbita.
        </h1>
        <p className="mt-4 text-ink-muted">La página que buscas no existe.</p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-accent px-6 py-3 font-mono text-[0.74rem] uppercase tracking-[0.12em] text-void transition-opacity hover:opacity-90"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

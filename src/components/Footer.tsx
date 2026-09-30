import { Link } from 'react-router-dom'
import { Wordmark } from '@/components/Wordmark'
import { contact } from '@/data/contact'

export function Footer() {
  return (
    <footer className="hairline-t relative z-10 mt-28 border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              Software a medida que queda en producción. Diseñado, construido y mantenido por{' '}
              {contact.name}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-3 md:gap-16">
            <div>
              <p className="mono-label mb-3">Explorar</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/#sistemas" className="text-ink-muted transition-colors hover:text-ink">
                    Sistemas
                  </Link>
                </li>
                <li>
                  <Link to="/#servicios" className="text-ink-muted transition-colors hover:text-ink">
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link to="/cv" className="text-ink-muted transition-colors hover:text-ink">
                    Hoja de vida
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="mono-label mb-3">Contacto</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href={`mailto:${contact.email}`} className="text-ink-muted transition-colors hover:text-ink">
                    Correo
                  </a>
                </li>
                <li>
                  <a href={contact.github} target="_blank" rel="noreferrer" className="text-ink-muted transition-colors hover:text-ink">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-ink-muted transition-colors hover:text-ink">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-faint md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Astro, Inc</p>
          <p>{contact.location}</p>
        </div>
      </div>
    </footer>
  )
}

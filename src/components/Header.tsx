import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Wordmark } from '@/components/Wordmark'

const nav = [
  { label: 'Sistemas', to: '/#sistemas' },
  { label: 'Método', to: '/#metodo' },
  { label: 'Capacidades', to: '/#capacidades' },
  { label: 'Servicios', to: '/#servicios' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-line bg-void/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <Wordmark />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="mono-label transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/#contacto"
          className="rounded-full border border-line-strong px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Contacto
        </Link>
      </div>
    </header>
  )
}

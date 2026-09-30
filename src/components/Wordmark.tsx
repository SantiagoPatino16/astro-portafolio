import { Link } from 'react-router-dom'

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 text-ink no-underline ${className}`}
      aria-label="Astro, Inc — inicio"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="11" cy="11" r="9.5" stroke="currentColor" strokeOpacity="0.35" />
        <circle cx="11" cy="11" r="3" fill="var(--color-accent)" />
        <circle cx="11" cy="11" r="9.5" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="2 5" strokeLinecap="round" className="origin-center transition-transform duration-700 group-hover:rotate-90" />
      </svg>
      <span className="font-display text-[1.05rem] font-semibold tracking-tight">
        Astro
        <span className="text-ink-muted font-normal">, Inc</span>
      </span>
    </Link>
  )
}

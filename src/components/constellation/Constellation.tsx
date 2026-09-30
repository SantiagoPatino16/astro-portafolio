import { lazy, Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRenderer } from '@/app/renderer-context'
import { nodeById } from '@/lib/constellation'
import { constellation, statusLabel, type ConstellationNode } from '@/data/constellation'
import { ConstellationSVG } from './ConstellationSVG'

const ConstellationScene = lazy(() =>
  import('./ConstellationScene').then((m) => ({ default: m.ConstellationScene })),
)

function MobileConstellation() {
  const navigate = useNavigate()
  const items = constellation.filter((n) => n.kind !== 'core')

  const goTo = (node: ConstellationNode) => {
    if (node.caseId) navigate(`/sistema/${node.caseId}`)
    else if (node.kind === 'service') navigate('/#servicios')
  }

  return (
    <ul className="space-y-2 md:hidden">
      <li className="flex items-center gap-3 rounded-lg border border-line bg-panel px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
        <span className="font-display font-semibold text-ink">Astro, Inc</span>
        <span className="mono-label ml-auto">núcleo</span>
      </li>
      {items.map((node) => (
        <li key={node.id}>
          <button
            type="button"
            onClick={() => goTo(node)}
            className="flex w-full items-center gap-3 rounded-lg border border-line bg-panel px-4 py-3 text-left transition-colors hover:border-line-strong"
          >
            <span
              className={`h-2 w-2 rounded-full ${node.kind === 'product' ? 'bg-ink' : 'bg-accent'}`}
              aria-hidden="true"
            />
            <span className="font-medium text-ink">{node.name}</span>
            <span className="ml-auto font-mono text-[0.65rem] uppercase tracking-[0.1em] text-ink-muted">
              {node.status ? statusLabel[node.status] : node.short}
            </span>
            <span aria-hidden="true" className="text-ink-faint">
              →
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export function Constellation() {
  const { mode } = useRenderer()
  const navigate = useNavigate()
  const [active, setActive] = useState<string | null>(null)

  const handleSelect = (node: ConstellationNode) => {
    if (node.caseId) navigate(`/sistema/${node.caseId}`)
    else if (node.kind === 'service') navigate('/#servicios')
  }

  const hovered = active ? nodeById(active) : undefined

  return (
    <div>
      {mode === 'webgl' ? (
        <div className="relative hidden h-[460px] w-full md:block md:h-[560px]">
          <Suspense fallback={null}>
            <ConstellationScene active={active} onHover={setActive} onSelect={handleSelect} />
          </Suspense>

          <div
            className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 transition-opacity duration-200"
            aria-hidden="true"
          >
            <div
              className={`flex flex-col items-center gap-1 rounded-lg border border-line bg-panel/80 px-4 py-2 text-center backdrop-blur-sm transition-opacity duration-200 ${
                hovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink">
                {hovered?.name ?? ''}
              </span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-muted">
                {hovered?.status ? statusLabel[hovered.status] : hovered?.short ?? ''}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden h-[460px] items-center justify-center md:flex md:h-[560px]">
          <div className="w-full max-w-3xl">
            <ConstellationSVG />
          </div>
        </div>
      )}

      <MobileConstellation />

      <p className="mt-4 hidden text-center font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint md:block">
        {mode === 'webgl' ? 'Arrastra para orbitar · selecciona un nodo' : 'Selecciona un nodo para explorar'}
      </p>
    </div>
  )
}

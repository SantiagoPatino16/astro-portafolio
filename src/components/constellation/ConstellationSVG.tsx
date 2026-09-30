import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { constellation } from '@/data/constellation'
import { constellationEdges, nodeById } from '@/lib/constellation'

const VB_W = 800
const VB_H = 520
const CX = VB_W / 2
const CY = VB_H / 2
const XR = 285
const YR = 198

const radius: Record<string, number> = {
  core: 30,
  product: 21,
  service: 14,
}

function project(x: number, y: number) {
  return { x: CX + x * XR, y: CY - y * YR }
}

export function ConstellationSVG() {
  const navigate = useNavigate()
  const [active, setActive] = useState<string | null>(null)

  const edges = useMemo(() => constellationEdges(), [])
  const nodes = useMemo(
    () =>
      constellation.map((n) => ({
        ...n,
        px: project(n.position.x, n.position.y).x,
        py: project(n.position.x, n.position.y).y,
        r: radius[n.kind] ?? 16,
      })),
    [],
  )

  const activeNode = active ? nodeById(active) : undefined
  const activeSet = useMemo(() => {
    if (!activeNode) return null
    return new Set([activeNode.id, ...activeNode.connections])
  }, [activeNode])

  const isDimmed = (id: string) => activeSet !== null && !activeSet.has(id)
  const isConnectedEdge = (a: string, b: string) =>
    activeSet !== null && activeSet.has(a) && activeSet.has(b)

  const handleActivate = (id: string | null) => setActive(id)

  const goTo = (node: (typeof nodes)[number]) => {
    if (node.caseId) navigate(`/sistema/${node.caseId}`)
    else if (node.kind === 'service') navigate('/#servicios')
  }

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="h-auto w-full" aria-hidden="true">
        {edges.map(([a, b]) => {
          const na = nodeById(a)!
          const nb = nodeById(b)!
          const pa = project(na.position.x, na.position.y)
          const pb = project(nb.position.x, nb.position.y)
          const connected = isConnectedEdge(a, b)
          return (
            <line
              key={`${a}|${b}`}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              strokeWidth={connected ? 1.4 : 1}
              opacity={activeSet === null ? 1 : connected ? 1 : 0.12}
              style={{ stroke: connected ? 'var(--color-accent)' : 'var(--color-line)' }}
              className="transition-all duration-300"
            />
          )
        })}

        {nodes.map((node) => {
          const dim = isDimmed(node.id)
          const isCore = node.kind === 'core'
          return (
            <g
              key={node.id}
              opacity={dim ? 0.22 : 1}
              className="transition-opacity duration-300"
              onMouseEnter={() => handleActivate(node.id)}
              onMouseLeave={() => handleActivate(null)}
              onFocus={() => handleActivate(node.id)}
              onBlur={() => handleActivate(null)}
            >
              {isCore ? (
                <g aria-hidden="true">
                  <circle
                    cx={node.px}
                    cy={node.py}
                    r={node.r + 14}
                    strokeDasharray="3 6"
                    style={{ stroke: 'var(--color-accent)' }}
                    strokeOpacity="0.25"
                  />
                  <circle cx={node.px} cy={node.py} r={node.r} style={{ fill: 'var(--color-accent)' }} />
                </g>
              ) : (
                <a
                  href={node.caseId ? `/sistema/${node.caseId}` : '/#servicios'}
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={(e) => {
                    e.preventDefault()
                    goTo(node)
                  }}
                  className="cursor-pointer"
                >
                  <circle
                    cx={node.px}
                    cy={node.py}
                    r={node.r}
                    strokeWidth={1.2}
                    style={{
                      fill: 'var(--color-panel)',
                      stroke: active === node.id ? 'var(--color-accent)' : 'var(--color-line-strong)',
                    }}
                  />
                  <circle cx={node.px} cy={node.py} r={node.r * 0.32} style={{ fill: 'var(--color-accent)' }} />
                </a>
              )}

              <text
                x={node.px}
                y={node.py + node.r + 18}
                textAnchor="middle"
                className="pointer-events-none select-none"
                style={{ fill: isCore ? 'var(--color-ink)' : 'var(--color-ink-muted)' }}
                fontSize={node.kind === 'service' ? 11 : 13}
                fontFamily="var(--font-mono)"
                letterSpacing="0.08em"
              >
                {node.name}
              </text>
            </g>
          )
        })}
      </svg>

      <ul className="sr-only">
        {constellation
          .filter((n) => n.kind !== 'core')
          .map((n) => (
            <li key={n.id}>
              <Link to={n.caseId ? `/sistema/${n.caseId}` : '/#servicios'}>{n.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

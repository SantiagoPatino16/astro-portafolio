import { useMemo, useState, type ReactNode } from 'react'
import { resolveRendererMode, prefersReducedMotion, type RendererMode } from '@/lib/renderer'
import { RendererContext } from '@/app/renderer-context'

export function RendererProvider({ children }: { children: ReactNode }) {
  const [mode] = useState<RendererMode>(() => resolveRendererMode())

  const value = useMemo(() => ({ mode, reducedMotion: prefersReducedMotion() }), [mode])

  return <RendererContext.Provider value={value}>{children}</RendererContext.Provider>
}

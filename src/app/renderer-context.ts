import { createContext, useContext } from 'react'
import type { RendererMode } from '@/lib/renderer'

export interface RendererContextValue {
  mode: RendererMode
  reducedMotion: boolean
}

export const RendererContext = createContext<RendererContextValue>({
  mode: 'svg',
  reducedMotion: false,
})

export function useRenderer() {
  return useContext(RendererContext)
}

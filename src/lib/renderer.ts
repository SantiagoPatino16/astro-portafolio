export type RendererMode = 'webgl' | 'svg'

export function canWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    return !!gl
  } catch {
    return false
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isLowPowerDevice(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const narrow = window.innerWidth < 768
  return coarse || narrow
}

export function resolveRendererMode(): RendererMode {
  if (prefersReducedMotion()) return 'svg'
  if (!canWebGL()) return 'svg'
  if (isLowPowerDevice()) return 'svg'
  return 'webgl'
}

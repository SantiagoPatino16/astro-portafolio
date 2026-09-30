import { useLayoutEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRenderer } from '@/app/renderer-context'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxProps {
  children: ReactNode
  className?: string
  from?: number
  to?: number
}

export function Parallax({ children, className = '', from = 40, to = -40 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { reducedMotion } = useRenderer()

  useLayoutEffect(() => {
    if (reducedMotion) return
    const el = ref.current
    if (!el) return

    const tween = gsap.fromTo(
      el,
      { y: from },
      {
        y: to,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reducedMotion, from, to])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

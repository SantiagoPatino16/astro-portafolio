import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRenderer } from '@/app/renderer-context'

gsap.registerPlugin(ScrollTrigger)

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const { reducedMotion } = useRenderer()

  useLayoutEffect(() => {
    if (reducedMotion) return
    const el = ref.current
    if (!el) return

    const tween = gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reducedMotion])

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
      style={reducedMotion ? { display: 'none' } : undefined}
    />
  )
}

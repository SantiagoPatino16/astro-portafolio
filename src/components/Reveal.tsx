import { useLayoutEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRenderer } from '@/app/renderer-context'

gsap.registerPlugin(ScrollTrigger)

if (typeof window !== 'undefined') {
  window.addEventListener(
    'load',
    () => ScrollTrigger.refresh(),
    { once: true },
  )
}

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export function Reveal({ children, className = '', delay = 0, y = 26 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { reducedMotion } = useRenderer()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (reducedMotion) {
      gsap.set(el, { clearProps: 'all' })
      return
    }

    const tween = gsap.fromTo(
      el,
      { y, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reducedMotion, delay, y])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

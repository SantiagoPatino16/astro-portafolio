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

type Variant = 'rise' | 'fade' | 'scale' | 'blur'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  variant?: Variant
}

function fromState(variant: Variant, y: number): gsap.TweenVars {
  switch (variant) {
    case 'fade':
      return { autoAlpha: 0 }
    case 'scale':
      return { autoAlpha: 0, scale: 0.94 }
    case 'blur':
      return { autoAlpha: 0, filter: 'blur(10px)' }
    default:
      return { y, autoAlpha: 0 }
  }
}

function toState(variant: Variant): gsap.TweenVars {
  switch (variant) {
    case 'blur':
      return { filter: 'blur(0px)' }
    default:
      return {}
  }
}

export function Reveal({ children, className = '', delay = 0, y = 26, variant = 'rise' }: RevealProps) {
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
      fromState(variant, y),
      {
        ...toState(variant),
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reducedMotion, delay, y, variant])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

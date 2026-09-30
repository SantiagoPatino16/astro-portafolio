import { useMemo } from 'react'

function seededRandom(seed: number) {
  let t = seed >>> 0
  return () => {
    t = (t + 0x6d2b79f5) >>> 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

interface Star {
  x: number
  y: number
  r: number
  opacity: number
  bright: boolean
  twinkle: boolean
  delay: number
  duration: number
}

function generateStars(count: number): Star[] {
  const random = seededRandom(7)
  const stars: Star[] = []
  for (let i = 0; i < count; i++) {
    const bright = random() > 0.92
    stars.push({
      x: random() * 100,
      y: random() * 100,
      r: bright ? 1.1 + random() * 1 : 0.4 + random() * 0.8,
      opacity: bright ? 0.7 + random() * 0.3 : 0.2 + random() * 0.45,
      bright,
      twinkle: random() > 0.6,
      delay: random() * 5,
      duration: 2.5 + random() * 4,
    })
  }
  return stars
}

export function Starfield() {
  const stars = useMemo(() => generateStars(150), [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 45% at 78% 8%, var(--color-nebula-1) 0%, transparent 65%), radial-gradient(50% 40% at 12% 82%, var(--color-nebula-2) 0%, transparent 60%)',
        }}
      />
      <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        {stars.map((star, i) => (
          <circle
            key={i}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.r}
            className={star.twinkle ? 'star-twinkle' : undefined}
            style={{
              fill: star.bright ? 'var(--color-star-bright)' : 'var(--color-star)',
              opacity: star.opacity,
              ...(star.twinkle
                ? { animationDelay: `${star.delay}s`, animationDuration: `${star.duration}s` }
                : {}),
            }}
          />
        ))}
      </svg>
    </div>
  )
}

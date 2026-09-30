import { useState } from 'react'
import { shotCandidates } from '@/lib/shots'

interface ScreenshotProps {
  base: string
  alt: string
  caption: string
}

export function Screenshot({ base, alt, caption }: ScreenshotProps) {
  const candidates = shotCandidates(base)
  const [index, setIndex] = useState(0)
  const [missing, setMissing] = useState(false)

  if (missing) {
    return (
      <figure className="flex h-full flex-col">
        <div className="bg-grid flex min-h-[220px] flex-1 items-center justify-center rounded-lg border border-line bg-panel">
          <div className="text-center">
            <p className="mono-label mb-1">{caption}</p>
            <p className="text-xs text-ink-faint">Captura pendiente</p>
          </div>
        </div>
      </figure>
    )
  }

  return (
    <figure className="flex h-full flex-col">
      <div className="overflow-hidden rounded-lg border border-line bg-panel">
        <img
          src={candidates[index]}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-auto w-full object-cover"
          onError={() => {
            if (index < candidates.length - 1) {
              setIndex(index + 1)
            } else {
              setMissing(true)
            }
          }}
        />
      </div>
      <figcaption className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-faint">
        {caption}
      </figcaption>
    </figure>
  )
}

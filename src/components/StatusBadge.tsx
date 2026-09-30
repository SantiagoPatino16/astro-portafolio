import type { ProductStatus } from '@/data/constellation'
import { statusLabel } from '@/data/constellation'

const tone: Record<ProductStatus, string> = {
  produccion: 'text-prod border-prod/30 bg-prod/10',
  beta: 'text-beta border-beta/30 bg-beta/10',
  academico: 'text-acad border-acad/30 bg-acad/10',
}

export function StatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] ${tone[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {statusLabel[status]}
    </span>
  )
}

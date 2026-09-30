import { constellation, type ConstellationNode } from '@/data/constellation'

export function nodeById(id: string): ConstellationNode | undefined {
  return constellation.find((n) => n.id === id)
}

export function constellationEdges(): [string, string][] {
  const byId = new Map(constellation.map((n) => [n.id, n]))
  const edges: [string, string][] = []
  const seen = new Set<string>()
  for (const n of constellation) {
    for (const c of n.connections) {
      if (!byId.has(c)) continue
      const key = [n.id, c].sort().join('|')
      if (seen.has(key)) continue
      seen.add(key)
      edges.push([n.id, c])
    }
  }
  return edges
}

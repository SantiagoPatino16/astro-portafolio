const EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp']

export function shotCandidates(base: string): string[] {
  return EXTENSIONS.map((ext) => `/resources/${base}.${ext}`)
}

export function shotDefault(base: string): string {
  return `/resources/${base}.png`
}

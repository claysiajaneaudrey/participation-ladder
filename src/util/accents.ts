// Per-theme accent class sets. Full literal class strings (no dynamic
// interpolation) so Tailwind's scanner keeps them in the build.

export type AccentName = 'coral' | 'teal'

export interface AccentClasses {
  text: string
  softBg: string
  border: string
  ring: string
  gradient: string
  chipBg: string
}

const ACCENTS: Record<AccentName, AccentClasses> = {
  coral: {
    text: 'text-coral-dark',
    softBg: 'bg-coral/10',
    border: 'border-coral',
    ring: 'ring-coral/30',
    gradient: 'gradient-coral',
    chipBg: 'bg-coral',
  },
  teal: {
    text: 'text-teal-dark',
    softBg: 'bg-teal/10',
    border: 'border-teal',
    ring: 'ring-teal/30',
    gradient: 'gradient-teal',
    chipBg: 'bg-teal',
  },
}

export function accent(name: string | undefined): AccentClasses {
  return ACCENTS[(name as AccentName) in ACCENTS ? (name as AccentName) : 'coral']
}

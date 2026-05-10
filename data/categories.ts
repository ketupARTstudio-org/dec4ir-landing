export type CategoryId = 'primaryL1' | 'primaryL2' | 'secondaryLower' | 'secondaryUpper'
export type CertId = 'participation' | 'achievement' | 'excellence'

export interface Category {
  id: CategoryId
  accentClass: string
}

export interface Cert {
  id: CertId
  icon: string
  tier: 1 | 2 | 3
}

export const CATEGORIES: Category[] = [
  { id: 'primaryL1',      accentClass: 'border-sky-400 text-sky-400' },
  { id: 'primaryL2',      accentClass: 'border-cyan-400 text-cyan-400' },
  { id: 'secondaryLower', accentClass: 'border-violet-400 text-violet-400' },
  { id: 'secondaryUpper', accentClass: 'border-purple-400 text-purple-400' },
]

export const CERTS: Cert[] = [
  { id: 'participation', icon: '📜', tier: 1 },
  { id: 'achievement',   icon: '⭐', tier: 2 },
  { id: 'excellence',    icon: '🥇', tier: 3 },
]

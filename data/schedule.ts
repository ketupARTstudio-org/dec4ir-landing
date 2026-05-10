export type PhaseId =
  | 'regOpen'
  | 'regClose'
  | 'trialQuiz'
  | 'screeningQuiz'
  | 'shortlist'
  | 'finalDeadline'
  | 'results'

export interface Phase {
  id: PhaseId
  isoDate: string
}

export const PHASES: Phase[] = [
  { id: 'regOpen',       isoDate: '2026-05-13' },
  { id: 'regClose',      isoDate: '2026-06-16' },
  { id: 'trialQuiz',     isoDate: '2026-06-19' },
  { id: 'screeningQuiz', isoDate: '2026-06-30' },
  { id: 'shortlist',     isoDate: '2026-07-07' },
  { id: 'finalDeadline', isoDate: '2026-08-08' },
  { id: 'results',       isoDate: '2026-08-30' },
]

export function getPhaseStatus(isoDate: string): 'past' | 'current' | 'future' {
  const now = new Date()
  const phaseDate = new Date(isoDate)
  if (phaseDate < now) return 'past'
  return 'future'
}

export function findNextPhaseIndex(): number {
  const now = new Date()
  const idx = PHASES.findIndex(p => new Date(p.isoDate) >= now)
  return idx === -1 ? PHASES.length - 1 : idx
}

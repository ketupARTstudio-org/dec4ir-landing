export type PhaseId =
  | 'regOpen'
  | 'regClose'
  | 'trialQuiz'
  | 'screeningQuiz1'
  | 'screeningQuiz2'
  | 'screeningQuiz3'
  | 'screeningQuiz4'
  | 'shortlist'
  | 'finalistBriefing'
  | 'finalAssignmentDeadline'
  | 'finalResults'

export interface Phase {
  id: PhaseId
  isoDate: string
}

export const PHASES: Phase[] = [
  { id: 'regOpen', isoDate: '2026-05-13' },
  { id: 'regClose', isoDate: '2026-06-30' },
  { id: 'trialQuiz', isoDate: '2026-07-08' },
  { id: 'screeningQuiz1', isoDate: '2026-07-13' },
  { id: 'screeningQuiz2', isoDate: '2026-07-14' },
  { id: 'screeningQuiz3', isoDate: '2026-07-15' },
  { id: 'screeningQuiz4', isoDate: '2026-07-16' },
  { id: 'shortlist', isoDate: '2026-07-23' },
  { id: 'finalistBriefing', isoDate: '2026-07-23' },
  { id: 'finalAssignmentDeadline', isoDate: '2026-08-08' },
  { id: 'finalResults', isoDate: '2026-09-01' },
]

const HIDDEN_PHASES: Phase[] = [
  { id: 'trialQuiz', isoDate: '2026-06-19' },
  { id: 'screeningQuiz1', isoDate: '2026-06-30' },
  { id: 'shortlist', isoDate: '2026-07-07' },
  { id: 'finalAssignmentDeadline', isoDate: '2026-08-08' },
  { id: 'finalResults', isoDate: '2026-08-30' },
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

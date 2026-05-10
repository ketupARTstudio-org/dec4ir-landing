export type FeatureId =
  | 'mobileApp'
  | 'vrTraining'
  | 'codeBlock'
  | 'workbook'
  | 'videoLearning'
  | 'quizPlatform'
  | 'assignment'
  | 'certificate'

export interface Feature {
  id: FeatureId
  icon: string
}

export const FEATURES: Feature[] = [
  { id: 'mobileApp',    icon: '📱' },
  { id: 'vrTraining',   icon: '🥽' },
  { id: 'codeBlock',    icon: '💻' },
  { id: 'workbook',     icon: '📖' },
  { id: 'videoLearning',icon: '🎬' },
  { id: 'quizPlatform', icon: '📝' },
  { id: 'assignment',   icon: '📋' },
  { id: 'certificate',  icon: '🎓' },
]

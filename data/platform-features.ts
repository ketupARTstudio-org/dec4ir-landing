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
  mediaPath: string
  mediaType: 'image' | 'video'
}

export const FEATURES: Feature[] = [
  { id: 'mobileApp',     icon: '📱', mediaPath: '/media/features/gofly-mobile.jpeg',            mediaType: 'image' },
  { id: 'vrTraining',    icon: '🥽', mediaPath: '/media/features/gofly.mp4',                    mediaType: 'video' },
  { id: 'codeBlock',     icon: '💻', mediaPath: '/media/features/droneblock.mp4',               mediaType: 'video' },
  { id: 'workbook',      icon: '📖', mediaPath: '/media/features/droneblockcodingworkbook.jpg', mediaType: 'image' },
  { id: 'videoLearning', icon: '🎬', mediaPath: '/media/features/elearning2.mp4',               mediaType: 'video' },
  { id: 'quizPlatform',  icon: '📝', mediaPath: '/media/features/kuiz.mp4',                     mediaType: 'video' },
  { id: 'assignment',    icon: '📋', mediaPath: '/media/features/teamwork.mp4',                 mediaType: 'video' },
  { id: 'certificate',   icon: '🎓', mediaPath: '/media/features/certificate.png',              mediaType: 'image' },
]

export type FeatureId =
  | 'mobileApp'
  | 'vrTraining'
  | 'codeBlock'
  | 'workbook'
  | 'videoLearning'
  | 'quizPlatform'
  | 'assignment'
  | 'certificate'

export interface FeatureLink {
  key: string       // i18n sub-key: features.<featureId>.links.<key>
  url: string | null // null = TBA (renders disabled button)
}

export interface Feature {
  id: FeatureId
  icon: string
  mediaPath: string
  mediaType: 'image' | 'video'
  links: FeatureLink[]
}

export const FEATURES: Feature[] = [
  {
    id: 'mobileApp',
    icon: '📱',
    mediaPath: '/media/features/gofly-mobile.jpeg',
    mediaType: 'image',
    links: [
      { key: 'googlePlay', url: 'https://play.google.com/store/apps/details?id=com.KetupARTStudio.GoFlyApp&hl=en-US' },
      { key: 'appStore',   url: 'https://apps.apple.com/us/app/gofly-app-input-practice/id6779450642' },
    ],
  },
  {
    id: 'vrTraining',
    icon: '🥽',
    mediaPath: '/media/features/gofly.mp4',
    mediaType: 'video',
    links: [
      { key: 'itchio',    url: 'https://ketupartstudio.itch.io/gofly-vr-lite' },
      { key: 'sidequest', url: 'https://sidequestvr.com/app/41261/gofly-vr-lite' },
    ],
  },
  {
    id: 'codeBlock',
    icon: '💻',
    mediaPath: '/media/features/droneblock.mp4',
    mediaType: 'video',
    links: [
      { key: 'youtube', url: 'https://www.youtube.com/playlist?list=PLtPszHizzKifHjiDicMhql18wbSE8jGh0' },
    ],
  },
  {
    id: 'workbook',
    icon: '📖',
    mediaPath: '/media/features/droneblockcodingworkbook.jpg',
    mediaType: 'image',
    links: [],
  },
  {
    id: 'videoLearning',
    icon: '🎬',
    mediaPath: '/media/features/elearning2.mp4',
    mediaType: 'video',
    links: [
      { key: 'secondary', url: 'https://www.youtube.com/playlist?list=PLtPszHizzKifnm0qPlgGmT20Wr6awvsY9' },
      { key: 'primary',   url: 'https://www.youtube.com/playlist?list=PLtPszHizzKie9VuIumzMXoAhQe5Uf5cYo' },
    ],
  },
  {
    id: 'quizPlatform',
    icon: '📝',
    mediaPath: '/media/features/kuiz.mp4',
    mediaType: 'video',
    links: [
      { key: 'quizizz', url: null },
    ],
  },
  {
    id: 'assignment',
    icon: '📋',
    mediaPath: '/media/features/teamwork.mp4',
    mediaType: 'video',
    links: [
      { key: 'portal', url: null },
    ],
  },
  {
    id: 'certificate',
    icon: '🎓',
    mediaPath: '/media/features/certificate.png',
    mediaType: 'image',
    links: [],
  },
]

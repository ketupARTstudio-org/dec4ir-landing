export const SITE_BASE_PATH = process.env.NODE_ENV === 'production' ? '/dec4ir-landing' : ''

export function withBasePath(path: string) {
  if (!path.startsWith('/')) {
    return path
  }

  return `${SITE_BASE_PATH}${path}`
}

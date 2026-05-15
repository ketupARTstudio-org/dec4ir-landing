function normalizeBasePath(input?: string) {
  if (!input || input === '/') {
    return ''
  }

  const withLeadingSlash = input.startsWith('/') ? input : `/${input}`
  return withLeadingSlash.replace(/\/+$/, '')
}

export const SITE_BASE_PATH = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH)

export function withBasePath(path: string) {
  if (!path.startsWith('/')) {
    return path
  }

  return `${SITE_BASE_PATH}${path}`
}

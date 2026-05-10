export type Locale = 'en' | 'bm'

export const LOCALES: Locale[] = ['en', 'bm']
export const DEFAULT_LOCALE: Locale = 'en'
const STORAGE_KEY = 'dec4ir_locale'

export function detectLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  const stored = localStorage.getItem(STORAGE_KEY) as Locale
  if (stored && LOCALES.includes(stored)) return stored
  if (navigator.language.toLowerCase().startsWith('ms')) return 'bm'
  return DEFAULT_LOCALE
}

export function saveLocale(locale: Locale): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, locale)
}

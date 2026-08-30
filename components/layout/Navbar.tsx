'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useLocale } from '@/components/providers/LocaleProvider'
import { REGISTRATION_URL } from '@/data/contact'
import { RESULTS_ANNOUNCED } from '@/data/results'
import Image from 'next/image'
import { withBasePath } from '@/lib/site'

const ALL_NAV_LINKS = [
  { key: 'results',    href: '#results' },
  { key: 'about',      href: '#about' },
  { key: 'activities', href: '#activities' },
  { key: 'schedule',   href: '#schedule' },
  { key: 'categories', href: '#categories' },
  { key: 'organizers', href: '#organizers' },
  { key: 'merch',      href: '#merch' },
  { key: 'faq',        href: '#faq' },
  { key: 'contact',    href: '#contact' },
] as const

const ALL_SECTION_IDS = ['hero', 'results', 'about', 'activities', 'schedule', 'categories', 'organizers', 'merch', 'faq', 'contact']

// The Results section only mounts when RESULTS_ANNOUNCED is true — drop its nav
// link and scrollspy target otherwise so nothing points at a missing anchor.
const NAV_LINKS = RESULTS_ANNOUNCED
  ? ALL_NAV_LINKS
  : ALL_NAV_LINKS.filter(link => link.key !== 'results')
const SECTION_IDS = RESULTS_ANNOUNCED
  ? ALL_SECTION_IDS
  : ALL_SECTION_IDS.filter(id => id !== 'results')

export default function Navbar() {
  const t = useTranslations('nav')
  const { locale, setLocale } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const visible = new Set<string>()
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) visible.add(e.target.id)
          else visible.delete(e.target.id)
        })
        const active = SECTION_IDS.find(id => visible.has(id))
        setActiveSection(active ?? '')
      },
      { rootMargin: '0px 0px -70% 0px' },
    )
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const navLinkClass = (key: string) =>
    `text-sm transition-colors duration-200 ${
      activeSection === key
        ? 'nav-active'
        : 'text-secondary hover:text-primary'
    }`

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-base/80 backdrop-blur-md border-b border-boundary'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#hero" className="shrink-0">
          <Image 
            src={withBasePath('/logos/logo-DEC4IR-white.png')}
            alt="DEC4IR"
            width={120}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          {NAV_LINKS.map(({ key, href }) => (
            <a key={key} href={href} className={navLinkClass(key)}>
              {t(key)}
            </a>
          ))}
        </div>

        {/* Right controls */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* Language toggle */}
          <button
            onClick={() => setLocale(locale === 'en' ? 'bm' : 'en')}
            className="text-subtle hover:text-primary text-xs font-medium tracking-widest border border-boundary rounded px-2 py-1 transition-colors hover:border-glow/50"
          >
            {locale === 'en' ? 'BM' : 'EN'}
          </button>

          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-glow/85 hover:text-base transition-all duration-200 ease-in-out hover:shadow-[0_0_14px_var(--color-glow)]"
          >
            {t('register')}
          </a>
        </div>

        {/* Mobile: lang toggle + hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setLocale(locale === 'en' ? 'bm' : 'en')}
            className="text-subtle hover:text-primary text-xs font-medium tracking-widest border border-boundary rounded px-2 py-1 transition-colors"
          >
            {locale === 'en' ? 'BM' : 'EN'}
          </button>
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? t('menuClose') : t('menuOpen')}
            className="text-secondary hover:text-primary p-2 transition-colors"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`text-center lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          menuOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="px-4 pb-4 flex flex-col gap-1 border-t border-boundary mt-0">
          {NAV_LINKS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`py-3 px-2 border-b border-boundary/50 ${navLinkClass(key)}`}
            >
              {t(key)}
            </a>
          ))}
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 bg-accent text-white font-semibold text-center text-sm px-4 py-3 rounded-lg hover:bg-glow/85 hover:text-base transition-all duration-200 ease-in-out hover:shadow-[0_0_14px_var(--color-glow)]"
          >
            {t('register')}
          </a>
        </div>
      </div>
    </nav>
  )
}

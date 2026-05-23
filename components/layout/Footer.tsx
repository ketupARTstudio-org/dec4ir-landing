'use client'

import { useTranslations } from 'next-intl'
import { CONTACT, REGISTRATION_URL } from '@/data/contact'
import Image from 'next/image'
import { withBasePath } from '@/lib/site'

const NAV_LINKS = [
  { key: 'about',      href: '#about' },
  { key: 'activities', href: '#activities' },
  { key: 'schedule',   href: '#schedule' },
  { key: 'categories', href: '#categories' },
  { key: 'organizers', href: '#organizers' },
  { key: 'merch',      href: '#merch' },
  { key: 'faq',        href: '#faq' },
  { key: 'contact',    href: '#contact' },
] as const

export default function Footer() {
  const tn = useTranslations('nav')
  const tf = useTranslations('footer')

  return (
    <footer className="bg-base border-t border-boundary">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Image 
              src={withBasePath('/logos/logo-DEC4IR-white.png')}
              alt="DEC4IR"
              width={120}
              height={20}
            />
            <p className="text-subtle text-sm leading-relaxed">
              Drone Edu Challenge IR 4.0 2026<br />
              7th Edition
            </p>
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 bg-accent text-base font-semibold text-sm px-4 py-2 rounded-lg hover:bg-glow/85 transition-all w-fit hover:shadow-[0_0_14px_var(--color-glow)]"
            >
              {tn('register')}
            </a>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-2">
            <span className="text-primary font-semibold text-sm mb-1">Quick Links</span>
            {NAV_LINKS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="text-subtle hover:text-primary text-sm transition-colors"
              >
                {tn(key)}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <span className="text-primary font-semibold text-sm mb-1">Contact</span>
            <a
              href={CONTACT.emailHref}
              className="text-subtle hover:text-glow text-sm transition-colors flex items-center gap-2"
            >
              <span>✉️</span> {CONTACT.email}
            </a>
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-subtle hover:text-glow text-sm transition-colors flex items-center gap-2"
            >
              <span>👥</span> Facebook
            </a>
            <p
              className="text-subtle hover:text-glow text-sm transition-colors flex items-center gap-2"
            >
              <span>📍</span> {CONTACT.address}
            </p>
          </div>
        </div>

        <div className="border-t border-boundary pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-subtle text-xs">
          <span>© 2026 DEC4IR. {tf('rights')}</span>
          <span>{tf('organizedBy')} Universiti Teknologi Malaysia &amp; Kementerian Pendidikan Malaysia</span>
        </div>
      </div>
    </footer>
  )
}

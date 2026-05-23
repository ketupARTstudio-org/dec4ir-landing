'use client'

import { useTranslations } from 'next-intl'
import { CONTACT } from '@/data/contact'

const CHANNELS = [
  {
    key: 'email' as const,
    icon: '✉️',
    label: 'Email',
    href: CONTACT.emailHref,
    display: CONTACT.email,
    external: false,
  },
  {
    key: 'facebook' as const,
    icon: '👥',
    label: 'Facebook',
    href: CONTACT.facebook,
    display: 'DEC4IR',
    external: true,
  }
]

export default function Contact() {
  const t = useTranslations('contact')

  return (
    <section
      id="contact"
      className="py-24 px-4 md:px-8"
      style={{
        background: [
          'radial-gradient(ellipse 80% 60% at 50% 30%, #00203a 0%, #050f1e 65%)',
          'radial-gradient(ellipse 40% 40% at 70% 70%, #00d4ff0e 0%, transparent 60%)',
          'var(--color-base)',
        ].join(', '),
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{t('title')}</h2>
        <p className="text-secondary mb-12">{t('subtitle')}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {CHANNELS.map(ch => (
            <a
              key={ch.key}
              href={ch.href}
              target={ch.external ? '_blank' : undefined}
              rel={ch.external ? 'noopener noreferrer' : undefined}
              className="group card-glass-border rounded-xl p-6 flex flex-col items-center gap-3 transition-all duration-200"
            >
              <span className="text-3xl">{ch.icon}</span>
              <div>
                <p className="text-secondary text-xs font-semibold tracking-widest uppercase mb-1">
                  {t(ch.key)}
                </p>
                <p className="text-primary text-sm font-medium group-hover:text-glow transition-colors">
                  {ch.display}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Address */}
        <div className="group card-glass-border rounded-xl p-6 flex flex-col items-center gap-3 transition-all duration-200">
          <span className="text-3xl">📍</span>
          <div>
            <p className="text-secondary text-xs font-semibold tracking-widest uppercase mb-1">
              {t('address')}
            </p>
            <p className="text-primary text-sm font-medium leading-relaxed group-hover:text-glow transition-colors">
              {CONTACT.address}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

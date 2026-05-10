'use client'

import { useTranslations } from 'next-intl'
import { useLocale } from '@/components/providers/LocaleProvider'
import { ORGANIZERS } from '@/data/organizers'
import Image from 'next/image'

export default function Organizers() {
  const t = useTranslations('organizers')
  const { locale } = useLocale()

  return (
    <section id="organizers" className="bg-base py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{t('title')}</h2>
        <p className="text-secondary mb-12">{t('mainTitle')}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16">
          {ORGANIZERS.map(org => (
            <a
              key={org.id}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4"
            >
              {/* Logo or placeholder */}
              <div className="relative w-44 h-28 bg-surface border border-boundary rounded-xl flex items-center justify-center overflow-hidden group-hover:border-accent/50 transition-all duration-200">
                {org.logo ? (
                  <Image
                    src={org.logo}
                    alt={locale === 'bm' ? org.nameBM : org.name}
                    fill
                    className="object-contain p-4"
                  />
                ) : (
                  <span className="text-secondary font-semibold text-lg">{org.shortName}</span>
                )}
              </div>
              <div className="text-center">
                <p className="text-primary text-sm font-medium group-hover:text-accent transition-colors">
                  {locale === 'bm' ? org.nameBM : org.name}
                </p>
                <p className="text-subtle text-xs mt-0.5">{org.shortName}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

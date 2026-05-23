'use client'

import { useTranslations } from 'next-intl'
import { useLocale } from '@/components/providers/LocaleProvider'
import { ORGANIZERS } from '@/data/organizers'
import Image from 'next/image'
import { withBasePath } from '@/lib/site'

export default function Organizers() {
  const t = useTranslations('organizers')
  const { locale } = useLocale()

  const mainOrgs = ORGANIZERS.filter(o => o.tier === 'main')
  const strategicOrgs = ORGANIZERS.filter(o => o.tier === 'strategic')

  return (
    <section id="organizers" className="bg-base py-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{t('title')}</h2>

        {/* Main Organizers */}
        <p className="text-secondary mb-10">{t('mainTitle')}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16 mb-16">
          {mainOrgs.map(org => (
            <a
              key={org.id}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4"
            >
              <div className="relative w-52 h-32 bg-white/5 border border-boundary rounded-xl flex items-center justify-center overflow-hidden group-hover:border-glow/50 group-hover:shadow-[0_0_12px_var(--color-glow)] group-hover:bg-white/20 transition-all duration-200">
                {org.logo ? (
                  <Image
                    src={withBasePath(org.logo)}
                    alt={locale === 'bm' ? org.nameBM : org.name}
                    fill
                    className="object-contain p-4"
                  />
                ) : (
                  <span className="text-secondary font-semibold text-lg">{org.shortName}</span>
                )}
              </div>
              <div className="text-center">
                <p className="text-primary text-sm font-medium group-hover:text-glow transition-colors">
                  {locale === 'bm' ? org.nameBM : org.name}
                </p>
                <p className="text-subtle text-xs mt-0.5">{org.shortName}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Collaborators */}
        <p className="text-secondary mb-10">{t('strategicPartnersTitle')}</p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {strategicOrgs.map(org => (
            <a
              key={org.id}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative w-36 h-22 bg-white/5 border border-boundary rounded-xl flex items-center justify-center overflow-hidden group-hover:border-glow/50 group-hover:shadow-[0_0_12px_var(--color-glow)] group-hover:bg-white/20 transition-all duration-200" style={{ height: '5.5rem' }}>
                {org.logo ? (
                  <Image
                    src={withBasePath(org.logo)}
                    alt={locale === 'bm' ? org.nameBM : org.name}
                    fill
                    className="object-contain p-3"
                  />
                ) : (
                  <span className="text-secondary font-semibold text-sm">{org.shortName}</span>
                )}
              </div>
              <div className="text-center">
                <p className="text-primary text-xs font-medium group-hover:text-glow transition-colors">
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

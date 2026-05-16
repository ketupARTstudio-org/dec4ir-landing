'use client'

import { useTranslations } from 'next-intl'
import HeroCarousel from '@/components/ui/HeroCarousel'
import { ORGANIZERS } from '@/data/organizers'
import { REGISTRATION_URL } from '@/data/contact'
import { useLocale } from '@/components/providers/LocaleProvider'
import Image from 'next/image'
import { withBasePath } from '@/lib/site'

export default function Hero() {
  const t = useTranslations('hero')
  const { locale } = useLocale()

  const taglines = [t('tagline0'), t('tagline1'), t('tagline2')]

  return (
    <section id="hero" className="relative min-h-screen">
      <HeroCarousel>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-24">
          {/* Edition badge */}
          <span className="inline-block mb-6 text-glow text-xs font-semibold tracking-[0.2em] uppercase border border-glow/40 rounded-full px-4 py-1.5">
            {t('edition')}
          </span>

          {/* Wordmark */}
          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight max-w-3xl mb-6">
            {t('wordmark')}
          </h1>

          {/* Tagline pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {taglines.map((tag, i) => (
              <span
                key={i}
                className="text-sm text-secondary border border-boundary rounded-full px-4 py-1.5 bg-surface/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Event period */}
          <p className="text-subtle text-sm mb-8">{t('eventPeriod')}</p>

          {/* CTA */}
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-white font-bold px-8 py-3.5 rounded-xl text-lg hover:bg-glow/85 hover:scale-105 hover:text-base transition-all duration-200 ease-in-out hover:shadow-[0_0_14px_var(--color-glow)]"
          >
            {t('cta')}
          </a>

          {/* Organizers row */}
          <div className="mt-16 flex flex-col items-center gap-4">
            <p className="text-subtle text-xs tracking-widest uppercase">{t('organizersLabel')}</p>
            <div className="flex items-center gap-8 flex-wrap justify-center">
              {ORGANIZERS.map(org => (
                <a
                  key={org.id}
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  {org.logo ? (
                    <div className="relative h-18 w-30 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden p-2 group-hover:bg-white/20 group-hover:border-glow/50 group-hover:shadow-[0_0_12px_var(--color-glow)] transition-all duration-200">
                      <Image
                        src={withBasePath(org.logo)}
                        alt={locale === 'bm' ? org.nameBM : org.name}
                        fill
                        className="object-contain p-3"
                      />
                    </div>
                  ) : (
                    <div className="h-10 px-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-secondary text-sm font-semibold group-hover:bg-white/20 group-hover:border-glow/50 group-hover:text-accent group-hover:shadow-[0_0_12px_var(--color-glow)] transition-all duration-200">
                      {org.shortName}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </HeroCarousel>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-base pointer-events-none" />
    </section>
  )
}

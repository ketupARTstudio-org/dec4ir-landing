'use client'

import { useTranslations } from 'next-intl'

const STATS = [
  { valueKey: 'stat1Value', labelKey: 'stat1Label' },
  { valueKey: 'stat2Value', labelKey: 'stat2Label' },
  { valueKey: 'stat3Value', labelKey: 'stat3Label' },
] as const

export default function About() {
  const t = useTranslations('about')

  return (
    <section id="about" className="bg-base py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              {t('title')}
            </h2>
            <p className="text-secondary leading-relaxed mb-4">{t('mission')}</p>
            <p className="text-secondary leading-relaxed">{t('impact')}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {STATS.map(({ valueKey, labelKey }) => (
              <div
                key={valueKey}
                className="bg-surface border border-boundary rounded-xl p-5 text-center hover:border-accent/40 transition-colors"
              >
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                  {t(valueKey)}
                </div>
                <div className="text-subtle text-xs md:text-sm leading-tight">
                  {t(labelKey)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative accent line */}
        <div className="mt-16 flex items-center gap-4">
          <div className="h-px flex-1 bg-boundary" />
          <span className="text-accent text-xl">✦</span>
          <div className="h-px flex-1 bg-boundary" />
        </div>
      </div>
    </section>
  )
}

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
    <section
      id="about"
      className="py-24 px-4 md:px-8"
      style={{
        background: [
          'radial-gradient(ellipse 80% 60% at 20% 60%, #003a5a 0%, #050f1e 65%)',
          'radial-gradient(ellipse 50% 40% at 80% 20%, #00d4ff12 0%, transparent 60%)',
          'var(--color-base)',
        ].join(', '),
      }}
    >
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
                className="card-glass-border rounded-xl p-5 text-center transition-all hover:shadow-[0_0_12px_var(--color-glow)]"
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

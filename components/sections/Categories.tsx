'use client'

import { useTranslations } from 'next-intl'
import { CATEGORIES, CERTS } from '@/data/categories'

export default function Categories() {
  const t = useTranslations('categories')

  return (
    <section id="categories" className="bg-surface py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{t('title')}</h2>
          <p className="text-secondary">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Competition categories */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-5 flex items-center gap-2">
              <span className="text-accent">🏫</span> {t('categoriesTitle')}
            </h3>
            <div className="flex flex-col gap-3">
              {CATEGORIES.map(cat => {
                const nameKey = `cats.${cat.id}.name` as Parameters<typeof t>[0]
                const gradesKey = `cats.${cat.id}.grades` as Parameters<typeof t>[0]
                return (
                  <div
                    key={cat.id}
                    className={`bg-elevated border-l-4 ${cat.accentClass} rounded-r-xl p-4 flex items-center justify-between hover:bg-elevated/80 transition-colors`}
                  >
                    <span className="font-medium text-primary text-sm">{t(nameKey)}</span>
                    <span className="text-subtle text-xs border border-boundary rounded-full px-3 py-1">
                      {t(gradesKey)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Certificate tiers */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-5 flex items-center gap-2">
              <span className="text-accent">🎓</span> {t('certificatesTitle')}
            </h3>
            <div className="flex flex-col gap-3">
              {CERTS.map(cert => {
                const nameKey = `certs.${cert.id}.name` as Parameters<typeof t>[0]
                const descKey = `certs.${cert.id}.desc` as Parameters<typeof t>[0]
                return (
                  <div
                    key={cert.id}
                    className="bg-elevated border border-boundary rounded-xl p-4 flex gap-4 items-start hover:border-accent/30 transition-colors"
                  >
                    <span className="text-2xl shrink-0 mt-0.5">{cert.icon}</span>
                    <div>
                      <p className="font-semibold text-primary text-sm mb-1">{t(nameKey)}</p>
                      <p className="text-subtle text-xs leading-relaxed">{t(descKey)}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* MOE note */}
            <p className="mt-4 text-subtle text-xs flex items-center gap-2">
              <span className="text-accent">✓</span> {t('moeNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

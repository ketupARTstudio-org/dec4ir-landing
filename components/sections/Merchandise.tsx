'use client'

import { useTranslations } from 'next-intl'
import { MERCH_ITEMS, SHOPEE_URL } from '@/data/merchandise'
import Image from 'next/image'
import { withBasePath } from '@/lib/site'

export default function Merchandise() {
  const t = useTranslations('merch')

  return (
    <section id="merch" className="bg-base py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{t('title')}</h2>
            <p className="text-secondary">{t('subtitle')}</p>
          </div>
          <a
            href={SHOPEE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 border border-accent text-accent font-semibold text-sm text-center px-5 py-2.5 rounded-lg hover:bg-glow  hover:text-base hover:border-glow/50 hover:shadow-[0_0_12px_var(--color-glow)] transition-all duration-200"
          >
            {t('viewStore')} →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MERCH_ITEMS.map(item => (
            <div key={item.id} className="group card-glass-border rounded-xl overflow-hidden flex flex-col hover:shadow-[0_0_12px_var(--color-glow)] transition-all duration-200">
              {/* Image / placeholder */}
              <div className={`relative aspect-square bg-linear-to-br ${item.gradient}`}>
                {item.image ? (
                  <Image src={withBasePath(item.image)} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl opacity-30">🚁</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="text-primary text-sm font-medium mb-2 leading-tight">{item.name}</p>
                <a
                  href={item.url ? item.url : SHOPEE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary text-xs font-semibold hover:underline group-hover:text-glow"
                >
                  {t('shopNow')} →
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-subtle text-sm mt-8">{t('comingSoon')}</p>
      </div>
    </section>
  )
}

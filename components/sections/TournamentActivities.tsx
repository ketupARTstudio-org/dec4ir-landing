'use client'

import { useTranslations } from 'next-intl'
import TabWidget, { type TabItem } from '@/components/ui/TabWidget'
import { FEATURES } from '@/data/platform-features'

export default function TournamentActivities() {
  const t = useTranslations('activities')
  const tf = useTranslations('features')

  const items: TabItem[] = FEATURES.map(f => ({
    id: f.id,
    icon: f.icon,
    title: tf(`${f.id}.title`),
    description: tf(`${f.id}.description`),
    mediaPath: f.mediaPath,
    mediaType: f.mediaType,
  }))

  return (
    <section
      id="activities"
      className="py-24 px-4 md:px-8"
      style={{
        background: [
          'radial-gradient(ellipse 70% 60% at 75% 55%, #2a0050 0%, #050f1e 65%)',
          'radial-gradient(ellipse 50% 40% at 15% 30%, #7c3aed12 0%, transparent 60%)',
          'var(--color-base)',
        ].join(', '),
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{t('title')}</h2>
          <p className="text-secondary">{t('subtitle')}</p>
        </div>
        <TabWidget items={items} />
      </div>
    </section>
  )
}

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
  }))

  return (
    <section id="activities" className="bg-surface py-24 px-4 md:px-8">
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

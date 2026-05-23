'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import TabWidget, { type TabItem } from '@/components/ui/TabWidget'
import { FEATURES } from '@/data/platform-features'

export default function TournamentActivities() {
  const t = useTranslations('activities')
  const tf = useTranslations('features')
  const widgetRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = widgetRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

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
        <div
          ref={widgetRef}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          <TabWidget items={items} />
        </div>
      </div>
    </section>
  )
}

'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

const STAT_DATA = [
  { labelKey: 'stat1Label' as const, raw: 100000, suffix: '+' },
  { labelKey: 'stat2Label' as const, raw: 1000,   suffix: '+' },
  { labelKey: 'stat3Label' as const, raw: 6,       suffix: ''   },
] as const

export default function About() {
  const t = useTranslations('about')
  const sectionRef = useRef<HTMLElement>(null)
  const [counts, setCounts] = useState([0, 0, 0])
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const targets = STAT_DATA.map(s => s.raw)
    const duration = 1500
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCounts(targets.map(t => Math.round(t * eased)))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started])

  return (
    <section
      id="about"
      ref={sectionRef}
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
            {STAT_DATA.map(({ labelKey, suffix }, i) => (
              <div
                key={labelKey}
                className="card-glass-border rounded-xl p-5 text-center transition-all hover:shadow-[0_0_12px_var(--color-glow)]"
              >
                <div className="text-sm md:text-3xl font-bold text-accent mb-1">
                  {counts[i].toLocaleString()}{suffix}
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
          <span className="text-glow text-xl">✦</span>
          <div className="h-px flex-1 bg-boundary" />
        </div>
      </div>
    </section>
  )
}

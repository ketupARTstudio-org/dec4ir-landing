'use client'

import { useTranslations } from 'next-intl'
import { useLocale } from '@/components/providers/LocaleProvider'
import { PHASES, findNextPhaseIndex } from '@/data/schedule'

const PHASE_ICONS: Record<string, string> = {
  regOpen:       '📋',
  regClose:      '🔒',
  trialQuiz:     '🔧',
  screeningQuiz: '⚡',
  shortlist:     '🏆',
  finalDeadline: '📨',
  results:       '🎉',
}

export default function EventSchedule() {
  const t = useTranslations('schedule')
  const { locale } = useLocale()
  const nextIdx = findNextPhaseIndex()

  function formatDate(isoDate: string) {
    const intlLocale = locale === 'bm' ? 'ms-MY' : 'en-MY'
    return new Intl.DateTimeFormat(intlLocale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(isoDate))
  }

  return (
    <section id="schedule" className="bg-base py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{t('title')}</h2>
          <p className="text-secondary">{t('subtitle')}</p>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-0">
          {PHASES.map((phase, idx) => {
            const isCurrent = idx === nextIdx
            const isPast = idx < nextIdx

            return (
              <div key={phase.id} className="flex gap-5 md:gap-8">
                {/* Connector column */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 border-2 transition-all ${
                      isCurrent
                        ? 'border-accent bg-accent/15 shadow-lg shadow-accent/30'
                        : isPast
                        ? 'border-subtle bg-surface'
                        : 'border-boundary bg-surface'
                    }`}
                  >
                    {PHASE_ICONS[phase.id]}
                  </div>
                  {idx < PHASES.length - 1 && (
                    <div
                      className={`w-px flex-1 my-1 ${isPast ? 'bg-subtle' : 'bg-boundary'}`}
                      style={{ minHeight: '2.5rem' }}
                    />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`pb-8 flex-1 ${
                    isCurrent ? 'text-primary' : isPast ? 'text-subtle' : 'text-secondary'
                  }`}
                >
                  <p
                    className={`text-xs font-semibold tracking-wider uppercase mb-1 ${
                      isCurrent ? 'text-accent' : 'text-subtle'
                    }`}
                  >
                    {formatDate(phase.isoDate)}
                    {isCurrent && (
                      <span className="ml-2 text-accent text-[10px] border border-accent/50 rounded-full px-2 py-0.5 normal-case tracking-normal">
                        NEXT
                      </span>
                    )}
                  </p>
                  <h3 className={`font-semibold mb-1 ${isCurrent ? 'text-[1rem]' : 'text-sm'}`}>
                    {t(`phases.${phase.id}`)}
                  </h3>
                  <p className="text-xs leading-relaxed opacity-80">
                    {t(`phaseDesc.${phase.id}`)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

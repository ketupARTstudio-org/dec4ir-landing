'use client'

import { useTranslations } from 'next-intl'
import AccordionItem from '@/components/ui/AccordionItem'
import { useLocale } from '@/components/providers/LocaleProvider'
import { FAQ } from '@/data/faq'

export default function FAQSection() {
  const t = useTranslations('faq')
  const { locale } = useLocale()
  const items = FAQ[locale]

  return (
    <section id="faq" className="bg-base py-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{t('title')}</h2>
          <p className="text-secondary">{t('subtitle')}</p>
        </div>

        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              question={item.q}
              answer={item.a}
              defaultOpen={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

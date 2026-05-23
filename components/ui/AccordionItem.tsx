'use client'

import { useState } from 'react'

interface AccordionItemProps {
  question: string
  answer: string
  defaultOpen?: boolean
}

export default function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="card-glass-border rounded-xl overflow-hidden hover:shadow-[0_0_12px_var(--color-glow)] transition-shadow duration-200">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-transparent text-inherit"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-primary text-sm">{question}</span>
        <span
          className={`shrink-0 transition-transform duration-300 ${
            isOpen ? 'text-glow rotate-180' : 'text-accent'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? '40rem' : '0' }}
      >
        <p className="px-6 pb-5 text-secondary text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

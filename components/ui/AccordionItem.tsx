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
    <div className="bg-elevated border border-boundary rounded-xl overflow-hidden transition-colors hover:border-accent/40">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-transparent text-inherit"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-primary text-sm">{question}</span>
        <span
          className={`text-accent shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
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

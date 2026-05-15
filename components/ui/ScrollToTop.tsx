"use client"

import { useEffect, useState } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className={`
        fixed bottom-8 right-8 z-50
        w-12 h-12 rounded-full
        border-2 border-accent
        flex items-center justify-center
        text-secondary
        transition-all duration-300 ease-in-out
        hover:border-glow hover:text-primary hover:shadow-[0_0_14px_var(--color-glow)]
        ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M10 15V5M10 5L5 10M10 5L15 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

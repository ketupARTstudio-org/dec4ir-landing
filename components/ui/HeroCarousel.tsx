'use client'

import { useEffect, useState } from 'react'

interface Slide {
  /** Path inside /public, e.g. "/media/hero/slide1.mp4" — null = use gradient placeholder */
  src: string | null
  type: 'video' | 'image' | 'gradient'
  gradient?: string
}

const PLACEHOLDER_SLIDES: Slide[] = [
  {
    src: null,
    type: 'gradient',
    gradient:
      'radial-gradient(ellipse 80% 60% at 20% 60%, #003a5a 0%, #050f1e 65%), radial-gradient(ellipse 50% 40% at 80% 20%, #00d4ff12 0%, transparent 60%)',
  },
  {
    src: null,
    type: 'gradient',
    gradient:
      'radial-gradient(ellipse 70% 60% at 75% 55%, #2a0050 0%, #050f1e 65%), radial-gradient(ellipse 50% 40% at 15% 30%, #7c3aed12 0%, transparent 60%)',
  },
  {
    src: null,
    type: 'gradient',
    gradient:
      'radial-gradient(ellipse 80% 60% at 50% 30%, #00203a 0%, #050f1e 65%), radial-gradient(ellipse 40% 40% at 70% 70%, #00d4ff0e 0%, transparent 60%)',
  },
]

interface HeroCarouselProps {
  slides?: Slide[]
  children: React.ReactNode
  intervalMs?: number
}

export default function HeroCarousel({
  slides = PLACEHOLDER_SLIDES,
  children,
  intervalMs = 1500,
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [slides.length, intervalMs])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1500 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          {slide.type === 'gradient' && (
            <div className="w-full h-full" style={{ background: slide.gradient }} />
          )}
          {slide.type === 'image' && slide.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={slide.src}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
          {slide.type === 'video' && slide.src && (
            <video
              src={slide.src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}

      {/* Dark scrim for text legibility */}
      {/* <div className="absolute inset-0 bg-base/55 backdrop-blur-[1px]" /> */}

      {/* Slide indicator dots */}
      {/* 
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? 'bg-accent w-6' : 'bg-primary/30'
              }`}
            />
          ))}
        </div>
      )}
      */}

      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}

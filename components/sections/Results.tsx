'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useLocale } from '@/components/providers/LocaleProvider'
import { RESULTS_ANNOUNCED, CANVA_RESULTS_URL, RESULTS_DATE } from '@/data/results'

export default function Results() {
  const t = useTranslations('results')
  const { locale } = useLocale()
  const widgetRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
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

  // Fireworks — starts when the section scrolls into view, then loops continuously
  useEffect(() => {
    if (!visible) return
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    let width = 0
    let height = 0
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const COLORS = ['#e69125', '#00d4ff', '#f8f2dc']
    interface Spark {
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
      color: string
    }
    let sparks: Spark[] = []

    const burst = (x: number, y: number) => {
      const count = 50 + Math.floor(Math.random() * 22)
      const base = COLORS[Math.floor(Math.random() * COLORS.length)]
      const speed = 1 + Math.random() * 1.1
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3
        const v = speed * (0.6 + Math.random() * 0.6)
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * v,
          vy: Math.sin(angle) * v,
          life: 0,
          maxLife: 110 + Math.random() * 70,
          color: Math.random() < 0.15 ? '#ffffff' : base,
        })
      }
    }

    const randomLaunch = () =>
      burst(width * (0.2 + Math.random() * 0.6), height * (0.2 + Math.random() * 0.35))

    let raf = 0
    let frame = 0
    let nextLaunch = 2
    const tick = () => {
      frame++

      if (frame >= nextLaunch) {
        randomLaunch()
        if (Math.random() < 0.35) randomLaunch() // occasional double
        nextLaunch = frame + 90 + Math.floor(Math.random() * 70) // ~1.5–2.7s between volleys
      }

      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'
      for (const p of sparks) {
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.012 // gravity (gentle)
        p.vx *= 0.992 // drag
        p.vy *= 0.992
        const k = 1 - p.life / p.maxLife
        if (k <= 0) continue
        ctx.globalAlpha = k
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2.2 * k + 0.5, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
      sparks = sparks.filter(p => p.life < p.maxLife)

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [visible])

  const announcedDate = new Intl.DateTimeFormat(locale === 'bm' ? 'ms-MY' : 'en-MY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(RESULTS_DATE))

  if (!RESULTS_ANNOUNCED) return null

  return (
    <section
      id="results"
      className="relative overflow-hidden py-24 px-4 md:px-8"
      ref={widgetRef}
      style={{
        background: [
          'radial-gradient(ellipse 60% 55% at 50% 40%, #00203a 0%, transparent 70%)',
          'var(--color-base)',
        ].join(', '),
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span className="inline-block mb-5 text-glow text-xs font-semibold tracking-[0.2em] uppercase border border-glow/40 rounded-full px-4 py-1.5">
          {t('title')}
        </span>

        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 uppercase leading-tight">
          {t('subtitle')}
        </h2>

        <p className="text-secondary leading-relaxed mb-3">{t('blurb')}</p>

        <p className="text-subtle text-sm mb-10">
          {t('announcedOn')} {announcedDate}
        </p>

        <a
          href={CANVA_RESULTS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-accent text-accent font-semibold text-sm px-6 py-3 rounded-lg hover:bg-glow hover:text-base hover:border-glow/50 hover:shadow-[0_0_12px_var(--color-glow)] transition-all duration-200"
        >
          {t('viewFullList')} →
        </a>
      </div>
    </section>
  )
}

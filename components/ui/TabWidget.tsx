'use client'

import { useEffect, useRef, useState } from 'react'

export interface TabLink {
  label: string
  url: string | null // null = TBA
}

export interface TabItem {
  id: string
  icon: string
  title: string
  description: string
  mediaPath?: string
  mediaType?: 'image' | 'video'
  links?: TabLink[]
}

interface TabWidgetProps {
  items: TabItem[]
  comingSoonLabel?: string
}

export default function TabWidget({ items, comingSoonLabel = 'Coming Soon' }: TabWidgetProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')
  const [contentVisible, setContentVisible] = useState(true)
  const pendingIdRef = useRef<string | null>(null)

  const active = items.find(it => it.id === activeId) ?? items[0]

  function selectTab(id: string) {
    if (id === activeId) return
    pendingIdRef.current = id
    setContentVisible(false)
  }

  useEffect(() => {
    if (contentVisible || !pendingIdRef.current) return
    const id = pendingIdRef.current
    const timer = setTimeout(() => {
      setActiveId(id)
      pendingIdRef.current = null
      setContentVisible(true)
    }, 150)
    return () => clearTimeout(timer)
  }, [contentVisible])

  return (
    <div className="group flex flex-col lg:grid lg:grid-cols-12 gap-3">
      {/* Tab list — horizontal scroll on mobile, vertical on desktop */}
      <div className="lg:col-span-4 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
        {items.map(item => {
          const isActive = item.id === activeId
          return (
            <button
              key={item.id}
              onClick={() => selectTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left shrink-0 lg:shrink transition-all duration-200 ${
                isActive
                  ? 'bg-glow/10 border-l-2 border-glow text-glow'
                  : 'text-secondary hover:text-primary hover:bg-elevated border-l-2 border-transparent'
              }`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-sm font-medium whitespace-nowrap lg:whitespace-normal">
                {item.title}
              </span>
            </button>
          )
        })}
      </div>

      {/* Content panel */}
      <div
        className="lg:col-span-8 card-glass-border rounded-xl p-8 min-h-52 flex flex-col gap-5 transition-shadow duration-300 group-hover:shadow-[0_0_12px_var(--color-glow)]"
        style={{
          borderWidth: '3px',
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 0.15s ease-in-out',
        }}
      >
        {active && (
          <>
            {active.mediaPath && active.mediaType === 'video' && (
              <video
                key={active.mediaPath}
                src={active.mediaPath}
                autoPlay
                muted
                loop
                playsInline
                className="w-full max-h-100 rounded-lg object-cover"
              />
            )}
            {active.mediaPath && active.mediaType === 'image' && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={active.mediaPath}
                alt={active.title}
                className="w-full max-h-80 rounded-lg object-cover"
              />
            )}
            <div className="text-5xl leading-none">{active.icon}</div>
            <h3 className="text-xl text-primary">{active.title}</h3>
            <p className="text-secondary leading-relaxed">{active.description}</p>
            {active.links && active.links.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {active.links.map((link, i) =>
                  link.url !== null ? (
                    <div key={i}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 bg-accent text-white font-semibold text-sm text-center px-5 py-2.5 rounded-lg hover:bg-glow  hover:text-base hover:border-glow/50 hover:shadow-[0_0_12px_var(--color-glow)] transition-all duration-200"
                      >
                        ↗ {link.label}
                      </a>
                    </div>
                  ) : (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 rounded-md border border-(--color-boundary) px-4 py-2 text-sm text-(--color-subtle) opacity-60 cursor-not-allowed"
                    >
                      {link.label}
                      <span className="text-xs">· {comingSoonLabel}</span>
                    </div>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'

export interface TabItem {
  id: string
  icon: string
  title: string
  description: string
}

interface TabWidgetProps {
  items: TabItem[]
}

export default function TabWidget({ items }: TabWidgetProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')
  const active = items.find(it => it.id === activeId) ?? items[0]

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-3">
      {/* Tab list — horizontal scroll on mobile, vertical on desktop */}
      <div className="lg:col-span-4 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
        {items.map(item => {
          const isActive = item.id === activeId
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left shrink-0 lg:shrink transition-all duration-200 ${
                isActive
                  ? 'bg-accent/10 border-l-2 border-accent text-accent'
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
      <div className="lg:col-span-8 bg-elevated border border-boundary rounded-xl p-8 min-h-52 flex flex-col gap-5">
        {active && (
          <>
            <div className="text-5xl leading-none">{active.icon}</div>
            <h3 className="text-xl text-primary">{active.title}</h3>
            <p className="text-secondary leading-relaxed">{active.description}</p>
          </>
        )}
      </div>
    </div>
  )
}

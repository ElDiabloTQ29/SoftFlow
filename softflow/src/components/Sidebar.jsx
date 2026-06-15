import React, { useState } from 'react'
import { COMPONENT_LIBRARY } from '../store/library'

export default function Sidebar() {
  const [activeCategory, setActiveCategory] = useState('Arquitectura')
  const [search, setSearch] = useState('')

  const categories = Object.entries(COMPONENT_LIBRARY)
  const items = COMPONENT_LIBRARY[activeCategory]?.items || []
  const filtered = search
    ? items.filter(i => i.label.toLowerCase().includes(search.toLowerCase()))
    : items

  const onDragStart = (e, comp) => {
    e.dataTransfer.setData('application/softflow', JSON.stringify(comp))
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside style={{
      width: 220,
      background: 'var(--color-surface)',
      borderRight: '1px solid var(--color-border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: '14px 14px 10px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 18 }}>⬡</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>SoftFlow</span>
        </div>
        <input
          placeholder="Buscar componente..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '6px 10px',
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--color-text)',
            fontSize: 12,
            outline: 'none',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
        />
      </div>

      {/* Category tabs */}
      <div style={{ padding: '8px 8px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {categories.map(([cat, { icon }]) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setSearch('') }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '7px 10px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeCategory === cat ? 'var(--color-accent-dim)' : 'transparent',
              color: activeCategory === cat ? 'var(--color-accent-hover)' : 'var(--color-text-muted)',
              fontSize: 12,
              fontWeight: activeCategory === cat ? 500 : 400,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.12s',
            }}
          >
            <span style={{ fontSize: 14 }}>{icon}</span>
            {cat}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--color-border)', margin: '8px 0' }} />

      {/* Components list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px 12px' }}>
        <div style={{ fontSize: 10, color: 'var(--color-text-dim)', fontWeight: 600, letterSpacing: '0.08em', padding: '4px 4px 8px' }}>
          ARRASTRAR AL CANVAS
        </div>
        {filtered.map(comp => (
          <div
            key={comp.type}
            draggable
            onDragStart={e => onDragStart(e, comp)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface-2)',
              marginBottom: 4,
              cursor: 'grab',
              transition: 'all 0.12s',
              userSelect: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = comp.color
              e.currentTarget.style.background = `${comp.color}10`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--color-border)'
              e.currentTarget.style.background = 'var(--color-surface-2)'
            }}
          >
            <div style={{
              width: 28, height: 28,
              background: `${comp.color}22`,
              borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, flexShrink: 0,
            }}>
              {comp.icon}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text)' }}>{comp.label}</div>
              <div style={{ fontSize: 10, color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)' }}>{comp.sub}</div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ fontSize: 12, color: 'var(--color-text-dim)', textAlign: 'center', padding: '20px 0' }}>
            Sin resultados
          </div>
        )}
      </div>
    </aside>
  )
}

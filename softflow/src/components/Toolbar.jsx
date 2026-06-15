import React, { useState, useRef } from 'react'
import useStore from '../store/useStore'
import { exportToPNG, exportToPDF, exportToMermaid, exportToJSON } from '../utils/export'

export default function Toolbar() {
  const { diagramName, setDiagramName, nodes, edges, clearCanvas, loadDiagram, loadExample, snapToGrid, setSnapToGrid, edgeType, setEdgeType } = useStore()
  const [editingName, setEditingName] = useState(false)
  const [showMermaid, setShowMermaid] = useState(false)
  const [mermaidCode, setMermaidCode] = useState('')
  const [copied, setCopied] = useState(false)
  const fileRef = useRef()

  const handleExportMermaid = () => {
    const code = exportToMermaid(nodes, edges)
    setMermaidCode(code)
    setShowMermaid(true)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(mermaidCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleImportJSON = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result)
        loadDiagram(data)
      } catch {
        alert('Archivo JSON inválido')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <>
      <header style={{
        height: 48,
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        gap: 10,
        flexShrink: 0,
      }}>
        {/* Diagram name */}
        {editingName ? (
          <input
            autoFocus
            value={diagramName}
            onChange={e => setDiagramName(e.target.value)}
            onBlur={() => setEditingName(false)}
            onKeyDown={e => e.key === 'Enter' && setEditingName(false)}
            style={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-accent)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text)',
              fontSize: 13,
              fontWeight: 500,
              padding: '4px 8px',
              outline: 'none',
              width: 200,
            }}
          />
        ) : (
          <button onClick={() => setEditingName(true)} style={{
            background: 'none', border: 'none',
            color: 'var(--color-text)', fontSize: 13, fontWeight: 500,
            cursor: 'text', padding: '4px 6px', borderRadius: 'var(--radius-sm)',
          }} title="Clic para renombrar">
            {diagramName} ✎
          </button>
        )}

        <div style={{ width: 1, height: 20, background: 'var(--color-border)', margin: '0 4px' }} />

        {/* Edge type selector */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: 'var(--color-text-dim)', marginRight: 2 }}>Conex.:</span>
          {[
            { key: 'solid', label: '——' },
            { key: 'dashed', label: '- -' },
            { key: 'dotted', label: '···' },
            { key: 'bidirectional', label: '←→' },
          ].map(opt => (
            <button key={opt.key} onClick={() => setEdgeType(opt.key)} style={{
              padding: '3px 8px',
              borderRadius: 999,
              border: `1px solid ${edgeType === opt.key ? 'var(--color-accent)' : 'var(--color-border)'}`,
              background: edgeType === opt.key ? 'var(--color-accent-dim)' : 'transparent',
              color: edgeType === opt.key ? 'var(--color-accent-hover)' : 'var(--color-text-muted)',
              fontSize: 11, fontFamily: 'var(--font-mono)', cursor: 'pointer',
            }}>
              {opt.label}
            </button>
          ))}
        </div>

        <div style={{ width: 1, height: 20, background: 'var(--color-border)', margin: '0 4px' }} />

        {/* Grid snap */}
        <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--color-text-muted)', cursor: 'pointer' }}>
          <input type="checkbox" checked={snapToGrid} onChange={e => setSnapToGrid(e.target.checked)} style={{ accentColor: 'var(--color-accent)' }} />
          Grid snap
        </label>

        <div style={{ flex: 1 }} />

        {/* Action buttons */}
        <Btn onClick={loadExample}>📋 Ejemplo</Btn>
        <Btn onClick={() => fileRef.current?.click()}>📂 Abrir JSON</Btn>
        <input ref={fileRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleImportJSON} />

        <div style={{ width: 1, height: 20, background: 'var(--color-border)', margin: '0 2px' }} />

        <Btn onClick={() => exportToPNG(diagramName)}>🖼 PNG</Btn>
        <Btn onClick={() => exportToPDF(diagramName)}>📄 PDF</Btn>
        <Btn onClick={handleExportMermaid}>💠 Mermaid</Btn>
        <Btn onClick={() => exportToJSON(nodes, edges, diagramName)}>⬇ JSON</Btn>

        <div style={{ width: 1, height: 20, background: 'var(--color-border)', margin: '0 2px' }} />

        <Btn onClick={clearCanvas} danger>🗑 Limpiar</Btn>
      </header>

      {/* Mermaid modal */}
      {showMermaid && (
        <div onClick={() => setShowMermaid(false)} style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 24,
            width: 540,
            maxWidth: '90vw',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontWeight: 600, fontSize: 15 }}>💠 Código Mermaid</span>
              <button onClick={() => setShowMermaid(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: 18, cursor: 'pointer' }}>×</button>
            </div>
            <pre style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: 16,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--color-text)',
              whiteSpace: 'pre-wrap',
              maxHeight: 320,
              overflowY: 'auto',
              lineHeight: 1.6,
            }}>
              {mermaidCode}
            </pre>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button onClick={handleCopy} style={{
                padding: '8px 18px', borderRadius: 'var(--radius-sm)',
                background: 'var(--color-accent)', border: 'none',
                color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer',
              }}>
                {copied ? '✓ Copiado' : '⎘ Copiar'}
              </button>
              <a href="https://mermaid.live" target="_blank" rel="noreferrer" style={{
                padding: '8px 18px', borderRadius: 'var(--radius-sm)',
                background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
                color: 'var(--color-text-muted)', fontSize: 13, textDecoration: 'none',
              }}>
                🌐 Abrir en Mermaid Live
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function Btn({ children, onClick, danger }) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 10px',
      borderRadius: 'var(--radius-sm)',
      border: `1px solid ${danger ? 'rgba(239,68,68,0.3)' : 'var(--color-border)'}`,
      background: danger ? 'rgba(239,68,68,0.08)' : 'var(--color-surface-2)',
      color: danger ? '#ef4444' : 'var(--color-text-muted)',
      fontSize: 11, fontWeight: 500, cursor: 'pointer',
      transition: 'all 0.12s',
      whiteSpace: 'nowrap',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = danger ? '#ef4444' : 'var(--color-accent)'
      e.currentTarget.style.color = danger ? '#ef4444' : 'var(--color-accent-hover)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = danger ? 'rgba(239,68,68,0.3)' : 'var(--color-border)'
      e.currentTarget.style.color = danger ? '#ef4444' : 'var(--color-text-muted)'
    }}>
      {children}
    </button>
  )
}

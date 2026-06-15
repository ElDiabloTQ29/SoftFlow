import React from 'react'
import useStore from '../store/useStore'

const PRESET_COLORS = ['#6366f1','#8b5cf6','#3b82f6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899','#94a3b8','#374151']

export default function PropertiesPanel() {
  const { nodes, edges, selectedNodeId, selectedEdgeId, updateNodeData, updateEdgeData, deleteNode, deleteEdge } = useStore()

  const selectedNode = nodes.find(n => n.id === selectedNodeId)
  const selectedEdge = edges.find(e => e.id === selectedEdgeId)

  if (!selectedNode && !selectedEdge) {
    return (
      <aside style={panelStyle}>
        <div style={headerStyle}>Propiedades</div>
        <div style={{ padding: 16, color: 'var(--color-text-dim)', fontSize: 12, textAlign: 'center', marginTop: 20 }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>✦</div>
          Selecciona un nodo o conexión para editar sus propiedades
        </div>
      </aside>
    )
  }

  if (selectedNode) {
    const { label, sub, icon, color } = selectedNode.data
    return (
      <aside style={panelStyle}>
        <div style={headerStyle}>Nodo</div>
        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>

          <Field label="Etiqueta">
            <Input value={label} onChange={v => updateNodeData(selectedNodeId, { label: v })} />
          </Field>

          <Field label="Subtítulo / Tipo">
            <Input value={sub} onChange={v => updateNodeData(selectedNodeId, { sub: v })} />
          </Field>

          <Field label="Ícono (emoji)">
            <Input value={icon} onChange={v => updateNodeData(selectedNodeId, { icon: v })} />
          </Field>

          <Field label="Color">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 6 }}>
              {PRESET_COLORS.map(c => (
                <button key={c} onClick={() => updateNodeData(selectedNodeId, { color: c })} style={{
                  width: 20, height: 20, borderRadius: 4, background: c, border: color === c ? '2px solid #fff' : '2px solid transparent', cursor: 'pointer',
                }} />
              ))}
            </div>
            <input type="color" value={color} onChange={e => updateNodeData(selectedNodeId, { color: e.target.value })}
              style={{ width: '100%', height: 30, borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', background: 'var(--color-surface-2)', cursor: 'pointer', padding: 2 }}
            />
          </Field>

          <div style={{ height: 1, background: 'var(--color-border)' }} />

          <button onClick={() => deleteNode(selectedNodeId)} style={{
            padding: '8px 12px', borderRadius: 'var(--radius-sm)',
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
            color: '#ef4444', fontSize: 12, fontWeight: 500, cursor: 'pointer',
          }}>
            🗑 Eliminar nodo
          </button>
        </div>
      </aside>
    )
  }

  if (selectedEdge) {
    const label = selectedEdge.data?.label || ''
    return (
      <aside style={panelStyle}>
        <div style={headerStyle}>Conexión</div>
        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>

          <Field label="Etiqueta">
            <Input
              value={label}
              onChange={v => updateEdgeData(selectedEdgeId, { data: { ...selectedEdge.data, label: v }, label: v })}
              placeholder="Ej: HTTP, JWT, query..."
            />
          </Field>

          <Field label="Tipo de línea">
            {[
              { key: 'solid',   label: 'Sólida',          preview: '——→' },
              { key: 'dashed',  label: 'Discontinua',     preview: '- - →' },
              { key: 'dotted',  label: 'Punteada',        preview: '···→' },
              { key: 'bidirectional', label: 'Bidireccional', preview: '←——→' },
            ].map(opt => (
              <button key={opt.key}
                onClick={() => {
                  const styleMap = {
                    solid:   { strokeWidth: 2, stroke: '#6366f1' },
                    dashed:  { strokeWidth: 2, stroke: '#6366f1', strokeDasharray: '6 3' },
                    dotted:  { strokeWidth: 2, stroke: '#94a3b8', strokeDasharray: '2 3' },
                    bidirectional: { strokeWidth: 2, stroke: '#8b5cf6' },
                  }
                  updateEdgeData(selectedEdgeId, {
                    style: styleMap[opt.key],
                    markerEnd: { type: 'ArrowClosed', color: styleMap[opt.key].stroke },
                    markerStart: opt.key === 'bidirectional' ? { type: 'ArrowClosed', color: '#8b5cf6' } : undefined,
                    data: { ...selectedEdge.data, edgeType: opt.key },
                  })
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '7px 10px', borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${selectedEdge.data?.edgeType === opt.key ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  background: selectedEdge.data?.edgeType === opt.key ? 'var(--color-accent-dim)' : 'transparent',
                  color: selectedEdge.data?.edgeType === opt.key ? 'var(--color-accent-hover)' : 'var(--color-text-muted)',
                  fontSize: 12, cursor: 'pointer', marginBottom: 3, width: '100%', textAlign: 'left',
                }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, width: 40 }}>{opt.preview}</span>
                {opt.label}
              </button>
            ))}
          </Field>

          <div style={{ height: 1, background: 'var(--color-border)' }} />

          <button onClick={() => deleteEdge(selectedEdgeId)} style={{
            padding: '8px 12px', borderRadius: 'var(--radius-sm)',
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
            color: '#ef4444', fontSize: 12, fontWeight: 500, cursor: 'pointer',
          }}>
            🗑 Eliminar conexión
          </button>
        </div>
      </aside>
    )
  }
}

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{ fontSize: 10, color: 'var(--color-text-dim)', fontWeight: 600, letterSpacing: '0.06em' }}>{label.toUpperCase()}</label>
      {children}
    </div>
  )
}

function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        padding: '7px 10px',
        background: 'var(--color-surface-2)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--color-text)',
        fontSize: 12,
        outline: 'none',
        width: '100%',
      }}
      onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
      onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
    />
  )
}

const panelStyle = {
  width: 200,
  background: 'var(--color-surface)',
  borderLeft: '1px solid var(--color-border)',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  overflow: 'hidden',
}

const headerStyle = {
  padding: '14px 14px 12px',
  borderBottom: '1px solid var(--color-border)',
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--color-text-muted)',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
}

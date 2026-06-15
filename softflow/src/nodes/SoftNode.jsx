import React, { memo } from 'react'
import { Handle, Position, useReactFlow } from '@xyflow/react'
import useStore from '../store/useStore'

const SoftNode = memo(({ id, data, selected }) => {
  const { color = '#6366f1', label, sub, icon } = data
  const setSelectedNode = useStore(s => s.setSelectedNode)

  const handleClick = (e) => {
    e.stopPropagation()
    setSelectedNode(id)
  }

  return (
    <div onClick={handleClick} style={{ position: 'relative' }}>
      {/* Handles */}
      <Handle type="target" position={Position.Top}    id="t" />
      <Handle type="target" position={Position.Left}   id="l" />
      <Handle type="source" position={Position.Bottom} id="b" />
      <Handle type="source" position={Position.Right}  id="r" />

      {/* Node box */}
      <div style={{
        minWidth: 140,
        background: 'var(--color-surface)',
        border: `2px solid ${selected ? color : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        boxShadow: selected
          ? `0 0 0 3px ${color}33, var(--shadow-node)`
          : 'var(--shadow-node)',
        transition: 'all 0.15s',
        cursor: 'default',
      }}>
        {/* Color accent bar */}
        <div style={{
          position: 'absolute',
          top: 0, left: 8, right: 8,
          height: 3,
          background: color,
          borderRadius: '0 0 4px 4px',
        }} />

        {/* Icon */}
        <div style={{
          width: 36, height: 36,
          background: `${color}20`,
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18,
        }}>
          {icon}
        </div>

        {/* Label */}
        <div style={{
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--color-text)',
          textAlign: 'center',
          lineHeight: 1.3,
        }}>
          {label}
        </div>

        {/* Sub */}
        {sub && (
          <div style={{
            fontSize: 10,
            color: 'var(--color-text-dim)',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            background: 'var(--color-surface-2)',
            padding: '2px 8px',
            borderRadius: 999,
          }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  )
})

SoftNode.displayName = 'SoftNode'
export default SoftNode

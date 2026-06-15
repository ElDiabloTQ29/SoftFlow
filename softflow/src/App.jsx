import React, { useCallback } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useReactFlow,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import useStore from './store/useStore'
import SoftNode from './nodes/SoftNode'
import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'
import PropertiesPanel from './components/PropertiesPanel'

const nodeTypes = { softNode: SoftNode }

function FlowCanvas() {
  const {
    nodes, edges,
    onNodesChange, onEdgesChange, onConnect,
    addNode, setSelectedNode, setSelectedEdge, clearSelection,
    snapToGrid,
  } = useStore()

  const { screenToFlowPosition } = useReactFlow()

  const onDragOver = useCallback((e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    const raw = e.dataTransfer.getData('application/softflow')
    if (!raw) return
    const comp = JSON.parse(raw)
    const position = screenToFlowPosition({ x: e.clientX, y: e.clientY })
    addNode(comp, { x: position.x - 70, y: position.y - 40 })
  }, [screenToFlowPosition, addNode])

  const onNodeClick = useCallback((_, node) => setSelectedNode(node.id), [setSelectedNode])
  const onEdgeClick = useCallback((_, edge) => setSelectedEdge(edge.id), [setSelectedEdge])
  const onPaneClick = useCallback(() => clearSelection(), [clearSelection])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onNodeClick={onNodeClick}
      onEdgeClick={onEdgeClick}
      onPaneClick={onPaneClick}
      snapToGrid={snapToGrid}
      snapGrid={[16, 16]}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      deleteKeyCode="Delete"
      multiSelectionKeyCode="Shift"
      minZoom={0.2}
      maxZoom={3}
    >
      <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#2e3348" />
      <Controls />
      <MiniMap
        nodeColor={n => n.data?.color || '#6366f1'}
        maskColor="rgba(15,17,23,0.75)"
        style={{ right: 12, bottom: 12 }}
      />
    </ReactFlow>
  )
}

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Toolbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <div style={{ flex: 1, position: 'relative' }}>
          <ReactFlowProvider>
            <FlowCanvas />
          </ReactFlowProvider>
        </div>
        <PropertiesPanel />
      </div>
    </div>
  )
}

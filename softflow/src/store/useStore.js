import { create } from 'zustand'
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react'

let nodeId = 1
export const getNodeId = () => `node_${nodeId++}`

const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  selectedEdgeId: null,
  diagramName: 'Mi Diagrama',
  edgeType: 'solid',
  snapToGrid: true,

  setDiagramName: (name) => set({ diagramName: name }),
  setEdgeType: (edgeType) => set({ edgeType }),
  setSnapToGrid: (snapToGrid) => set({ snapToGrid }),

  onNodesChange: (changes) => set(state => ({ nodes: applyNodeChanges(changes, state.nodes) })),
  onEdgesChange: (changes) => set(state => ({ edges: applyEdgeChanges(changes, state.edges) })),

  onConnect: (connection) => set(state => {
    const { edgeType } = state
    const styleMap = {
      solid:   { strokeWidth: 2, stroke: '#6366f1' },
      dashed:  { strokeWidth: 2, stroke: '#6366f1', strokeDasharray: '6 3' },
      dotted:  { strokeWidth: 2, stroke: '#94a3b8', strokeDasharray: '2 3' },
      bidirectional: { strokeWidth: 2, stroke: '#8b5cf6' },
    }
    const newEdge = {
      ...connection,
      id: `edge_${Date.now()}`,
      type: 'smoothstep',
      style: styleMap[edgeType] || styleMap.solid,
      markerEnd: { type: 'ArrowClosed', color: styleMap[edgeType]?.stroke || '#6366f1' },
      ...(edgeType === 'bidirectional' ? { markerStart: { type: 'ArrowClosed', color: '#8b5cf6' } } : {}),
      data: { label: '', edgeType },
    }
    return { edges: addEdge(newEdge, state.edges) }
  }),

  addNode: (nodeData, position) => {
    const id = getNodeId()
    const newNode = {
      id,
      type: 'softNode',
      position,
      data: {
        label: nodeData.label,
        sub: nodeData.sub,
        icon: nodeData.icon,
        color: nodeData.color,
        nodeType: nodeData.type,
      },
    }
    set(state => ({ nodes: [...state.nodes, newNode] }))
    return id
  },

  updateNodeData: (id, data) => set(state => ({
    nodes: state.nodes.map(n => n.id === id ? { ...n, data: { ...n.data, ...data } } : n),
  })),

  updateEdgeData: (id, data) => set(state => ({
    edges: state.edges.map(e => e.id === id ? { ...e, ...data } : e),
  })),

  deleteNode: (id) => set(state => ({
    nodes: state.nodes.filter(n => n.id !== id),
    edges: state.edges.filter(e => e.source !== id && e.target !== id),
    selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
  })),

  deleteEdge: (id) => set(state => ({
    edges: state.edges.filter(e => e.id !== id),
    selectedEdgeId: state.selectedEdgeId === id ? null : state.selectedEdgeId,
  })),

  setSelectedNode: (id) => set({ selectedNodeId: id, selectedEdgeId: null }),
  setSelectedEdge: (id) => set({ selectedEdgeId: id, selectedNodeId: null }),
  clearSelection: () => set({ selectedNodeId: null, selectedEdgeId: null }),

  loadDiagram: (data) => {
    nodeId = (data.nodeIdCounter || 10) + 1
    set({ nodes: data.nodes || [], edges: data.edges || [], diagramName: data.name || 'Mi Diagrama' })
  },

  clearCanvas: () => set({ nodes: [], edges: [], selectedNodeId: null, selectedEdgeId: null }),

  loadExample: () => {
    const exampleNodes = [
      { id: 'ex1', type: 'softNode', position: { x: 80, y: 80 },   data: { label: 'Cliente Web', sub: 'React App', icon: '💻', color: '#10b981', nodeType: 'arch_client' } },
      { id: 'ex2', type: 'softNode', position: { x: 340, y: 80 },  data: { label: 'API Gateway', sub: 'Gateway',  icon: '🔀', color: '#8b5cf6', nodeType: 'arch_gateway' } },
      { id: 'ex3', type: 'softNode', position: { x: 600, y: 40 },  data: { label: 'Auth Service', sub: 'JWT Auth', icon: '⬡', color: '#6366f1', nodeType: 'arch_service' } },
      { id: 'ex4', type: 'softNode', position: { x: 600, y: 160 }, data: { label: 'User Service', sub: 'CRUD',    icon: '⬡', color: '#6366f1', nodeType: 'arch_service' } },
      { id: 'ex5', type: 'softNode', position: { x: 860, y: 80 },  data: { label: 'PostgreSQL',   sub: 'Database',icon: '🗄️', color: '#3b82f6', nodeType: 'arch_db' } },
      { id: 'ex6', type: 'softNode', position: { x: 860, y: 220 }, data: { label: 'Redis Cache',  sub: 'Cache',   icon: '⚡', color: '#ef4444', nodeType: 'arch_cache' } },
    ]
    const edgeStyle = { strokeWidth: 2, stroke: '#6366f1' }
    const exampleEdges = [
      { id: 'ee1', source: 'ex1', target: 'ex2', type: 'smoothstep', style: edgeStyle, markerEnd: { type: 'ArrowClosed', color: '#6366f1' }, data: { label: 'HTTP/REST' } },
      { id: 'ee2', source: 'ex2', target: 'ex3', type: 'smoothstep', style: edgeStyle, markerEnd: { type: 'ArrowClosed', color: '#6366f1' }, data: {} },
      { id: 'ee3', source: 'ex2', target: 'ex4', type: 'smoothstep', style: edgeStyle, markerEnd: { type: 'ArrowClosed', color: '#6366f1' }, data: {} },
      { id: 'ee4', source: 'ex3', target: 'ex5', type: 'smoothstep', style: { strokeWidth: 2, stroke: '#8b5cf6', strokeDasharray: '6 3' }, markerEnd: { type: 'ArrowClosed', color: '#8b5cf6' }, data: {} },
      { id: 'ee5', source: 'ex4', target: 'ex5', type: 'smoothstep', style: { strokeWidth: 2, stroke: '#8b5cf6', strokeDasharray: '6 3' }, markerEnd: { type: 'ArrowClosed', color: '#8b5cf6' }, data: {} },
      { id: 'ee6', source: 'ex4', target: 'ex6', type: 'smoothstep', style: { strokeWidth: 2, stroke: '#ef4444', strokeDasharray: '2 3' }, data: {} },
    ]
    nodeId = 20
    set({ nodes: exampleNodes, edges: exampleEdges, diagramName: 'Arquitectura Microservicios' })
  },
}))

export default useStore

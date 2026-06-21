import { useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { motion } from 'framer-motion'
import { chapterData } from '../../services/ragService'

// Custom node component
function ChapterNode({ data }) {
  return (
    <motion.div
      className="mind-map-node mind-map-node-root"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
    >
      <Handle type="target" position={Position.Left} className="mind-map-handle" />
      <div className={`mind-map-node-icon ${data.color}`}>{data.icon}</div>
      <div className="mind-map-node-content">
        <span className="mind-map-node-label">{data.label}</span>
        {data.subtitle && <span className="mind-map-node-sub">{data.subtitle}</span>}
      </div>
      <Handle type="source" position={Position.Right} className="mind-map-handle" />
    </motion.div>
  )
}

function SectionNode({ data }) {
  return (
    <motion.div
      className={`mind-map-section-node mind-map-section-node-${data.color}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(13,148,136,0.2)' }}
    >
      <Handle type="target" position={Position.Left} className="mind-map-handle" />
      <span className="mind-map-section-label">{data.label}</span>
      <Handle type="source" position={Position.Right} className="mind-map-handle" />
    </motion.div>
  )
}

const nodeTypes = {
  chapter: ChapterNode,
  section: SectionNode,
}

// Build nodes and edges from chapter data
function buildMindMapData() {
  const nodes = []
  const edges = []
  let nodeId = 0

  // Root node
  nodes.push({
    id: `root-${nodeId++}`,
    type: 'chapter',
    position: { x: 400, y: 20 },
    data: {
      label: chapterData.chapterTitle,
      subtitle: `Chương ${chapterData.chapterNumber}`,
      icon: '📚',
      color: 'primary',
    },
  })

  const clusters = [
    { key: 'intro', label: 'Dẫn nhập', icon: '📖', color: 'primary' },
    { key: 'formula', label: 'Công thức T-H-T\'', icon: '🔢', color: 'accent' },
    { key: 'contradiction', label: 'Mâu thuẫn', icon: '⚡', color: 'warning' },
    { key: 'labor', label: 'Hàng hóa SLĐ', icon: '💡', color: 'accent' },
    { key: 'production', label: 'Quá trình SX', icon: '🏭', color: 'primary' },
    { key: 'example', label: 'Ví dụ số', icon: '🔢', color: 'accent' },
    { key: 'capital', label: 'Tư bản c/v', icon: '⚙️', color: 'primary' },
    { key: 'salary', label: 'Tiền công', icon: '💰', color: 'warning' },
    { key: 'rate-mass', label: 'Tỷ suất & KL', icon: '📊', color: 'accent' },
    { key: 'methods', label: 'Phương pháp', icon: '🎯', color: 'primary' },
    { key: 'summary', label: 'Tổng kết', icon: '📋', color: 'accent' },
    { key: 'essence', label: 'Bản chất GTD', icon: '🔑', color: 'warning' },
  ]

  // Position clusters in a grid
  const clusterPositions = {
    intro: { x: 0, y: 100 },
    formula: { x: 180, y: 100 },
    contradiction: { x: 360, y: 100 },
    labor: { x: 540, y: 100 },
    production: { x: 720, y: 100 },
    example: { x: 900, y: 100 },
    capital: { x: 0, y: 300 },
    salary: { x: 180, y: 300 },
    'rate-mass': { x: 360, y: 300 },
    methods: { x: 540, y: 300 },
    summary: { x: 720, y: 300 },
    essence: { x: 900, y: 300 },
  }

  // Group nodes by cluster (2 rows)
  const group1 = ['intro', 'formula', 'contradiction', 'labor', 'production', 'example']
  const group2 = ['capital', 'salary', 'rate-mass', 'methods', 'summary', 'essence']

  const g1Spacing = 170
  const g2Spacing = 170
  const g1StartX = 50
  const g2StartX = 50

  group1.forEach((key, i) => {
    const cluster = clusters.find(c => c.key === key)
    if (!cluster) return
    const node = {
      id: `section-${nodeId}`,
      type: 'section',
      position: { x: g1StartX + i * g1Spacing, y: 120 },
      data: { label: cluster.label, icon: cluster.icon, color: cluster.color },
    }
    nodes.push(node)
    edges.push({
      id: `e-root-${nodeId}`,
      source: 'root-0',
      target: `section-${nodeId}`,
      type: 'smoothstep',
      animated: false,
      style: { stroke: 'var(--color-primary)', strokeWidth: 1.5, opacity: 0.6 },
    })
    nodeId++
  })

  group2.forEach((key, i) => {
    const cluster = clusters.find(c => c.key === key)
    if (!cluster) return
    const node = {
      id: `section-${nodeId}`,
      type: 'section',
      position: { x: g2StartX + i * g2Spacing, y: 320 },
      data: { label: cluster.label, icon: cluster.icon, color: cluster.color },
    }
    nodes.push(node)
    edges.push({
      id: `e-root2-${nodeId}`,
      source: 'root-0',
      target: `section-${nodeId}`,
      type: 'smoothstep',
      animated: false,
      style: { stroke: 'var(--color-accent)', strokeWidth: 1.5, opacity: 0.4 },
    })
    nodeId++
  })

  return { nodes, edges }
}

export default function MindMap() {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => buildMindMapData(), [])
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="mind-map-container">
      <ReactFlow
        className="mind-map-flow"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="var(--color-border)" gap={20} />
        <Controls className="mind-map-controls" />
        <MiniMap
          className="mind-map-minimap"
          nodeColor={(n) => {
            if (n.type === 'chapter') return 'var(--color-primary)'
            return 'var(--color-accent)'
          }}
          maskColor="rgba(0,0,0,0.05)"
        />
      </ReactFlow>
    </div>
  )
}

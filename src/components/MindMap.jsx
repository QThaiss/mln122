import { useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { LESSON_DATA, MIND_MAP_NODES } from '../data/lessonData'
import { motion } from 'framer-motion'

// ── Custom Node Components ────────────────────────────────────────
function RootNode({ data }) {
  return (
    <div className="mindmap-node mindmap-root">
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <div className="mindmap-node-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      </div>
      <div className="mindmap-node-text">
        <span className="mindmap-node-label">{data.label}</span>
        <span className="mindmap-node-sub">{data.subLabel}</span>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ visibility: 'hidden' }} />
    </div>
  )
}

function ClusterNode({ data }) {
  return (
    <div className="mindmap-node mindmap-cluster">
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <div className="mindmap-node-icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      </div>
      <span className="mindmap-node-label">{data.label}</span>
      <Handle type="source" position={Position.Bottom} style={{ visibility: 'hidden' }} />
    </div>
  )
}

function SectionNode({ data }) {
  return (
    <div className="mindmap-node mindmap-section" onClick={() => data.onNavigate?.(data.sectionId)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && data.onNavigate?.(data.sectionId)}>
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <div className="mindmap-node-dot" aria-hidden="true" />
      <div className="mindmap-node-text">
        <span className="mindmap-node-label">{data.label}</span>
        {data.keywords?.length > 0 && (
          <div className="mindmap-node-tags">
            {data.keywords.slice(0, 2).map((kw, i) => (
              <span key={i} className="mindmap-tag">{kw}</span>
            ))}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} style={{ visibility: 'hidden' }} />
    </div>
  )
}

const nodeTypes = { root: RootNode, cluster: ClusterNode, section: SectionNode }

// ── Mind Map Builder ─────────────────────────────────────────────
function buildNodesAndEdges(treeNodes, startX = 0, startY = 0, level = 0) {
  const nodes = []
  const edges = []

  const levelX = startX
  const levelY = startY
  const verticalGap = 140
  const clusterGap = 260
  const sectionGap = 120

  if (level === 0) {
    nodes.push({
      id: treeNodes[0].id,
      type: 'root',
      position: { x: levelX, y: levelY },
      data: {
        label: treeNodes[0].label,
        subLabel: LESSON_DATA.metadata.course,
      },
    })

    let childX = levelX
    const childGap = (treeNodes[0].children.length - 1) * (clusterGap / 2)
    childX -= childGap

    treeNodes[0].children.forEach((cluster) => {
      nodes.push({
        id: cluster.id,
        type: 'cluster',
        position: { x: childX, y: levelY + verticalGap },
        data: { label: cluster.label },
      })

      edges.push({
        id: `e-${treeNodes[0].id}-${cluster.id}`,
        source: treeNodes[0].id,
        target: cluster.id,
        markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: 'var(--color-primary)' },
        style: { stroke: 'var(--color-primary)', strokeWidth: 1.5 },
      })

      let sectionX = childX - ((cluster.children?.length || 1) - 1) * (sectionGap / 2)
      cluster.children?.forEach((section) => {
        nodes.push({
          id: section.id,
          type: 'section',
          position: { x: sectionX, y: levelY + verticalGap * 2 },
          data: {
            label: section.label,
            keywords: section.keywords,
            sectionId: section.id,
            onNavigate: null,
          },
        })

        edges.push({
          id: `e-${cluster.id}-${section.id}`,
          source: cluster.id,
          target: section.id,
          markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10, color: 'var(--color-accent)' },
          style: { stroke: 'var(--color-accent)', strokeWidth: 1.2, strokeDasharray: '5,3' },
        })

        sectionX += sectionGap
      })

      childX += clusterGap
    })
  }

  return { nodes, edges }
}

// ── Main Component ───────────────────────────────────────────────
export default function MindMap({ onNavigate }) {
  const initial = useMemo(() => buildNodesAndEdges(MIND_MAP_NODES, 0, 40), [])

  const [nodes, , onNodesChange] = useNodesState(initial.nodes)
  const [edges, , onEdgesChange] = useEdgesState(initial.edges)

  // Inject navigate handler into section nodes
  const nodesWithHandler = useMemo(() =>
    nodes.map((n) => {
      if (n.type === 'section') {
        return { ...n, data: { ...n.data, onNavigate } }
      }
      return n
    }),
    [nodes, onNavigate]
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', height: '600px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-border)' }}
    >
      <ReactFlow
        nodes={nodesWithHandler}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
        minZoom={0.3}
        maxZoom={1.5}
      >
        <Background color="var(--color-border)" gap={24} size={1} />
        <Controls
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
          }}
        />
      </ReactFlow>
    </motion.div>
  )
}

import { useState, useMemo, useCallback } from "react"
import { Network, Eye, EyeOff } from "lucide-react"
import { getPointById } from "@/data/knowledgePoints"
import { cn } from "@/lib/utils"

// ============================================================
// 关联网络图数据 — 社会心理学
// 精选跨模块的关键知识点和它们的关联关系
// ============================================================

interface NetNode {
  id: string
  label: string
  module: string
  moduleColor: string
  // SVG 坐标 (viewBox 720x460)
  x: number
  y: number
}

interface NetEdge {
  from: string
  to: string
  label: string
  /** 是否为跨模块关联（跨模块的高亮显示） */
  crossModule: boolean
}

// 模块颜色映射
const MODULE_COLORS: Record<string, string> = {
  "社会认知": "hsl(195 85% 55%)",
  "归因理论": "hsl(210 70% 55%)",
  "内心机制": "hsl(265 85% 62%)",
  "社会影响": "hsl(160 70% 45%)",
  "态度与说服": "hsl(275 75% 58%)",
  "人际吸引": "hsl(320 70% 58%)",
  "利他与侵犯": "hsl(15 75% 55%)",
  "群体行为": "hsl(35 85% 60%)",
}

// 精选 20 个关键知识点，按模块分组定位
const NODES: NetNode[] = [
  // 社会认知（左上区域）
  { id: "sp-schema", label: "图式加工", module: "社会认知", moduleColor: MODULE_COLORS["社会认知"], x: 80, y: 70 },
  { id: "stereotype", label: "刻板印象", module: "社会认知", moduleColor: MODULE_COLORS["社会认知"], x: 80, y: 140 },
  { id: "prejudice", label: "偏见", module: "社会认知", moduleColor: MODULE_COLORS["社会认知"], x: 80, y: 210 },
  { id: "discrimination", label: "歧视", module: "社会认知", moduleColor: MODULE_COLORS["社会认知"], x: 80, y: 280 },

  // 归因理论（左中区域）
  { id: "fae", label: "基本归因错误", module: "归因理论", moduleColor: MODULE_COLORS["归因理论"], x: 220, y: 70 },
  { id: "self-serving", label: "自我服务偏差", module: "归因理论", moduleColor: MODULE_COLORS["归因理论"], x: 220, y: 140 },

  // 内心机制（中上区域）
  { id: "abc-theory", label: "ABC理论", module: "内心机制", moduleColor: MODULE_COLORS["内心机制"], x: 360, y: 50 },
  { id: "cognitive-dissonance", label: "认知失调", module: "内心机制", moduleColor: MODULE_COLORS["内心机制"], x: 360, y: 120 },
  { id: "effort-justification", label: "努力辩护", module: "内心机制", moduleColor: MODULE_COLORS["内心机制"], x: 360, y: 190 },

  // 态度与说服（中区域）
  { id: "sp-attitude-behavior", label: "态度↔行为", module: "态度与说服", moduleColor: MODULE_COLORS["态度与说服"], x: 500, y: 70 },
  { id: "central-route", label: "中心路径", module: "态度与说服", moduleColor: MODULE_COLORS["态度与说服"], x: 500, y: 140 },
  { id: "peripheral-route", label: "外周路径", module: "态度与说服", moduleColor: MODULE_COLORS["态度与说服"], x: 500, y: 210 },

  // 社会影响（右中区域）
  { id: "conformity", label: "从众", module: "社会影响", moduleColor: MODULE_COLORS["社会影响"], x: 640, y: 70 },
  { id: "obedience", label: "服从", module: "社会影响", moduleColor: MODULE_COLORS["社会影响"], x: 640, y: 140 },
  { id: "foot-in-door", label: "登门槛", module: "社会影响", moduleColor: MODULE_COLORS["社会影响"], x: 640, y: 210 },
  { id: "reciprocity", label: "互惠原则", module: "社会影响", moduleColor: MODULE_COLORS["社会影响"], x: 640, y: 280 },

  // 人际吸引（左下区域）
  { id: "sp-social-exchange", label: "社会交换", module: "人际吸引", moduleColor: MODULE_COLORS["人际吸引"], x: 150, y: 360 },

  // 利他与侵犯（中下区域）
  { id: "altruism", label: "利他行为", module: "利他与侵犯", moduleColor: MODULE_COLORS["利他与侵犯"], x: 350, y: 330 },
  { id: "aggression", label: "攻击行为", module: "利他与侵犯", moduleColor: MODULE_COLORS["利他与侵犯"], x: 350, y: 400 },
  { id: "bystander", label: "旁观者效应", module: "利他与侵犯", moduleColor: MODULE_COLORS["利他与侵犯"], x: 500, y: 360 },

  // 群体行为（右下区域）
  { id: "group-polarization", label: "群体极化", module: "群体行为", moduleColor: MODULE_COLORS["群体行为"], x: 640, y: 360 },
  { id: "groupthink", label: "群体思维", module: "群体行为", moduleColor: MODULE_COLORS["群体行为"], x: 640, y: 430 },
]

// 关联关系
const EDGES: NetEdge[] = [
  // ── 模块内关联（灰色细线）──
  { from: "sp-schema", to: "stereotype", label: "图式→刻板化", crossModule: false },
  { from: "stereotype", to: "prejudice", label: "认知→情感", crossModule: false },
  { from: "prejudice", to: "discrimination", label: "情感→行为", crossModule: false },
  { from: "abc-theory", to: "cognitive-dissonance", label: "信念→失调", crossModule: false },
  { from: "cognitive-dissonance", to: "effort-justification", label: "失调→辩护", crossModule: false },
  { from: "central-route", to: "peripheral-route", label: "双路径", crossModule: false },
  { from: "conformity", to: "obedience", label: "被动→主动", crossModule: false },
  { from: "foot-in-door", to: "reciprocity", label: "互惠驱动", crossModule: false },
  { from: "group-polarization", to: "groupthink", label: "极化→思维", crossModule: false },
  { from: "altruism", to: "bystander", label: "利他vs旁观", crossModule: false },

  // ── 跨模块关联（高亮线）──
  { from: "stereotype", to: "fae", label: "刻板=归因偏差", crossModule: true },
  { from: "fae", to: "obedience", label: "低估情境→误解读服从", crossModule: true },
  { from: "cognitive-dissonance", to: "sp-attitude-behavior", label: "失调=态度改变的机制", crossModule: true },
  { from: "cognitive-dissonance", to: "foot-in-door", label: "承诺后失调→态度转变", crossModule: true },
  { from: "effort-justification", to: "sp-attraction-principles", label: "付出越多→越喜欢", crossModule: true },
  { from: "sp-attitude-behavior", to: "central-route", label: "态度改变→说服路径", crossModule: true },
  { from: "conformity", to: "group-polarization", label: "从众机制→群体观点强化", crossModule: true },
  { from: "prejudice", to: "aggression", label: "偏见→攻击的根源", crossModule: true },
  { from: "discrimination", to: "aggression", label: "歧视行为→攻击外显", crossModule: true },
  { from: "bystander", to: "groupthink", label: "责任分散→群体沉默", crossModule: true },
  { from: "reciprocity", to: "sp-social-exchange", label: "互惠=交换的一种", crossModule: true },
  { from: "abc-theory", to: "sp-attitude-behavior", label: "ABC解释态度-行为关系", crossModule: true },
]

// ============================================================
// 组件
// ============================================================

interface KnowledgeNetworkGraphProps {
  learnedPoints: string[]
  onNodeClick?: (pointId: string) => void
}

export function KnowledgeNetworkGraph({ learnedPoints, onNodeClick }: KnowledgeNetworkGraphProps) {
  const [showCrossOnly, setShowCrossOnly] = useState(false)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedEdge, setSelectedEdge] = useState<NetEdge | null>(null)

  const learnedSet = useMemo(() => new Set(learnedPoints), [learnedPoints])

  const nodeMap = useMemo(() => {
    const map = new Map<string, NetNode>()
    for (const n of NODES) map.set(n.id, n)
    return map
  }, [])

  const visibleEdges = useMemo(() => {
    if (showCrossOnly) return EDGES.filter((e) => e.crossModule)
    return EDGES
  }, [showCrossOnly])

  // 获取节点的关联边
  const nodeEdges = useCallback((nodeId: string) => {
    return EDGES.filter((e) => e.from === nodeId || e.to === nodeId)
  }, [])

  // 判断节点是否在高亮路径上
  const isNodeHighlighted = useCallback((nodeId: string) => {
    if (!hoveredNode) return false
    if (nodeId === hoveredNode) return true
    const edges = nodeEdges(hoveredNode)
    return edges.some((e) => e.from === nodeId || e.to === nodeId)
  }, [hoveredNode, nodeEdges])

  // 判断边是否高亮
  const isEdgeHighlighted = useCallback((edge: NetEdge) => {
    if (!hoveredNode) return false
    return edge.from === hoveredNode || edge.to === hoveredNode
  }, [hoveredNode])

  return (
    <div className="rounded-lg border border-border/60 bg-card/50 overflow-hidden">
      {/* 标题栏 */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border/40">
        <Network className="h-4 w-4 shrink-0 text-primary" />
        <span className="text-sm font-medium text-foreground">知识点关联网络</span>
        <span className="text-xs text-muted-foreground">跨模块逻辑关系图</span>
        <button
          onClick={() => setShowCrossOnly(!showCrossOnly)}
          className="ml-auto flex items-center gap-1 rounded border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          {showCrossOnly ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
          {showCrossOnly ? "显示全部" : "仅看跨模块"}
        </button>
      </div>

      {/* SVG 网络图 */}
      <div className="relative overflow-x-auto">
        <svg viewBox="0 0 720 470" className="w-full" style={{ minWidth: "600px" }}>
          <defs>
            {/* 跨模块箭头 */}
            <marker id="net-arr-cross" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto">
              <path d="M1 1 L7 4 L1 7 Z" fill="hsl(265 85% 62%)" />
            </marker>
            {/* 模块内箭头 */}
            <marker id="net-arr-inner" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto">
              <path d="M1 1 L7 4 L1 7 Z" fill="hsl(220 10% 55%)" />
            </marker>
          </defs>

          {/* 边 */}
          {visibleEdges.map((edge, idx) => {
            const from = nodeMap.get(edge.from)
            const to = nodeMap.get(edge.to)
            if (!from || !to) return null

            const highlighted = isEdgeHighlighted(edge)
            const opacity = hoveredNode && !highlighted ? 0.15 : 1

            // 计算缩短的起止点（避免箭头插入节点内部）
            const dx = to.x - from.x
            const dy = to.y - from.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const shorten = 28 // 节点半径
            const x1 = from.x + (dx / dist) * shorten
            const y1 = from.y + (dy / dist) * shorten
            const x2 = to.x - (dx / dist) * shorten
            const y2 = to.y - (dy / dist) * shorten

            // 中点（用于标签）
            const mx = (x1 + x2) / 2
            const my = (y1 + y2) / 2

            return (
              <g key={idx} style={{ opacity, transition: "opacity 0.2s" }}>
                <path
                  d={`M ${x1} ${y1} L ${x2} ${y2}`}
                  fill="none"
                  stroke={edge.crossModule ? "hsl(265 85% 62%)" : "hsl(220 10% 55%)"}
                  strokeWidth={highlighted ? 2.5 : edge.crossModule ? 1.8 : 1}
                  strokeOpacity={edge.crossModule ? 0.7 : 0.4}
                  strokeDasharray={edge.crossModule ? "none" : "4 3"}
                  markerEnd={edge.crossModule ? "url(#net-arr-cross)" : "url(#net-arr-inner)"}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedEdge(edge)}
                />
                {/* 边标签（仅跨模块且hover时显示） */}
                {edge.crossModule && (highlighted || selectedEdge === edge) && (
                  <g>
                    <rect
                      x={mx - edge.label.length * 4 - 4}
                      y={my - 8}
                      width={edge.label.length * 8 + 8}
                      height={16}
                      rx={4}
                      fill="hsl(230 25% 10%)"
                      stroke="hsl(265 85% 62%)"
                      strokeWidth={0.5}
                    />
                    <text
                      x={mx}
                      y={my + 3}
                      textAnchor="middle"
                      fontSize={9}
                      fill="hsl(265 85% 72%)"
                      style={{ pointerEvents: "none" }}
                    >
                      {edge.label}
                    </text>
                  </g>
                )}
              </g>
            )
          })}

          {/* 节点 */}
          {NODES.map((node) => {
            const isLearned = learnedSet.has(node.id)
            const highlighted = isNodeHighlighted(node.id)
            const dimmed = hoveredNode && !highlighted
            const point = getPointById(node.id)
            const isValid = !!point

            return (
              <g
                key={node.id}
                style={{
                  opacity: dimmed ? 0.35 : 1,
                  cursor: isValid ? "pointer" : "default",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => {
                  if (isValid) {
                    onNodeClick?.(node.id)
                  }
                }}
              >
                {/* 外圈光晕（已学习或高亮时） */}
                {(isLearned || highlighted) && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={22}
                    fill="none"
                    stroke={node.moduleColor}
                    strokeWidth={1}
                    strokeOpacity={highlighted ? 0.5 : 0.25}
                  />
                )}
                {/* 节点圆 */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={18}
                  fill={isLearned ? node.moduleColor : "hsl(230 22% 12%)"}
                  stroke={node.moduleColor}
                  strokeWidth={highlighted ? 2.5 : 1.5}
                  strokeOpacity={isLearned ? 1 : 0.6}
                />
                {/* 节点文字 */}
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fontSize={9}
                  fontWeight={600}
                  fill={isLearned ? "hsl(0 0% 100%)" : node.moduleColor}
                  style={{ pointerEvents: "none" }}
                >
                  {node.label.length > 4 ? node.label.slice(0, 4) : node.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* 图例 + 选中关系说明 */}
      <div className="flex flex-wrap items-center gap-3 border-t border-border/40 px-4 py-2.5">
        {/* 图例 */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="h-0.5 w-4" style={{ backgroundColor: "hsl(265 85% 62%)", opacity: 0.7 }} />
            <span className="text-xs text-muted-foreground">跨模块关联</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-0.5 w-4 border-t border-dashed" style={{ borderColor: "hsl(220 10% 55%)", opacity: 0.6 }} />
            <span className="text-xs text-muted-foreground">模块内递进</span>
          </div>
        </div>
        <div className="h-3 w-px bg-border" />
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "hsl(230 22% 12%)", border: "1.5px solid hsl(195 85% 55%)" }} />
          <span className="text-xs text-muted-foreground">未学习</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "hsl(195 85% 55%)" }} />
          <span className="text-xs text-muted-foreground">已学习</span>
        </div>

        {/* 选中边说明 */}
        {selectedEdge && (
          <div className="ml-auto flex items-center gap-1.5 rounded border border-primary/30 bg-primary/5 px-2 py-1">
            <span className="text-xs text-primary">
              {nodeMap.get(selectedEdge.from)?.label} → {nodeMap.get(selectedEdge.to)?.label}
            </span>
            <span className="text-xs text-muted-foreground">· {selectedEdge.label}</span>
            <button
              onClick={() => setSelectedEdge(null)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* 操作提示 */}
      <div className="border-t border-border/40 px-4 py-2">
        <p className="text-xs text-muted-foreground">
          💡 悬停节点查看关联 · 点击节点跳转学习 · 点击连线查看关系说明
        </p>
      </div>
    </div>
  )
}

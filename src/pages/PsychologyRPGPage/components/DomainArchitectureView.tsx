import { useState, useMemo } from "react"
import { ChevronDown, ChevronRight, Network, ArrowDown, Check } from "lucide-react"
import { SKILL_MODULES, getPointsByModule } from "@/data/knowledgePoints"
import type { IKnowledgePoint } from "@/types"
import { cn } from "@/lib/utils"

// ============================================================
// 学科架构图数据 — 按子领域定义
// ============================================================

interface ArchModule {
  name: string
  moduleId?: string
  color: string
}

interface ArchLayer {
  name: string
  subtitle: string
  modules: ArchModule[]
}

interface ArchFlow {
  label: string
  highlight?: boolean
}

interface DomainArch {
  title: string
  description: string
  layers: ArchLayer[]
  flows: ArchFlow[]
  logicChain: string
}

const ARCHITECTURES: Record<string, DomainArch> = {
  "social-psychology": {
    title: "社会心理学 · 学科架构",
    description: "社会心理学遵循「个体内部加工 → 人际互动 → 群体涌现」的递进逻辑，研究他人如何影响我们的思想、感受与行为",
    layers: [
      {
        name: "个体层面",
        subtitle: "你脑子里发生了什么",
        modules: [
          { name: "社会认知", moduleId: "sp-cognition", color: "hsl(195 85% 55%)" },
          { name: "归因理论", moduleId: "sp-attribution", color: "hsl(210 70% 55%)" },
          { name: "内心机制", moduleId: "sp-inner", color: "hsl(265 85% 62%)" },
        ],
      },
      {
        name: "人际层面",
        subtitle: "人与人之间如何互相影响",
        modules: [
          { name: "社会影响", moduleId: "sp-influence", color: "hsl(210 70% 55%)" },
          { name: "态度与说服", moduleId: "sp-attitude", color: "hsl(265 85% 62%)" },
          { name: "人际吸引", moduleId: "sp-interpersonal", color: "hsl(320 70% 58%)" },
          { name: "利他与侵犯", moduleId: "sp-altruism-aggression", color: "hsl(155 70% 50%)" },
        ],
      },
      {
        name: "群体层面",
        subtitle: "多人聚合后涌现的新现象",
        modules: [
          { name: "群体行为", moduleId: "sp-group", color: "hsl(35 85% 60%)" },
        ],
      },
    ],
    flows: [
      { label: "认知加工决定如何接收影响，内心机制调节外部影响的内化" },
      { label: "个体互动聚合为群体动力，群体压力反作用于个体认知与行为", highlight: true },
    ],
    logicChain: "社会认知（怎么想）→ 态度与说服（怎么转变）→ 人际行为（怎么做）→ 群体心理（聚合后会发生什么）",
  },
  "cognitive-psychology": {
    title: "认知心理学 · 学科架构",
    description: "认知心理学遵循「信息输入 → 加工处理 → 输出表达」的计算机隐喻，研究大脑如何接收、处理、存储和提取信息",
    layers: [
      {
        name: "信息输入层",
        subtitle: "外界信息如何进入大脑",
        modules: [
          { name: "知觉与模式识别", moduleId: "cp-perception", color: "hsl(195 85% 55%)" },
          { name: "注意", moduleId: "cp-attention", color: "hsl(210 70% 55%)" },
        ],
      },
      {
        name: "加工与存储层",
        subtitle: "信息如何被处理和保存",
        modules: [
          { name: "记忆", moduleId: "cp-memory", color: "hsl(265 85% 62%)" },
          { name: "思维与问题解决", moduleId: "cp-thinking", color: "hsl(275 75% 58%)" },
          { name: "语言", moduleId: "cp-language", color: "hsl(155 70% 50%)" },
        ],
      },
    ],
    flows: [
      { label: "经过注意选择和模式识别的信息进入加工存储系统", highlight: true },
    ],
    logicChain: "知觉（接收信息）→ 注意（筛选信息）→ 记忆（存储信息）→ 思维（处理信息）→ 语言（表达信息）",
  },
  "personality-psychology": {
    title: "人格心理学 · 学科架构",
    description: "人格心理学从六大理论流派切入，遵循「是什么 → 为什么 → 怎么测 → 怎么用」的研究逻辑，各流派从不同层面解释人格",
    layers: [
      {
        name: "基础概念层",
        subtitle: "人格是什么，如何定义",
        modules: [
          { name: "导论", moduleId: "pp-intro", color: "hsl(195 85% 55%)" },
        ],
      },
      {
        name: "理论解释层",
        subtitle: "六大流派从不同视角解释人格",
        modules: [
          { name: "精神分析", moduleId: "pp-psychoanalysis", color: "hsl(275 75% 58%)" },
          { name: "新精神分析", moduleId: "pp-neo-psychoanalysis", color: "hsl(320 70% 58%)" },
          { name: "特质流派", moduleId: "pp-trait", color: "hsl(175 70% 50%)" },
          { name: "行为主义", moduleId: "pp-behaviorism", color: "hsl(130 60% 48%)" },
          { name: "人本主义", moduleId: "pp-humanistic", color: "hsl(35 85% 58%)" },
          { name: "认知流派", moduleId: "pp-cognitive", color: "hsl(200 80% 55%)" },
        ],
      },
      {
        name: "生物基础层",
        subtitle: "人格的遗传与生理基础",
        modules: [
          { name: "生物流派", moduleId: "pp-biological", color: "hsl(15 75% 55%)" },
        ],
      },
    ],
    flows: [
      { label: "定义清晰后，六大流派从不同层面解释人格的来源与结构" },
      { label: "各流派理论最终汇聚于生物基础，形成完整的人格解释体系", highlight: true },
    ],
    logicChain: "是什么（定义）→ 为什么（六大流派各有侧重）→ 生理基础（遗传与进化）",
  },
}

// ============================================================
// 学科架构图组件（含知识点列表）
// ============================================================

interface DomainArchitectureViewProps {
  subdomainId: string
  learnedPoints: string[]
  onPointClick?: (point: IKnowledgePoint) => void
}

export function DomainArchitectureView({ subdomainId, learnedPoints, onPointClick }: DomainArchitectureViewProps) {
  const [expanded, setExpanded] = useState(true)
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
  const arch = ARCHITECTURES[subdomainId]

  const learnedSet = useMemo(() => new Set(learnedPoints), [learnedPoints])

  if (!arch) return null

  function toggleModule(moduleId: string) {
    setExpandedModules((prev) => {
      const next = new Set(prev)
      if (next.has(moduleId)) {
        next.delete(moduleId)
      } else {
        next.add(moduleId)
      }
      return next
    })
  }

  function getModulePoints(moduleId?: string): IKnowledgePoint[] {
    if (!moduleId) return []
    return getPointsByModule(moduleId)
  }

  function getModuleProgress(moduleId?: string): { learned: number; total: number } {
    const pts = getModulePoints(moduleId)
    if (pts.length === 0) return { learned: 0, total: 0 }
    let learned = 0
    for (const p of pts) {
      if (learnedSet.has(p.id)) learned++
    }
    return { learned, total: pts.length }
  }

  return (
    <div className="rounded-lg border border-border/60 bg-card/50 overflow-hidden">
      {/* 标题栏 */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2.5 px-4 py-3 text-left transition-colors hover:bg-muted/40"
      >
        <Network className="h-4 w-4 shrink-0 text-accent" />
        <span className="text-sm font-medium text-foreground">{arch.title}</span>
        <span className="ml-auto shrink-0 text-muted-foreground">
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </span>
      </button>

      {expanded && (
        <div className="space-y-3 px-4 pb-4">
          {/* 架构描述 */}
          <p className="text-xs leading-relaxed text-muted-foreground">{arch.description}</p>

          {/* 三层架构 */}
          <div className="space-y-2">
            {arch.layers.map((layer, layerIdx) => (
              <div key={layerIdx}>
                {/* 层级容器 */}
                <div className="rounded-lg border border-dashed border-border/50 bg-muted/20 p-3">
                  {/* 层级标题 */}
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded bg-primary/15 px-1.5 py-0.5 text-xs font-semibold text-primary">
                      L{layerIdx + 1}
                    </span>
                    <span className="text-sm font-medium text-foreground">{layer.name}</span>
                    <span className="text-xs text-muted-foreground">· {layer.subtitle}</span>
                  </div>

                  {/* 模块卡片 */}
                  <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                    {layer.modules.map((mod) => {
                      const prog = getModuleProgress(mod.moduleId)
                      const isComplete = prog.total > 0 && prog.learned === prog.total
                      const isExpanded = mod.moduleId && expandedModules.has(mod.moduleId)
                      const modPoints = getModulePoints(mod.moduleId)

                      return (
                        <div
                          key={mod.name}
                          className={cn(
                            "relative overflow-hidden rounded-lg border transition-all",
                            isComplete
                              ? "border-success/40 bg-success/5"
                              : isExpanded
                                ? "border-primary/40 bg-card"
                                : "border-border/60 bg-card hover:border-primary/30"
                          )}
                        >
                          {/* 左侧色条 */}
                          <div
                            className="absolute left-0 top-0 h-full w-1"
                            style={{ backgroundColor: mod.color, opacity: 0.7 }}
                          />

                          {/* 模块头部（可点击展开） */}
                          <button
                            onClick={() => mod.moduleId && toggleModule(mod.moduleId)}
                            disabled={!mod.moduleId}
                            className="flex w-full items-center gap-2 pl-3 pr-2.5 py-2.5 text-left"
                          >
                            <span className="text-sm font-medium text-foreground">{mod.name}</span>
                            {prog.total > 0 && (
                              <span className={cn(
                                "text-xs font-bold",
                                isComplete ? "text-success" : "text-muted-foreground"
                              )}>
                                {prog.learned}/{prog.total}
                              </span>
                            )}
                            {isComplete && <Check className="h-3.5 w-3.5 shrink-0 text-success" />}
                            <span className="ml-auto shrink-0 text-muted-foreground">
                              {isExpanded
                                ? <ChevronDown className="h-3.5 w-3.5" />
                                : <ChevronRight className="h-3.5 w-3.5" />
                              }
                            </span>
                          </button>

                          {/* 知识点列表 */}
                          {isExpanded && modPoints.length > 0 && (
                            <div className="border-t border-border/40 bg-muted/10">
                              {modPoints.map((point, idx) => {
                                const isLearned = learnedSet.has(point.id)
                                return (
                                  <div
                                    key={point.id}
                                    className="flex items-center gap-2 pl-5 pr-3 py-2 cursor-pointer hover:bg-primary/5 transition-colors"
                                    onClick={() => onPointClick?.(point)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault()
                                        onPointClick?.(point)
                                      }
                                    }}
                                  >
                                    {/* 编号 */}
                                    <span className="shrink-0 font-mono text-xs text-muted-foreground/40">
                                      {idx + 1}.
                                    </span>
                                    {/* 状态点 */}
                                    <span
                                      className={cn(
                                        "h-2 w-2 shrink-0 rounded-full border-2 transition-all",
                                        isLearned && "border-success bg-success",
                                        !isLearned && "border-primary/40 bg-primary/15",
                                      )}
                                    />
                                    {/* 名称 */}
                                    <span className={cn(
                                      "flex-1 text-sm",
                                      isLearned ? "text-foreground/70" : "text-foreground"
                                    )}>
                                      {point.name}
                                    </span>
                                    {/* 状态文字 */}
                                    <span className="shrink-0 text-xs text-muted-foreground">
                                      {isLearned ? "已掌握" : "点击查看"}
                                    </span>
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* 层间逻辑关系 */}
                {layerIdx < arch.flows.length && (
                  <div className="flex items-center justify-center py-1.5">
                    <div className="flex flex-col items-center gap-0.5">
                      <ArrowDown className={cn(
                        "h-3.5 w-3.5",
                        arch.flows[layerIdx].highlight ? "text-primary" : "text-muted-foreground"
                      )} />
                      <span className={cn(
                        "text-xs",
                        arch.flows[layerIdx].highlight ? "text-primary" : "text-muted-foreground"
                      )}>
                        {arch.flows[layerIdx].label}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 核心逻辑链 */}
          <div className="rounded-lg border border-accent/30 bg-accent/5 p-3">
            <div className="mb-1 flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-wide text-accent">核心逻辑链</span>
            </div>
            <p className="text-xs leading-relaxed text-foreground/90">{arch.logicChain}</p>
          </div>
        </div>
      )}
    </div>
  )
}

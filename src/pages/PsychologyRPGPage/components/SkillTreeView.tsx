import { useState, useMemo, useCallback } from "react"
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SKILL_MODULES, getPointsByModule } from "@/data/knowledgePoints"
import type { IKnowledgePoint, IQARecord, IKnowledgeNote, NodeStatus } from "@/types"
import { InlinePointDetail } from "./InlinePointDetail"
import { cn } from "@/lib/utils"

interface SkillTreeViewProps {
  learnedPoints: string[]
  onLearn: (pointId: string) => void
  domainId: string
  notesApi: {
    notes: IKnowledgeNote[]
    qaRecords: IQARecord[]
    getNotesByPoint: (pointId: string) => IKnowledgeNote[]
    getQAByPoint: (pointId: string) => IQARecord[]
    addNote: (pointId: string, content: string) => void
    addQARecord: (pointId: string, pointName: string, question: string, answer: string) => void
    deleteNote: (id: string) => void
    deleteQARecord: (id: string) => void
  }
}

// 根据大领域ID获取其下所有子领域的ID
function getSubdomainIdsByDomain(domainId: string): string[] {
  const subdomainMap: Record<string, string[]> = {
    "psychology": ["social-psychology", "cognitive-psychology", "personality-psychology"],
    "electronic-gaming": ["game-industry-history", "game-industry-structure", "emerging-tech", "industry-laws-trends"],
  }
  return subdomainMap[domainId] || []
}

export function SkillTreeView({ learnedPoints, onLearn, notesApi, domainId }: SkillTreeViewProps) {
  // 按领域过滤模块
  const subdomainIds = useMemo(() => getSubdomainIdsByDomain(domainId), [domainId])
  const modules = useMemo(() => SKILL_MODULES.filter(m => subdomainIds.includes(m.subdomain)), [subdomainIds])
  const [activeModule, setActiveModule] = useState(modules[0]?.id || "")
  const [expandedAll, setExpandedAll] = useState(false)
  // 当前展开的知识点ID，null 表示全部折叠；expandedAll 为 true 时忽略此值
  const [expandedPointId, setExpandedPointId] = useState<string | null>(null)
  const currentModule = modules.find((m) => m.id === activeModule)!
  const points = useMemo(() => getPointsByModule(activeModule), [activeModule])

  // 预计算 learnedSet
  const learnedSet = useMemo(() => new Set(learnedPoints), [learnedPoints])

  // 预计算每个模块的学习进度
  const moduleProgress = useMemo(() => {
    return modules.map((mod) => {
      const modPoints = getPointsByModule(mod.id)
      let learnedInModule = 0
      for (const p of modPoints) {
        if (learnedSet.has(p.id)) learnedInModule++
      }
      return { id: mod.id, name: mod.name, learned: learnedInModule, total: modPoints.length }
    })
  }, [modules, learnedSet])

  // 预计算每个知识点的笔记+问答计数
  const reflectionCounts = useMemo(() => {
    const map = new Map<string, { notes: number; qa: number }>()
    for (const note of notesApi.notes) {
      const entry = map.get(note.pointId) || { notes: 0, qa: 0 }
      entry.notes++
      map.set(note.pointId, entry)
    }
    for (const qa of notesApi.qaRecords) {
      const entry = map.get(qa.pointId) || { notes: 0, qa: 0 }
      entry.qa++
      map.set(qa.pointId, entry)
    }
    return map
  }, [notesApi.notes, notesApi.qaRecords])

  const getNodeStatus = useCallback((point: IKnowledgePoint): NodeStatus => {
    if (learnedSet.has(point.id)) return "learned"
    return "available"
  }, [learnedSet])

  // 点击知识点头部，切换展开/折叠
  const handleTogglePoint = useCallback((pointId: string) => {
    if (expandedAll) {
      // 如果当前是全部展开模式，切换为只展开这一个
      setExpandedAll(false)
      setExpandedPointId(pointId)
      return
    }
    setExpandedPointId((prev) => (prev === pointId ? null : pointId))
  }, [expandedAll])

  // 点击关联知识点：切换模块（如有需要）+ 展开该知识点
  const handleRelatedClick = useCallback((rp: IKnowledgePoint) => {
    // 找到该知识点所属模块
    const mod = modules.find((m) => m.pointIds.includes(rp.id))
    if (mod && mod.id !== activeModule) {
      setActiveModule(mod.id)
    }
    setExpandedAll(false)
    setExpandedPointId(rp.id)
    // 滚动到该知识点
    setTimeout(() => {
      const el = document.getElementById(`point-${rp.id}`)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }, [modules, activeModule])

  return (
    <div className="flex flex-col gap-3">
      {/* 模块Tab栏 */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1.5">
          {modules.map((mod) => {
            const prog = moduleProgress.find((p) => p.id === mod.id)!
            const isActive = mod.id === activeModule
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "border-primary/30 bg-primary/10 text-foreground shadow-sm"
                    : "border-border bg-card text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground"
                )}
              >
                {mod.name}
                <span className={cn(
                  "ml-1.5 text-xs",
                  isActive ? "font-bold text-primary" : "text-muted-foreground"
                )}>
                  {prog.learned}/{prog.total}
                </span>
              </button>
            )
          })}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="ml-auto text-xs"
          onClick={() => {
            setExpandedAll((v) => !v)
            setExpandedPointId(null)
          }}
        >
          {expandedAll ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          {expandedAll ? "折叠全部" : "展开全部"}
        </Button>
      </div>

      {/* 模块说明 */}
      <div className="rounded-lg border border-border/60 bg-muted/40 px-4 py-3">
        <p className="text-sm text-muted-foreground">{currentModule.description}</p>
      </div>

      {/* 技能树列表 */}
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        {points.map((point, idx) => {
          const status = getNodeStatus(point)
          const counts = reflectionCounts.get(point.id)
          const totalCount = counts ? counts.notes + counts.qa : 0
          const isExpanded = expandedAll || expandedPointId === point.id

          return (
            <div
              key={point.id}
              id={`point-${point.id}`}
              className="border-b border-border/60 last:border-b-0"
            >
              {/* 知识点头部行 */}
              <div
                className="flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => handleTogglePoint(point.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleTogglePoint(point.id)
                  }
                }}
              >
                <span className="w-5 shrink-0 text-center font-mono text-xs text-muted-foreground/60">
                  {idx + 1}
                </span>

                <span
                  className={cn(
                    "h-2.5 w-2.5 shrink-0 rounded-full border-2 transition-all",
                    status === "learned" && "border-success bg-success",
                    status === "available" && "border-primary/40 bg-primary/15",
                  )}
                />

                <span className={cn(
                  "flex-1 text-sm font-medium",
                  status === "learned" ? "text-foreground" : "text-foreground"
                )}>
                  {point.name}
                </span>

                {totalCount > 0 && (
                  <span
                    className="flex shrink-0 items-center gap-1 rounded border border-primary bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary"
                    title={counts ? `${counts.qa} 条问答，${counts.notes} 条笔记` : ""}
                  >
                    <Lightbulb className="h-3 w-3" />
                    {totalCount}
                  </span>
                )}

                {/* 状态文字 */}
                <span className="shrink-0 text-xs">
                  {status === "learned" && <span className="text-success-text">已掌握</span>}
                  {status === "available" && !isExpanded && <span className="text-primary">点击展开</span>}
                </span>

                {/* 展开/折叠箭头 */}
                <span className="shrink-0 text-muted-foreground">
                  {isExpanded
                    ? <ChevronUp className="h-4 w-4" />
                    : <ChevronDown className="h-4 w-4" />
                  }
                </span>
              </div>

              {/* 就地展开的详情内容 */}
              {isExpanded && (
                <InlinePointDetail
                  point={point}
                  status={status}
                  onLearn={onLearn}
                  onRelatedClick={handleRelatedClick}
                  notesApi={notesApi}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

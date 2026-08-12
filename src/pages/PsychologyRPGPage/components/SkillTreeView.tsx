import { useState, useMemo, useCallback, useRef } from "react"
import { ChevronDown, ChevronRight, Lightbulb, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { SKILL_MODULES, getPointsByModule, getPointById } from "@/data/knowledgePoints"
import type { IKnowledgePoint, IQARecord, IKnowledgeNote, NodeStatus } from "@/types"
import { InlinePointDetail } from "./InlinePointDetail"
import { DomainArchitectureView } from "./DomainArchitectureView"
import { KnowledgeNetworkGraph } from "./KnowledgeNetworkGraph"
import { cn } from "@/lib/utils"

interface SkillTreeViewProps {
  learnedPoints: string[]
  onLearn: (pointId: string) => void
  subdomainId: string
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

export function SkillTreeView({ learnedPoints, onLearn, notesApi, subdomainId }: SkillTreeViewProps) {
  // 按子领域过滤模块
  const modules = useMemo(() => SKILL_MODULES.filter(m => m.subdomain === subdomainId), [subdomainId])

  // 展开的模块集合（默认展开第一个模块）
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(modules[0] ? [modules[0].id] : [])
  )

  // 弹窗中当前查看的知识点
  const [selectedPoint, setSelectedPoint] = useState<IKnowledgePoint | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  // 模块引用（用于架构图点击模块时滚动定位）
  const moduleRefs = useRef<Record<string, HTMLDivElement | null>>({})

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
      return { id: mod.id, name: mod.name, learned: learnedInModule, total: modPoints.length, points: modPoints }
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

  // 切换模块展开/折叠
  const toggleModule = useCallback((moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev)
      if (next.has(moduleId)) {
        next.delete(moduleId)
      } else {
        next.add(moduleId)
      }
      return next
    })
  }, [])

  // 打开知识点弹窗
  const openPointModal = useCallback((point: IKnowledgePoint) => {
    setSelectedPoint(point)
    setModalOpen(true)
  }, [])

  // 通过 ID 打开知识点弹窗（用于网络图点击）
  const openPointModalById = useCallback((pointId: string) => {
    const point = getPointById(pointId)
    if (point) {
      // 确保所属模块已展开
      const mod = modules.find((m) => m.pointIds.includes(pointId))
      if (mod) {
        setExpandedModules((prev) => new Set(prev).add(mod.id))
      }
      openPointModal(point)
    }
  }, [modules, openPointModal])

  // 架构图点击模块：展开并滚动定位
  const handleModuleClickFromArch = useCallback((modId: string) => {
    setExpandedModules((prev) => new Set(prev).add(modId))
    setTimeout(() => {
      moduleRefs.current[modId]?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }, [])

  // 弹窗中点击关联知识点：切换到新知识点
  const handleRelatedClick = useCallback((rp: IKnowledgePoint) => {
    const mod = modules.find((m) => m.pointIds.includes(rp.id))
    if (mod) {
      setExpandedModules((prev) => new Set(prev).add(mod.id))
    }
    setSelectedPoint(rp)
  }, [modules])

  // 弹窗中学习知识点后，保持弹窗打开但更新状态
  const handleLearn = useCallback((pointId: string) => {
    onLearn(pointId)
  }, [onLearn])

  return (
    <div className="flex flex-col gap-3">
      {/* 学科架构图 */}
      <DomainArchitectureView
        subdomainId={subdomainId}
        learnedPoints={learnedPoints}
        onModuleClick={handleModuleClickFromArch}
      />

      {/* 知识点关联网络图（仅社会心理学展示） */}
      {subdomainId === "social-psychology" && (
        <KnowledgeNetworkGraph
          learnedPoints={learnedPoints}
          onNodeClick={openPointModalById}
        />
      )}

      {/* 层级树：模块 → 知识点 */}
      <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
        {/* 全部展开/折叠按钮 */}
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
          <span className="text-sm font-medium text-foreground">技能树</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={() => {
              const allIds = modules.map((m) => m.id)
              const allExpanded = allIds.every((id) => expandedModules.has(id))
              setExpandedModules(allExpanded ? new Set() : new Set(allIds))
            }}
          >
            {modules.every((m) => expandedModules.has(m.id)) ? "折叠全部" : "展开全部"}
          </Button>
        </div>

        {/* 模块列表 */}
        <div className="divide-y divide-border/60">
          {moduleProgress.map((mod) => {
            const isExpanded = expandedModules.has(mod.id)
            const isComplete = mod.total > 0 && mod.learned === mod.total

            return (
              <div key={mod.id} ref={(el) => { moduleRefs.current[mod.id] = el }}>
                {/* 模块头部行 */}
                <div
                  className="flex items-center gap-2.5 px-4 py-3 cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={() => toggleModule(mod.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      toggleModule(mod.id)
                    }
                  }}
                >
                  {/* 展开/折叠箭头 */}
                  {isExpanded
                    ? <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                    : <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  }

                  {/* 模块图标 */}
                  <span className="shrink-0 text-base">
                    {modules.find((m) => m.id === mod.id)?.icon || "📚"}
                  </span>

                  {/* 模块名 */}
                  <span className={cn(
                    "flex-1 text-sm font-medium",
                    isComplete ? "text-success-text" : "text-foreground"
                  )}>
                    {mod.name}
                  </span>

                  {/* 进度 */}
                  <span className={cn(
                    "shrink-0 text-xs font-bold",
                    isComplete ? "text-success" : "text-muted-foreground"
                  )}>
                    {mod.learned}/{mod.total}
                  </span>

                  {/* 完成标记 */}
                  {isComplete && (
                    <Check className="h-3.5 w-3.5 shrink-0 text-success" />
                  )}
                </div>

                {/* 知识点列表（子节点） */}
                {isExpanded && (
                  <div className="bg-muted/10">
                    {mod.points.map((point, idx) => {
                      const status = getNodeStatus(point)
                      const counts = reflectionCounts.get(point.id)
                      const totalCount = counts ? counts.notes + counts.qa : 0

                      return (
                        <div
                          key={point.id}
                          className="flex items-center gap-2.5 pl-10 pr-4 py-2.5 cursor-pointer hover:bg-primary/5 transition-colors"
                          onClick={() => openPointModal(point)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault()
                              openPointModal(point)
                            }
                          }}
                        >
                          {/* 连线 + 编号 */}
                          <span className="shrink-0 font-mono text-xs text-muted-foreground/50">
                            {idx + 1}.
                          </span>

                          {/* 状态指示点 */}
                          <span
                            className={cn(
                              "h-2 w-2 shrink-0 rounded-full border-2 transition-all",
                              status === "learned" && "border-success bg-success",
                              status === "available" && "border-primary/40 bg-primary/15",
                            )}
                          />

                          {/* 知识点名 */}
                          <span className={cn(
                            "flex-1 text-sm",
                            status === "learned" ? "text-foreground/80" : "text-foreground"
                          )}>
                            {point.name}
                          </span>

                          {/* 知识点图标 */}
                          <span className="shrink-0 text-sm">
                            {point.icon}
                          </span>

                          {/* 笔记/问答计数 */}
                          {totalCount > 0 && (
                            <span
                              className="flex shrink-0 items-center gap-1 rounded border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary"
                              title={counts ? `${counts.qa} 条问答，${counts.notes} 条笔记` : ""}
                            >
                              <Lightbulb className="h-2.5 w-2.5" />
                              {totalCount}
                            </span>
                          )}

                          {/* 状态文字 */}
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {status === "learned" ? "已掌握" : "点击查看"}
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

      {/* 知识点详情弹窗 */}
      <Dialog open={modalOpen} onOpenChange={(open) => {
        setModalOpen(open)
        if (!open) setSelectedPoint(null)
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col gap-0 p-0">
          {selectedPoint && (
            <>
              {/* 弹窗头部 */}
              <DialogHeader className="px-5 pt-5 pb-3 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{selectedPoint.icon}</span>
                  <DialogTitle className="text-lg">
                    {selectedPoint.name}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-xs">
                  {selectedPoint.moduleName}
                  <span className="ml-2 text-muted-foreground/60">
                    {getNodeStatus(selectedPoint) === "learned" ? "· 已掌握" : "· 未学习"}
                  </span>
                </DialogDescription>
              </DialogHeader>

              {/* 弹窗内容（可滚动） */}
              <div className="overflow-y-auto flex-1 max-h-[calc(90vh-100px)]">
                <InlinePointDetail
                  point={selectedPoint}
                  status={getNodeStatus(selectedPoint)}
                  onLearn={handleLearn}
                  onRelatedClick={handleRelatedClick}
                  notesApi={notesApi}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

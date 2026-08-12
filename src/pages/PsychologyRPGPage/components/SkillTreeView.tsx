import { useState, useMemo, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { getPointById } from "@/data/knowledgePoints"
import type { IKnowledgePoint, IQARecord, IKnowledgeNote, NodeStatus } from "@/types"
import { InlinePointDetail } from "./InlinePointDetail"
import { DomainArchitectureView } from "./DomainArchitectureView"
import { KnowledgeNetworkGraph } from "./KnowledgeNetworkGraph"

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
  // 弹窗中当前查看的知识点
  const [selectedPoint, setSelectedPoint] = useState<IKnowledgePoint | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const learnedSet = useMemo(() => new Set(learnedPoints), [learnedPoints])

  const getNodeStatus = useCallback((point: IKnowledgePoint): NodeStatus => {
    if (learnedSet.has(point.id)) return "learned"
    return "available"
  }, [learnedSet])

  // 打开知识点弹窗
  const openPointModal = useCallback((point: IKnowledgePoint) => {
    setSelectedPoint(point)
    setModalOpen(true)
  }, [])

  // 通过 ID 打开知识点弹窗（用于网络图点击）
  const openPointModalById = useCallback((pointId: string) => {
    const point = getPointById(pointId)
    if (point) {
      openPointModal(point)
    }
  }, [openPointModal])

  // 弹窗中点击关联知识点：切换到新知识点
  const handleRelatedClick = useCallback((rp: IKnowledgePoint) => {
    setSelectedPoint(rp)
  }, [])

  // 弹窗中学习知识点
  const handleLearn = useCallback((pointId: string) => {
    onLearn(pointId)
  }, [onLearn])

  return (
    <>
      {/* 学科架构图（含模块+知识点） */}
      <DomainArchitectureView
        subdomainId={subdomainId}
        learnedPoints={learnedPoints}
        onPointClick={openPointModal}
      />

      {/* 知识点关联网络图（仅社会心理学展示） */}
      {subdomainId === "social-psychology" && (
        <KnowledgeNetworkGraph
          learnedPoints={learnedPoints}
          onNodeClick={openPointModalById}
        />
      )}

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
    </>
  )
}

import { useState, memo, useMemo } from "react"
import { Plus, Trash2, Link2, Check, Lightbulb, Sparkles, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPointById } from "@/data/knowledgePoints"
import type { IKnowledgePoint, IQARecord, IKnowledgeNote, NodeStatus } from "@/types"
import { cn } from "@/lib/utils"

interface InlinePointDetailProps {
  point: IKnowledgePoint
  status: NodeStatus
  onLearn: (pointId: string) => void
  onRelatedClick: (point: IKnowledgePoint) => void
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

/**
 * 智能文本格式化：
 * 将知识点文本中的编号模式（1) 2) ① ② 等）和分号分隔的要点拆分为多行显示
 */
function FormattedText({ text, className }: { text: string; className?: string }) {
  const lines = useMemo(() => {
    // 统一处理换行符
    let normalized = text.replace(/\\n/g, "\n")

    // 在编号模式前插入换行: "1)" "2)" "①" "②" "1." "2." 等
    normalized = normalized.replace(/(?<!^)\s*(?=\d+[).、])/g, "\n")
    normalized = normalized.replace(/(?<!^)\s*(?=[①②③④⑤⑥⑦⑧⑨⑩])/g, "\n")

    // 在中文分号后插入换行（如果后面还有内容）
    normalized = normalized.replace(/；(?=\S)/g, "；\n")

    return normalized.split("\n").map((l) => l.trim()).filter(Boolean)
  }, [text])

  if (lines.length <= 1) {
    return <p className={cn("text-sm leading-relaxed text-foreground", className)}>{text}</p>
  }

  return (
    <div className={cn("space-y-1.5", className)}>
      {lines.map((line, idx) => (
        <p key={idx} className="text-sm leading-relaxed text-foreground">
          {line}
        </p>
      ))}
    </div>
  )
}

export const InlinePointDetail = memo(function InlinePointDetail({
  point,
  status,
  onLearn,
  onRelatedClick,
  notesApi,
}: InlinePointDetailProps) {
  const [noteText, setNoteText] = useState("")
  const [qaQuestion, setQaQuestion] = useState("")
  const [qaAnswer, setQaAnswer] = useState("")
  const [addMode, setAddMode] = useState<"none" | "note" | "qa">("none")

  const relatedPoints = useMemo(
    () => point.relatedPoints.map((id) => getPointById(id)).filter(Boolean) as IKnowledgePoint[],
    [point]
  )

  const notes = useMemo(
    () => notesApi.getNotesByPoint(point.id),
    [point.id, notesApi]
  )
  const qaRecords = useMemo(
    () => notesApi.getQAByPoint(point.id),
    [point.id, notesApi]
  )
  const totalReflections = notes.length + qaRecords.length

  const allReflections = useMemo(() => {
    type ReflectionEntry =
      | { type: "qa"; data: IQARecord }
      | { type: "note"; data: IKnowledgeNote }
    const combined: ReflectionEntry[] = [
      ...qaRecords.map((data) => ({ type: "qa" as const, data })),
      ...notes.map((data) => ({ type: "note" as const, data })),
    ]
    return combined.sort((a, b) => b.data.createdAt - a.data.createdAt)
  }, [qaRecords, notes])

  function handleAddNote() {
    if (!noteText.trim()) return
    notesApi.addNote(point.id, noteText)
    setNoteText("")
    setAddMode("none")
  }

  function handleAddQA() {
    if (!qaQuestion.trim() || !qaAnswer.trim()) return
    notesApi.addQARecord(point.id, point.name, qaQuestion, qaAnswer)
    setQaQuestion("")
    setQaAnswer("")
    setAddMode("none")
  }

  return (
    <div className="border-t border-border bg-muted/30 px-4 py-4">
      <div className="space-y-5">
        {/* 费曼法总结（置顶，精简概括） */}
        {point.feynmanSummary && (
          <div className="rounded-lg border border-accent/30 bg-accent/5 p-3.5">
            <div className="mb-2 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-bold tracking-wide text-accent">费曼法 · 一句话理解</h3>
            </div>
            <p className="text-sm leading-relaxed text-foreground/90">
              {point.feynmanSummary}
            </p>
          </div>
        )}

        {/* 定义 */}
        <DetailSection title="定义" accentColor="primary">
          <FormattedText text={point.definition} />
        </DetailSection>

        {/* 核心逻辑 */}
        <DetailSection title="核心逻辑" accentColor="accent">
          <FormattedText text={point.coreLogic} />
        </DetailSection>

        {/* 生活案例 */}
        <DetailSection title="生活案例" accentColor="success">
          <FormattedText text={point.lifeCase} />
        </DetailSection>

        {/* 实操用法 */}
        <DetailSection title="实操用法" accentColor="warning">
          <FormattedText text={point.practice} />
        </DetailSection>

        {/* 适用边界 */}
        {point.boundaries && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3.5">
            <div className="mb-2 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4 text-destructive" />
              <h3 className="text-sm font-bold tracking-wide text-destructive">适用边界</h3>
            </div>
            <FormattedText text={point.boundaries} />
          </div>
        )}

        {/* 关联知识点 */}
        {relatedPoints.length > 0 && (
          <DetailSection title="关联知识点" icon={<Link2 className="h-3.5 w-3.5" />}>
            <div className="flex flex-wrap gap-2">
              {relatedPoints.map((rp) => (
                <button
                  key={rp.id}
                  onClick={() => onRelatedClick(rp)}
                  className="rounded border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-foreground"
                >
                  {rp.name}
                  <span className="ml-1 text-muted-foreground">→</span>
                </button>
              ))}
            </div>
          </DetailSection>
        )}

        {/* 学习思考 */}
        <DetailSection
          title={`学习思考${totalReflections > 0 ? ` (${totalReflections})` : ""}`}
          icon={<Lightbulb className="h-3.5 w-3.5" />}
          action={
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => setAddMode(addMode === "qa" ? "none" : "qa")}
              >
                <Plus className="h-3 w-3" />
                问答
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => setAddMode(addMode === "note" ? "none" : "note")}
              >
                <Plus className="h-3 w-3" />
                笔记
              </Button>
            </div>
          }
        >
          {/* 添加问答 */}
          {addMode === "qa" && (
            <div className="mb-3 space-y-2 rounded border border-primary bg-primary/5 p-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">问题</label>
                <textarea
                  value={qaQuestion}
                  onChange={(e) => setQaQuestion(e.target.value)}
                  placeholder="你在学习这个知识点时提出的问题..."
                  rows={2}
                  autoFocus
                  className="w-full resize-none rounded border border-border bg-card p-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">答案</label>
                <textarea
                  value={qaAnswer}
                  onChange={(e) => setQaAnswer(e.target.value)}
                  placeholder="探讨后整理的答案..."
                  rows={3}
                  className="w-full resize-none rounded border border-border bg-card p-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => { setAddMode("none"); setQaQuestion(""); setQaAnswer("") }}>
                  取消
                </Button>
                <Button size="sm" onClick={handleAddQA} disabled={!qaQuestion.trim() || !qaAnswer.trim()}>
                  保存问答
                </Button>
              </div>
            </div>
          )}

          {/* 添加笔记 */}
          {addMode === "note" && (
            <div className="mb-3 space-y-2 rounded border border-accent bg-accent/5 p-3">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="记录你的理解、补充案例或个人见解..."
                rows={3}
                autoFocus
                className="w-full resize-none rounded border border-border bg-card p-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => { setAddMode("none"); setNoteText("") }}>
                  取消
                </Button>
                <Button size="sm" onClick={handleAddNote} disabled={!noteText.trim()}>
                  保存笔记
                </Button>
              </div>
            </div>
          )}

          {/* 记录列表 */}
          {totalReflections === 0 && addMode === "none" ? (
            <p className="text-xs text-muted-foreground">
              暂无记录。可点击上方「问答」或「笔记」添加。
            </p>
          ) : (
            <div className="space-y-2">
              {allReflections.map((entry) => {
                if (entry.type === "qa") {
                  const qa = entry.data
                  return (
                    <div
                      key={qa.id}
                      className="group rounded border border-primary/30 bg-primary/5 p-3"
                    >
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">问答</span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(qa.createdAt).toLocaleString("zh-CN")}
                        </span>
                        <button
                          onClick={() => notesApi.deleteQARecord(qa.id)}
                          className="ml-auto opacity-0 transition-opacity group-hover:opacity-100"
                          aria-label="删除"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-1.5">
                          <span className="mt-0.5 shrink-0 rounded bg-primary/20 px-1 text-xs font-bold text-primary">Q</span>
                          <p className="flex-1 text-sm font-medium leading-relaxed text-foreground">
                            {qa.question}
                          </p>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span className="mt-0.5 shrink-0 rounded bg-accent/20 px-1 text-xs font-bold text-accent">A</span>
                          <p className="flex-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                            {qa.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                } else {
                  const note = entry.data
                  return (
                    <div
                      key={note.id}
                      className="group rounded border border-border bg-card p-3"
                    >
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent">笔记</span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(note.createdAt).toLocaleString("zh-CN")}
                        </span>
                        <button
                          onClick={() => notesApi.deleteNote(note.id)}
                          className="ml-auto opacity-0 transition-opacity group-hover:opacity-100"
                          aria-label="删除"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                        {note.content}
                      </p>
                    </div>
                  )
                }
              })}
            </div>
          )}
        </DetailSection>

        {/* 底部操作 */}
        <div className="border-t border-border pt-3">
          {status === "learned" ? (
            <div className="flex items-center justify-center gap-1.5 text-sm text-success-text">
              <Check className="h-4 w-4" />
              <span>已掌握此知识点</span>
            </div>
          ) : (
            <Button
              className="w-full"
              onClick={() => onLearn(point.id)}
            >
              我已学会 · +50 EXP
            </Button>
          )}
        </div>
      </div>
    </div>
  )
})

/** 各区块标题的颜色映射 */
const ACCENT_STYLES: Record<string, { text: string; bar: string }> = {
  primary: { text: "text-primary", bar: "bg-primary" },
  accent: { text: "text-accent", bar: "bg-accent" },
  success: { text: "text-success-text", bar: "bg-success" },
  warning: { text: "text-warning-text", bar: "bg-warning" },
}

function DetailSection({
  title,
  icon,
  action,
  accentColor = "primary",
  children,
}: {
  title: string
  icon?: React.ReactNode
  action?: React.ReactNode
  accentColor?: keyof typeof ACCENT_STYLES
  children: React.ReactNode
}) {
  const styles = ACCENT_STYLES[accentColor] || ACCENT_STYLES.primary
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className={cn("flex items-center gap-1.5 text-sm font-bold tracking-wide", styles.text)}>
          <span className={cn("h-3.5 w-1 rounded-full", styles.bar)} />
          {icon}
          {title}
        </h3>
        {action}
      </div>
      {children}
    </div>
  )
}

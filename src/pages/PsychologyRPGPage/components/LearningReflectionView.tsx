import { useState, useMemo, useRef, useCallback } from "react"
import { Lightbulb, Trash2, Search, BookOpen, Download, Upload, Copy, Check } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SKILL_MODULES, getPointById } from "@/data/knowledgePoints"
import type { IQARecord, IKnowledgeNote } from "@/types"

interface LearningReflectionViewProps {
  qaRecords: IQARecord[]
  notes: IKnowledgeNote[]
  onDeleteQA: (id: string) => void
  onDeleteNote: (id: string) => void
  onImportQA?: (records: IQARecord[]) => void
  onImportNotes?: (notes: IKnowledgeNote[]) => void
}

type ReflectionEntry =
  | { type: "qa"; data: IQARecord }
  | { type: "note"; data: IKnowledgeNote }

export function LearningReflectionView({
  qaRecords,
  notes,
  onDeleteQA,
  onDeleteNote,
  onImportQA,
  onImportNotes,
}: LearningReflectionViewProps) {
  const [searchText, setSearchText] = useState("")
  const [filterModule, setFilterModule] = useState<string>("all")
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  /** 导出全部记录为JSON文件 */
  const handleExport = useCallback(() => {
    const data = {
      exportDate: new Date().toISOString(),
      version: "1.0",
      qaRecords,
      notes,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `学习思考记录_${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [qaRecords, notes])

  /** 复制全部问答为纯文本（方便在聊天中分享） */
  const handleCopyText = useCallback(() => {
    const lines: string[] = []
    lines.push("=== 学习思考记录 ===")
    lines.push(`导出时间: ${new Date().toLocaleString("zh-CN")}`)
    lines.push(`笔记 ${qaRecords.length + notes.length} 条`)
    lines.push("")
    for (const qa of qaRecords) {
      lines.push(`\n【${qa.pointName}】`)
      lines.push(`Q: ${qa.question}`)
      lines.push(`A: ${qa.answer}`)
    }
    for (const note of notes) {
      const point = getPointById(note.pointId)
      lines.push(`\n【${point?.name || "未知知识点"}】`)
      lines.push(note.content)
    }
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [qaRecords, notes])

  /** 导入JSON文件 */
  const handleImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string)
        if (data.qaRecords && Array.isArray(data.qaRecords) && onImportQA) {
          onImportQA(data.qaRecords)
        }
        if (data.notes && Array.isArray(data.notes) && onImportNotes) {
          onImportNotes(data.notes)
        }
        alert(`导入成功：${(data.qaRecords?.length || 0) + (data.notes?.length || 0)} 条笔记`)
      } catch {
        alert("导入失败：文件格式不正确")
      }
    }
    reader.readAsText(file)
    e.target.value = ""
  }, [onImportQA, onImportNotes])

  // 合并所有记录，按时间倒序
  const allEntries: ReflectionEntry[] = useMemo(() => {
    const combined: ReflectionEntry[] = [
      ...qaRecords.map((data) => ({ type: "qa" as const, data })),
      ...notes.map((data) => ({ type: "note" as const, data })),
    ]
    return combined.sort((a, b) => b.data.createdAt - a.data.createdAt)
  }, [qaRecords, notes])

  // 获取知识点所属模块
  function getModuleByPointId(pointId: string): string {
    const point = getPointById(pointId)
    return point?.module || "unknown"
  }

  // 获取知识点名
  function getPointName(entry: ReflectionEntry): string {
    if (entry.type === "qa") return entry.data.pointName
    const point = getPointById(entry.data.pointId)
    return point?.name || "未知知识点"
  }

  // 过滤后的记录
  const filteredEntries = useMemo(() => {
    let result = [...allEntries]

    if (filterModule !== "all") {
      result = result.filter((entry) => getModuleByPointId(entry.data.pointId) === filterModule)
    }

    if (searchText.trim()) {
      const lower = searchText.toLowerCase()
      result = result.filter((entry) => {
        if (entry.type === "qa") {
          return (
            entry.data.question.toLowerCase().includes(lower) ||
            entry.data.answer.toLowerCase().includes(lower) ||
            entry.data.pointName.toLowerCase().includes(lower)
          )
        } else {
          return (
            entry.data.content.toLowerCase().includes(lower) ||
            getPointName(entry).toLowerCase().includes(lower)
          )
        }
      })
    }

    return result
  }, [allEntries, filterModule, searchText])

  // 涉及的知识点
  const pointStats = useMemo(() => {
    const map = new Map<string, { pointName: string; qaCount: number; noteCount: number }>()
    for (const qa of qaRecords) {
      const existing = map.get(qa.pointId) || { pointName: qa.pointName, qaCount: 0, noteCount: 0 }
      existing.qaCount++
      map.set(qa.pointId, existing)
    }
    for (const note of notes) {
      const point = getPointById(note.pointId)
      const pointName = point?.name || "未知知识点"
      const existing = map.get(note.pointId) || { pointName, qaCount: 0, noteCount: 0 }
      existing.noteCount++
      map.set(note.pointId, existing)
    }
    return Array.from(map.entries()).map(([pointId, stats]) => ({ pointId, ...stats }))
  }, [qaRecords, notes])

  const totalQA = qaRecords.length
  const totalNotes = notes.length
  const totalAll = totalQA + totalNotes
  const hasAny = totalAll > 0

  return (
    <div className="space-y-3">
      {/* 顶部统计 + 操作 */}
      <div className="flex flex-wrap items-center gap-3 rounded border border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">笔记</span>
          <span className="text-lg font-bold text-foreground">{totalAll}</span>
          <span className="text-xs text-muted-foreground">条</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">涉及知识点</span>
          <span className="text-lg font-bold text-foreground">{pointStats.length}</span>
          <span className="text-xs text-muted-foreground">个</span>
        </div>
        {/* 导出 / 复制 / 导入 按钮 */}
        {hasAny && (
          <div className="ml-auto flex items-center gap-1.5">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1 rounded border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              title="复制全部记录为文本，方便在聊天中分享"
            >
              {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
              {copied ? "已复制" : "复制文本"}
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-1 rounded border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              title="导出为JSON文件"
            >
              <Download className="h-3 w-3" />
              导出
            </button>
          </div>
        )}
        {onImportQA && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 rounded border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              title="导入JSON文件（补充回答后的记录）"
            >
              <Upload className="h-3 w-3" />
              导入
            </button>
          </>
        )}
      </div>

      {!hasAny ? (
        <div className="rounded border border-border bg-card px-4 py-12 text-center">
          <Lightbulb className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            暂无学习思考记录
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            在技能树中打开任意知识点，点击「记笔记」即可记录学习中的理解、疑问与见解
          </p>
        </div>
      ) : (
        <>
          {/* 搜索 + 过滤 */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[200px] flex-1">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="搜索内容或知识点..."
                className="w-full rounded border border-border bg-muted py-1.5 pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="rounded border border-border bg-muted px-2.5 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              <option value="all">全部模块</option>
              {SKILL_MODULES.map((mod) => (
                <option key={mod.id} value={mod.id}>
                  {mod.name}
                </option>
              ))}
            </select>
          </div>

          {/* 学习思考列表 */}
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-2">
              {filteredEntries.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  未找到匹配的记录
                </p>
              ) : (
                filteredEntries.map((entry) => {
                  const pointName = getPointName(entry)
                  const point = getPointById(entry.data.pointId)

                  if (entry.type === "qa") {
                    const qa = entry.data
                    return (
                      <div
                        key={qa.id}
                        className="group rounded border border-primary/30 bg-primary/5 p-3 transition-colors hover:border-primary"
                      >
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {point && (
                              <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                                {point.moduleName}
                              </span>
                            )}
                            <span className="text-xs font-medium text-primary">
                              {pointName}
                            </span>
                            <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent">笔记</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {new Date(qa.createdAt).toLocaleString("zh-CN")}
                            </span>
                            <button
                              onClick={() => onDeleteQA(qa.id)}
                              className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                              aria-label="删除"
                            >
                              <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-start gap-2">
                            <span className="mt-0.5 shrink-0 rounded bg-primary/20 px-1.5 text-xs font-bold text-primary">Q</span>
                            <p className="flex-1 text-sm font-medium leading-relaxed text-foreground">
                              {qa.question}
                            </p>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="mt-0.5 shrink-0 rounded bg-accent/20 px-1.5 text-xs font-bold text-accent">A</span>
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
                        className="group rounded border border-border bg-muted p-3 transition-colors hover:border-accent"
                      >
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {point && (
                              <span className="rounded bg-background px-1.5 py-0.5 text-xs text-muted-foreground">
                                {point.moduleName}
                              </span>
                            )}
                            <span className="text-xs font-medium text-accent">
                              {pointName}
                            </span>
                            <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent">笔记</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {new Date(note.createdAt).toLocaleString("zh-CN")}
                            </span>
                            <button
                              onClick={() => onDeleteNote(note.id)}
                              className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                              aria-label="删除"
                            >
                              <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                            </button>
                          </div>
                        </div>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                          {note.content}
                        </p>
                      </div>
                    )
                  }
                })
              )}
            </div>
          </ScrollArea>

          {/* 涉及的知识点概览 */}
          {pointStats.length > 0 && (
            <div className="rounded border border-border bg-card p-3">
              <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <BookOpen className="h-3.5 w-3.5" />
                涉及知识点 ({pointStats.length})
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {pointStats.map((stat) => (
                  <span
                    key={stat.pointId}
                    className="rounded border border-border bg-muted px-2 py-1 text-xs text-muted-foreground"
                    title={`${stat.qaCount + stat.noteCount} 条笔记`}
                  >
                    {stat.pointName}
                    {(stat.qaCount + stat.noteCount) > 0 && (
                      <span className="ml-1 text-accent">{stat.qaCount + stat.noteCount}条</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

import { useState } from "react"
import { KeyRound, Puzzle, Shield, Search, Trash2, ChevronRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ABC_TEMPLATE, DISSONANCE_TEMPLATE, OBEDIENCE_TEMPLATE, BIAS_TEMPLATE } from "@/data/tools"
import { cn } from "@/lib/utils"
import type { ToolRecordsAPI } from "@/hooks/useToolRecords"
import type {
  IABCRecord,
  IDissonanceCheck,
  IObedienceDefense,
  IBiasPractice,
} from "@/types"

interface ToolboxViewProps {
  toolRecords: ToolRecordsAPI
  onToolUse: () => void
}

type ToolId = "abc" | "dissonance" | "obedience" | "bias"

const TOOLS = [
  { id: "abc" as ToolId, name: "ABC情绪记录器", icon: KeyRound, color: "hsl(220 5% 60%)" },
  { id: "dissonance" as ToolId, name: "认知失调自检清单", icon: Puzzle, color: "hsl(220 4% 50%)" },
  { id: "obedience" as ToolId, name: "服从防御三问", icon: Shield, color: "hsl(220 5% 55%)" },
  { id: "bias" as ToolId, name: "偏见觉察练习", icon: Search, color: "hsl(220 4% 45%)" },
]

export function ToolboxView({ toolRecords, onToolUse }: ToolboxViewProps) {
  const [activeTool, setActiveTool] = useState<ToolId>("abc")

  return (
    <div className="flex flex-col gap-4">
      <div className="glass-card rounded-lg p-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-accent" />
          <h3 className="font-display text-lg font-bold text-foreground">心理学工具箱</h3>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          将理论转化为实践——每个工具帮你用心理学知识解决真实问题（每日首次使用 +20 EXP）
        </p>
      </div>

      {/* 工具选择栏 */}
      <div className="flex flex-wrap gap-2">
        {TOOLS.map((tool) => {
          const isActive = activeTool === tool.id
          const Icon = tool.icon
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all",
                isActive
                  ? "border-primary/40 bg-primary/10"
                  : "border-border bg-muted/30 hover:bg-muted/50"
              )}
            >
              <Icon className="h-4 w-4" style={{ color: tool.color }} />
              <span className={isActive ? "text-primary" : "text-muted-foreground"}>{tool.name}</span>
            </button>
          )
        })}
      </div>

      {/* 工具内容 */}
      <div>
        {activeTool === "abc" && <ABCTool toolRecords={toolRecords} onToolUse={onToolUse} />}
        {activeTool === "dissonance" && <DissonanceTool toolRecords={toolRecords} onToolUse={onToolUse} />}
        {activeTool === "obedience" && <ObedienceTool toolRecords={toolRecords} onToolUse={onToolUse} />}
        {activeTool === "bias" && <BiasTool toolRecords={toolRecords} onToolUse={onToolUse} />}
      </div>
    </div>
  )
}

// ============================================================
// 通用输入框组件
// ============================================================
function TextArea({
  label,
  placeholder,
  hint,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  hint?: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-foreground">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-none rounded-lg border border-border bg-muted/20 p-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

// ============================================================
// 历史记录展示
// ============================================================
function HistorySection({
  title,
  count,
  children,
}: {
  title: string
  count: number
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-display text-sm font-semibold text-foreground">
          {title}（{count}）
        </h4>
      </div>
      {count === 0 ? (
        <p className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
          暂无记录，开始你的第一次练习吧
        </p>
      ) : (
        <ScrollArea className="max-h-64">
          <div className="space-y-2">{children}</div>
        </ScrollArea>
      )}
    </div>
  )
}

function RecordCard({
  onDelete,
  children,
}: {
  onDelete: () => void
  children: React.ReactNode
}) {
  return (
    <Card className="group relative p-3">
      <button
        onClick={onDelete}
        className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="删除记录"
      >
        <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
      </button>
      {children}
    </Card>
  )
}

function formatDate(ts: number): string {
  const d = new Date(ts)
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
}

// ============================================================
// ABC情绪记录器
// ============================================================
function ABCTool({ toolRecords, onToolUse }: { toolRecords: ToolRecordsAPI; onToolUse: () => void }) {
  const [event, setEvent] = useState("")
  const [belief, setBelief] = useState("")
  const [consequence, setConsequence] = useState("")
  const [showChallenge, setShowChallenge] = useState(false)

  const handleSave = () => {
    if (!event.trim() || !belief.trim() || !consequence.trim()) return
    toolRecords.addABCRecord({ event, belief, consequence })
    onToolUse()
    setEvent("")
    setBelief("")
    setConsequence("")
    setShowChallenge(false)
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-2xl">{ABC_TEMPLATE.icon}</span>
          <div>
            <h4 className="font-display font-bold text-foreground">{ABC_TEMPLATE.name}</h4>
            <p className="text-xs text-muted-foreground">{ABC_TEMPLATE.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          {ABC_TEMPLATE.fields.map((field) => (
            <TextArea
              key={field.key}
              label={field.label}
              placeholder={field.placeholder}
              hint={field.hint}
              value={field.key === "event" ? event : field.key === "belief" ? belief : consequence}
              onChange={(v) => {
                if (field.key === "event") setEvent(v)
                else if (field.key === "belief") setBelief(v)
                else setConsequence(v)
              }}
            />
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <Button onClick={handleSave} disabled={!event.trim() || !belief.trim() || !consequence.trim()}>
            保存记录 +20 EXP
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowChallenge((v) => !v)}
            disabled={!belief.trim()}
          >
            挑战信念B
          </Button>
        </div>

        {showChallenge && (
          <div className="mt-4">
            <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
              <p className="mb-2 text-xs font-semibold text-accent">挑战你的非理性信念</p>
              {ABC_TEMPLATE.challengeQuestions.map((q, idx) => (
                <p key={idx} className="mb-1 text-xs text-muted-foreground">
                  {idx + 1}. {q}
                </p>
              ))}
            </div>
          </div>
        )}
      </Card>

      <div>
        <HistorySection title="历史记录" count={toolRecords.records.abcRecords.length}>
          {toolRecords.records.abcRecords.map((rec: IABCRecord) => (
            <RecordCard key={rec.id} onDelete={() => toolRecords.deleteABCRecord(rec.id)}>
              <p className="mb-1 text-xs text-muted-foreground">{formatDate(rec.createdAt)}</p>
              <div className="space-y-1 text-xs">
                <p><span className="font-semibold text-primary">A:</span> {rec.event}</p>
                <p><span className="font-semibold text-accent">B:</span> {rec.belief}</p>
                <p><span className="font-semibold text-warning-text">C:</span> {rec.consequence}</p>
              </div>
            </RecordCard>
          ))}
        </HistorySection>
      </div>
    </div>
  )
}

// ============================================================
// 认知失调自检清单
// ============================================================
function DissonanceTool({ toolRecords, onToolUse }: { toolRecords: ToolRecordsAPI; onToolUse: () => void }) {
  const [behavior, setBehavior] = useState("")
  const [belief, setBelief] = useState("")
  const [conflict, setConflict] = useState("")
  const [strategy, setStrategy] = useState("")

  const handleSave = () => {
    if (!behavior.trim() || !belief.trim() || !conflict.trim() || !strategy) return
    toolRecords.addDissonanceCheck({ behavior, belief, conflict, strategy })
    onToolUse()
    setBehavior("")
    setBelief("")
    setConflict("")
    setStrategy("")
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-2xl">{DISSONANCE_TEMPLATE.icon}</span>
          <div>
            <h4 className="font-display font-bold text-foreground">{DISSONANCE_TEMPLATE.name}</h4>
            <p className="text-xs text-muted-foreground">{DISSONANCE_TEMPLATE.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          {DISSONANCE_TEMPLATE.steps.map((step) => (
            <TextArea
              key={step.key}
              label={step.label}
              placeholder={step.placeholder}
              hint={step.hint}
              value={step.key === "behavior" ? behavior : step.key === "belief" ? belief : conflict}
              onChange={(v) => {
                if (step.key === "behavior") setBehavior(v)
                else if (step.key === "belief") setBelief(v)
                else setConflict(v)
              }}
            />
          ))}

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">选择消除策略</label>
            <div className="grid gap-2 sm:grid-cols-2">
              {DISSONANCE_TEMPLATE.strategies.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStrategy(s.value)}
                  className={cn(
                    "rounded-lg border p-3 text-left transition-all",
                    strategy === s.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-accent/40 hover:bg-muted/30"
                  )}
                >
                  <p className="text-sm font-medium text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                  <p className="mt-1 text-xs text-accent">{s.example}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button
          className="mt-4"
          onClick={handleSave}
          disabled={!behavior.trim() || !belief.trim() || !conflict.trim() || !strategy}
        >
          保存记录 +20 EXP
        </Button>
      </Card>

      <div>
        <HistorySection title="历史记录" count={toolRecords.records.dissonanceChecks.length}>
          {toolRecords.records.dissonanceChecks.map((rec: IDissonanceCheck) => {
            const strat = DISSONANCE_TEMPLATE.strategies.find((s) => s.value === rec.strategy)
            return (
              <RecordCard key={rec.id} onDelete={() => toolRecords.deleteDissonanceCheck(rec.id)}>
                <p className="mb-1 text-xs text-muted-foreground">{formatDate(rec.createdAt)}</p>
                <div className="space-y-1 text-xs">
                  <p><span className="font-semibold text-primary">行为:</span> {rec.behavior}</p>
                  <p><span className="font-semibold text-accent">信念:</span> {rec.belief}</p>
                  <p><span className="font-semibold text-warning-text">冲突:</span> {rec.conflict}</p>
                  <Badge variant="secondary" className="mt-1">{strat?.label ?? rec.strategy}</Badge>
                </div>
              </RecordCard>
            )
          })}
        </HistorySection>
      </div>
    </div>
  )
}

// ============================================================
// 服从防御三问
// ============================================================
function ObedienceTool({ toolRecords, onToolUse }: { toolRecords: ToolRecordsAPI; onToolUse: () => void }) {
  const [authority, setAuthority] = useState("")
  const [request, setRequest] = useState("")
  const [answers, setAnswers] = useState(["", "", ""])
  const [decision, setDecision] = useState("")

  const handleSave = () => {
    if (!authority.trim() || !request.trim() || answers.some((a) => !a.trim()) || !decision.trim()) return
    toolRecords.addObedienceDefense({
      authority,
      request,
      answers: answers as [string, string, string],
      decision,
    })
    onToolUse()
    setAuthority("")
    setRequest("")
    setAnswers(["", "", ""])
    setDecision("")
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-2xl">{OBEDIENCE_TEMPLATE.icon}</span>
          <div>
            <h4 className="font-display font-bold text-foreground">{OBEDIENCE_TEMPLATE.name}</h4>
            <p className="text-xs text-muted-foreground">{OBEDIENCE_TEMPLATE.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          {OBEDIENCE_TEMPLATE.fields.map((field) => (
            <TextArea
              key={field.key}
              label={field.label}
              placeholder={field.placeholder}
              hint={field.hint}
              value={field.key === "authority" ? authority : request}
              onChange={(v) => {
                if (field.key === "authority") setAuthority(v)
                else setRequest(v)
              }}
            />
          ))}

          <Separator />

          {OBEDIENCE_TEMPLATE.threeQuestions.map((q, idx) => (
            <TextArea
              key={idx}
              label={q.label}
              placeholder={q.placeholder}
              hint={q.hint}
              value={answers[idx]}
              onChange={(v) => {
                const next = [...answers]
                next[idx] = v
                setAnswers(next)
              }}
            />
          ))}

          <TextArea
            label="最终决定"
            placeholder="基于三问的思考，你的决定是什么？..."
            value={decision}
            onChange={setDecision}
          />
        </div>

        <Button
          className="mt-4"
          onClick={handleSave}
          disabled={!authority.trim() || !request.trim() || answers.some((a) => !a.trim()) || !decision.trim()}
        >
          保存记录 +20 EXP
        </Button>
      </Card>

      <div>
        <HistorySection title="历史记录" count={toolRecords.records.obedienceDefenses.length}>
          {toolRecords.records.obedienceDefenses.map((rec: IObedienceDefense) => (
            <RecordCard key={rec.id} onDelete={() => toolRecords.deleteObedienceDefense(rec.id)}>
              <p className="mb-1 text-xs text-muted-foreground">{formatDate(rec.createdAt)}</p>
              <div className="space-y-1 text-xs">
                <p><span className="font-semibold text-primary">权威:</span> {rec.authority}</p>
                <p><span className="font-semibold text-accent">要求:</span> {rec.request}</p>
                {rec.answers.map((ans, idx) => (
                  <p key={idx} className="text-muted-foreground">
                    <ChevronRight className="inline h-3 w-3" /> {ans}
                  </p>
                ))}
                <p><span className="font-semibold text-success-text">决定:</span> {rec.decision}</p>
              </div>
            </RecordCard>
          ))}
        </HistorySection>
      </div>
    </div>
  )
}

// ============================================================
// 偏见觉察练习
// ============================================================
function BiasTool({ toolRecords, onToolUse }: { toolRecords: ToolRecordsAPI; onToolUse: () => void }) {
  const [scenario, setScenario] = useState("")
  const [stereotype, setStereotype] = useState("")
  const [reflection, setReflection] = useState("")

  const handleSave = () => {
    if (!scenario.trim() || !stereotype.trim() || !reflection.trim()) return
    toolRecords.addBiasPractice({ scenario, stereotype, reflection })
    onToolUse()
    setScenario("")
    setStereotype("")
    setReflection("")
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-2xl">{BIAS_TEMPLATE.icon}</span>
          <div>
            <h4 className="font-display font-bold text-foreground">{BIAS_TEMPLATE.name}</h4>
            <p className="text-xs text-muted-foreground">{BIAS_TEMPLATE.description}</p>
          </div>
        </div>

        {/* 场景选择 */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-foreground">选择一个场景</label>
          <div className="space-y-1.5">
            {BIAS_TEMPLATE.scenarios.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setScenario(s)}
                className={cn(
                  "w-full rounded-lg border p-2.5 text-left text-xs transition-all",
                  scenario === s
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-accent/40 hover:bg-muted/30"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label={BIAS_TEMPLATE.fields[0].label}
            placeholder={BIAS_TEMPLATE.fields[0].placeholder}
            value={scenario}
            onChange={setScenario}
          />
          <TextArea
            label={BIAS_TEMPLATE.fields[1].label}
            placeholder={BIAS_TEMPLATE.fields[1].placeholder}
            hint={BIAS_TEMPLATE.fields[1].hint}
            value={stereotype}
            onChange={setStereotype}
          />
          <TextArea
            label={BIAS_TEMPLATE.fields[2].label}
            placeholder={BIAS_TEMPLATE.fields[2].placeholder}
            hint={BIAS_TEMPLATE.fields[2].hint}
            value={reflection}
            onChange={setReflection}
          />
        </div>

        <Button
          className="mt-4"
          onClick={handleSave}
          disabled={!scenario.trim() || !stereotype.trim() || !reflection.trim()}
        >
          保存记录 +20 EXP
        </Button>
      </Card>

      <div>
        <HistorySection title="历史记录" count={toolRecords.records.biasPractices.length}>
          {toolRecords.records.biasPractices.map((rec: IBiasPractice) => (
            <RecordCard key={rec.id} onDelete={() => toolRecords.deleteBiasPractice(rec.id)}>
              <p className="mb-1 text-xs text-muted-foreground">{formatDate(rec.createdAt)}</p>
              <div className="space-y-1 text-xs">
                <p><span className="font-semibold text-primary">场景:</span> {rec.scenario}</p>
                <p><span className="font-semibold text-warning-text">刻板印象:</span> {rec.stereotype}</p>
                <p><span className="font-semibold text-accent">觉察:</span> {rec.reflection}</p>
              </div>
            </RecordCard>
          ))}
        </HistorySection>
      </div>
    </div>
  )
}

import { useState, useCallback } from "react"
import { Swords, CheckCircle2, XCircle, ArrowLeft, RotateCcw, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { getDungeonsBySubdomain } from "@/data/dungeons"
import { getPointById } from "@/data/knowledgePoints"
import { cn } from "@/lib/utils"
import type { IDungeon } from "@/types"

interface DungeonViewProps {
  clearedDungeons: string[]
  onClear: (dungeonId: string, isFirstClear: boolean) => void
  subdomainId: string
}

type Phase = "list" | "quiz" | "result"

export function DungeonView({ clearedDungeons, onClear, subdomainId }: DungeonViewProps) {
  const dungeons = getDungeonsBySubdomain(subdomainId)
  const [activeDungeon, setActiveDungeon] = useState<IDungeon | null>(null)
  const [phase, setPhase] = useState<Phase>("list")
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)

  const enterDungeon = (dungeon: IDungeon) => {
    setActiveDungeon(dungeon)
    setPhase("quiz")
    setCurrentQ(0)
    setAnswers({})
    setSelectedOptions([])
    setShowFeedback(false)
    setScore(0)
  }

  const exitDungeon = () => {
    setActiveDungeon(null)
    setPhase("list")
  }

  const handleSelectOption = (optionKey: string) => {
    if (showFeedback) return
    const question = activeDungeon!.questions[currentQ]
    if (question.multiSelect) {
      setSelectedOptions((prev) =>
        prev.includes(optionKey) ? prev.filter((k) => k !== optionKey) : [...prev, optionKey]
      )
    } else {
      setSelectedOptions([optionKey])
    }
  }

  const handleSubmitAnswer = () => {
    if (selectedOptions.length === 0 || !activeDungeon) return
    const question = activeDungeon.questions[currentQ]
    const correctKeys = question.options.filter((o) => o.correct).map((o) => o.key)
    const isCorrect =
      selectedOptions.length === correctKeys.length &&
      selectedOptions.every((k) => correctKeys.includes(k))

    setAnswers((prev) => ({ ...prev, [question.id]: selectedOptions }))
    if (isCorrect) setScore((s) => s + 1)
    setShowFeedback(true)
  }

  const handleNextQuestion = () => {
    if (!activeDungeon) return
    if (currentQ < activeDungeon.questions.length - 1) {
      setCurrentQ((c) => c + 1)
      setSelectedOptions([])
      setShowFeedback(false)
    } else {
      // 完成所有题目
      const finalScore = score
      const isPassed = finalScore >= Math.ceil(activeDungeon.questions.length / 2)
      if (isPassed) {
        const isFirstClear = !clearedDungeons.includes(activeDungeon.id)
        onClear(activeDungeon.id, isFirstClear)
      }
      setPhase("result")
    }
  }

  // ── 副本列表 ──
  if (phase === "list" || !activeDungeon) {
    return (
      <div className="flex flex-col gap-4">
        <div className="glass-card rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Swords className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-display text-lg font-bold text-foreground">实战副本</h3>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            通过场景化答题检验知识掌握程度，通关获得经验奖励
          </p>
        </div>

        {dungeons.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <Swords className="h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">该领域的实战副本正在筹备中，敬请期待</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {dungeons.map((dungeon) => {
            const isCleared = clearedDungeons.includes(dungeon.id)
            return (
              <Card
                key={dungeon.id}
                className="group relative flex flex-col gap-3 p-5 transition-colors hover:bg-muted/20"
                style={{ borderTop: `3px solid ${dungeon.color}` }}
              >
                  {isCleared && (
                    <div className="absolute right-3 top-3">
                      <Badge variant="success">
                        <CheckCircle2 className="mr-1 h-3 w-3" /> 已通关
                      </Badge>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-lg text-3xl"
                      style={{ background: `${dungeon.color}20` }}
                    >
                      {dungeon.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-foreground">{dungeon.name}</h4>
                      <Badge
                        variant="outline"
                        className="mt-1"
                      >
                        {dungeon.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{dungeon.description}</p>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1 text-accent">
                      <Star className="h-3 w-3" />
                      {dungeon.rewardExp} EXP
                    </span>
                    {!isCleared && (
                      <span className="text-success-text">首通 +{dungeon.firstClearBonus}</span>
                    )}
                    <span className="text-muted-foreground">{dungeon.questions.length}题</span>
                  </div>

                  <Button
                    className="mt-2 w-full"
                    variant={isCleared ? "secondary" : "default"}
                    onClick={() => enterDungeon(dungeon)}
                  >
                    {isCleared ? "重新挑战" : "进入副本"}
                  </Button>
              </Card>
            )
          })}
          </div>
        )}
      </div>
    )
  }

  // ── 答题界面 ──
  if (phase === "quiz") {
    const question = activeDungeon.questions[currentQ]
    const correctKeys = question.options.filter((o) => o.correct).map((o) => o.key)
    const isCorrect =
      showFeedback &&
      selectedOptions.length === correctKeys.length &&
      selectedOptions.every((k) => correctKeys.includes(k))
    const relatedPoint = getPointById(question.relatedPointId)

    return (
      <div className="flex flex-col gap-4">
        {/* 顶部栏 */}
        <div className="glass-card flex items-center justify-between rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={exitDungeon}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h3 className="font-display font-bold text-foreground">{activeDungeon.name}</h3>
              <p className="text-xs text-muted-foreground">
                第 {currentQ + 1} / {activeDungeon.questions.length} 题
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            {activeDungeon.questions.map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  "h-2 w-8 rounded-full transition-colors",
                  idx < currentQ ? "bg-success" : idx === currentQ ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>

        {/* 题目卡片 */}
        <Card className="p-6">
          {/* 场景描述 */}
          <div className="mb-4 rounded-lg bg-muted/30 p-4">
            <p className="text-xs text-muted-foreground">场景</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/90">{question.scenario}</p>
          </div>

          {/* 问题 */}
          <div className="mb-4">
            <p className="font-display text-base font-semibold text-foreground">
              {question.question}
            </p>
            {question.multiSelect && (
              <Badge variant="secondary" className="mt-1">
                多选题
              </Badge>
            )}
          </div>

          {/* 选项 */}
          <div className="space-y-2">
            {question.options.map((option) => {
              const isSelected = selectedOptions.includes(option.key)
              const isCorrectOption = option.correct
              const showResult = showFeedback

              return (
                <button
                  key={option.key}
                  onClick={() => handleSelectOption(option.key)}
                  disabled={showFeedback}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-all",
                    !showResult && isSelected && "border-primary bg-primary/10",
                    !showResult && !isSelected && "border-border hover:border-accent/40 hover:bg-muted/30",
                    showResult && isCorrectOption && "border-success bg-success-bg/50",
                    showResult && isSelected && !isCorrectOption && "border-destructive bg-error-bg/50",
                    showResult && !isSelected && !isCorrectOption && "border-border opacity-50"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                      !showResult && isSelected && "border-primary bg-primary text-primary-foreground",
                      !showResult && !isSelected && "border-border text-muted-foreground",
                      showResult && isCorrectOption && "border-success bg-success text-white",
                      showResult && isSelected && !isCorrectOption && "border-destructive bg-destructive text-white",
                      showResult && !isSelected && !isCorrectOption && "border-border"
                    )}
                  >
                    {showResult && isCorrectOption ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : showResult && isSelected && !isCorrectOption ? (
                      <XCircle className="h-4 w-4" />
                    ) : (
                      option.key
                    )}
                  </span>
                  <span className="text-sm text-foreground/90">{option.text}</span>
                </button>
              )
            })}
          </div>

          {/* 反馈区 */}
          {showFeedback && (
            <div className="mt-4">
              <div
                className={cn(
                  "rounded-lg border p-4",
                  isCorrect ? "border-success/50 bg-success-bg/30" : "border-destructive/50 bg-error-bg/30"
                )}
              >
                <p className={cn("font-medium", isCorrect ? "text-success-text" : "text-error-text")}>
                  {isCorrect ? "✓ 回答正确！" : "✗ 回答错误"}
                </p>
                <div className="mt-2 space-y-2">
                  {question.options.map((option) => {
                    const wasSelected = selectedOptions.includes(option.key)
                    if (!wasSelected && !option.correct) return null
                    return (
                      <div key={option.key} className="text-xs text-muted-foreground">
                        <span className="font-semibold">{option.key}. </span>
                        {option.explanation}
                      </div>
                    )
                  })}
                </div>
                {relatedPoint && (
                  <p className="mt-2 text-xs text-accent">
                    关联知识点：{relatedPoint.name}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="mt-4 flex justify-end gap-2">
            {!showFeedback ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedOptions.length === 0}
              >
                确认回答
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                {currentQ < activeDungeon.questions.length - 1 ? "下一题" : "查看结果"}
              </Button>
            )}
          </div>
        </Card>
      </div>
    )
  }

  // ── 结算界面 ──
  if (phase === "result") {
    const totalQ = activeDungeon.questions.length
    const isPassed = score >= Math.ceil(totalQ / 2)
    const isFirstClear = !clearedDungeons.includes(activeDungeon.id)
    const totalReward = isPassed
      ? activeDungeon.rewardExp + (isFirstClear ? activeDungeon.firstClearBonus : 0)
      : 0

    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-muted/30"
        >
          {isPassed ? (
            <CheckCircle2 className="h-10 w-10 text-success-text" />
          ) : (
            <XCircle className="h-10 w-10 text-error-text" />
          )}
        </div>

        <div className="text-center">
          <h3 className="font-display text-2xl font-bold text-foreground">
            {isPassed ? "副本通关！" : "挑战失败"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{activeDungeon.name}</p>
        </div>

        {/* 得分 */}
        <Card className="w-full max-w-md p-6">
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">得分</p>
              <p className="font-display text-3xl font-bold text-foreground">
                {score}/{totalQ}
              </p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <p className="text-xs text-muted-foreground">经验奖励</p>
              <p className={cn("font-display text-3xl font-bold", isPassed ? "text-success-text" : "text-muted-foreground")}>
                +{totalReward}
              </p>
            </div>
          </div>
          {isPassed && isFirstClear && (
            <p className="mt-3 text-center text-xs text-success-text">
              首次通关额外 +{activeDungeon.firstClearBonus} EXP！
            </p>
          )}
        </Card>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => enterDungeon(activeDungeon)}>
            <RotateCcw className="h-4 w-4" />
            重新挑战
          </Button>
          <Button onClick={exitDungeon}>
            返回副本列表
          </Button>
        </div>
      </div>
    )
  }

  return null
}

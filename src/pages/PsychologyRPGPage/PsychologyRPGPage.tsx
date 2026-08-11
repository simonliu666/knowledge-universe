import { useState, useCallback, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { GitBranch, Trophy, Swords, Wrench, RotateCcw, ArrowLeft, Lightbulb } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { usePlayerProgress } from "@/hooks/usePlayerProgress"
import { useToolRecords } from "@/hooks/useToolRecords"
import { useKnowledgeNotes } from "@/hooks/useKnowledgeNotes"
import { SUBDOMAINS } from "@/data/knowledgePoints"
import { CharacterPanel } from "./components/CharacterPanel"
import { SkillTreeView } from "./components/SkillTreeView"
import { AchievementsView } from "./components/AchievementsView"
import { DungeonView } from "./components/DungeonView"
import { ToolboxView } from "./components/ToolboxView"
import { LearningReflectionView } from "./components/LearningReflectionView"
import { LevelUpOverlay } from "./components/LevelUpOverlay"
import { AchievementUnlockOverlay } from "./components/AchievementUnlockOverlay"
import { ExpFloatText } from "./components/ExpFloatText"

export default function PsychologyRPGPage() {
  const { subdomainId } = useParams<{ subdomainId: string }>()
  const navigate = useNavigate()
  const {
    progress,
    expGains,
    levelUpInfo,
    achievementUnlockInfo,
    learnPoint,
    clearDungeon,
    triggerToolBonus,
    triggerToolAchievement,
    dismissLevelUp,
    dismissAchievement,
    resetProgress,
  } = usePlayerProgress()

  const toolRecords = useToolRecords()
  const notesApi = useKnowledgeNotes()
  const [activeTab, setActiveTab] = useState("skill-tree")

  // 查找当前子领域信息
  const subdomainInfo = useMemo(() => {
    return SUBDOMAINS.find((s) => s.id === subdomainId)
  }, [subdomainId])

  const handleToolUse = useCallback(() => {
    triggerToolBonus()
    triggerToolAchievement()
  }, [triggerToolBonus, triggerToolAchievement])

  const handleReset = useCallback(() => {
    if (window.confirm("确定要重置所有进度吗？此操作不可撤销。")) {
      resetProgress()
      window.location.reload()
    }
  }, [resetProgress])

  const reflectionCount = useMemo(
    () => notesApi.qaRecords.length + notesApi.notes.length,
    [notesApi.qaRecords.length, notesApi.notes.length]
  )

  // 如果子领域不存在，显示错误
  if (!subdomainInfo || !subdomainId) {
    return (
      <div className="relative z-10 min-h-screen w-full">
        <div className="mx-auto max-w-5xl p-4 md:p-6">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            返回知识宇宙
          </button>
          <div className="mt-20 text-center">
            <p className="text-lg text-muted-foreground">未找到该知识领域</p>
          </div>
        </div>
      </div>
    )
  }

  // 工具箱仅社会心理学可用
  const hasToolbox = subdomainId === "social-psychology"

  return (
    <div className="relative z-10 min-h-screen w-full">
      <div className="mx-auto max-w-5xl space-y-4 p-4 md:p-6">
        {/* 返回知识宇宙 */}
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          返回知识宇宙
        </button>

        {/* 子领域标题 */}
        <div className="glass-card flex items-center gap-4 rounded-xl p-4 md:p-5">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border text-3xl"
            style={{ borderColor: `${subdomainInfo.color}40`, backgroundColor: `${subdomainInfo.color}10` }}
          >
            {subdomainInfo.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
              {subdomainInfo.name}
            </h1>
            <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
              {subdomainInfo.description}
            </p>
          </div>
        </div>

        {/* 顶部角色面板 */}
        <CharacterPanel progress={progress} />

        {/* Tab导航 + 重置按钮 */}
        <div className="flex items-center gap-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="skill-tree" className="gap-1.5">
                <GitBranch className="h-4 w-4" />
                <span className="hidden sm:inline">技能树</span>
              </TabsTrigger>
              <TabsTrigger value="achievements" className="gap-1.5">
                <Trophy className="h-4 w-4" />
                <span className="hidden sm:inline">成就</span>
              </TabsTrigger>
              <TabsTrigger value="dungeons" className="gap-1.5">
                <Swords className="h-4 w-4" />
                <span className="hidden sm:inline">实战副本</span>
              </TabsTrigger>
              {hasToolbox && (
                <TabsTrigger value="toolbox" className="gap-1.5">
                  <Wrench className="h-4 w-4" />
                  <span className="hidden sm:inline">工具箱</span>
                </TabsTrigger>
              )}
              <TabsTrigger value="reflections" className="gap-1.5">
                <Lightbulb className="h-4 w-4" />
                <span className="hidden sm:inline">学习思考</span>
                {reflectionCount > 0 && (
                  <span className="rounded bg-primary/20 px-1 text-xs font-bold text-primary">
                    {reflectionCount}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* 重置按钮 */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleReset} className="shrink-0">
                  <RotateCcw className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>重置所有进度</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* 只渲染当前激活的Tab内容 */}
        <div className="mt-4">
          {activeTab === "skill-tree" && (
            <SkillTreeView
              learnedPoints={progress.learnedPoints}
              onLearn={learnPoint}
              notesApi={notesApi}
              subdomainId={subdomainId}
            />
          )}
          {activeTab === "achievements" && (
            <AchievementsView
              unlockedAchievements={progress.unlockedAchievements}
              subdomainId={subdomainId}
            />
          )}
          {activeTab === "dungeons" && (
            <DungeonView
              clearedDungeons={progress.clearedDungeons}
              onClear={clearDungeon}
              subdomainId={subdomainId}
            />
          )}
          {activeTab === "toolbox" && hasToolbox && (
            <ToolboxView toolRecords={toolRecords} onToolUse={handleToolUse} />
          )}
          {activeTab === "reflections" && (
            <LearningReflectionView
              qaRecords={notesApi.qaRecords}
              notes={notesApi.notes}
              onDeleteQA={notesApi.deleteQARecord}
              onDeleteNote={notesApi.deleteNote}
            />
          )}
        </div>
      </div>

      {/* 全屏动画层 */}
      <LevelUpOverlay info={levelUpInfo} onDismiss={dismissLevelUp} />
      <AchievementUnlockOverlay info={achievementUnlockInfo} onDismiss={dismissAchievement} />
      <ExpFloatText gains={expGains} />
    </div>
  )
}

import { useState, useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { GitBranch, Trophy, Swords, Wrench, RotateCcw, ArrowLeft, Lightbulb } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { usePlayerProgress } from "@/hooks/usePlayerProgress"
import { useToolRecords } from "@/hooks/useToolRecords"
import { useKnowledgeNotes } from "@/hooks/useKnowledgeNotes"
import { CharacterPanel } from "./components/CharacterPanel"
import { SkillTreeView } from "./components/SkillTreeView"
import { AchievementsView } from "./components/AchievementsView"
import { DungeonView } from "./components/DungeonView"
import { ToolboxView } from "./components/ToolboxView"
import { LearningReflectionView } from "./components/LearningReflectionView"
import { LevelUpOverlay } from "./components/LevelUpOverlay"
import { AchievementUnlockOverlay } from "./components/AchievementUnlockOverlay"
import { ExpFloatText } from "./components/ExpFloatText"

interface PsychologyRPGPageProps {
  domainId: string
}

export default function PsychologyRPGPage({ domainId }: PsychologyRPGPageProps) {
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
              <TabsTrigger value="toolbox" className="gap-1.5">
                <Wrench className="h-4 w-4" />
                <span className="hidden sm:inline">工具箱</span>
              </TabsTrigger>
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

        {/* 只渲染当前激活的Tab内容，避免同时挂载所有Tab */}
        <div className="mt-4">
          {activeTab === "skill-tree" && (
            <SkillTreeView
              learnedPoints={progress.learnedPoints}
              onLearn={learnPoint}
              notesApi={notesApi}
              domainId={domainId}
            />
          )}
          {activeTab === "achievements" && (
            <AchievementsView unlockedAchievements={progress.unlockedAchievements} />
          )}
          {activeTab === "dungeons" && (
            <DungeonView clearedDungeons={progress.clearedDungeons} onClear={clearDungeon} />
          )}
          {activeTab === "toolbox" && (
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

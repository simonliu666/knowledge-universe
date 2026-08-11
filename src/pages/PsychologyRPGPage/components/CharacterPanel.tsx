import { BookOpen, Trophy, Swords } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { getLevelProgress } from "@/data/levels"
import { TOTAL_POINTS } from "@/data/knowledgePoints"
import { TOTAL_ACHIEVEMENTS } from "@/data/achievements"
import { TOTAL_DUNGEONS } from "@/data/dungeons"
import type { IPlayerProgress } from "@/types"

interface CharacterPanelProps {
  progress: IPlayerProgress
  subdomainId?: string
}

export function CharacterPanel({ progress, subdomainId }: CharacterPanelProps) {
  const levelInfo = getLevelProgress(progress.exp, subdomainId)

  return (
    <header className="glass-card relative overflow-hidden rounded-xl p-5 md:p-6">
      {/* 背景装饰 */}
      <div className="absolute right-0 top-0 h-40 w-40 -translate-y-12 translate-x-12 rounded-full bg-primary/6 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-24 w-24 translate-y-8 rounded-full bg-accent/5 blur-2xl" />

      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
        {/* 等级徽章 */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 shadow-sm">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold leading-none text-primary">{levelInfo.level}</span>
              <span className="mt-0.5 text-[9px] font-semibold tracking-widest text-muted-foreground">LV</span>
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-foreground">
              {levelInfo.title}
            </h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {levelInfo.isMaxLevel ? "已达最高等级" : `距下一级 ${levelInfo.expForNextLevel - levelInfo.expIntoLevel} EXP`}
            </p>
          </div>
        </div>

        {/* 经验进度条 */}
        <div className="flex-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full cursor-default">
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-muted-foreground">经验值</span>
                    <span className="font-bold text-foreground">
                      {progress.exp} EXP
                    </span>
                  </div>
                  <Progress value={levelInfo.progress} className="h-2.5" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>当前经验: {progress.exp}</p>
                {!levelInfo.isMaxLevel && (
                  <p>下一级: {levelInfo.expIntoLevel + (levelInfo.expForNextLevel - levelInfo.expIntoLevel)} EXP</p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* 进度统计 */}
        <div className="flex items-center gap-4 md:gap-6">
          <StatItem
            icon={<BookOpen className="h-4 w-4" />}
            value={progress.learnedPoints.length}
            total={TOTAL_POINTS}
            label="知识点"
          />
          <div className="h-8 w-px bg-border/60" />
          <StatItem
            icon={<Trophy className="h-4 w-4" />}
            value={progress.unlockedAchievements.length}
            total={TOTAL_ACHIEVEMENTS}
            label="成就"
          />
          <div className="h-8 w-px bg-border/60" />
          <StatItem
            icon={<Swords className="h-4 w-4" />}
            value={progress.clearedDungeons.length}
            total={TOTAL_DUNGEONS}
            label="副本"
          />
        </div>
      </div>
    </header>
  )
}

function StatItem({
  icon,
  value,
  total,
  label,
}: {
  icon: React.ReactNode
  value: number
  total: number
  label: string
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-muted-foreground">{icon}</div>
      <span className="text-lg font-bold text-foreground">
        {value}
        <span className="text-xs font-normal text-muted-foreground">/{total}</span>
      </span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  )
}

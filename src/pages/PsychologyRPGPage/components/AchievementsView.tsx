import { Lock } from "lucide-react"
import { ACHIEVEMENTS } from "@/data/achievements"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface AchievementsViewProps {
  unlockedAchievements: string[]
}

export function AchievementsView({ unlockedAchievements }: AchievementsViewProps) {
  const unlockedCount = unlockedAchievements.length
  const totalCount = ACHIEVEMENTS.length

  return (
    <div className="flex flex-col gap-3">
      {/* 进度统计 */}
      <div className="glass-card flex items-center justify-between rounded-lg p-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">成就</h3>
          <p className="text-xs text-muted-foreground">记录你的成长历程</p>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-foreground">{unlockedCount}</span>
          <span className="text-sm text-muted-foreground">/ {totalCount}</span>
        </div>
      </div>

      {/* 徽章列表 — 紧凑网格 */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = unlockedAchievements.includes(ach.id)
          return (
            <TooltipProvider key={ach.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "flex items-center gap-2.5 rounded border p-3",
                      isUnlocked
                        ? "border-border bg-card/60"
                        : "border-border/50 bg-muted/10 opacity-60"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded",
                        isUnlocked ? "bg-muted/40" : "bg-muted/20"
                      )}
                    >
                      {isUnlocked ? (
                        <span className="text-lg">{ach.icon}</span>
                      ) : (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className={cn(
                        "truncate text-xs font-medium",
                        isUnlocked ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {isUnlocked ? ach.name : "???"}
                      </p>
                      {isUnlocked && (
                        <span className="h-1.5 w-1.5 inline-block rounded-full bg-success/40" />
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[220px]">
                  {isUnlocked ? (
                    <>
                      <p className="font-medium text-foreground">{ach.name}</p>
                      <p className="text-muted-foreground">{ach.description}</p>
                    </>
                  ) : (
                    <>
                      <p className="font-medium text-muted-foreground">未解锁</p>
                      <p className="text-muted-foreground">{ach.description}</p>
                    </>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        })}
      </div>
    </div>
  )
}

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Lock, ArrowRight, BookOpen, ChevronDown } from "lucide-react"
import { DOMAINS } from "@/data/domains"
import { usePlayerProgress } from "@/hooks/usePlayerProgress"
import { cn } from "@/lib/utils"
import type { ISubDomain } from "@/types"

export default function DomainMapPage() {
  const navigate = useNavigate()
  const { progress } = usePlayerProgress()
  const [expandedDomain, setExpandedDomain] = useState<string | null>("psychology")

  function handleSubDomainClick(sub: ISubDomain) {
    if (sub.status === "active" && sub.route) {
      navigate(sub.route)
    }
  }

  const totalLearned = progress.learnedPoints.length
  const totalPoints = DOMAINS.reduce((sum, d) => sum + d.totalPoints, 0)
  const overallProgress = totalPoints > 0 ? (totalLearned / totalPoints) * 100 : 0

  return (
    <div className="relative z-10 min-h-screen w-full">
      <div className="mx-auto max-w-5xl space-y-5 p-4 md:p-6">
        {/* 顶部总览 — Hero卡片 */}
        <div className="glass-card relative overflow-hidden rounded-xl p-6 md:p-8">
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-primary/8 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-24 w-24 translate-y-6 -translate-x-6 rounded-full bg-accent/8 blur-2xl" />
          <div className="relative flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                知识宇宙
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                探索多个学科领域，点亮你的知识地图
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary">{totalLearned}</span>
                <span className="text-sm text-muted-foreground">/{totalPoints}</span>
              </div>
              <span className="text-xs text-muted-foreground">已点亮知识点</span>
            </div>
          </div>
          <div className="relative mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* 领域地图 */}
        <div className="space-y-3">
          {[...DOMAINS].sort((a, b) => {
            // 已激活的领域排最前面，其次即将开放，最后锁定
            const order = { active: 0, "coming-soon": 1, locked: 2 }
            return order[a.status] - order[b.status]
          }).map((domain) => {
            const isActive = domain.status === "active"
            const isComingSoon = domain.status === "coming-soon"
            const isLocked = domain.status === "locked"
            const isExpanded = expandedDomain === domain.id

            const learnedInDomain = domain.id === "psychology" ? totalLearned : 0
            const domainProgress = domain.totalPoints > 0 ? learnedInDomain / domain.totalPoints : 0
            const hasProgress = learnedInDomain > 0

            return (
              <div
                key={domain.id}
                className={cn(
                  "overflow-hidden rounded-xl border transition-all duration-200",
                  isActive && "border-border bg-card shadow-sm hover:shadow-md",
                  isComingSoon && "border-border/60 bg-muted/40",
                  isLocked && "border-border/40 bg-muted/30 opacity-60",
                )}
              >
                {/* 领域头部 */}
                <div
                  onClick={() => setExpandedDomain(isExpanded ? null : domain.id)}
                  className="flex cursor-pointer items-center gap-4 p-4 transition-colors hover:bg-muted/40"
                >
                  {/* 图标 */}
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-2xl transition-all",
                      hasProgress
                        ? "border-primary/30 bg-primary/8 shadow-sm"
                        : isActive
                          ? "border-border bg-muted"
                          : "border-border/50 bg-muted/50"
                    )}
                  >
                    {domain.icon}
                  </div>

                  {/* 名称 + 描述 */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={cn(
                        "text-base font-semibold",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {domain.name}
                      </h3>
                      {isComingSoon && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          即将开放
                        </span>
                      )}
                      {isLocked && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {domain.description}
                    </p>
                  </div>

                  {/* 进度 */}
                  <div className="hidden shrink-0 items-center gap-3 sm:flex">
                    <div className="text-right">
                      <div className="text-sm font-bold text-foreground">
                        {learnedInDomain}
                        <span className="text-xs font-normal text-muted-foreground">/{domain.totalPoints}</span>
                      </div>
                      <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn("h-full rounded-full transition-all duration-500", hasProgress ? "bg-primary" : "bg-transparent")}
                          style={{ width: `${domainProgress * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 展开/折叠箭头 */}
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                      isExpanded && "rotate-180"
                    )}
                  />
                </div>

                {/* 展开内容 — 子领域列表 */}
                {isExpanded && (
                  <div className="animate-fade-in border-t border-border/60 p-3">
                    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                      {domain.subDomains.map((sub) => {
                        const subActive = sub.status === "active"
                        const subComingSoon = sub.status === "coming-soon"
                        const subLocked = sub.status === "locked"

                        return (
                          <div
                            key={sub.id}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSubDomainClick(sub)
                            }}
                            className={cn(
                              "group rounded-lg border p-3.5 transition-all duration-200",
                              subActive && "cursor-pointer border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/8 hover:shadow-sm",
                              subComingSoon && "border-border/50 bg-muted/30",
                              subLocked && "border-border/40 bg-muted/20 opacity-50",
                            )}
                          >
                            {/* 子领域名称 */}
                            <div className="flex items-center justify-between">
                              <h4 className={cn(
                                "text-sm font-semibold",
                                subActive ? "text-foreground" : "text-muted-foreground"
                              )}>
                                {sub.name}
                              </h4>
                              {subActive && (
                                <ArrowRight className="h-4 w-4 text-primary opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                              )}
                              {subComingSoon && (
                                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">即将开放</span>
                              )}
                              {subLocked && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
                            </div>

                            {/* 描述 */}
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                              {sub.description}
                            </p>

                            {/* 模块点亮状态 */}
                            <div className="mt-2.5 space-y-1">
                              {sub.modules.map((mod) => {
                                const modLearned = domain.id === "psychology" && sub.id === "social-psychology" && hasProgress
                                return (
                                  <div key={mod.id} className="flex items-center gap-2 text-xs">
                                    <span
                                      className={cn(
                                        "h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                                        modLearned ? "bg-success" : "bg-muted-foreground/25"
                                      )}
                                    />
                                    <span className={cn(
                                      "flex-1",
                                      modLearned ? "text-foreground" : "text-muted-foreground"
                                    )}>
                                      {mod.name}
                                    </span>
                                    <span className="text-muted-foreground/70">{mod.totalPoints}</span>
                                  </div>
                                )
                              })}
                            </div>

                            {/* 进入提示 */}
                            {subActive && (
                              <div className="mt-2.5 flex items-center gap-1 text-xs font-medium text-primary">
                                <BookOpen className="h-3.5 w-3.5" />
                                点击进入
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* 底部图例 */}
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border/60 bg-card/50 px-4 py-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-success" />
            已点亮
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
            未开始
          </div>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">即将开放</span>
            即将推出
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5" />
            未解锁
          </div>
        </div>
      </div>
    </div>
  )
}

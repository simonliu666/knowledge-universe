import { useState, useEffect, useMemo } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Lock, ArrowRight, BookOpen, ChevronDown, Cloud, CloudOff, RefreshCw, Clock } from "lucide-react"
import { DOMAINS } from "@/data/domains"
import { SKILL_MODULES, KNOWLEDGE_POINTS } from "@/data/knowledgePoints"
import { usePlayerProgress } from "@/hooks/usePlayerProgress"
import { useCloudSync } from "@/hooks/useCloudSync"
import { cn } from "@/lib/utils"
import type { ISubDomain, IKnowledgePoint } from "@/types"

// 构建云同步数据快照（首页只需同步进度数据）
function buildCloudSnapshot(progress: ReturnType<typeof usePlayerProgress>["progress"]) {
  return JSON.stringify({
    v: 1,
    progress: {
      level: progress.level,
      exp: progress.exp,
      learnedPoints: progress.learnedPoints,
      unlockedAchievements: progress.unlockedAchievements,
      clearedDungeons: progress.clearedDungeons,
      lastToolBonusDate: progress.lastToolBonusDate,
    },
  })
}

function formatTime(ts?: number): string {
  if (!ts) return "从未"
  return new Date(ts).toLocaleString("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })
}

export default function DomainMapPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { progress } = usePlayerProgress()
  const cloudSnapshot = useMemo(() => buildCloudSnapshot(progress), [progress])
  const cloudSync = useCloudSync(cloudSnapshot)

  const [expandedDomain, setExpandedDomain] = useState<string | null>(null)
  const [scrollToDomain, setScrollToDomain] = useState<string | null>(null)

  // 从子领域返回时：自动展开并滚动到对应领域
  useEffect(() => {
    const state = location.state as { fromSubdomain?: string } | null
    if (state?.fromSubdomain) {
      // 找到该子领域所属的大领域
      const domain = DOMAINS.find((d) =>
        d.subDomains.some((s) => s.id === state.fromSubdomain)
      )
      if (domain) {
        setExpandedDomain(domain.id)
        setScrollToDomain(domain.id)
      }
    }
  }, [location.state])

  // 滚动到指定领域
  useEffect(() => {
    if (scrollToDomain) {
      const el = document.getElementById(`domain-${scrollToDomain}`)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      setScrollToDomain(null)
    }
  }, [scrollToDomain])

  function handleSubDomainClick(sub: ISubDomain) {
    if (sub.status === "active" && sub.route) {
      navigate(sub.route, { state: { fromDomain: "domain-map" } })
    }
  }

  const totalLearned = progress.learnedPoints.length
  const totalPoints = DOMAINS.reduce((sum, d) => sum + d.totalPoints, 0)
  const overallProgress = totalPoints > 0 ? (totalLearned / totalPoints) * 100 : 0

  // 预计算每个模块的已学点数
  const moduleLearnedMap = useMemo(() => {
    const map = new Map<string, number>()
    for (const pointId of progress.learnedPoints) {
      const point = KNOWLEDGE_POINTS.find((p) => p.id === pointId)
      if (point) {
        const count = map.get(point.module) ?? 0
        map.set(point.module, count + 1)
      }
    }
    return map
  }, [progress.learnedPoints])

  // 计算每个领域的已学点数
  const domainLearnedMap = useMemo(() => {
    const map = new Map<string, number>()
    for (const domain of DOMAINS) {
      let count = 0
      for (const sub of domain.subDomains) {
        const modules = SKILL_MODULES.filter((m) => m.subdomain === sub.id)
        for (const mod of modules) {
          count += moduleLearnedMap.get(mod.id) ?? 0
        }
      }
      map.set(domain.id, count)
    }
    return map
  }, [moduleLearnedMap])

  // 部署时间
  const buildTime = new Date(__BUILD_TIME__).toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="relative z-10 min-h-screen w-full">
      <div className="mx-auto max-w-5xl space-y-5 p-4 md:p-6">
        {/* 顶部总览 — Hero卡片 */}
        <div className="glass-card relative overflow-hidden rounded-xl p-6 md:p-8">
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-primary/8 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-24 w-24 translate-y-6 -translate-x-6 rounded-full bg-accent/8 blur-2xl" />

          {/* 顶部栏：云同步状态 + 部署时间 */}
          <div className="relative mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {/* 云同步状态按钮 */}
              {cloudSync.enabled ? (
                <button
                  onClick={() => void cloudSync.syncNow()}
                  disabled={cloudSync.status === "syncing"}
                  className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/15 disabled:opacity-60"
                  title={cloudSync.status === "syncing" ? "同步中..." : "点击立即同步"}
                >
                  {cloudSync.status === "syncing" ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Cloud className="h-3.5 w-3.5" />
                  )}
                  <span>云同步</span>
                  <span className="text-[10px] opacity-70">· {formatTime(cloudSync.lastSyncAt)}</span>
                </button>
              ) : (
                <div
                  className="flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground"
                  title="云同步未启用"
                >
                  <CloudOff className="h-3.5 w-3.5" />
                  <span>云同步未启用</span>
                </div>
              )}
            </div>

            {/* 部署时间 */}
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground/70">
              <Clock className="h-3.5 w-3.5" />
              <span>部署于 {buildTime}</span>
            </div>
          </div>

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

          {/* 云同步错误提示 */}
          {cloudSync.error && (
            <div className="relative mt-3 rounded border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {cloudSync.error}
            </div>
          )}
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

            const learnedInDomain = domainLearnedMap.get(domain.id) ?? 0
            const domainProgress = domain.totalPoints > 0 ? learnedInDomain / domain.totalPoints : 0
            const hasProgress = learnedInDomain > 0

            return (
              <div
                key={domain.id}
                id={`domain-${domain.id}`}
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
                                // 找到对应的 SKILL_MODULE
                                const skillMod = SKILL_MODULES.find(
                                  (m) => m.subdomain === sub.id && m.id === mod.id
                                )
                                // 计算该模块已学点数量
                                const modLearned = skillMod
                                  ? skillMod.pointIds.filter((pid) => progress.learnedPoints.includes(pid)).length
                                  : 0
                                const modTotal = mod.totalPoints
                                const modStatus: "complete" | "partial" | "none" =
                                  modLearned === 0 ? "none" : modLearned >= modTotal ? "complete" : "partial"

                                return (
                                  <div key={mod.id} className="flex items-center gap-2 text-xs">
                                    <span
                                      className={cn(
                                        "h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                                        modStatus === "complete" && "bg-success",
                                        modStatus === "partial" && "bg-warning",
                                        modStatus === "none" && "bg-muted-foreground/25"
                                      )}
                                    />
                                    <span className={cn(
                                      "flex-1",
                                      modStatus === "complete" && "text-foreground",
                                      modStatus === "partial" && "text-foreground/80",
                                      modStatus === "none" && "text-muted-foreground"
                                    )}>
                                      {mod.name}
                                    </span>
                                    <span className="text-muted-foreground/70">
                                      {modLearned > 0 ? `${modLearned}/` : ""}{modTotal}
                                    </span>
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
            已完成
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-warning" />
            学习中
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

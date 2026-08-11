import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import type { IPlayerProgress, IExpGainEvent } from "@/types"
import { EXP_RULES, getLevelByExp, getTitleByLevel } from "@/data/levels"
import { KNOWLEDGE_POINTS, TOTAL_POINTS } from "@/data/knowledgePoints"
import { SKILL_MODULES } from "@/data/knowledgePoints"
import { ACHIEVEMENTS } from "@/data/achievements"
import { DUNGEONS } from "@/data/dungeons"

const STORAGE_KEY = "__app_psychology_rpg_progress"

const DEFAULT_PROGRESS: IPlayerProgress = {
  level: 1,
  exp: 0,
  learnedPoints: [],
  unlockedAchievements: [],
  clearedDungeons: [],
  lastToolBonusDate: undefined,
}

function loadProgress(): IPlayerProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_PROGRESS }
    const parsed = JSON.parse(raw) as Partial<IPlayerProgress>
    return { ...DEFAULT_PROGRESS, ...parsed }
  } catch {
    return { ...DEFAULT_PROGRESS }
  }
}

function saveProgress(progress: IPlayerProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // ignore
  }
}

/** 检查成就是否满足条件 */
function checkAchievement(
  condition: IAchievement["condition"],
  progress: IPlayerProgress
): boolean {
  switch (condition.type) {
    case "learnCount":
      return progress.learnedPoints.length >= (condition.value ?? 0)
    case "learnAll":
      return progress.learnedPoints.length >= TOTAL_POINTS
    case "learnModule": {
      if (!condition.moduleId) return false
      const mod = SKILL_MODULES.find((m) => m.id === condition.moduleId)
      if (!mod) return false
      return mod.pointIds.every((id) => progress.learnedPoints.includes(id))
    }
    case "clearDungeon":
      return progress.clearedDungeons.length >= (condition.value ?? 0)
    case "reachLevel":
      return progress.level >= (condition.value ?? 0)
    case "useTool":
      // 由 useToolRecords 触发，这里检查是否有标记
      return progress.unlockedAchievements.includes("tool-practitioner")
    default:
      return false
  }
}

// Re-import type for checkAchievement
import type { IAchievement } from "@/types"

export interface PlayerProgressAPI {
  progress: IPlayerProgress
  expGains: IExpGainEvent[]
  levelUpInfo: { level: number; title: string } | null
  achievementUnlockInfo: { id: string; name: string; icon: string; description: string } | null
  learnPoint: (pointId: string) => void
  clearDungeon: (dungeonId: string, isFirstClear: boolean) => void
  triggerToolBonus: () => boolean
  triggerToolAchievement: () => void
  dismissLevelUp: () => void
  dismissAchievement: () => void
  resetProgress: () => void
}

export function usePlayerProgress(subdomainId?: string): PlayerProgressAPI {
  const [progress, setProgress] = useState<IPlayerProgress>(loadProgress)
  const [expGains, setExpGains] = useState<IExpGainEvent[]>([])
  const [levelUpInfo, setLevelUpInfo] = useState<{ level: number; title: string } | null>(null)
  const [achievementUnlockInfo, setAchievementUnlockInfo] = useState<
    { id: string; name: string; icon: string; description: string } | null
  >(null)
  const pendingAchievementCheck = useRef(false)

  // 持久化
  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  // 添加经验飘字
  const addExpGain = useCallback((amount: number, reason: string) => {
    const gain: IExpGainEvent = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      amount,
      reason,
      timestamp: Date.now(),
    }
    setExpGains((prev) => [...prev, gain])
    // 2秒后移除
    setTimeout(() => {
      setExpGains((prev) => prev.filter((g) => g.id !== gain.id))
    }, 2000)
  }, [])

  // 检查成就解锁
  const checkAchievements = useCallback((currentProgress: IPlayerProgress) => {
    for (const ach of ACHIEVEMENTS) {
      if (currentProgress.unlockedAchievements.includes(ach.id)) continue
      if (checkAchievement(ach.condition, currentProgress)) {
        const newProgress = {
          ...currentProgress,
          unlockedAchievements: [...currentProgress.unlockedAchievements, ach.id],
        }
        setProgress(newProgress)
        setAchievementUnlockInfo({
          id: ach.id,
          name: ach.name,
          icon: ach.icon,
          description: ach.description,
        })
        // 递归检查（解锁一个成就可能触发其他）
        setTimeout(() => checkAchievements(newProgress), 100)
        return
      }
    }
  }, [])

  // 学习知识点
  const learnPoint = useCallback((pointId: string) => {
    setProgress((prev) => {
      if (prev.learnedPoints.includes(pointId)) return prev
      const point = KNOWLEDGE_POINTS.find((p) => p.id === pointId)
      if (!point) return prev

      const newLearned = [...prev.learnedPoints, pointId]
      const newExp = prev.exp + EXP_RULES.LEARN_POINT
      const newLevel = getLevelByExp(newExp)

      const newProgress: IPlayerProgress = {
        ...prev,
        learnedPoints: newLearned,
        exp: newExp,
        level: newLevel,
      }

      // 经验飘字
      addExpGain(EXP_RULES.LEARN_POINT, `学会「${point.name}」`)

      // 检查升级
      if (newLevel > prev.level) {
        const newTitle = subdomainId ? getTitleByLevel(subdomainId, newLevel) : ""
        setLevelUpInfo({ level: newLevel, title: newTitle })
      }

      // 检查成就
      setTimeout(() => checkAchievements(newProgress), 50)

      return newProgress
    })
  }, [addExpGain, checkAchievements, subdomainId])

  // 通关副本
  const clearDungeon = useCallback((dungeonId: string, isFirstClear: boolean) => {
    setProgress((prev) => {
      const dungeon = DUNGEONS.find((d) => d.id === dungeonId)
      if (!dungeon) return prev
      if (prev.clearedDungeons.includes(dungeonId) && !isFirstClear) {
        // 非首次通关只给基础奖励
        const newExp = prev.exp + dungeon.rewardExp
        const newLevel = getLevelByExp(newExp)
        addExpGain(dungeon.rewardExp, `通关「${dungeon.name}」`)
        const newProgress = { ...prev, exp: newExp, level: newLevel }
        if (newLevel > prev.level) {
          setLevelUpInfo({ level: newLevel, title: subdomainId ? getTitleByLevel(subdomainId, newLevel) : "" })
        }
        setTimeout(() => checkAchievements(newProgress), 50)
        return newProgress
      }

      // 首次通关
      const newCleared = prev.clearedDungeons.includes(dungeonId)
        ? prev.clearedDungeons
        : [...prev.clearedDungeons, dungeonId]
      const totalReward = dungeon.rewardExp + (isFirstClear ? dungeon.firstClearBonus : 0)
      const newExp = prev.exp + totalReward
      const newLevel = getLevelByExp(newExp)

      const newProgress: IPlayerProgress = {
        ...prev,
        clearedDungeons: newCleared,
        exp: newExp,
        level: newLevel,
      }

      addExpGain(totalReward, `通关「${dungeon.name}」${isFirstClear ? "（首通奖励）" : ""}`)
      if (newLevel > prev.level) {
        setLevelUpInfo({ level: newLevel, title: subdomainId ? getTitleByLevel(subdomainId, newLevel) : "" })
      }
      setTimeout(() => checkAchievements(newProgress), 50)
      return newProgress
    })
  }, [addExpGain, checkAchievements, subdomainId])

  // 工具箱每日首次奖励
  const triggerToolBonus = useCallback((): boolean => {
    const today = new Date().toISOString().split("T")[0]
    let granted = false
    setProgress((prev) => {
      if (prev.lastToolBonusDate === today) return prev
      granted = true
      const newExp = prev.exp + EXP_RULES.USE_TOOL_DAILY
      const newLevel = getLevelByExp(newExp)
      const newProgress: IPlayerProgress = {
        ...prev,
        exp: newExp,
        level: newLevel,
        lastToolBonusDate: today,
      }
      addExpGain(EXP_RULES.USE_TOOL_DAILY, "工具箱练习（每日首次）")
      if (newLevel > prev.level) {
        setLevelUpInfo({ level: newLevel, title: subdomainId ? getTitleByLevel(subdomainId, newLevel) : "" })
      }
      setTimeout(() => checkAchievements(newProgress), 50)
      return newProgress
    })
    return granted
  }, [addExpGain, checkAchievements, subdomainId])

  // 触发工具使用成就
  const triggerToolAchievement = useCallback(() => {
    setProgress((prev) => {
      if (prev.unlockedAchievements.includes("tool-practitioner")) return prev
      const newProgress = {
        ...prev,
        unlockedAchievements: [...prev.unlockedAchievements, "tool-practitioner"],
      }
      const ach = ACHIEVEMENTS.find((a) => a.id === "tool-practitioner")
      if (ach) {
        setAchievementUnlockInfo({
          id: ach.id,
          name: ach.name,
          icon: ach.icon,
          description: ach.description,
        })
      }
      return newProgress
    })
  }, [])

  const dismissLevelUp = useCallback(() => setLevelUpInfo(null), [])
  const dismissAchievement = useCallback(() => setAchievementUnlockInfo(null), [])

  const resetProgress = useCallback(() => {
    const fresh = { ...DEFAULT_PROGRESS }
    setProgress(fresh)
    saveProgress(fresh)
  }, [])

  return useMemo(() => ({
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
  }), [progress, expGains, levelUpInfo, achievementUnlockInfo, learnPoint, clearDungeon, triggerToolBonus, triggerToolAchievement, dismissLevelUp, dismissAchievement, resetProgress])
}

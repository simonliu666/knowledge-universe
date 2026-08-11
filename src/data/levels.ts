import type { ILevelTitle } from "@/types"

/** 等级与称号体系 */
export const LEVEL_TITLES: ILevelTitle[] = [
  { level: 1,  title: "心理学新手",   requiredExp: 0 },
  { level: 2,  title: "觉察者",       requiredExp: 100 },
  { level: 3,  title: "思辨学徒",     requiredExp: 250 },
  { level: 4,  title: "认知行者",     requiredExp: 450 },
  { level: 5,  title: "心理探索家",   requiredExp: 700 },
  { level: 6,  title: "社会洞察者",   requiredExp: 1000 },
  { level: 7,  title: "影响分析师",   requiredExp: 1400 },
  { level: 8,  title: "群体解读者",   requiredExp: 1850 },
  { level: 9,  title: "心理学宗师",   requiredExp: 2350 },
  { level: 10, title: "心理学大师",   requiredExp: 3000 },
]

/** 经验获取规则 */
export const EXP_RULES = {
  LEARN_POINT: 50,
  CLEAR_DUNGEON: 100,
  FIRST_CLEAR_BONUS: 50,
  USE_TOOL_DAILY: 20,
} as const

/** 根据累计经验获取等级 */
export function getLevelByExp(exp: number): number {
  for (let i = LEVEL_TITLES.length - 1; i >= 0; i--) {
    if (exp >= LEVEL_TITLES[i].requiredExp) return LEVEL_TITLES[i].level
  }
  return 1
}

/** 获取当前等级进度信息 */
export function getLevelProgress(exp: number) {
  const currentLevel = getLevelByExp(exp)
  const currentLevelData = LEVEL_TITLES[currentLevel - 1]
  const nextLevelData = LEVEL_TITLES[currentLevel] || LEVEL_TITLES[LEVEL_TITLES.length - 1]
  const isMaxLevel = currentLevel >= 10
  const currentLevelExp = currentLevelData.requiredExp
  const nextLevelExp = nextLevelData.requiredExp
  const expIntoLevel = exp - currentLevelExp
  const expForNextLevel = nextLevelExp - currentLevelExp
  const progress = isMaxLevel ? 100 : (expIntoLevel / expForNextLevel) * 100
  return {
    level: currentLevel,
    title: currentLevelData.title,
    isMaxLevel,
    expIntoLevel,
    expForNextLevel,
    progress,
  }
}

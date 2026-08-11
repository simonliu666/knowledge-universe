import type { ILevelTitle } from "@/types"

// ============================================================
// 等级称号体系 — 每个子领域独立设计
// ============================================================

/** 默认称号（通用，作为 fallback） */
const DEFAULT_TITLES: string[] = [
  "新手",
  "探索者",
  "学徒",
  "行者",
  "探索家",
  "洞察者",
  "分析师",
  "解读者",
  "宗师",
  "大师",
]

/** 各子领域专属10级称号 */
export const SUBDOMAIN_TITLES: Record<string, string[]> = {
  // ── 社会心理学 ──
  "social-psychology": [
    "路人甲",
    "觉察者",
    "从众破壁人",
    "社交解码者",
    "影响洞察家",
    "社会心理学者",
    "人心分析师",
    "群体解读者",
    "社会心智宗师",
    "人心大师",
  ],

  // ── 认知心理学 ──
  "cognitive-psychology": [
    "认知萌新",
    "信息加工者",
    "记忆探索者",
    "注意掌控者",
    "思维解码者",
    "认知架构师",
    "心智模型师",
    "认知科学家",
    "认知心理宗师",
    "认知大师",
  ],

  // ── 人格心理学 ──
  "personality-psychology": [
    "性格观察员",
    "人格探索者",
    "特质分析师",
    "潜意识洞察者",
    "人格解构师",
    "性格画像师",
    "人格理论家",
    "心灵解读大师",
    "人格心理宗师",
    "人格大师",
  ],

  // ── 游戏行业史 ──
  "game-industry-history": [
    "游戏新人",
    "街机时代回声",
    "主机战争见证者",
    "游戏史探索者",
    "产业编年史家",
    "游戏历史学者",
    "行业考古学家",
    "游戏史守护者",
    "游戏史宗师",
    "游戏史大师",
  ],

  // ── 游戏产业结构 ──
  "game-industry-structure": [
    "产业新人",
    "赛道观察员",
    "市场分析者",
    "格局洞察者",
    "产业结构师",
    "商业模式分析师",
    "赛道战略家",
    "产业格局解读者",
    "产业分析宗师",
    "产业大师",
  ],

  // ── 新兴技术赛道 ──
  "emerging-tech": [
    "技术新手",
    "前沿探索者",
    "趋势捕捉者",
    "技术先锋",
    "创新洞察者",
    "技术架构师",
    "前沿布道者",
    "技术趋势预言家",
    "前沿技术宗师",
    "技术大师",
  ],

  // ── 行业规律与趋势 ──
  "industry-laws-trends": [
    "规律初学者",
    "趋势观察者",
    "规律提炼者",
    "趋势分析师",
    "行业洞察者",
    "规律掌控者",
    "趋势预言家",
    "行业战略家",
    "行业规律宗师",
    "行业大师",
  ],
}

/** 等级与经验对应关系（所有领域共享） */
export const LEVEL_TITLES: ILevelTitle[] = [
  { level: 1,  title: "新手",   requiredExp: 0 },
  { level: 2,  title: "探索者",  requiredExp: 100 },
  { level: 3,  title: "学徒",   requiredExp: 250 },
  { level: 4,  title: "行者",   requiredExp: 450 },
  { level: 5,  title: "探索家",  requiredExp: 700 },
  { level: 6,  title: "洞察者",  requiredExp: 1000 },
  { level: 7,  title: "分析师",  requiredExp: 1400 },
  { level: 8,  title: "解读者",  requiredExp: 1850 },
  { level: 9,  title: "宗师",   requiredExp: 2350 },
  { level: 10, title: "大师",   requiredExp: 3000 },
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

/** 获取指定子领域的等级称号 */
export function getTitleByLevel(subdomainId: string, level: number): string {
  const titles = SUBDOMAIN_TITLES[subdomainId] || DEFAULT_TITLES
  return titles[Math.min(level, titles.length) - 1] || DEFAULT_TITLES[level - 1]
}

/** 获取当前等级进度信息（含子领域专属称号） */
export function getLevelProgress(exp: number, subdomainId?: string) {
  const currentLevel = getLevelByExp(exp)
  const currentLevelData = LEVEL_TITLES[currentLevel - 1]
  const nextLevelData = LEVEL_TITLES[currentLevel] || LEVEL_TITLES[LEVEL_TITLES.length - 1]
  const isMaxLevel = currentLevel >= 10
  const currentLevelExp = currentLevelData.requiredExp
  const nextLevelExp = nextLevelData.requiredExp
  const expIntoLevel = exp - currentLevelExp
  const expForNextLevel = nextLevelExp - currentLevelExp
  const progress = isMaxLevel ? 100 : (expIntoLevel / expForNextLevel) * 100

  // 使用子领域专属称号
  const title = subdomainId
    ? getTitleByLevel(subdomainId, currentLevel)
    : currentLevelData.title

  return {
    level: currentLevel,
    title,
    isMaxLevel,
    expIntoLevel,
    expForNextLevel,
    progress,
  }
}

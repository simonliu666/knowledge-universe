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

  // ── 特斯拉帝国 ──
  "tesla-empire": [
    "电动车新人",
    "Model 3车主",
    "FSD体验者",
    "超级工厂访客",
    "能源业务观察者",
    "特斯拉分析师",
    "自动驾驶布道者",
    "特斯拉战略师",
    "电动车产业宗师",
    "特斯拉大师",
  ],

  // ── 太空探索 ──
  "spacex": [
    "地面观察员",
    "火箭爱好者",
    "发射追踪者",
    "回收技术探索者",
    "星链用户",
    "轨道经济分析师",
    "火星殖民先锋",
    "太空产业战略家",
    "星际探索宗师",
    "太空大师",
  ],

  // ── AI与社交帝国 ──
  "xai-x": [
    "AI围观者",
    "Grok体验用户",
    "大模型探索者",
    "X平台观察者",
    "数据飞轮分析师",
    "AI商业架构师",
    "社交AI融合战略家",
    "AI竞争格局解读者",
    "AI帝国宗师",
    "AI大师",
  ],

  // ── 前沿探索 ──
  "frontier-ventures": [
    "前沿关注者",
    "脑机接口探索者",
    "地下交通观察员",
    "技术融合思考者",
    "第一性原理实践者",
    "前沿投资分析师",
    "马斯克方法论解读者",
    "企业协同战略家",
    "前沿探索宗师",
    "马斯克帝国大师",
  ],

  // ── 核心经济学 ──
  "core-economics": [
    "经济小白",
    "市场观察员",
    "供需分析者",
    "价格洞察者",
    "微观解码者",
    "宏观分析师",
    "经济模型师",
    "政策解读家",
    "经济理论宗师",
    "经济学大师",
  ],

  // ── 应用经济学 ──
  "applied-economics": [
    "应用新人",
    "行为观察者",
    "偏差捕捉者",
    "博弈新手",
    "纳什探索者",
    "策略分析师",
    "行为建模师",
    "博弈战略家",
    "应用经济宗师",
    "应用经济大师",
  ],

  // ── 核心语言学 ──
  "core-linguistics": [
    "语言小白",
    "语音探索者",
    "句法分析者",
    "语义解码者",
    "结构洞察者",
    "语言模型师",
    "语法理论家",
    "语言科学家",
    "语言学宗师",
    "语言学大师",
  ],

  // ── 应用语言学 ──
  "applied-linguistics": [
    "语用新人",
    "语境观察者",
    "含义捕捉者",
    "礼貌探索者",
    "话语分析者",
    "语用建模师",
    "交际策略家",
    "语用理论家",
    "应用语言宗师",
    "应用语言大师",
  ],

  // ── 社会结构与文化 ──
  "social-structure-culture": [
    "社会新人",
    "结构观察员",
    "阶层分析者",
    "角色解码者",
    "制度洞察者",
    "文化探索家",
    "社会模型师",
    "文化理论家",
    "社会结构宗师",
    "社会学大师",
  ],

  // ── 社会动态 ──
  "social-dynamics": [
    "动态新人",
    "变迁观察者",
    "运动分析者",
    "越轨解码者",
    "控制洞察者",
    "全球化探索家",
    "社会运动师",
    "变迁理论家",
    "社会动态宗师",
    "社会动态大师",
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

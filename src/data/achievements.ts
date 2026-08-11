import type { IAchievement } from "@/types"

// ============================================================
// 成就系统 — 每个子领域独立设计 + 全局成就
// ============================================================

/** 成就列表 */
export const ACHIEVEMENTS: IAchievement[] = [
  // ════════════════════════════════════════════
  // 全局成就（所有领域共享，名称为领域中立）
  // ════════════════════════════════════════════
  {
    id: "level-5",
    name: "探索之星",
    description: "达到5级",
    icon: "⭐",
    condition: { type: "reachLevel", value: 5 },
  },
  {
    id: "level-10",
    name: "知识大师",
    description: "达到最高等级10级",
    icon: "👑",
    condition: { type: "reachLevel", value: 10 },
  },

  // ════════════════════════════════════════════
  // 社会心理学专属成就
  // ════════════════════════════════════════════
  {
    id: "tool-practitioner",
    name: "知行合一",
    description: "使用工具箱进行心理学练习",
    icon: "🛠️",
    subdomain: "social-psychology",
    condition: { type: "useTool" },
  },
  {
    id: "sp-first-step",
    name: "心智觉醒",
    description: "学习你的第一个社会心理学知识点",
    icon: "🌱",
    subdomain: "social-psychology",
    condition: { type: "learnCount", value: 1 },
  },
  {
    id: "sp-curious",
    name: "好奇心驱动",
    description: "学习5个社会心理学知识点",
    icon: "🔍",
    subdomain: "social-psychology",
    condition: { type: "learnCount", value: 5 },
  },
  {
    id: "sp-seeker",
    name: "社会洞察者",
    description: "学习10个社会心理学知识点",
    icon: "📚",
    subdomain: "social-psychology",
    condition: { type: "learnCount", value: 10 },
  },
  {
    id: "sp-influence-master",
    name: "影响掌控者",
    description: "完成「社会影响」模块全部知识点",
    icon: "🔗",
    subdomain: "social-psychology",
    condition: { type: "learnModule", moduleId: "sp-influence" },
  },
  {
    id: "sp-cognition-expert",
    name: "认知解码者",
    description: "完成「社会认知」模块全部知识点",
    icon: "🧠",
    subdomain: "social-psychology",
    condition: { type: "learnModule", moduleId: "sp-cognition" },
  },
  {
    id: "sp-inner-explorer",
    name: "内心探索者",
    description: "完成「内心机制」模块全部知识点",
    icon: "⚡",
    subdomain: "social-psychology",
    condition: { type: "learnModule", moduleId: "sp-inner" },
  },
  {
    id: "sp-dungeon-rookie",
    name: "副本新手",
    description: "通关你的第一个社会心理学副本",
    icon: "⚔️",
    subdomain: "social-psychology",
    condition: { type: "clearDungeon", value: 1 },
  },
  {
    id: "sp-scholar",
    name: "社会学博学者",
    description: "学习全部社会心理学知识点",
    icon: "🎓",
    subdomain: "social-psychology",
    condition: { type: "learnAll" },
  },

  // ════════════════════════════════════════════
  // 认知心理学专属成就
  // ════════════════════════════════════════════
  {
    id: "cp-first-step",
    name: "认知启蒙",
    description: "学习你的第一个认知心理学知识点",
    icon: "💡",
    subdomain: "cognitive-psychology",
    condition: { type: "learnCount", value: 1 },
  },
  {
    id: "cp-explorer",
    name: "认知探索者",
    description: "学习5个认知心理学知识点",
    icon: "🔭",
    subdomain: "cognitive-psychology",
    condition: { type: "learnCount", value: 5 },
  },
  {
    id: "cp-perception-master",
    name: "知觉大师",
    description: "完成「知觉与模式识别」模块",
    icon: "👁️",
    subdomain: "cognitive-psychology",
    condition: { type: "learnModule", moduleId: "cp-perception" },
  },
  {
    id: "cp-memory-master",
    name: "记忆掌控者",
    description: "完成「记忆」模块",
    icon: "🗂️",
    subdomain: "cognitive-psychology",
    condition: { type: "learnModule", moduleId: "cp-memory" },
  },
  {
    id: "cp-scholar",
    name: "认知博学者",
    description: "学习全部认知心理学知识点",
    icon: "🏆",
    subdomain: "cognitive-psychology",
    condition: { type: "learnAll" },
  },

  // ════════════════════════════════════════════
  // 人格心理学专属成就
  // ════════════════════════════════════════════
  {
    id: "pp-first-step",
    name: "人格觉醒",
    description: "学习你的第一个人格心理学知识点",
    icon: "🎭",
    subdomain: "personality-psychology",
    condition: { type: "learnCount", value: 1 },
  },
  {
    id: "pp-explorer",
    name: "人格探索者",
    description: "学习5个人格心理学知识点",
    icon: "🔮",
    subdomain: "personality-psychology",
    condition: { type: "learnCount", value: 5 },
  },
  {
    id: "pp-psychoanalysis-master",
    name: "潜意识解码者",
    description: "完成「精神分析流派」模块",
    icon: "🌙",
    subdomain: "personality-psychology",
    condition: { type: "learnModule", moduleId: "pp-psychoanalysis" },
  },
  {
    id: "pp-trait-master",
    name: "特质分析家",
    description: "完成「特质流派」模块",
    icon: "📊",
    subdomain: "personality-psychology",
    condition: { type: "learnModule", moduleId: "pp-trait" },
  },
  {
    id: "pp-scholar",
    name: "人格博学者",
    description: "学习全部人格心理学知识点",
    icon: "🎓",
    subdomain: "personality-psychology",
    condition: { type: "learnAll" },
  },

  // ════════════════════════════════════════════
  // 游戏行业史专属成就
  // ════════════════════════════════════════════
  {
    id: "gh-first-step",
    name: "行业入门",
    description: "学习你的第一个游戏行业史知识点",
    icon: "🕹️",
    subdomain: "game-industry-history",
    condition: { type: "learnCount", value: 1 },
  },
  {
    id: "gh-explorer",
    name: "历史探索者",
    description: "学习3个游戏行业史知识点",
    icon: "📖",
    subdomain: "game-industry-history",
    condition: { type: "learnCount", value: 3 },
  },
  {
    id: "gh-origin-master",
    name: "起源见证者",
    description: "完成「行业起源与早期发展」模块",
    icon: "💡",
    subdomain: "game-industry-history",
    condition: { type: "learnModule", moduleId: "eg-history-origin" },
  },
  {
    id: "gh-console-master",
    name: "主机编年史",
    description: "完成「主机时代演进」模块",
    icon: "🎮",
    subdomain: "game-industry-history",
    condition: { type: "learnModule", moduleId: "eg-history-console" },
  },
  {
    id: "gh-scholar",
    name: "行业史博学者",
    description: "学习全部游戏行业史知识点",
    icon: "🎓",
    subdomain: "game-industry-history",
    condition: { type: "learnAll" },
  },

  // ════════════════════════════════════════════
  // 游戏产业结构专属成就
  // ════════════════════════════════════════════
  {
    id: "gs-first-step",
    name: "产业初探",
    description: "学习你的第一个游戏产业结构知识点",
    icon: "🎯",
    subdomain: "game-industry-structure",
    condition: { type: "learnCount", value: 1 },
  },
  {
    id: "gs-explorer",
    name: "格局洞察者",
    description: "学习3个游戏产业结构知识点",
    icon: "🔍",
    subdomain: "game-industry-structure",
    condition: { type: "learnCount", value: 3 },
  },
  {
    id: "gs-console-master",
    name: "主机赛道通",
    description: "完成「主机游戏赛道」模块",
    icon: "⚖️",
    subdomain: "game-industry-structure",
    condition: { type: "learnModule", moduleId: "eg-console-track" },
  },
  {
    id: "gs-scholar",
    name: "产业博学者",
    description: "学习全部游戏产业结构知识点",
    icon: "🏆",
    subdomain: "game-industry-structure",
    condition: { type: "learnAll" },
  },

  // ════════════════════════════════════════════
  // 新兴技术赛道专属成就
  // ════════════════════════════════════════════
  {
    id: "et-first-step",
    name: "前沿探路",
    description: "学习你的第一个新兴技术知识点",
    icon: "🚀",
    subdomain: "emerging-tech",
    condition: { type: "learnCount", value: 1 },
  },
  {
    id: "et-explorer",
    name: "技术先锋",
    description: "学习3个新兴技术知识点",
    icon: "🛸",
    subdomain: "emerging-tech",
    condition: { type: "learnCount", value: 3 },
  },
  {
    id: "et-cloud-master",
    name: "云端先行者",
    description: "完成「云游戏」模块",
    icon: "☁️",
    subdomain: "emerging-tech",
    condition: { type: "learnModule", moduleId: "eg-cloud-gaming" },
  },
  {
    id: "et-ai-master",
    name: "AI游戏先驱",
    description: "完成「AI游戏」模块",
    icon: "🤖",
    subdomain: "emerging-tech",
    condition: { type: "learnModule", moduleId: "eg-ai-gaming" },
  },
  {
    id: "et-scholar",
    name: "前沿博学者",
    description: "学习全部新兴技术知识点",
    icon: "🎓",
    subdomain: "emerging-tech",
    condition: { type: "learnAll" },
  },

  // ════════════════════════════════════════════
  // 行业规律与趋势专属成就
  // ════════════════════════════════════════════
  {
    id: "lt-first-step",
    name: "规律初识",
    description: "学习你的第一个行业规律知识点",
    icon: "📐",
    subdomain: "industry-laws-trends",
    condition: { type: "learnCount", value: 1 },
  },
  {
    id: "lt-explorer",
    name: "趋势洞察者",
    description: "学习3个行业规律知识点",
    icon: "📈",
    subdomain: "industry-laws-trends",
    condition: { type: "learnCount", value: 3 },
  },
  {
    id: "lt-laws-master",
    name: "规律掌控者",
    description: "完成「行业核心规律」模块",
    icon: "📐",
    subdomain: "industry-laws-trends",
    condition: { type: "learnModule", moduleId: "eg-core-laws" },
  },
  {
    id: "lt-scholar",
    name: "趋势博学者",
    description: "学习全部行业规律与趋势知识点",
    icon: "🎓",
    subdomain: "industry-laws-trends",
    condition: { type: "learnAll" },
  },
]

/** 成就总数 */
export const TOTAL_ACHIEVEMENTS = ACHIEVEMENTS.length

/** 根据子领域ID获取成就列表（含全局成就） */
export function getAchievementsBySubdomain(subdomainId: string): IAchievement[] {
  return ACHIEVEMENTS.filter(
    (a) => !a.subdomain || a.subdomain === subdomainId
  )
}

/** 根据子领域ID获取成就总数 */
export function getAchievementCountBySubdomain(subdomainId: string): number {
  return getAchievementsBySubdomain(subdomainId).length
}

/** 根据ID获取成就 */
export function getAchievementById(id: string): IAchievement | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id)
}

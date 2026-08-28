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

  // ════════════════════════════════════════════
  // 特斯拉帝国专属成就
  // ════════════════════════════════════════════
  {
    id: "ts-first-step",
    name: "电门启动",
    description: "学习你的第一个特斯拉知识点",
    icon: "⚡",
    subdomain: "tesla-empire",
    condition: { type: "learnCount", value: 1 },
  },
  {
    id: "ts-explorer",
    name: "特斯拉探索者",
    description: "学习5个特斯拉知识点",
    icon: "🔋",
    subdomain: "tesla-empire",
    condition: { type: "learnCount", value: 5 },
  },
  {
    id: "ts-finance-master",
    name: "财报解码者",
    description: "完成「商业模式与财报」模块",
    icon: "💰",
    subdomain: "tesla-empire",
    condition: { type: "learnModule", moduleId: "ts-finance" },
  },
  {
    id: "ts-autonomy-master",
    name: "自动驾驶先锋",
    description: "完成「自动驾驶与机器人」模块",
    icon: "🤖",
    subdomain: "tesla-empire",
    condition: { type: "learnModule", moduleId: "ts-autonomy" },
  },
  {
    id: "ts-scholar",
    name: "特斯拉博学者",
    description: "学习全部特斯拉帝国知识点",
    icon: "🏆",
    subdomain: "tesla-empire",
    condition: { type: "learnAll" },
  },

  // ════════════════════════════════════════════
  // 太空探索专属成就
  // ════════════════════════════════════════════
  {
    id: "sp-first-step",
    name: "点火序列",
    description: "学习你的第一个SpaceX知识点",
    icon: "🔥",
    subdomain: "spacex",
    condition: { type: "learnCount", value: 1 },
  },
  {
    id: "sp-explorer",
    name: "轨道探索者",
    description: "学习5个SpaceX知识点",
    icon: "🛰️",
    subdomain: "spacex",
    condition: { type: "learnCount", value: 5 },
  },
  {
    id: "sp-launch-master",
    name: "火箭工程师",
    description: "完成「火箭与发射」模块",
    icon: "🚀",
    subdomain: "spacex",
    condition: { type: "learnModule", moduleId: "sp-launch" },
  },
  {
    id: "sp-starlink-master",
    name: "星链织网者",
    description: "完成「星链业务」模块",
    icon: "🌐",
    subdomain: "spacex",
    condition: { type: "learnModule", moduleId: "sp-starlink" },
  },
  {
    id: "sp-scholar",
    name: "太空博学者",
    description: "学习全部SpaceX知识点",
    icon: "🌌",
    subdomain: "spacex",
    condition: { type: "learnAll" },
  },

  // ════════════════════════════════════════════
  // AI与社交帝国专属成就
  // ════════════════════════════════════════════
  {
    id: "xai-first-step",
    name: "模型启动",
    description: "学习你的第一个xAI知识点",
    icon: "🧠",
    subdomain: "xai-x",
    condition: { type: "learnCount", value: 1 },
  },
  {
    id: "xai-explorer",
    name: "AI探索者",
    description: "学习3个xAI知识点",
    icon: "🔮",
    subdomain: "xai-x",
    condition: { type: "learnCount", value: 3 },
  },
  {
    id: "xai-model-master",
    name: "大模型架构师",
    description: "完成「xAI与Grok」模块",
    icon: "⚙️",
    subdomain: "xai-x",
    condition: { type: "learnModule", moduleId: "xai-model" },
  },
  {
    id: "xai-platform-master",
    name: "平台观察家",
    description: "完成「X平台」模块",
    icon: "✖️",
    subdomain: "xai-x",
    condition: { type: "learnModule", moduleId: "x-platform" },
  },
  {
    id: "xai-scholar",
    name: "AI帝国博学者",
    description: "学习全部AI与社交帝国知识点",
    icon: "🎓",
    subdomain: "xai-x",
    condition: { type: "learnAll" },
  },

  // ════════════════════════════════════════════
  // 前沿探索专属成就
  // ════════════════════════════════════════════
  {
    id: "fv-first-step",
    name: "前沿触角",
    description: "学习你的第一个前沿探索知识点",
    icon: "🔬",
    subdomain: "frontier-ventures",
    condition: { type: "learnCount", value: 1 },
  },
  {
    id: "fv-explorer",
    name: "跨界探索者",
    description: "学习3个前沿探索知识点",
    icon: "🧭",
    subdomain: "frontier-ventures",
    condition: { type: "learnCount", value: 3 },
  },
  {
    id: "fv-brain-master",
    name: "脑机解码者",
    description: "完成「Neuralink脑机接口」模块",
    icon: "🧬",
    subdomain: "frontier-ventures",
    condition: { type: "learnModule", moduleId: "nl-brain" },
  },
  {
    id: "fv-synergy-master",
    name: "帝国版图师",
    description: "完成「企业协同版图」模块",
    icon: "🗺️",
    subdomain: "frontier-ventures",
    condition: { type: "learnModule", moduleId: "musk-synergy" },
  },
  {
    id: "fv-scholar",
    name: "前沿博学者",
    description: "学习全部前沿探索知识点",
    icon: "🏆",
    subdomain: "frontier-ventures",
    condition: { type: "learnAll" },
  },

  // ════════════════════════════════════════════
  // 核心经济学专属成就
  // ════════════════════════════════════════════
  {
    id: "ec-core-first-step",
    name: "供需入门",
    description: "学习你的第一个核心经济学知识点",
    icon: "📈",
    subdomain: "core-economics",
    condition: { type: "learnCount", value: 1 },
  },
  {
    id: "ec-core-explorer",
    name: "经济探索者",
    description: "学习5个核心经济学知识点",
    icon: "📊",
    subdomain: "core-economics",
    condition: { type: "learnCount", value: 5 },
  },
  {
    id: "ec-micro-master",
    name: "微观分析师",
    description: "完成「微观经济学」模块",
    icon: "🔍",
    subdomain: "core-economics",
    condition: { type: "learnModule", moduleId: "ec-micro" },
  },
  {
    id: "ec-macro-master",
    name: "宏观分析师",
    description: "完成「宏观经济学」模块",
    icon: "🏛️",
    subdomain: "core-economics",
    condition: { type: "learnModule", moduleId: "ec-macro" },
  },
  {
    id: "ec-core-scholar",
    name: "核心经济博学者",
    description: "学习全部核心经济学知识点",
    icon: "🎓",
    subdomain: "core-economics",
    condition: { type: "learnAll" },
  },

  // ════════════════════════════════════════════
  // 应用经济学专属成就
  // ════════════════════════════════════════════
  {
    id: "ec-app-first-step",
    name: "行为初探",
    description: "学习你的第一个应用经济学知识点",
    icon: "🧠",
    subdomain: "applied-economics",
    condition: { type: "learnCount", value: 1 },
  },
  {
    id: "ec-app-explorer",
    name: "应用探索者",
    description: "学习3个应用经济学知识点",
    icon: "🎲",
    subdomain: "applied-economics",
    condition: { type: "learnCount", value: 3 },
  },
  {
    id: "ec-behavioral-master",
    name: "行为解码者",
    description: "完成「行为经济学」模块",
    icon: "💭",
    subdomain: "applied-economics",
    condition: { type: "learnModule", moduleId: "ec-behavioral" },
  },
  {
    id: "ec-game-master",
    name: "博弈战略家",
    description: "完成「博弈论」模块",
    icon: "♟️",
    subdomain: "applied-economics",
    condition: { type: "learnModule", moduleId: "ec-game-theory" },
  },
  {
    id: "ec-app-scholar",
    name: "应用经济博学者",
    description: "学习全部应用经济学知识点",
    icon: "🏆",
    subdomain: "applied-economics",
    condition: { type: "learnAll" },
  },

  // ════════════════════════════════════════════
  // 核心语言学专属成就
  // ════════════════════════════════════════════
  {
    id: "li-core-first-step",
    name: "语言入门",
    description: "学习你的第一个核心语言学知识点",
    icon: "🔊",
    subdomain: "core-linguistics",
    condition: { type: "learnCount", value: 1 },
  },
  {
    id: "li-core-explorer",
    name: "语言探索者",
    description: "学习5个核心语言学知识点",
    icon: "📖",
    subdomain: "core-linguistics",
    condition: { type: "learnCount", value: 5 },
  },
  {
    id: "li-phonetics-master",
    name: "语音分析师",
    description: "完成「语音学」模块",
    icon: "🗣️",
    subdomain: "core-linguistics",
    condition: { type: "learnModule", moduleId: "phonetics" },
  },
  {
    id: "li-syntax-master",
    name: "句法架构师",
    description: "完成「句法学」模块",
    icon: "🌳",
    subdomain: "core-linguistics",
    condition: { type: "learnModule", moduleId: "syntax" },
  },
  {
    id: "li-semantics-master",
    name: "语义解码者",
    description: "完成「语义学」模块",
    icon: "💭",
    subdomain: "core-linguistics",
    condition: { type: "learnModule", moduleId: "semantics" },
  },
  {
    id: "li-core-scholar",
    name: "核心语言博学者",
    description: "学习全部核心语言学知识点",
    icon: "🎓",
    subdomain: "core-linguistics",
    condition: { type: "learnAll" },
  },

  // ════════════════════════════════════════════
  // 应用语言学专属成就
  // ════════════════════════════════════════════
  {
    id: "li-app-first-step",
    name: "语用入门",
    description: "学习你的第一个应用语言学知识点",
    icon: "💬",
    subdomain: "applied-linguistics",
    condition: { type: "learnCount", value: 1 },
  },
  {
    id: "li-app-explorer",
    name: "语用探索者",
    description: "学习3个应用语言学知识点",
    icon: "🗨️",
    subdomain: "applied-linguistics",
    condition: { type: "learnCount", value: 3 },
  },
  {
    id: "li-pragmatics-master",
    name: "语用大师",
    description: "完成「语用学」模块",
    icon: "🎭",
    subdomain: "applied-linguistics",
    condition: { type: "learnModule", moduleId: "pragmatics" },
  },
  {
    id: "li-app-scholar",
    name: "应用语言博学者",
    description: "学习全部应用语言学知识点",
    icon: "🏆",
    subdomain: "applied-linguistics",
    condition: { type: "learnAll" },
  },

  // ════════════════════════════════════════════
  // 社会结构与文化专属成就
  // ════════════════════════════════════════════
  {
    id: "so-sc-first-step",
    name: "社会入门",
    description: "学习你的第一个社会结构与文化知识点",
    icon: "🌐",
    subdomain: "social-structure-culture",
    condition: { type: "learnCount", value: 1 },
  },
  {
    id: "so-sc-explorer",
    name: "社会探索者",
    description: "学习3个社会结构与文化知识点",
    icon: "🏗️",
    subdomain: "social-structure-culture",
    condition: { type: "learnCount", value: 3 },
  },
  {
    id: "so-structure-master",
    name: "结构解码者",
    description: "完成「社会结构」模块",
    icon: "🏛️",
    subdomain: "social-structure-culture",
    condition: { type: "learnModule", moduleId: "social-structure" },
  },
  {
    id: "so-culture-master",
    name: "文化探索家",
    description: "完成「文化与社会」模块",
    icon: "🎭",
    subdomain: "social-structure-culture",
    condition: { type: "learnModule", moduleId: "culture" },
  },
  {
    id: "so-sc-scholar",
    name: "社会结构博学者",
    description: "学习全部社会结构与文化知识点",
    icon: "🎓",
    subdomain: "social-structure-culture",
    condition: { type: "learnAll" },
  },

  // ════════════════════════════════════════════
  // 社会动态专属成就
  // ════════════════════════════════════════════
  {
    id: "so-sd-first-step",
    name: "动态入门",
    description: "学习你的第一个社会动态知识点",
    icon: "🔄",
    subdomain: "social-dynamics",
    condition: { type: "learnCount", value: 1 },
  },
  {
    id: "so-sd-explorer",
    name: "动态探索者",
    description: "学习3个社会动态知识点",
    icon: "📡",
    subdomain: "social-dynamics",
    condition: { type: "learnCount", value: 3 },
  },
  {
    id: "so-change-master",
    name: "变迁分析师",
    description: "完成「社会变迁」模块",
    icon: "🌍",
    subdomain: "social-dynamics",
    condition: { type: "learnModule", moduleId: "social-change" },
  },
  {
    id: "so-deviance-master",
    name: "越轨解码者",
    description: "完成「越轨与社会控制」模块",
    icon: "⚖️",
    subdomain: "social-dynamics",
    condition: { type: "learnModule", moduleId: "deviance" },
  },
  {
    id: "so-sd-scholar",
    name: "社会动态博学者",
    description: "学习全部社会动态知识点",
    icon: "🏆",
    subdomain: "social-dynamics",
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

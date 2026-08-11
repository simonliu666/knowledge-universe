import type { IAchievement } from "@/types"

/** 成就列表 */
export const ACHIEVEMENTS: IAchievement[] = [
  {
    id: "first-step",
    name: "心智觉醒",
    description: "学习你的第一个知识点",
    icon: "🌱",
    condition: { type: "learnCount", value: 1 },
  },
  {
    id: "curious-mind",
    name: "好奇心驱动",
    description: "学习5个知识点",
    icon: "🔍",
    condition: { type: "learnCount", value: 5 },
  },
  {
    id: "knowledge-seeker",
    name: "求知者",
    description: "学习10个知识点",
    icon: "📚",
    condition: { type: "learnCount", value: 10 },
  },
  {
    id: "scholar",
    name: "博学者",
    description: "学习全部19个知识点",
    icon: "🎓",
    condition: { type: "learnAll" },
  },
  {
    id: "influence-master",
    name: "影响掌控者",
    description: "完成「社会影响」模块全部知识点",
    icon: "🔗",
    condition: { type: "learnModule", moduleId: "social-influence" },
  },
  {
    id: "cognition-expert",
    name: "认知解码者",
    description: "完成「社会认知」模块全部知识点",
    icon: "🧠",
    condition: { type: "learnModule", moduleId: "social-cognition" },
  },
  {
    id: "inner-explorer",
    name: "内心探索者",
    description: "完成「内心机制」模块全部知识点",
    icon: "⚡",
    condition: { type: "learnModule", moduleId: "inner-mechanism" },
  },
  {
    id: "dungeon-rookie",
    name: "副本新手",
    description: "通关你的第一个副本",
    icon: "⚔️",
    condition: { type: "clearDungeon", value: 1 },
  },
  {
    id: "dungeon-master",
    name: "副本征服者",
    description: "通关全部3个副本",
    icon: "🏆",
    condition: { type: "clearDungeon", value: 3 },
  },
  {
    id: "level-5",
    name: "心理探索家",
    description: "达到5级",
    icon: "⭐",
    condition: { type: "reachLevel", value: 5 },
  },
  {
    id: "level-10",
    name: "心理学大师",
    description: "达到最高等级10级",
    icon: "👑",
    condition: { type: "reachLevel", value: 10 },
  },
  {
    id: "tool-practitioner",
    name: "知行合一",
    description: "使用任意工具箱工具进行练习",
    icon: "🛠️",
    condition: { type: "useTool" },
  },
]

/** 成就总数 */
export const TOTAL_ACHIEVEMENTS = ACHIEVEMENTS.length

/** 根据ID获取成就 */
export function getAchievementById(id: string): IAchievement | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id)
}

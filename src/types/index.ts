// ============================================================
// 知识宇宙 — 多领域学习系统类型定义
// ============================================================

/** 知识领域（大领域） */
export interface IKnowledgeDomain {
  id: string;
  name: string;
  icon: string;              // emoji或符号
  description: string;
  status: 'active' | 'locked' | 'coming-soon';  // 已开放/未解锁/即将推出
  color: string;             // HSL主色调
  totalPoints: number;       // 知识点总数
  subDomains: ISubDomain[];  // 子领域
  route?: string;            // 直接进入的路由（有详情页时）
}

/** 子领域（大领域下的分支） */
export interface ISubDomain {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'locked' | 'coming-soon';
  totalPoints: number;
  route?: string;            // 有详情页的子领域对应路由
  modules: IDomainModule[];  // 该子领域下的模块
}

/** 模块（子领域下的知识分支） */
export interface IDomainModule {
  id: string;
  name: string;
  description: string;
  totalPoints: number;
}

/** 玩家进度数据 */
export interface IPlayerProgress {
  level: number;          // 1-10
  exp: number;            // 当前累计经验
  learnedPoints: string[];  // 已学习的知识点ID
  unlockedAchievements: string[];  // 已解锁成就ID
  clearedDungeons: string[];  // 已通关副本ID
  lastToolBonusDate?: string;  // 上次工具箱奖励日期（YYYY-MM-DD）
}

/** 知识点详情内容 */
export interface IKnowledgePoint {
  id: string;
  name: string;
  module: string;         // 所属模块ID
  moduleName: string;     // 所属模块名称
  icon: string;           // emoji或符号
  definition: string;     // 定义
  coreLogic: string;      // 核心逻辑
  lifeCase: string;       // 生活案例
  practice: string;       // 实操用法
  relatedPoints: string[]; // 关联知识点ID
  prerequisites: string[]; // 前置知识点ID（空数组=无前置=首个节点）
}

/** 技能树模块 */
export interface ISkillModule {
  id: string;
  name: string;
  icon: string;
  color: string;          // HSL色值
  description: string;
  pointIds: string[];     // 该模块下的知识点ID（有序，按前置顺序）
  subdomain: string;      // 所属子领域ID（如 'social-psychology'）
}

/** 成就 */
export interface IAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  subdomain?: string;      // 所属子领域ID，不设则为全局成就
  condition: {
    type: 'learnCount' | 'learnModule' | 'clearDungeon' | 'reachLevel' | 'useTool' | 'learnAll';
    value?: number;
    moduleId?: string;
    toolId?: string;
    dungeonId?: string;
  };
}

/** 副本题目选项 */
export interface IQuizOption {
  key: string;
  text: string;
  correct: boolean;
  explanation: string;
}

/** 副本题目 */
export interface IQuizQuestion {
  id: string;
  scenario: string;       // 场景描述
  question: string;       // 问题
  options: IQuizOption[];
  relatedPointId: string; // 关联知识点ID
  multiSelect?: boolean;  // 是否多选
}

/** 副本 */
export interface IDungeon {
  id: string;
  name: string;
  description: string;
  difficulty: '简单' | '中等' | '困难';
  icon: string;
  color: string;
  rewardExp: number;
  firstClearBonus: number;
  questions: IQuizQuestion[];
  subdomain?: string;      // 所属子领域ID
}

/** ABC情绪记录 */
export interface IABCRecord {
  id: string;
  event: string;       // A: 诱发事件
  belief: string;      // B: 信念/想法
  consequence: string; // C: 情绪/行为结果
  createdAt: number;
}

/** 认知失调自检记录 */
export interface IDissonanceCheck {
  id: string;
  behavior: string;    // 行为
  belief: string;      // 信念
  conflict: string;    // 冲突描述
  strategy: string;    // 选择的调整策略
  createdAt: number;
}

/** 服从防御三问记录 */
export interface IObedienceDefense {
  id: string;
  authority: string;   // 权威是谁
  request: string;     // 要求内容
  answers: [string, string, string]; // 三问答案
  decision: string;    // 最终决定
  createdAt: number;
}

/** 偏见觉察练习记录 */
export interface IBiasPractice {
  id: string;
  scenario: string;    // 场景
  stereotype: string;  // 识别到的刻板印象
  reflection: string;  // 觉察心得
  createdAt: number;
}

/** 工具箱记录集合 */
export interface IToolRecords {
  abcRecords: IABCRecord[];
  dissonanceChecks: IDissonanceCheck[];
  obedienceDefenses: IObedienceDefense[];
  biasPractices: IBiasPractice[];
}

/** 等级称号映射 */
export interface ILevelTitle {
  level: number;
  title: string;
  requiredExp: number;
}

/** 节点状态 */
export type NodeStatus = 'locked' | 'available' | 'learned';

/** 经验获取事件 */
export interface IExpGainEvent {
  id: string;
  amount: number;
  reason: string;
  timestamp: number;
}

/** 知识点笔记 — 用户探讨后整理的新认知 */
export interface IKnowledgeNote {
  id: string;
  pointId: string;       // 所属知识点ID
  content: string;        // 笔记内容
  createdAt: number;
}

/** 问答笔记 — 学习过程中提出的问题及答案 */
export interface IQARecord {
  id: string;
  pointId: string;       // 所属知识点ID
  pointName: string;     // 所属知识点名称（冗余，方便列表展示）
  question: string;      // 提出的问题
  answer: string;        // AI回答/整理的答案
  createdAt: number;
}

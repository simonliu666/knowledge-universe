import { useState, useMemo } from "react"
import { ChevronDown, ChevronRight, Network, ArrowDown, Check } from "lucide-react"
import { SKILL_MODULES, getPointsByModule } from "@/data/knowledgePoints"
import type { IKnowledgePoint } from "@/types"
import { cn } from "@/lib/utils"

// ============================================================
// 学科架构图数据 — 按子领域定义
// ============================================================

interface ArchModule {
  name: string
  moduleId?: string
  color: string
}

interface ArchLayer {
  name: string
  subtitle: string
  modules: ArchModule[]
}

interface ArchFlow {
  label: string
  highlight?: boolean
}

interface DomainArch {
  title: string
  description: string
  layers: ArchLayer[]
  flows: ArchFlow[]
  logicChain: string
  /** 房子结构的六大部件（地基→支柱→房间→走廊→工具→屋顶），存在时优先渲染房子 */
  house?: HousePart[]
}

/** 房子结构中的单个部件 */
interface HousePart {
  icon: string
  name: string
  subtitle: string
  desc: string
  color: string
  modules?: ArchModule[]
}

/** 学科的建筑类型标注 */
interface ArchType {
  type: string
  icon: string
  meta: string
}

const ARCHITECTURES: Record<string, DomainArch> = {
  "social-psychology": {
    title: "社会心理学 · 学科架构",
    description: "社会心理学遵循「个体内部加工 → 人际互动 → 群体涌现」的递进逻辑，研究他人如何影响我们的思想、感受与行为",
    layers: [
      {
        name: "个体层面",
        subtitle: "你脑子里发生了什么",
        modules: [
          { name: "社会认知", moduleId: "sp-cognition", color: "hsl(195 85% 55%)" },
          { name: "归因理论", moduleId: "sp-attribution", color: "hsl(210 70% 55%)" },
          { name: "内心机制", moduleId: "sp-inner", color: "hsl(265 85% 62%)" },
        ],
      },
      {
        name: "人际层面",
        subtitle: "人与人之间如何互相影响",
        modules: [
          { name: "社会影响", moduleId: "sp-influence", color: "hsl(210 70% 55%)" },
          { name: "态度与说服", moduleId: "sp-attitude", color: "hsl(265 85% 62%)" },
          { name: "人际吸引", moduleId: "sp-interpersonal", color: "hsl(320 70% 58%)" },
          { name: "利他与侵犯", moduleId: "sp-altruism-aggression", color: "hsl(155 70% 50%)" },
        ],
      },
      {
        name: "群体层面",
        subtitle: "多人聚合后涌现的新现象",
        modules: [
          { name: "群体行为", moduleId: "sp-group", color: "hsl(35 85% 60%)" },
        ],
      },
    ],
    flows: [
      { label: "认知加工决定如何接收影响，内心机制调节外部影响的内化" },
      { label: "个体互动聚合为群体动力，群体压力反作用于个体认知与行为", highlight: true },
    ],
    logicChain: "社会认知（怎么想）→ 态度与说服（怎么转变）→ 人际行为（怎么做）→ 群体心理（聚合后会发生什么）",
  },
  "cognitive-psychology": {
    title: "认知心理学 · 学科架构",
    description: "认知心理学遵循「信息输入 → 加工处理 → 输出表达」的计算机隐喻，研究大脑如何接收、处理、存储和提取信息",
    layers: [
      {
        name: "信息输入层",
        subtitle: "外界信息如何进入大脑",
        modules: [
          { name: "知觉与模式识别", moduleId: "cp-perception", color: "hsl(195 85% 55%)" },
          { name: "注意", moduleId: "cp-attention", color: "hsl(210 70% 55%)" },
        ],
      },
      {
        name: "加工与存储层",
        subtitle: "信息如何被处理和保存",
        modules: [
          { name: "记忆", moduleId: "cp-memory", color: "hsl(265 85% 62%)" },
          { name: "思维与问题解决", moduleId: "cp-thinking", color: "hsl(275 75% 58%)" },
          { name: "语言", moduleId: "cp-language", color: "hsl(155 70% 50%)" },
        ],
      },
      {
        name: "前沿拓展层",
        subtitle: "超越经典信息加工范式",
        modules: [
          { name: "具身认知", moduleId: "cp-embodied", color: "hsl(160 70% 45%)" },
        ],
      },
    ],
    flows: [
      { label: "经过注意选择和模式识别的信息进入加工存储系统" },
      { label: "经典信息加工模型之上，具身认知提出身体与环境同样塑造思维", highlight: true },
    ],
    logicChain: "知觉（接收信息）→ 注意（筛选信息）→ 记忆（存储信息）→ 思维（处理信息）→ 语言（表达信息）→ 具身认知（身体参与思维）",
  },
  "personality-psychology": {
    title: "人格心理学 · 学科架构",
    description: "人格心理学从六大理论流派切入，遵循「是什么 → 为什么 → 怎么测 → 怎么用」的研究逻辑，各流派从不同层面解释人格",
    layers: [
      {
        name: "基础概念层",
        subtitle: "人格是什么，如何定义",
        modules: [
          { name: "导论", moduleId: "pp-intro", color: "hsl(195 85% 55%)" },
        ],
      },
      {
        name: "理论解释层",
        subtitle: "六大流派从不同视角解释人格",
        modules: [
          { name: "精神分析", moduleId: "pp-psychoanalysis", color: "hsl(275 75% 58%)" },
          { name: "新精神分析", moduleId: "pp-neo-psychoanalysis", color: "hsl(320 70% 58%)" },
          { name: "特质流派", moduleId: "pp-trait", color: "hsl(175 70% 50%)" },
          { name: "行为主义", moduleId: "pp-behaviorism", color: "hsl(130 60% 48%)" },
          { name: "人本主义", moduleId: "pp-humanistic", color: "hsl(35 85% 58%)" },
          { name: "认知流派", moduleId: "pp-cognitive", color: "hsl(200 80% 55%)" },
        ],
      },
      {
        name: "生物基础层",
        subtitle: "人格的遗传与生理基础",
        modules: [
          { name: "生物流派", moduleId: "pp-biological", color: "hsl(15 75% 55%)" },
        ],
      },
    ],
    flows: [
      { label: "定义清晰后，六大流派从不同层面解释人格的来源与结构" },
      { label: "各流派理论最终汇聚于生物基础，形成完整的人格解释体系", highlight: true },
    ],
    logicChain: "是什么（定义）→ 为什么（六大流派各有侧重）→ 生理基础（遗传与进化）",
  },
  "game-industry-history": {
    title: "游戏行业史 · 学科架构",
    description: "游戏行业80年遵循「平台革命驱动权力更替」的主线——每次硬件平台迁移，都会重塑开发商、发行商与平台方的力量对比",
    layers: [
      {
        name: "萌芽与崩塌期",
        subtitle: "1940s-1983：从实验室玩具到首次泡沫",
        modules: [
          { name: "行业起源与早期发展", moduleId: "eg-history-origin", color: "hsl(45 80% 55%)" },
        ],
      },
      {
        name: "主机王朝期",
        subtitle: "1983-2007：任天堂/索尼/微软三代霸主",
        modules: [
          { name: "主机时代演进", moduleId: "eg-history-console", color: "hsl(200 75% 55%)" },
        ],
      },
      {
        name: "多元爆发期",
        subtitle: "2007-至今：PC平台化与全民移动游戏",
        modules: [
          { name: "PC与移动游戏发展", moduleId: "eg-history-pc-mobile", color: "hsl(150 70% 50%)" },
        ],
      },
    ],
    flows: [
      { label: "雅达利崩盘确立「内容为王」铁律，任天堂以权利金制度重建行业秩序" },
      { label: "从街机到主机到PC/移动，每次平台迁移都重写行业权力格局", highlight: true },
    ],
    logicChain: "街机时代（诞生与崩盘）→ 主机时代（三代霸主更替）→ PC与移动时代（Steam平台与全民化）",
  },
  "game-industry-structure": {
    title: "游戏产业结构 · 学科架构",
    description: "主机、PC、移动三大传统赛道共享用户却在商业模式上分道扬镳——闭环生态、开放长尾与流量为王的三种生存哲学",
    layers: [
      {
        name: "主机赛道",
        subtitle: "硬件补贴+独占内容的生态闭环",
        modules: [
          { name: "主机游戏赛道", moduleId: "eg-console-track", color: "hsl(220 75% 58%)" },
        ],
      },
      {
        name: "PC赛道",
        subtitle: "平台垄断与独立游戏长尾",
        modules: [
          { name: "PC游戏赛道", moduleId: "eg-pc-track", color: "hsl(280 65% 58%)" },
        ],
      },
      {
        name: "移动赛道",
        subtitle: "流量采买与全球化运营",
        modules: [
          { name: "移动游戏赛道", moduleId: "eg-mobile-track", color: "hsl(330 70% 58%)" },
        ],
      },
    ],
    flows: [
      { label: "三大赛道用户高度重叠，但商业模式迥异：主机卖独占、PC卖平台、移动卖流量" },
      { label: "跨平台发行成为大势所趋，赛道边界正在逐渐模糊", highlight: true },
    ],
    logicChain: "主机（生态闭环）→ PC（开放长尾）→ 移动（流量为王）→ 跨平台融合",
  },
  "emerging-tech": {
    title: "新兴技术赛道 · 学科架构",
    description: "云游戏、AI游戏、VR/AR构成行业的第二增长曲线——三条技术路线都在等待自己的「iPhone时刻」",
    layers: [
      {
        name: "云游戏",
        subtitle: "云端渲染+订阅制的渠道革命",
        modules: [
          { name: "云游戏", moduleId: "eg-cloud-gaming", color: "hsl(195 80% 55%)" },
        ],
      },
      {
        name: "AI游戏",
        subtitle: "智能NPC与研发降本",
        modules: [
          { name: "AI游戏", moduleId: "eg-ai-gaming", color: "hsl(265 80% 60%)" },
        ],
      },
      {
        name: "VR/AR与空间计算",
        subtitle: "新交互形态的终端之争",
        modules: [
          { name: "VR/AR与空间计算", moduleId: "eg-vr-ar", color: "hsl(340 75% 58%)" },
        ],
      },
    ],
    flows: [
      { label: "云游戏重构发行渠道，AI重构研发成本曲线，VR/AR重构交互形态" },
      { label: "三大技术的普及速度都取决于杀手级应用何时出现", highlight: true },
    ],
    logicChain: "云游戏（即点即玩）→ AI（智能内容与降本）→ VR/AR（空间计算新终端）",
  },
  "industry-laws-trends": {
    title: "行业规律与趋势 · 学科架构",
    description: "80年发展沉淀出三大核心规律，并指向未来十年的五大演进方向——规律是趋势的地基，趋势是规律的延伸",
    layers: [
      {
        name: "核心规律层",
        subtitle: "驱动行业轮回的底层法则",
        modules: [
          { name: "行业核心规律", moduleId: "eg-core-laws", color: "hsl(35 80% 55%)" },
        ],
      },
      {
        name: "市场格局层",
        subtitle: "中美双极与马太效应",
        modules: [
          { name: "全球市场格局", moduleId: "eg-global-market", color: "hsl(210 70% 55%)" },
        ],
      },
      {
        name: "未来趋势层",
        subtitle: "未来十年的演进方向",
        modules: [
          { name: "未来十年趋势", moduleId: "eg-future-trends", color: "hsl(155 75% 50%)" },
        ],
      },
    ],
    flows: [
      { label: "技术迭代、内容为王、商业模式演变三大规律相互咬合，决定谁能穿越周期" },
      { label: "全民化、AI渗透、订阅制、合规化——趋势是规律在当下的投影", highlight: true },
    ],
    logicChain: "核心规律（为什么这么运转）→ 市场格局（谁在主导）→ 未来趋势（往哪里去）",
  },
  "tesla-empire": {
    title: "特斯拉帝国 · 学科架构",
    description: "特斯拉本质是「电动汽车+能源+AI」三合一平台——汽车贡献现金流，能源贡献第二曲线，AI/机器人承载估值想象力",
    layers: [
      {
        name: "商业与财务层",
        subtitle: "怎么赚钱，值多少钱",
        modules: [
          { name: "商业模式与财报", moduleId: "ts-finance", color: "hsl(0 75% 55%)" },
        ],
      },
      {
        name: "增长引擎层",
        subtitle: "两大新业务曲线",
        modules: [
          { name: "能源业务", moduleId: "ts-energy", color: "hsl(35 80% 55%)" },
          { name: "自动驾驶与机器人", moduleId: "ts-autonomy", color: "hsl(265 80% 60%)" },
        ],
      },
      {
        name: "制造护城河层",
        subtitle: "垂直整合的成本优势",
        modules: [
          { name: "制造与供应链", moduleId: "ts-manufacturing", color: "hsl(200 75% 55%)" },
        ],
      },
    ],
    flows: [
      { label: "汽车业务供血，能源业务增长，FSD/Robotaxi/Optimus决定估值上限" },
      { label: "从挖矿到卖车的垂直整合是一切业务的成本护城河", highlight: true },
    ],
    logicChain: "商业模式（怎么赚钱）→ 能源与AI（新增长引擎）→ 制造体系（成本护城河）→ 万亿估值（为未来买单）",
  },
  "spacex": {
    title: "太空探索 · 学科架构",
    description: "SpaceX以「发射+星链+AI」三引擎运转——可回收火箭是技术底座，星链是现金引擎，星舰与火星是想象力的天花板",
    layers: [
      {
        name: "发射底座层",
        subtitle: "可回收火箭的经济学",
        modules: [
          { name: "火箭与发射", moduleId: "sp-launch", color: "hsl(210 80% 55%)" },
        ],
      },
      {
        name: "现金引擎层",
        subtitle: "星链的规模化变现",
        modules: [
          { name: "星链业务", moduleId: "sp-starlink", color: "hsl(195 85% 55%)" },
        ],
      },
      {
        name: "资本与终局层",
        subtitle: "IPO、并购与火星愿景",
        modules: [
          { name: "财务与战略", moduleId: "sp-strategy", color: "hsl(230 70% 58%)" },
        ],
      },
    ],
    flows: [
      { label: "可回收火箭把发射成本降一个数量级，为星链万颗组网提供廉价运力" },
      { label: "星链赚当下的钱，星舰撑未来的想象力——一台机器两个时代", highlight: true },
    ],
    logicChain: "可回收火箭（技术底座）→ 星链（现金引擎）→ 上市与并购（资本运作）→ 火星殖民（终局愿景）",
  },
  "xai-x": {
    title: "AI与社交帝国 · 学科架构",
    description: "xAI+X构成「数据→模型→算力→变现」的垂直整合栈——社交数据喂模型，模型带流量，算力租给全世界",
    layers: [
      {
        name: "模型与算力层",
        subtitle: "Grok与Colossus超算",
        modules: [
          { name: "xAI与Grok", moduleId: "xai-model", color: "hsl(280 70% 58%)" },
        ],
      },
      {
        name: "社交与数据层",
        subtitle: "X平台的实时数据流",
        modules: [
          { name: "X平台", moduleId: "x-platform", color: "hsl(215 15% 55%)" },
        ],
      },
      {
        name: "融合与财务层",
        subtitle: "数据飞轮与三强竞争",
        modules: [
          { name: "融合战略与财务", moduleId: "xai-strategy", color: "hsl(320 70% 58%)" },
        ],
      },
    ],
    flows: [
      { label: "X的实时数据训练Grok，Grok反哺X的体验——数据飞轮双向赋能" },
      { label: "算力租赁收入已反超模型订阅，「AI包租公」模式异军突起", highlight: true },
    ],
    logicChain: "Grok模型（能力）→ Colossus算力（底座）→ X数据（差异化）→ 算力出租（变现）→ 三强竞争（格局）",
  },
  "frontier-ventures": {
    title: "前沿探索 · 学科架构",
    description: "Neuralink与Boring Company是马斯克版图的两条长期赛道——短期看医疗与基建，长期看人机融合与城市重构",
    layers: [
      {
        name: "脑机接口层",
        subtitle: "Neuralink的人机融合之路",
        modules: [
          { name: "Neuralink脑机接口", moduleId: "nl-brain", color: "hsl(150 70% 50%)" },
        ],
      },
      {
        name: "地下交通层",
        subtitle: "Boring Company的隧道经济学",
        modules: [
          { name: "The Boring Company", moduleId: "bc-tunnel", color: "hsl(30 75% 50%)" },
        ],
      },
      {
        name: "版图全景层",
        subtitle: "协同效应、方法论与风险",
        modules: [
          { name: "企业协同版图", moduleId: "musk-synergy", color: "hsl(45 85% 58%)" },
        ],
      },
    ],
    flows: [
      { label: "脑机接口与地下交通彼此独立，但共享马斯克式的第一性原理降本方法论" },
      { label: "所有前沿押注共享同一个风险源——关键人、资本消耗与技术不确定性", highlight: true },
    ],
    logicChain: "Neuralink（人机融合）→ Boring Company（地下交通）→ 版图全景（协同与风险）",
  },

  // ════════════════════════════════════════════
  // 经济学
  // ════════════════════════════════════════════
  "core-economics": {
    title: "核心经济学 · 学科架构",
    description: "经济学从「稀缺与选择」的根出发——先立经济学思维（基础），再分微观看个体、宏观看整体，最后用方法论检验观点",
    layers: [
      {
        name: "根基层",
        subtitle: "稀缺、机会成本与经济学思维",
        modules: [
          { name: "经济学基础", moduleId: "ec-foundation", color: "hsl(150 40% 45%)" },
        ],
      },
      {
        name: "微观基础层",
        subtitle: "个体决策与市场机制",
        modules: [
          { name: "微观经济学", moduleId: "ec-micro", color: "hsl(150 60% 45%)" },
        ],
      },
      {
        name: "宏观运行层",
        subtitle: "整体经济与政策调控",
        modules: [
          { name: "宏观经济学", moduleId: "ec-macro", color: "hsl(200 65% 50%)" },
        ],
      },
      {
        name: "方法论层",
        subtitle: "实证、模型与因果验证",
        modules: [
          { name: "经济学方法论", moduleId: "ec-methodology", color: "hsl(220 55% 50%)" },
        ],
      },
    ],
    flows: [
      { label: "微观分析个体决策如何通过市场汇总为宏观现象" },
      { label: "宏观政策（货币/财政）反过来影响微观个体的决策环境", highlight: true },
      { label: "方法论（实证/模型/因果推断）为判断经济学观点是否可靠提供标尺" },
    ],
    logicChain: "稀缺与机会成本（基础）→ 供需与价格（微观）→ GDP与通胀（宏观）→ 政策调控 → 实证与模型验证",
    house: [
      {
        icon: "地基",
        name: "我的基本语言与工具",
        subtitle: "先学会用这套语言思考",
        desc: "稀缺、机会成本、边际思维、激励——经济学的一切分析，都先用「代价」和「边际」这套语言，把每个选择翻译成「值不值、多做一点点划不划算」。",
        color: "hsl(150 70% 50%)",
        modules: [{ name: "经济学基础", moduleId: "ec-foundation", color: "hsl(150 70% 50%)" }],
      },
      {
        icon: "支柱",
        name: "我的核心「玩法」有两种",
        subtitle: "撑起整座楼的两种套路",
        desc: "「微观」看个体与市场怎么定价（供求如何决定价格）、「宏观」看整个国家的总量怎么被供需与政策调控——两套玩法，一个管小、一个管大。",
        color: "hsl(200 75% 55%)",
        modules: [
          { name: "微观经济学", moduleId: "ec-micro", color: "hsl(200 75% 55%)" },
          { name: "宏观经济学", moduleId: "ec-macro", color: "hsl(35 75% 55%)" },
        ],
      },
      {
        icon: "房间",
        name: "我分哪些子领域",
        subtitle: "微观与宏观两大房间",
        desc: "微观经济学是「一个房间」——研究个体与市场；宏观经济学是「另一个房间」——研究整体运行。不同房间看同一台经济机器的不同零部件。",
        color: "hsl(150 60% 45%)",
      },
      {
        icon: "走廊",
        name: "哪些领域在互相借东西",
        subtitle: "小房间与大房间之间的通道",
        desc: "微观个体的决策如何「汇总」成宏观总量？宏观政策（降息/涨税）又如何回头改变你手上的钱？这条走廊就是微观↔宏观的传导通道。",
        color: "hsl(265 75% 60%)",
      },
      {
        icon: "工具",
        name: "大家共用的方法",
        subtitle: "全屋通用的检验标尺",
        desc: "实证数据、供求模型、因果推断——判断任何经济学观点「靠不靠谱」的通用工具箱，不专属于哪个房间。",
        color: "hsl(220 65% 55%)",
        modules: [{ name: "经济学方法论", moduleId: "ec-methodology", color: "hsl(220 65% 55%)" }],
      },
      {
        icon: "屋顶",
        name: "我最终能用来做什么",
        subtitle: "这本书的用处（用途是多叉的）",
        desc: "预测价格与宏观趋势；做个人与公司「花最少代价换最大收益」的性价比决策；看懂并评估政府政策。经济学是个多屋顶的房子——政策、投资、定价、消费判断都在它的庇护下。",
        color: "hsl(265 85% 62%)",
      },
    ],
  },
  "applied-economics": {
    title: "应用经济学 · 学科架构",
    description: "行为经济学揭示决策的非理性，博弈论分析策略互动——两者从不同角度挑战传统「理性人」假设，再延伸至金融、劳动、国际等分支落地应用",
    layers: [
      {
        name: "行为层",
        subtitle: "心理偏差与决策非理性",
        modules: [
          { name: "行为经济学", moduleId: "ec-behavioral", color: "hsl(280 55% 55%)" },
        ],
      },
      {
        name: "策略层",
        subtitle: "互动决策与均衡分析",
        modules: [
          { name: "博弈论", moduleId: "ec-game-theory", color: "hsl(35 75% 55%)" },
        ],
      },
      {
        name: "分支应用层",
        subtitle: "金融、劳动、国际、公共、发展、制度与环境经济",
        modules: [
          { name: "主要分支", moduleId: "ec-branches", color: "hsl(260 55% 55%)" },
        ],
      },
    ],
    flows: [
      { label: "行为经济学解释个体为什么偏离理性，博弈论解释多人互动中的策略选择" },
      { label: "行为与策略洞察汇入各分支——金融（风险）、劳动（人力资本）、国际（比较优势）等", highlight: true },
      { label: "分支从主干长出：制度与发展决定长期繁荣，公共与环境应对市场失灵" },
    ],
    logicChain: "认知偏差（行为）→ 策略互动（博弈）→ 各分支落地应用（金融/劳动/国际/公共/发展/制度/环境）",
    house: [
      {
        icon: "地基",
        name: "我的基本语言与工具",
        subtitle: "在核心经济学的屋顶下立起来",
        desc: "应用经济学不重建地基，它站在核心经济学的「理性人」假设和机会成本语言之上，再来回答「人真的那么理性吗？」这个问题。",
        color: "hsl(150 70% 50%)",
      },
      {
        icon: "支柱",
        name: "我的核心「玩法」有两种",
        subtitle: "两队人马在拆理性人",
        desc: "「行为经济学」从个人内部拆——人常因锚定、损失厌恶违背理性；「博弈论」从多人互动拆——你选什么取决于对方猜你会选什么。两种玩法核心都围绕「现实的决策」展开。",
        color: "hsl(280 70% 58%)",
        modules: [
          { name: "行为经济学", moduleId: "ec-behavioral", color: "hsl(280 70% 58%)" },
          { name: "博弈论", moduleId: "ec-game-theory", color: "hsl(35 75% 55%)" },
        ],
      },
      {
        icon: "房间",
        name: "我分哪些子领域",
        subtitle: "从主干长出的各分支房间",
        desc: "金融、劳动、国际、公共、发展、制度与环境——每一个都是一座装着现实问题的具体房间，行为与博弈的洞察被搬进去落地。",
        color: "hsl(260 65% 58%)",
        modules: [{ name: "主要分支", moduleId: "ec-branches", color: "hsl(260 65% 58%)" }],
      },
      {
        icon: "走廊",
        name: "哪些领域在互相借东西",
        subtitle: "洞察在各房间之间流动",
        desc: "行为视角（风险厌恶）渗进金融，人力资本视角渗进劳动，比较优势渗进国际——每根走廊都是一条「把洞察搬进具体领域」的应用通道。",
        color: "hsl(195 85% 55%)",
      },
      {
        icon: "工具",
        name: "大家共用的方法",
        subtitle: "与核心经济学共享工具箱",
        desc: "实证检验、因果推断、田野实验——从与核心经济学共用的方法论工具箱里，拿出严谨的标尺来验证「行为会如何影响真实市场」。",
        color: "hsl(220 65% 55%)",
      },
      {
        icon: "屋顶",
        name: "我最终能用来做什么",
        subtitle: "多幅屋顶：设计、决策与政策",
        desc: "用行为洞察做「助推」式政策设计（推一下普通人做出更优选择）；用博弈论做拍卖、谈判与制度设计；用行为偏差做投资与消费的自我纠偏。应用经济学是多屋顶的落地方。",
        color: "hsl(265 85% 62%)",
      },
    ],
  },

  // ════════════════════════════════════════════
  // 语言学
  // ════════════════════════════════════════════
  "core-linguistics": {
    title: "核心语言学 · 学科架构",
    description: "语言学从语音到意义层层递进——语音学管「声音」，句法学管「结构」，语义学管「意义」，构成语言的形式分析体系",
    layers: [
      {
        name: "语音层",
        subtitle: "语言的物质载体",
        modules: [
          { name: "语音学", moduleId: "phonetics", color: "hsl(0 60% 50%)" },
        ],
      },
      {
        name: "结构层",
        subtitle: "符号的组织规则",
        modules: [
          { name: "句法学", moduleId: "syntax", color: "hsl(210 60% 50%)" },
        ],
      },
      {
        name: "意义层",
        subtitle: "符号承载的内容",
        modules: [
          { name: "语义学", moduleId: "semantics", color: "hsl(280 50% 55%)" },
        ],
      },
    ],
    flows: [
      { label: "语音组成词句（句法组织），词句表达意义（语义解读）" },
      { label: "三层从物质到结构到意义，逐层抽象，构成语言的完整形式系统", highlight: true },
    ],
    logicChain: "语音（声音）→ 句法（结构）→ 语义（意义）",
  },
  "applied-linguistics": {
    title: "应用语言学 · 学科架构",
    description: "语用学研究语境中的语言使用——不只是说了什么，更关注为什么这么说、听者如何理解，是语言学的「使用层」",
    layers: [
      {
        name: "语用层",
        subtitle: "语境中的意义构建",
        modules: [
          { name: "语用学", moduleId: "pragmatics", color: "hsl(150 55% 45%)" },
        ],
      },
    ],
    flows: [
      { label: "语义学研究字面意义，语用学研究语境中的实际意义——说话人意图、听者推理、社会规范", highlight: true },
    ],
    logicChain: "字面意义（语义）→ 语境意义（语用）→ 交际效果",
  },

  // ════════════════════════════════════════════
  // 社会学
  // ════════════════════════════════════════════
  "social-structure-culture": {
    title: "社会结构与文化 · 学科架构",
    description: "社会学从静态结构切入——社会如何分层、角色如何分配、制度如何运行、文化如何传承，构成社会的「 anatomy 」",
    layers: [
      {
        name: "结构层",
        subtitle: "社会的骨架与组织",
        modules: [
          { name: "社会结构", moduleId: "social-structure", color: "hsl(210 55% 48%)" },
        ],
      },
      {
        name: "文化层",
        subtitle: "社会的软件与传承",
        modules: [
          { name: "文化与社会", moduleId: "culture", color: "hsl(280 50% 55%)" },
        ],
      },
    ],
    flows: [
      { label: "结构是社会的硬件（谁在什么位置），文化是社会的软件（人们信什么、怎么做）" },
      { label: "结构塑造文化，文化反过来维系结构——两者构成社会的稳定基础", highlight: true },
    ],
    logicChain: "阶层与角色（结构）→ 价值观与规范（文化）→ 社会再生产",
  },
  "social-dynamics": {
    title: "社会动态 · 学科架构",
    description: "社会学从动态变化切入——社会如何现代化、全球化如何冲击本土、集体行动如何改变规则、越轨如何被控制",
    layers: [
      {
        name: "变迁层",
        subtitle: "社会的运动与演化",
        modules: [
          { name: "社会变迁", moduleId: "social-change", color: "hsl(150 55% 45%)" },
        ],
      },
      {
        name: "控制层",
        subtitle: "秩序与偏差的博弈",
        modules: [
          { name: "越轨与社会控制", moduleId: "deviance", color: "hsl(0 55% 50%)" },
        ],
      },
    ],
    flows: [
      { label: "变迁产生新的越轨形式，社会控制回应以新的规范和制裁" },
      { label: "动态平衡：变迁打破秩序→控制重建秩序→新变迁再次冲击——社会就在这个循环中演化", highlight: true },
    ],
    logicChain: "现代化与全球化（变迁）→ 规范失效与越轨出现 → 社会控制回应 → 新秩序",
  },
}

// ============================================================
// 各学科「建筑类型」标注 — 判断每门学科最像哪种建筑
// ============================================================

/** 房子结构的六大部件（自上而下阅读顺序） */
const HOUSE_STEPS = ["地基", "支柱", "房间", "走廊", "工具", "屋顶"]

/** 每个子领域的建筑类型：type=最贴切的建筑 / meta=一句说明 */
const SUBDOMAIN_TYPES: Record<string, ArchType> = {
  // ── 心理学（漏斗/递归型，不适合房子）──
  "social-psychology": { type: "楼层·递进漏斗", icon: "🏢", meta: "个体→人际→群体，层级放大" },
  "cognitive-psychology": { type: "管道·流水线", icon: "⚙️", meta: "输入→加工→存储→输出" },
  "personality-psychology": { type: "并列流派树", icon: "🌲", meta: "六根支柱同根而分立" },
  // ── 经济学（成熟应用型，最适合房子）──
  "core-economics": { type: "房子·六件套", icon: "🏠", meta: "地基/支柱/房间/走廊/工具/屋顶" },
  "applied-economics": { type: "房子·六件套", icon: "🏠", meta: "在核心之上落地多屋顶" },
  // ── 语言学（层级+矩阵交叉）──
  "core-linguistics": { type: "楼层·层级堆叠", icon: "🏗️", meta: "语音→结构→意义逐层抽象" },
  "applied-linguistics": { type: "单间·使用层", icon: "🚪", meta: "挂在形式系统之上的应用层" },
  // ── 社会学（静态与动态双模态）──
  "social-structure-culture": { type: "并列双房", icon: "🏠", meta: "结构（硬件）+文化（软件）" },
  "social-dynamics": { type: "循环·反馈环", icon: "🔄", meta: "变迁→控制→再变迁" },
  // ── 电子游戏（并列赛道/时间线）──
  "game-industry-history": { type: "河流·时间线", icon: "🌊", meta: "街机→主机→PC/移动" },
  "game-industry-structure": { type: "并列三道", icon: "🛤️", meta: "主机/PC/移动三赛道并行" },
  "emerging-tech": { type: "并列三线", icon: "🚀", meta: "云/AI/空间计算三条增长线" },
  "industry-laws-trends": { type: "漏斗·推导", icon: "⏳", meta: "规律→格局→未来趋势" },
  // ── 马斯克（引擎/飞轮型）──
  "tesla-empire": { type: "三引擎平台", icon: "⚙️", meta: "汽车供血+能源+AI定估值" },
  "spacex": { type: "三引擎平台", icon: "🚀", meta: "可回收底座+星链现金+火星天花板" },
  "xai-x": { type: "飞轮·循环", icon: "🔄", meta: "数据→模型→算力→变现" },
  "frontier-ventures": { type: "并列双押注", icon: "🎲", meta: "脑机+地下交通+版图全景" },
}

/** 根据房子部件颜色取知识点状态色的辅助函数 */
function partStateColor(part: HousePart, learned: number, total: number): string {
  if (total > 0 && learned === total) return "hsl(155 70% 50%)"
  if (learned > 0) return "hsl(35 85% 60%)"
  return part.color
}

// ============================================================
// 学科架构图组件（含知识点列表）
// ============================================================

interface DomainArchitectureViewProps {
  subdomainId: string
  learnedPoints: string[]
  onPointClick?: (point: IKnowledgePoint) => void
}

export function DomainArchitectureView({ subdomainId, learnedPoints, onPointClick }: DomainArchitectureViewProps) {
  const [expanded, setExpanded] = useState(true)
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
  const arch = ARCHITECTURES[subdomainId]
  const archType = SUBDOMAIN_TYPES[subdomainId]

  const learnedSet = useMemo(() => new Set(learnedPoints), [learnedPoints])

  if (!arch) return null

  function toggleModule(moduleId: string) {
    setExpandedModules((prev) => {
      const next = new Set(prev)
      if (next.has(moduleId)) {
        next.delete(moduleId)
      } else {
        next.add(moduleId)
      }
      return next
    })
  }

  function getModulePoints(moduleId?: string): IKnowledgePoint[] {
    if (!moduleId) return []
    return getPointsByModule(moduleId)
  }

  function getModuleProgress(moduleId?: string): { learned: number; total: number } {
    const pts = getModulePoints(moduleId)
    if (pts.length === 0) return { learned: 0, total: 0 }
    let learned = 0
    for (const p of pts) {
      if (learnedSet.has(p.id)) learned++
    }
    return { learned, total: pts.length }
  }

  return (
    <div className="rounded-lg border border-border/60 bg-card/50 overflow-hidden">
      {/* 标题栏 */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2.5 px-4 py-3 text-left transition-colors hover:bg-muted/40"
      >
        <Network className="h-4 w-4 shrink-0 text-accent" />
        <span className="text-sm font-medium text-foreground">{arch.title}</span>
        {archType && (
          <span
            className="rounded border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary"
            title={`建筑类型：${archType.type} — ${archType.meta}`}
          >
            {archType.icon} {archType.type}
          </span>
        )}
        <span className="ml-auto shrink-0 text-muted-foreground">
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </span>
      </button>

      {expanded && (
        <div className="space-y-3 px-4 pb-4">
          {/* 架构描述 */}
          <p className="text-xs leading-relaxed text-muted-foreground">{arch.description}</p>

          {/* 六步小引导条 */}
          {arch.house && (
            <div className="flex flex-wrap items-center gap-1 text-[10px] text-muted-foreground">
              {HOUSE_STEPS.map((step, i) => (
                <span key={step} className="flex items-center gap-1">
                  {i > 0 && <span className="text-muted-foreground/50">→</span>}
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">{step}</span>
                </span>
              ))}
            </div>
          )}

          {/* 房子结构 */}
          {arch.house && (
            <div className="space-y-2">
              {arch.house.map((part, partIdx) => {
                const partModules = part.modules || []
                const total = partModules.reduce((n, m) => n + getModuleProgress(m.moduleId).total, 0)
                const learned = partModules.reduce((n, m) => n + getModuleProgress(m.moduleId).learned, 0)
                return (
                  <div key={partIdx}>
                    <div className="rounded-lg border border-dashed border-border/50 bg-muted/20 p-3">
                      <div className="mb-2 flex items-center gap-2.5">
                        <span
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-foreground"
                          style={{ backgroundColor: `${part.color}26`, border: `1px solid ${partStateColor(part, learned, total)}`, boxShadow: `0 0 8px ${part.color}40` }}
                        >
                          {part.icon.slice(0, 2)}
                        </span>
                        <span className="text-sm font-semibold text-foreground">{part.name}</span>
                        <span className="text-xs text-muted-foreground">· {part.subtitle}</span>
                        {total > 0 && (
                          <span className="ml-auto shrink-0 text-xs font-bold text-muted-foreground">
                            {learned}/{total}
                          </span>
                        )}
                      </div>

                      <p className="mb-2.5 text-xs leading-relaxed text-muted-foreground">{part.desc}</p>

                      {/* 可展开的知识点卡片 */}
                      {partModules.length > 0 && (
                        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                          {partModules.map((mod) => {
                            const prog = getModuleProgress(mod.moduleId)
                            const isComplete = prog.total > 0 && prog.learned === prog.total
                            const isPartial = prog.learned > 0 && prog.learned < prog.total
                            const isExpanded = mod.moduleId && expandedModules.has(mod.moduleId)
                            const modPoints = getModulePoints(mod.moduleId)

                            return (
                              <div
                                key={mod.name}
                                className={cn(
                                  "relative overflow-hidden rounded-lg border transition-all",
                                  isComplete
                                    ? "border-success/40 bg-success/5"
                                    : isPartial
                                      ? "border-warning/40 bg-warning/5"
                                      : isExpanded
                                        ? "border-primary/40 bg-card"
                                        : "border-border/60 bg-card hover:border-primary/30"
                                )}
                              >
                                <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: partStateColor(part, learned, total), opacity: 0.7 }} />
                                <button
                                  onClick={() => mod.moduleId && toggleModule(mod.moduleId)}
                                  className="flex w-full items-center gap-2 pl-3 pr-2.5 py-2.5 text-left"
                                >
                                  <span className="text-sm font-medium text-foreground">{mod.name}</span>
                                  {prog.total > 0 && (
                                    <span className={cn("text-xs font-bold", isComplete && "text-success", isPartial && "text-warning-text", !isComplete && !isPartial && "text-muted-foreground")}>
                                      {prog.learned}/{prog.total}
                                    </span>
                                  )}
                                  {isComplete && <Check className="h-3.5 w-3.5 shrink-0 text-success" />}
                                  <span className="ml-auto shrink-0 text-muted-foreground">
                                    {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                                  </span>
                                </button>

                                {isExpanded && modPoints.length > 0 && (
                                  <div className="border-t border-border/40 bg-muted/10">
                                    {modPoints.map((point, idx) => {
                                      const isLearned = learnedSet.has(point.id)
                                      return (
                                        <div
                                          key={point.id}
                                          className="flex items-center gap-2 pl-5 pr-3 py-2 cursor-pointer hover:bg-primary/5 transition-colors"
                                          onClick={() => onPointClick?.(point)}
                                          role="button"
                                          tabIndex={0}
                                          onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                              e.preventDefault()
                                              onPointClick?.(point)
                                            }
                                          }}
                                        >
                                          <span className="shrink-0 font-mono text-xs text-muted-foreground/40">{idx + 1}.</span>
                                          <span className={cn("h-2 w-2 shrink-0 rounded-full border-2 transition-all", isLearned && "border-success bg-success", !isLearned && "border-primary/40 bg-primary/15")} />
                                          <span className={cn("flex-1 text-sm", isLearned ? "text-foreground/70" : "text-foreground")}>{point.name}</span>
                                          <span className="shrink-0 text-xs text-muted-foreground">{isLearned ? "已掌握" : "点击查看"}</span>
                                        </div>
                                      )
                                    })}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    {/* 相邻部件连接 */}
                    {partIdx < arch.house!.length - 1 && (
                      <div className="flex items-center justify-center py-1">
                        <ArrowDown className="h-3.5 w-3.5 text-primary/70" />
                      </div>
                    )}
                  </div>
                )
              })}

              {/* 核心逻辑链 */}
              <div className="rounded-lg border border-accent/30 bg-accent/5 p-3">
                <div className="mb-1 flex items-center gap-1.5">
                  <span className="text-xs font-bold tracking-wide text-accent">满房贯通 · 核心逻辑链</span>
                </div>
                <p className="text-xs leading-relaxed text-foreground/90">{arch.logicChain}</p>
              </div>
            </div>
          )}

          {/* 三层架构 */}
          {!arch.house && (
          <div className="space-y-2">
            {arch.layers.map((layer, layerIdx) => (
              <div key={layerIdx}>
                {/* 层级容器 */}
                <div className="rounded-lg border border-dashed border-border/50 bg-muted/20 p-3">
                  {/* 层级标题 */}
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded bg-primary/15 px-1.5 py-0.5 text-xs font-semibold text-primary">
                      L{layerIdx + 1}
                    </span>
                    <span className="text-sm font-medium text-foreground">{layer.name}</span>
                    <span className="text-xs text-muted-foreground">· {layer.subtitle}</span>
                  </div>

                  {/* 模块卡片 */}
                  <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                    {layer.modules.map((mod) => {
                      const prog = getModuleProgress(mod.moduleId)
                      const isComplete = prog.total > 0 && prog.learned === prog.total
                      const isPartial = prog.learned > 0 && prog.learned < prog.total
                      const isExpanded = mod.moduleId && expandedModules.has(mod.moduleId)
                      const modPoints = getModulePoints(mod.moduleId)

                      return (
                        <div
                          key={mod.name}
                          className={cn(
                            "relative overflow-hidden rounded-lg border transition-all",
                            isComplete
                              ? "border-success/40 bg-success/5"
                              : isPartial
                                ? "border-warning/40 bg-warning/5"
                                : isExpanded
                                  ? "border-primary/40 bg-card"
                                  : "border-border/60 bg-card hover:border-primary/30"
                          )}
                        >
                          {/* 左侧色条 */}
                          <div
                            className="absolute left-0 top-0 h-full w-1"
                            style={{ backgroundColor: mod.color, opacity: 0.7 }}
                          />

                          {/* 模块头部（可点击展开） */}
                          <button
                            onClick={() => mod.moduleId && toggleModule(mod.moduleId)}
                            disabled={!mod.moduleId}
                            className="flex w-full items-center gap-2 pl-3 pr-2.5 py-2.5 text-left"
                          >
                            <span className="text-sm font-medium text-foreground">{mod.name}</span>
                            {prog.total > 0 && (
                              <span className={cn(
                                "text-xs font-bold",
                                isComplete && "text-success",
                                isPartial && "text-warning-text",
                                !isComplete && !isPartial && "text-muted-foreground"
                              )}>
                                {prog.learned}/{prog.total}
                              </span>
                            )}
                            {isComplete && <Check className="h-3.5 w-3.5 shrink-0 text-success" />}
                            <span className="ml-auto shrink-0 text-muted-foreground">
                              {isExpanded
                                ? <ChevronDown className="h-3.5 w-3.5" />
                                : <ChevronRight className="h-3.5 w-3.5" />
                              }
                            </span>
                          </button>

                          {/* 知识点列表 */}
                          {isExpanded && modPoints.length > 0 && (
                            <div className="border-t border-border/40 bg-muted/10">
                              {modPoints.map((point, idx) => {
                                const isLearned = learnedSet.has(point.id)
                                return (
                                  <div
                                    key={point.id}
                                    className="flex items-center gap-2 pl-5 pr-3 py-2 cursor-pointer hover:bg-primary/5 transition-colors"
                                    onClick={() => onPointClick?.(point)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault()
                                        onPointClick?.(point)
                                      }
                                    }}
                                  >
                                    {/* 编号 */}
                                    <span className="shrink-0 font-mono text-xs text-muted-foreground/40">
                                      {idx + 1}.
                                    </span>
                                    {/* 状态点 */}
                                    <span
                                      className={cn(
                                        "h-2 w-2 shrink-0 rounded-full border-2 transition-all",
                                        isLearned && "border-success bg-success",
                                        !isLearned && "border-primary/40 bg-primary/15",
                                      )}
                                    />
                                    {/* 名称 */}
                                    <span className={cn(
                                      "flex-1 text-sm",
                                      isLearned ? "text-foreground/70" : "text-foreground"
                                    )}>
                                      {point.name}
                                    </span>
                                    {/* 状态文字 */}
                                    <span className="shrink-0 text-xs text-muted-foreground">
                                      {isLearned ? "已掌握" : "点击查看"}
                                    </span>
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* 层间逻辑关系 */}
                {layerIdx < arch.flows.length && (
                  <div className="flex items-center justify-center py-1.5">
                    <div className="flex flex-col items-center gap-0.5">
                      <ArrowDown className={cn(
                        "h-3.5 w-3.5",
                        arch.flows[layerIdx].highlight ? "text-primary" : "text-muted-foreground"
                      )} />
                      <span className={cn(
                        "text-xs",
                        arch.flows[layerIdx].highlight ? "text-primary" : "text-muted-foreground"
                      )}>
                        {arch.flows[layerIdx].label}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          )}

          {/* 核心逻辑链 */}
          <div className="rounded-lg border border-accent/30 bg-accent/5 p-3">
            <div className="mb-1 flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-wide text-accent">核心逻辑链</span>
            </div>
            <p className="text-xs leading-relaxed text-foreground/90">{arch.logicChain}</p>
          </div>
        </div>
      )}
    </div>
  )
}

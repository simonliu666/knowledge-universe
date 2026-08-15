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
        <span className="ml-auto shrink-0 text-muted-foreground">
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </span>
      </button>

      {expanded && (
        <div className="space-y-3 px-4 pb-4">
          {/* 架构描述 */}
          <p className="text-xs leading-relaxed text-muted-foreground">{arch.description}</p>

          {/* 三层架构 */}
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
                      const isExpanded = mod.moduleId && expandedModules.has(mod.moduleId)
                      const modPoints = getModulePoints(mod.moduleId)

                      return (
                        <div
                          key={mod.name}
                          className={cn(
                            "relative overflow-hidden rounded-lg border transition-all",
                            isComplete
                              ? "border-success/40 bg-success/5"
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
                                isComplete ? "text-success" : "text-muted-foreground"
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

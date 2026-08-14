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

  // ════════════════════════════════════════════
  // 电子游戏领域
  // ════════════════════════════════════════════
  "game-industry-history": {
    title: "游戏行业史 · 学科架构",
    description: "从1947年首个专利到2026年万亿级产业，80年发展历经「街机诞生 → 主机争霸 → PC与移动普及」三大时代跨越",
    layers: [
      {
        name: "起源时代",
        subtitle: "1947-1983 · 从实验室到街机厅",
        modules: [
          { name: "行业起源与早期发展", moduleId: "eg-history-origin", color: "hsl(45 80% 55%)" },
        ],
      },
      {
        name: "主机时代",
        subtitle: "1983-2010 · 三代霸主更替",
        modules: [
          { name: "主机时代演进", moduleId: "eg-history-console", color: "hsl(210 75% 55%)" },
        ],
      },
      {
        name: "多元时代",
        subtitle: "2010至今 · PC与移动全面普及",
        modules: [
          { name: "PC与移动游戏发展", moduleId: "eg-history-pc-mobile", color: "hsl(280 60% 55%)" },
        ],
      },
    ],
    flows: [
      { label: "雅达利崩盘后任天堂重建行业秩序，开启主机黄金时代" },
      { label: "智能手机普及打破主机垄断，开启全民游戏时代", highlight: true },
    ],
    logicChain: "街机诞生 → 雅达利崩盘 → 任天堂/索尼/微软三代主机争霸 → Steam赋能PC → 移动游戏全民化",
  },
  "game-industry-structure": {
    title: "游戏产业结构 · 学科架构",
    description: "主机、PC、移动三大赛道各有差异化竞争逻辑——硬件入口、分发渠道与商业模式构成赛道护城河",
    layers: [
      {
        name: "传统三大赛道",
        subtitle: "硬件入口决定生态格局",
        modules: [
          { name: "主机游戏赛道", moduleId: "eg-console-track", color: "hsl(210 75% 55%)" },
          { name: "PC游戏赛道", moduleId: "eg-pc-track", color: "hsl(195 80% 55%)" },
          { name: "移动游戏赛道", moduleId: "eg-mobile-track", color: "hsl(280 60% 55%)" },
        ],
      },
    ],
    flows: [
      { label: "主机靠硬件补贴+独占内容，PC靠平台分发垄断，移动靠免费+内购变现", highlight: true },
    ],
    logicChain: "主机（索尼/微软/任天堂三足鼎立）→ PC（Steam垄断+独立游戏）→ 移动（国内三强+全球化运营）",
  },
  "emerging-tech": {
    title: "新兴技术赛道 · 学科架构",
    description: "云游戏、AI游戏、VR/AR空间计算——三条技术路线从不同维度重塑游戏产业的生产与体验方式",
    layers: [
      {
        name: "云端化",
        subtitle: "算力上云，终端解放",
        modules: [
          { name: "云游戏", moduleId: "eg-cloud-gaming", color: "hsl(195 80% 55%)" },
        ],
      },
      {
        name: "智能化",
        subtitle: "AI重塑研发与体验",
        modules: [
          { name: "AI游戏", moduleId: "eg-ai-gaming", color: "hsl(280 60% 55%)" },
        ],
      },
      {
        name: "空间化",
        subtitle: "从屏幕到沉浸",
        modules: [
          { name: "VR/AR与空间计算", moduleId: "eg-vr-ar", color: "hsl(45 80% 55%)" },
        ],
      },
    ],
    flows: [
      { label: "云游戏解决终端算力瓶颈，为AI和VR提供算力基础" },
      { label: "三条路线最终交汇于「随时随地、智能生成的沉浸体验」", highlight: true },
    ],
    logicChain: "云游戏（算力解放）→ AI游戏（智能生成+降本增效）→ VR/AR（空间沉浸体验）",
  },
  "industry-laws-trends": {
    title: "行业规律与趋势 · 学科架构",
    description: "80年发展沉淀三大核心规律，未来十年五大趋势重塑产业格局——从技术驱动到生态重构",
    layers: [
      {
        name: "核心规律层",
        subtitle: "历史沉淀的不变法则",
        modules: [
          { name: "行业核心规律", moduleId: "eg-core-laws", color: "hsl(35 80% 55%)" },
        ],
      },
      {
        name: "市场格局层",
        subtitle: "全球竞争与马太效应",
        modules: [
          { name: "全球市场格局", moduleId: "eg-global-market", color: "hsl(210 75% 55%)" },
        ],
      },
      {
        name: "未来趋势层",
        subtitle: "下一个十年的五大方向",
        modules: [
          { name: "未来十年趋势", moduleId: "eg-future-trends", color: "hsl(280 60% 55%)" },
        ],
      },
    ],
    flows: [
      { label: "核心规律贯穿历史，决定市场格局的演化方向" },
      { label: "市场格局的未来演变路径由五大趋势共同驱动", highlight: true },
    ],
    logicChain: "核心规律（技术迭代·内容为王·模式演变）→ 市场格局（中美双极·马太效应）→ 未来趋势（全民化·AI·订阅·合规）",
  },

  // ════════════════════════════════════════════
  // 马斯克企业版图
  // ════════════════════════════════════════════
  "tesla-empire": {
    title: "特斯拉帝国 · 学科架构",
    description: "特斯拉不是汽车公司，而是「电动汽车+能源+AI服务」三合一平台——三大业务形成飞轮，从硬件到软件到生态",
    layers: [
      {
        name: "商业基础层",
        subtitle: "赚钱的根基与财务表现",
        modules: [
          { name: "商业模式与财报", moduleId: "ts-finance", color: "hsl(0 75% 55%)" },
          { name: "制造与供应链", moduleId: "ts-manufacturing", color: "hsl(200 75% 55%)" },
        ],
      },
      {
        name: "增长曲线层",
        subtitle: "第二增长引擎",
        modules: [
          { name: "能源业务", moduleId: "ts-energy", color: "hsl(35 80% 55%)" },
        ],
      },
      {
        name: "终局想象层",
        subtitle: "AI驱动的未来估值",
        modules: [
          { name: "自动驾驶与机器人", moduleId: "ts-autonomy", color: "hsl(265 80% 60%)" },
        ],
      },
    ],
    flows: [
      { label: "汽车销售带来现金流，制造能力支撑能源业务扩张" },
      { label: "能源业务提供增长第二曲线，AI/Robotaxi代表终局估值想象力", highlight: true },
    ],
    logicChain: "汽车赚钱（现金流）→ 能源增长（第二曲线）→ AI自动驾驶（终局估值）",
  },
  "spacex": {
    title: "太空探索 · 学科架构",
    description: "SpaceX通过可回收火箭颠覆发射经济学，星链构建卫星互联网护城河，火星殖民是终局愿景——三层业务递进",
    layers: [
      {
        name: "技术基础层",
        subtitle: "可回收火箭颠覆成本结构",
        modules: [
          { name: "火箭与发射", moduleId: "sp-launch", color: "hsl(210 80% 55%)" },
        ],
      },
      {
        name: "商业变现层",
        subtitle: "卫星互联网构建现金流",
        modules: [
          { name: "星链业务", moduleId: "sp-starlink", color: "hsl(195 85% 55%)" },
        ],
      },
      {
        name: "战略终局层",
        subtitle: "IPO、火星与文明备份",
        modules: [
          { name: "财务与战略", moduleId: "sp-strategy", color: "hsl(230 70% 58%)" },
        ],
      },
    ],
    flows: [
      { label: "可回收技术降低发射成本，为星链大规模组网提供经济可行性" },
      { label: "星链现金流支撑火星殖民的长期投入，形成商业闭环", highlight: true },
    ],
    logicChain: "火箭回收（降本）→ 星链组网（变现）→ 火星殖民（终局）",
  },
  "xai-x": {
    title: "AI与社交帝国 · 学科架构",
    description: "xAI构建大模型能力，X平台提供实时数据飞轮，两者融合形成「数据→模型→用户→更多数据」的AI竞争闭环",
    layers: [
      {
        name: "AI能力层",
        subtitle: "大模型与算力基建",
        modules: [
          { name: "xAI与Grok", moduleId: "xai-model", color: "hsl(280 70% 58%)" },
        ],
      },
      {
        name: "数据与平台层",
        subtitle: "社交平台提供实时数据",
        modules: [
          { name: "X平台", moduleId: "x-platform", color: "hsl(215 15% 55%)" },
        ],
      },
      {
        name: "融合战略层",
        subtitle: "数据飞轮与竞争格局",
        modules: [
          { name: "融合战略与财务", moduleId: "xai-strategy", color: "hsl(320 70% 58%)" },
        ],
      },
    ],
    flows: [
      { label: "X平台的实时数据反哺xAI模型训练，形成数据飞轮" },
      { label: "融合后的AI+社交能力与OpenAI、Google形成三强竞争", highlight: true },
    ],
    logicChain: "xAI大模型（能力）+ X平台（数据）→ 数据飞轮（闭环）→ AI三强竞争（格局）",
  },
  "frontier-ventures": {
    title: "前沿探索 · 学科架构",
    description: "Neuralink突破脑机接口、Boring Company重塑地下交通、企业协同版图串联所有业务——马斯克方法论的核心实践",
    layers: [
      {
        name: "前沿技术层",
        subtitle: "颠覆性技术赛道",
        modules: [
          { name: "Neuralink脑机接口", moduleId: "nl-brain", color: "hsl(150 70% 50%)" },
          { name: "The Boring Company", moduleId: "bc-tunnel", color: "hsl(30 75% 50%)" },
        ],
      },
      {
        name: "协同战略层",
        subtitle: "企业版图全景与方法论",
        modules: [
          { name: "企业协同版图", moduleId: "musk-synergy", color: "hsl(45 85% 58%)" },
        ],
      },
    ],
    flows: [
      { label: "各前沿企业独立探索，但共享第一性原理方法论与资源协同", highlight: true },
    ],
    logicChain: "Neuralink（脑机）+ Boring Company（交通）→ 企业协同版图（第一性原理贯穿）→ 风险与机遇并存",
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

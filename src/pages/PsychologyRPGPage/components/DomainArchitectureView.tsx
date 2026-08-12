import { useState, useMemo } from "react"
import { ChevronDown, ChevronUp, Network, ArrowDown } from "lucide-react"
import { SKILL_MODULES } from "@/data/knowledgePoints"
import { cn } from "@/lib/utils"

// ============================================================
// 学科架构图数据 — 按子领域定义
// ============================================================

interface ArchModule {
  name: string
  moduleId?: string
  points: string
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
  flows: ArchFlow[] // 层与层之间的逻辑关系，长度 = layers.length - 1
  logicChain: string // 核心逻辑链一句话
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
          { name: "社会认知", moduleId: "sp-cognition", points: "刻板印象 · 偏见 · 歧视", color: "hsl(195 85% 55%)" },
          { name: "归因理论", moduleId: "sp-attribution", points: "基本归因错误 · 自我服务偏差", color: "hsl(210 70% 55%)" },
          { name: "内心机制", moduleId: "sp-inner", points: "ABC · 认知失调 · 努力辩护", color: "hsl(265 85% 62%)" },
        ],
      },
      {
        name: "人际层面",
        subtitle: "人与人之间如何互相影响",
        modules: [
          { name: "社会影响", moduleId: "sp-influence", points: "从众 · 服从 · 登门槛 · 互惠", color: "hsl(210 70% 55%)" },
          { name: "态度与说服", moduleId: "sp-attitude", points: "中心路径 · 外周路径", color: "hsl(265 85% 62%)" },
          { name: "人际吸引", moduleId: "sp-interpersonal", points: "吸引 · 亲密 · 社会交往", color: "hsl(320 70% 58%)" },
          { name: "利他与侵犯", moduleId: "sp-altruism-aggression", points: "利他 · 攻击 · 旁观者效应", color: "hsl(155 70% 50%)" },
        ],
      },
      {
        name: "群体层面",
        subtitle: "多人聚合后涌现的新现象",
        modules: [
          { name: "群体行为", moduleId: "sp-group", points: "群体极化 · 群体思维", color: "hsl(35 85% 60%)" },
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
          { name: "知觉与模式识别", moduleId: "cp-perception", points: "知觉组织 · 模式识别 · 自上/下加工", color: "hsl(195 85% 55%)" },
          { name: "注意", moduleId: "cp-attention", points: "选择性注意 · 过滤器 · 资源分配", color: "hsl(210 70% 55%)" },
        ],
      },
      {
        name: "加工与存储层",
        subtitle: "信息如何被处理和保存",
        modules: [
          { name: "记忆", moduleId: "cp-memory", points: "感觉记忆 · 短时记忆 · 长时记忆", color: "hsl(265 85% 62%)" },
          { name: "思维与问题解决", moduleId: "cp-thinking", points: "概念 · 推理 · 决策", color: "hsl(275 75% 58%)" },
          { name: "语言", moduleId: "cp-language", points: "语言理解 · 语言产生", color: "hsl(155 70% 50%)" },
        ],
      },
    ],
    flows: [
      { label: "经过注意选择和模式识别的信息进入加工存储系统", highlight: true },
    ],
    logicChain: "知觉（接收信息）→ 注意（筛选信息）→ 记忆（存储信息）→ 思维（处理信息）→ 语言（表达信息）",
  },
  "personality-psychology": {
    title: "人格心理学 · 学科架构",
    description: "人格心理学从六大理论流派切入，遵循「是什么 → 为什么 → 怎么测 → 怎么用」的研究逻辑，各流派从不同层面解释人格",
    layers: [
      {
        name: "基础概念层",
        subtitle: "人格是什么，如何定义",
        modules: [
          { name: "导论", moduleId: "pp-intro", points: "定义 · 简史 · 六大流派概述", color: "hsl(195 85% 55%)" },
        ],
      },
      {
        name: "理论解释层",
        subtitle: "六大流派从不同视角解释人格",
        modules: [
          { name: "精神分析", moduleId: "pp-psychoanalysis", points: "潜意识 · 人格结构 · 心理性欲", color: "hsl(275 75% 58%)" },
          { name: "新精神分析", moduleId: "pp-neo-psychoanalysis", points: "阿德勒 · 荣格 · 埃里克森 · 霍妮", color: "hsl(320 70% 58%)" },
          { name: "特质流派", moduleId: "pp-trait", points: "奥尔波特 · 卡特尔 · 大五", color: "hsl(175 70% 50%)" },
          { name: "行为主义", moduleId: "pp-behaviorism", points: "条件反射 · 社会学习 · 习得无助", color: "hsl(130 60% 48%)" },
          { name: "人本主义", moduleId: "pp-humanistic", points: "罗杰斯 · 马斯洛 · 自尊", color: "hsl(35 85% 58%)" },
          { name: "认知流派", moduleId: "pp-cognitive", points: "个人建构 · 认知风格 · 自我图式", color: "hsl(200 80% 55%)" },
        ],
      },
      {
        name: "生物基础层",
        subtitle: "人格的遗传与生理基础",
        modules: [
          { name: "生物流派", moduleId: "pp-biological", points: "艾森克 · 气质 · 进化论", color: "hsl(15 75% 55%)" },
        ],
      },
    ],
    flows: [
      { label: "定义清晰后，六大流派从不同层面解释人格的来源与结构" },
      { label: "各流派理论最终汇聚于生物基础，形成完整的人格解释体系", highlight: true },
    ],
    logicChain: "是什么（定义）→ 为什么（六大流派各有侧重）→ 生理基础（遗传与进化）",
  },
}

// ============================================================
// 学科架构图组件
// ============================================================

interface DomainArchitectureViewProps {
  subdomainId: string
  learnedPoints: string[]
  onModuleClick?: (moduleId: string) => void
}

export function DomainArchitectureView({ subdomainId, learnedPoints, onModuleClick }: DomainArchitectureViewProps) {
  const [expanded, setExpanded] = useState(false)
  const arch = ARCHITECTURES[subdomainId]

  const learnedSet = useMemo(() => new Set(learnedPoints), [learnedPoints])

  if (!arch) return null

  // 计算每个模块的学习进度
  function getModuleProgress(moduleId?: string): { learned: number; total: number } {
    if (!moduleId) return { learned: 0, total: 0 }
    const mod = SKILL_MODULES.find((m) => m.id === moduleId)
    if (!mod) return { learned: 0, total: 0 }
    const points = mod.pointIds
    let learned = 0
    for (const pid of points) {
      if (learnedSet.has(pid)) learned++
    }
    return { learned, total: points.length }
  }

  return (
    <div className="rounded-lg border border-border/60 bg-card/50 overflow-hidden">
      {/* 标题栏（可点击展开/折叠） */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2.5 px-4 py-3 text-left transition-colors hover:bg-muted/40"
      >
        <Network className="h-4 w-4 shrink-0 text-accent" />
        <span className="text-sm font-medium text-foreground">{arch.title}</span>
        <span className="ml-auto shrink-0 text-muted-foreground">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
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
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {layer.modules.map((mod) => {
                      const prog = getModuleProgress(mod.moduleId)
                      const isComplete = prog.total > 0 && prog.learned === prog.total
                      return (
                        <button
                          key={mod.name}
                          onClick={() => mod.moduleId && onModuleClick?.(mod.moduleId)}
                          disabled={!mod.moduleId}
                          className={cn(
                            "group relative overflow-hidden rounded-lg border p-2.5 text-left transition-all",
                            isComplete
                              ? "border-success/40 bg-success/5"
                              : "border-border/60 bg-card hover:border-primary/30 hover:bg-primary/5"
                          )}
                        >
                          {/* 左侧色条 */}
                          <div
                            className="absolute left-0 top-0 h-full w-1"
                            style={{ backgroundColor: mod.color, opacity: 0.7 }}
                          />
                          <div className="pl-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-foreground">{mod.name}</span>
                              {prog.total > 0 && (
                                <span className={cn(
                                  "text-xs font-bold",
                                  isComplete ? "text-success" : "text-muted-foreground"
                                )}>
                                  {prog.learned}/{prog.total}
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{mod.points}</p>
                          </div>
                        </button>
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

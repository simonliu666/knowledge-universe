import type { IKnowledgeDomain } from "@/types"

/**
 * 知识宇宙 — 所有学习领域
 * status: active=已开放(可进入) / locked=未解锁(显示但不透明) / coming-soon=即将推出
 */
export const DOMAINS: IKnowledgeDomain[] = [
  {
    id: "psychology",
    name: "心理学",
    icon: "🧠",
    description: "研究心智、行为与意识——从社会影响到认知机制，从情绪到决策",
    status: "active",
    color: "hsl(220 6% 40%)",
    totalPoints: 90,
    subDomains: [
      {
        id: "social-psychology",
        name: "社会心理学",
        description: "理解他人与社会如何塑造我们的行为、认知与情感",
        status: "active",
        totalPoints: 42,
        route: "/learn/social-psychology",
        modules: [
          { id: "sp-intro", name: "社会心理学导论", description: "定义、历史、理论与方法", totalPoints: 4 },
          { id: "sp-cognition", name: "社会认知", description: "对人知觉、图式、刻板印象与思维捷径", totalPoints: 6 },
          { id: "sp-attribution", name: "归因理论", description: "共变归因、自我知觉与归因偏差", totalPoints: 5 },
          { id: "sp-attitude", name: "态度与说服", description: "态度形成、态度-行为关系与说服机制", totalPoints: 5 },
          { id: "sp-influence", name: "社会影响", description: "从众、服从、互惠与承诺", totalPoints: 5 },
          { id: "sp-interpersonal", name: "人际吸引与社会交往", description: "合群、吸引、爱情、自我呈现与社会交换", totalPoints: 5 },
          { id: "sp-group", name: "群体行为", description: "群体促进抑制、竞争合作、领导、极化与思维", totalPoints: 5 },
          { id: "sp-altruism-aggression", name: "利他与侵犯", description: "亲社会理论、利他、旁观者与攻击", totalPoints: 4 },
          { id: "sp-inner", name: "内心机制", description: "情绪认知与认知失调", totalPoints: 3 },
        ],
      },
      {
        id: "cognitive-psychology",
        name: "认知心理学",
        description: "研究知觉、注意、记忆、思维与语言等认知过程",
        status: "active",
        totalPoints: 21,
        route: "/learn/cognitive-psychology",
        modules: [
          { id: "cp-intro", name: "认知心理学导论", description: "学科定位、信息加工框架与研究方法", totalPoints: 4 },
          { id: "cp-perception", name: "知觉与模式识别", description: "知觉特性、组织原则与模式识别", totalPoints: 4 },
          { id: "cp-attention", name: "注意", description: "选择性注意、认知资源与自动化", totalPoints: 3 },
          { id: "cp-memory", name: "记忆", description: "感觉记忆、短时记忆、长时记忆与遗忘", totalPoints: 4 },
          { id: "cp-thinking", name: "思维与问题解决", description: "概念形成、推理与问题解决策略", totalPoints: 4 },
          { id: "cp-language", name: "语言", description: "语言理解与产生的认知机制", totalPoints: 2 },
        ],
      },
      {
        id: "personality-psychology",
        name: "人格心理学",
        description: "六大理论流派解读人格结构、发展与差异",
        status: "active",
        totalPoints: 27,
        route: "/learn/personality-psychology",
        modules: [
          { id: "pp-intro", name: "人格心理学导论", description: "人格概念、历史脉络与六大流派概览", totalPoints: 3 },
          { id: "pp-psychoanalysis", name: "精神分析流派", description: "潜意识动力、人格结构与心理性欲发展", totalPoints: 4 },
          { id: "pp-neo-psychoanalysis", name: "新精神分析流派", description: "阿德勒、荣格、埃里克森、霍妮", totalPoints: 4 },
          { id: "pp-trait", name: "特质流派", description: "奥尔波特、卡特尔与大五模型", totalPoints: 3 },
          { id: "pp-behaviorism", name: "行为主义与社会学习", description: "条件反射、社会学习与习得性无助", totalPoints: 4 },
          { id: "pp-humanistic", name: "人本主义流派", description: "罗杰斯、马斯洛与自我实现", totalPoints: 3 },
          { id: "pp-cognitive", name: "认知流派", description: "凯利个人建构、认知风格与自我图式", totalPoints: 3 },
          { id: "pp-biological", name: "生物流派", description: "艾森克、气质与进化论", totalPoints: 3 },
        ],
      },
      {
        id: "developmental-psychology",
        name: "发展心理学",
        description: "从婴儿到老年，研究心理发展的规律与阶段",
        status: "coming-soon",
        totalPoints: 12,
        modules: [
          { id: "child-dev", name: "儿童发展", description: "认知与情感的发展阶段", totalPoints: 4 },
          { id: "adolescent", name: "青少年心理", description: "自我认同与社会化", totalPoints: 4 },
          { id: "adult-aging", name: "成年与衰老", description: "成年期发展与心理老化", totalPoints: 4 },
        ],
      },
    ],
  },
  {
    id: "logic",
    name: "逻辑学",
    icon: "🔗",
    description: "掌握正确推理与论证的原则，识别谬误，提升思维严密性",
    status: "coming-soon",
    color: "hsl(200 6% 45%)",
    totalPoints: 16,
    subDomains: [
      {
        id: "formal-logic",
        name: "形式逻辑",
        description: "演绎推理与归纳推理的规则",
        status: "coming-soon",
        totalPoints: 7,
        modules: [
          { id: "deductive", name: "演绎推理", description: "从一般到特殊的三段论", totalPoints: 4 },
          { id: "inductive", name: "归纳推理", description: "从特殊到一般的概括", totalPoints: 3 },
        ],
      },
      {
        id: "informal-logic",
        name: "非形式逻辑",
        description: "日常论证的分析与谬误识别",
        status: "coming-soon",
        totalPoints: 9,
        modules: [
          { id: "fallacies", name: "逻辑谬误", description: "识别常见的推理错误", totalPoints: 5 },
          { id: "argument-analysis", name: "论证分析", description: "日常论证的分析与评估", totalPoints: 4 },
        ],
      },
    ],
  },
  {
    id: "philosophy",
    name: "哲学",
    icon: "📜",
    description: "探讨存在、知识、价值与理性的根本问题",
    status: "coming-soon",
    color: "hsl(35 8% 45%)",
    totalPoints: 20,
    subDomains: [
      {
        id: "epistemology-ethics",
        name: "认识论与伦理学",
        description: "知识的本质与道德判断",
        status: "coming-soon",
        totalPoints: 10,
        modules: [
          { id: "epistemology", name: "认识论", description: "知识的本质与来源", totalPoints: 5 },
          { id: "ethics", name: "伦理学", description: "道德判断与价值选择", totalPoints: 5 },
        ],
      },
      {
        id: "metaphysics-aesthetics",
        name: "形而上学与美学",
        description: "存在的本质与美学的哲学",
        status: "coming-soon",
        totalPoints: 10,
        modules: [
          { id: "metaphysics", name: "形而上学", description: "存在的本质", totalPoints: 5 },
          { id: "aesthetics", name: "美学", description: "美与艺术的哲学", totalPoints: 5 },
        ],
      },
    ],
  },
  {
    id: "economics",
    name: "经济学",
    icon: "📊",
    description: "理解稀缺资源分配、市场机制与人类决策行为",
    status: "active",
    color: "hsl(150 8% 42%)",
    totalPoints: 18,
    subDomains: [
      {
        id: "core-economics",
        name: "核心经济学",
        description: "微观与宏观经济学基础",
        status: "active",
        totalPoints: 11,
        route: "/learn/core-economics",
        modules: [
          { id: "ec-micro", name: "微观经济学", description: "供需、价格与个体决策", totalPoints: 6 },
          { id: "ec-macro", name: "宏观经济学", description: "GDP、通胀与货币政策", totalPoints: 5 },
        ],
      },
      {
        id: "applied-economics",
        name: "应用经济学",
        description: "行为经济学与博弈论",
        status: "active",
        totalPoints: 7,
        route: "/learn/applied-economics",
        modules: [
          { id: "ec-behavioral", name: "行为经济学", description: "心理偏差如何影响经济决策", totalPoints: 4 },
          { id: "ec-game-theory", name: "博弈论", description: "策略互动与纳什均衡", totalPoints: 3 },
        ],
      },
    ],
  },
  {
    id: "linguistics",
    name: "语言学",
    icon: "💬",
    description: "研究语言的结构、习得、演变与社会功能",
    status: "active",
    color: "hsl(280 5% 45%)",
    totalPoints: 15,
    subDomains: [
      {
        id: "core-linguistics",
        name: "核心语言学",
        description: "语言的结构分析",
        status: "active",
        totalPoints: 11,
        route: "/learn/core-linguistics",
        modules: [
          { id: "phonetics", name: "语音学", description: "语音的产生与感知", totalPoints: 3 },
          { id: "syntax", name: "句法学", description: "句子的结构规则", totalPoints: 4 },
          { id: "semantics", name: "语义学", description: "意义的构建与传递", totalPoints: 4 },
        ],
      },
      {
        id: "applied-linguistics",
        name: "应用语言学",
        description: "语境与社会中的语言使用",
        status: "active",
        totalPoints: 4,
        route: "/learn/applied-linguistics",
        modules: [
          { id: "pragmatics", name: "语用学", description: "语境中的语言使用", totalPoints: 4 },
        ],
      },
    ],
  },
  {
    id: "sociology",
    name: "社会学",
    icon: "🌐",
    description: "研究社会结构、群体行为与社会变迁",
    status: "active",
    color: "hsl(330 5% 45%)",
    totalPoints: 14,
    subDomains: [
      {
        id: "social-structure-culture",
        name: "社会结构与文化",
        description: "阶层、制度与文化形成",
        status: "active",
        totalPoints: 7,
        route: "/learn/social-structure-culture",
        modules: [
          { id: "social-structure", name: "社会结构", description: "阶层、角色与制度", totalPoints: 4 },
          { id: "culture", name: "文化与社会", description: "文化的形成与传播", totalPoints: 3 },
        ],
      },
      {
        id: "social-dynamics",
        name: "社会动态",
        description: "社会变迁与社会控制",
        status: "active",
        totalPoints: 7,
        route: "/learn/social-dynamics",
        modules: [
          { id: "social-change", name: "社会变迁", description: "现代化与全球化", totalPoints: 4 },
          { id: "deviance", name: "越轨与社会控制", description: "规范、偏差与制裁", totalPoints: 3 },
        ],
      },
    ],
  },
  {
    id: "statistics",
    name: "统计学",
    icon: "📈",
    description: "从数据中提取信息，理解不确定性与概率",
    status: "locked",
    color: "hsl(0 5% 45%)",
    totalPoints: 16,
    subDomains: [
      {
        id: "core-statistics",
        name: "统计基础",
        description: "描述统计与概率论",
        status: "locked",
        totalPoints: 8,
        modules: [
          { id: "descriptive", name: "描述统计", description: "均值、方差与分布", totalPoints: 4 },
          { id: "probability", name: "概率论", description: "随机事件与概率分布", totalPoints: 4 },
        ],
      },
      {
        id: "applied-statistics",
        name: "应用统计",
        description: "推断与回归分析",
        status: "locked",
        totalPoints: 8,
        modules: [
          { id: "inferential", name: "推断统计", description: "假设检验与置信区间", totalPoints: 5 },
          { id: "regression", name: "回归分析", description: "变量间的关系建模", totalPoints: 3 },
        ],
      },
    ],
  },
  {
    id: "electronic-gaming",
    name: "电子游戏",
    icon: "🎮",
    description: "从真空管的光点到万亿级数字娱乐帝国——全球电子游戏行业全景解析",
    status: "active",
    color: "hsl(280 60% 50%)",
    totalPoints: 30,
    subDomains: [
      {
        id: "game-industry-history",
        name: "游戏行业史",
        description: "从1947年首个专利到2026年万亿级产业——80年发展历程与核心转折",
        status: "active",
        totalPoints: 9,
        route: "/learn/game-industry-history",
        modules: [
          { id: "eg-history-origin", name: "行业起源与早期发展", description: "电子游戏诞生与街机时代、雅达利崩盘", totalPoints: 3 },
          { id: "eg-history-console", name: "主机时代演进", description: "任天堂、索尼、微软三代霸主更替", totalPoints: 3 },
          { id: "eg-history-pc-mobile", name: "PC与移动游戏发展", description: "Steam平台与全民移动游戏时代", totalPoints: 3 },
        ],
      },
      {
        id: "game-industry-structure",
        name: "游戏产业结构",
        description: "主机、PC、移动三大传统赛道的竞争格局与差异化策略",
        status: "active",
        totalPoints: 6,
        route: "/learn/game-industry-structure",
        modules: [
          { id: "eg-console-track", name: "主机游戏赛道", description: "索尼/微软/任天堂三足鼎立", totalPoints: 2 },
          { id: "eg-pc-track", name: "PC游戏赛道", description: "Steam垄断与独立游戏生态", totalPoints: 2 },
          { id: "eg-mobile-track", name: "移动游戏赛道", description: "国内三强与全球化运营", totalPoints: 2 },
        ],
      },
      {
        id: "emerging-tech",
        name: "新兴技术赛道",
        description: "云游戏、AI游戏、VR/AR空间计算——行业的第二增长曲线",
        status: "active",
        totalPoints: 10,
        route: "/learn/emerging-tech",
        modules: [
          { id: "eg-cloud-gaming", name: "云游戏", description: "云端渲染与订阅制商业模式", totalPoints: 3 },
          { id: "eg-ai-gaming", name: "AI游戏", description: "AI引擎工具、智能NPC与研发降本", totalPoints: 3 },
          { id: "eg-vr-ar", name: "VR/AR与空间计算", description: "Meta、索尼、苹果四大玩家竞争格局", totalPoints: 4 },
        ],
      },
      {
        id: "industry-laws-trends",
        name: "行业规律与趋势",
        description: "80年发展的三大核心规律与未来十年五大演进方向",
        status: "active",
        totalPoints: 9,
        route: "/learn/industry-laws-trends",
        modules: [
          { id: "eg-core-laws", name: "行业核心规律", description: "技术迭代、内容为王、商业模式演变", totalPoints: 3 },
          { id: "eg-global-market", name: "全球市场格局", description: "中美双极引领与马太效应", totalPoints: 2 },
          { id: "eg-future-trends", name: "未来十年趋势", description: "全民化、AI渗透、订阅制、合规化", totalPoints: 4 },
        ],
      },
    ],
  },
  {
    id: "musk-empire",
    name: "马斯克企业版图",
    icon: "🚀",
    description: "特斯拉、SpaceX、xAI、Neuralink——解码马斯克商业帝国的财报、战略与第一性原理",
    status: "active",
    color: "hsl(210 75% 55%)",
    totalPoints: 37,
    subDomains: [
      {
        id: "tesla-empire",
        name: "特斯拉帝国",
        description: "电动汽车+能源+AI三合一平台——商业模式、财报、自动驾驶与制造战略",
        status: "active",
        totalPoints: 10,
        route: "/learn/tesla-empire",
        modules: [
          { id: "ts-finance", name: "商业模式与财报", description: "三大支柱、2025财报与万亿估值逻辑", totalPoints: 3 },
          { id: "ts-energy", name: "能源业务", description: "Megapack、Powerwall与4680电池", totalPoints: 2 },
          { id: "ts-autonomy", name: "自动驾驶与机器人", description: "FSD、Robotaxi与Optimus人形机器人", totalPoints: 3 },
          { id: "ts-manufacturing", name: "制造与供应链", description: "超级工厂网络与垂直整合战略", totalPoints: 2 },
        ],
      },
      {
        id: "spacex",
        name: "太空探索",
        description: "可回收火箭经济学、星链互联网与火星殖民——SpaceX的商业逻辑与终局愿景",
        status: "active",
        totalPoints: 10,
        route: "/learn/spacex",
        modules: [
          { id: "sp-launch", name: "火箭与发射", description: "Falcon 9经济学、Starship星舰与重型猎鹰", totalPoints: 3 },
          { id: "sp-starlink", name: "星链业务", description: "卫星互联网商业逻辑与战略护城河", totalPoints: 3 },
          { id: "sp-strategy", name: "财务与战略", description: "财报、IPO战略与火星殖民规划", totalPoints: 4 },
        ],
      },
      {
        id: "xai-x",
        name: "AI与社交帝国",
        description: "xAI大模型、Grok、X平台——AI与社交融合的数据飞轮战略",
        status: "active",
        totalPoints: 9,
        route: "/learn/xai-x",
        modules: [
          { id: "xai-model", name: "xAI与Grok", description: "大模型、商业模式与Colossus算力", totalPoints: 3 },
          { id: "x-platform", name: "X平台", description: "收购案、广告衰退与万能应用愿景", totalPoints: 3 },
          { id: "xai-strategy", name: "融合战略与财务", description: "收购X的数据飞轮与AI三强竞争", totalPoints: 3 },
        ],
      },
      {
        id: "frontier-ventures",
        name: "前沿探索",
        description: "Neuralink脑机接口、Boring Company地下交通与企业协同版图全景",
        status: "active",
        totalPoints: 8,
        route: "/learn/frontier-ventures",
        modules: [
          { id: "nl-brain", name: "Neuralink脑机接口", description: "技术路线、融资历程与临床应用", totalPoints: 3 },
          { id: "bc-tunnel", name: "The Boring Company", description: "地下交通愿景与商业模式", totalPoints: 2 },
          { id: "musk-synergy", name: "企业协同版图", description: "帝国全景、第一性原理与风险分析", totalPoints: 3 },
        ],
      },
    ],
  },
]

/** 获取已开放的领域 */
export function getActiveDomains(): IKnowledgeDomain[] {
  return DOMAINS.filter((d) => d.status === "active")
}

/** 根据ID获取领域 */
export function getDomainById(id: string): IKnowledgeDomain | undefined {
  return DOMAINS.find((d) => d.id === id)
}

/** 领域总数 */
export const TOTAL_DOMAINS = DOMAINS.length

/**
 * 认知心理学 RPG 学习系统 - 知识点数据
 *
 * 数据来源：基于《认知心理学》讲义（共221页）梳理
 * 模块数：6 个  知识点数：21 个
 *
 * 导出：
 *   - CP_SKILL_MODULES      6 个模块定义
 *   - CP_KNOWLEDGE_POINTS   21 个知识点完整内容
 *   - 接口类型 ICPKnowledgePoint / ICPSkillModule
 */

// ---------------------------------------------------------------------------
// 类型定义
// ---------------------------------------------------------------------------

import type { ISkillModule, IKnowledgePoint } from "@/types"

// ---------------------------------------------------------------------------
// 模块定义
// ---------------------------------------------------------------------------

export const CP_SKILL_MODULES: ISkillModule[] = [
  {
    id: 'cp-intro',
    name: '认知心理学导论',
    icon: '🧠',
    color: 'hsl(265 85% 62%)',
    description:
      '认知心理学的学科定位、信息加工框架与核心研究方法，奠定后续学习的概念基础。',
    pointIds: ['cp-definition', 'cp-process-structure', 'cp-information-processing', 'cp-research-methods'],
    subdomain: "cognitive-psychology",
  },
  {
    id: 'cp-perception',
    name: '知觉与模式识别',
    icon: '👁️',
    color: 'hsl(195 85% 55%)',
    description:
      '从感觉输入到意义赋予：知觉特性、组织原则与模式识别机制，理解"看见"背后的建构过程。',
    pointIds: ['cp-perception-concept', 'cp-perception-organization', 'cp-pattern-recognition', 'cp-top-down-bottom-up'],
    subdomain: "cognitive-psychology",
  },
  {
    id: 'cp-attention',
    name: '注意',
    icon: '🎯',
    color: 'hsl(35 85% 60%)',
    description:
      '有限认知资源的选择、分配与自动化，揭示大脑如何在大千世界中聚焦关键信息。',
    pointIds: ['cp-attention-filter', 'cp-attention-capacity', 'cp-automatic-processing'],
    subdomain: "cognitive-psychology",
  },
  {
    id: 'cp-memory',
    name: '记忆',
    icon: '📚',
    color: 'hsl(155 70% 50%)',
    description:
      '感觉记忆、短时记忆与长时记忆的三级加工体系，及遗忘背后的机制与对策。',
    pointIds: ['cp-sensory-memory', 'cp-stm', 'cp-ltm', 'cp-forgetting'],
    subdomain: "cognitive-psychology",
  },
  {
    id: 'cp-thinking',
    name: '思维与问题解决',
    icon: '🧩',
    color: 'hsl(340 80% 60%)',
    description:
      '概念形成、推理与问题解决的策略与障碍，探索高级认知活动如何驾驭复杂世界。',
    pointIds: ['cp-concept-formation', 'cp-reasoning', 'cp-problem-solving', 'cp-problem-barriers'],
    subdomain: "cognitive-psychology",
  },
  {
    id: 'cp-language',
    name: '语言',
    icon: '🗣️',
    color: 'hsl(220 80% 60%)',
    description:
      '语言理解与产生的认知机制，从语音到篇章、从思维到言语的双向桥梁。',
    pointIds: ['cp-language-comprehension', 'cp-language-production'],
    subdomain: "cognitive-psychology",
  },
  {
    id: 'cp-embodied',
    name: '具身认知',
    icon: '🫀',
    color: 'hsl(160 70% 45%)',
    description:
      '认知不只在大脑中发生——身体、环境与互动共同塑造思维，挑战经典信息加工范式的前沿视角。',
    pointIds: ['cp-embodied-cognition'],
    subdomain: "cognitive-psychology",
  },
];

// ---------------------------------------------------------------------------
// 知识点定义
// ---------------------------------------------------------------------------

export const CP_KNOWLEDGE_POINTS: IKnowledgePoint[] = [
  // ===== 模块 1：认知心理学导论 =====
  {
    id: 'cp-definition',
    name: '认知心理学的定义',
    module: 'cp-intro',
    moduleName: '认知心理学导论',
    icon: '🧠',
    definition:
      '认知心理学是研究人如何接收、加工、存储和提取信息的学科，把认知活动视为信息加工过程，关注从感觉输入到行为输出之间的内部心理机制。',
    coreLogic:
      '以信息加工观点为核心范式：将心理过程类比为计算机的输入-加工-输出流程，强调可测量的中间过程（知觉、注意、记忆、表象、思维、言语等）。Neisser（1967）在《认知心理学》中首次系统界定其研究对象。它与行为主义"黑箱"立场对立，主张打开内部过程黑箱；同时与传统心理学、现代语言学（Chomsky 生成语法）、信息科学（计算机隐喻）相互促生，并随认知神经科学发展而深化。',
    lifeCase:
      '1) 看到红灯后决定停下——视觉输入→识别→决策→行动的完整加工链；2) 记住一个验证码直到填入——短时存储与提取；3) 听懂一句歧义话语需调动上下文知识——语义加工与已有经验参与。',
    practice:
      '做任何判断或学习时，刻意觉察信息如何在你的头脑中流转：先接收什么、被怎样加工、又调用了哪些已有知识。这种"元认知"视角能帮你发现认知瓶颈与偏见来源。',
    feynmanSummary: '研究大脑怎么接收、加工、存储和提取信息的学问，像把心理过程拆成计算机的输入-处理-输出。',
    relatedPoints: ['cp-process-structure', 'cp-information-processing', 'cp-research-methods'],
    prerequisites: [],
  },
  {
    id: 'cp-process-structure',
    name: '认知的过程与结构',
    module: 'cp-intro',
    moduleName: '认知心理学导论',
    icon: '🔄',
    definition:
      '认知过程指信息加工的系列阶段（感知→编码→存储→提取→使用），认知结构指知识在头脑中的组织与表征方式；过程是动态加工流，结构是静态存储框架。',
    coreLogic:
      '过程包括感觉登记、模式识别、注意选择、记忆编码与提取、思维推理等可操作步骤；结构包括概念、图式、命题网络、表象等知识表征形式。两者相互依存：过程操作结构中的内容，结构又是过程加工的产物。例如，识记新词时"加工"是过程，新词与已有语义网络建立的联系则是结构。理解这一双重性是把握后续记忆、思维各模块的前提。',
    lifeCase:
      '1) 识记单词"apple"先感知字形（过程），再与"水果"概念建立联系（结构）；2) 解数学题时调取公式（结构）并按步骤推导（过程）；3) 识别朋友面孔依赖已存储的面孔表征（结构）。',
    practice:
      '学习新知识时有意识地把新信息与已有知识结构建立联系（如画思维导图、做对比表），而非孤立记忆，可显著提升加工深度与保持效果。',
    feynmanSummary: '过程是大脑加工信息的步骤，结构是知识在脑中怎么摆放；加工时调用结构，加工后又沉淀成结构。',
    relatedPoints: ['cp-definition', 'cp-information-processing', 'cp-ltm'],
    prerequisites: ['cp-definition'],
  },
  {
    id: 'cp-information-processing',
    name: '信息加工系统',
    module: 'cp-intro',
    moduleName: '认知心理学导论',
    icon: '💻',
    definition:
      'Newell & Simon（1972）提出的人的信息加工系统由感受器、加工器、记忆和效应器组成，以符号操作为基础，奠定认知心理学类比计算机的研究范式。',
    coreLogic:
      '以"物理符号系统假设"为前提——任何能操作符号的系统都具备产生通用智能行为的潜力。感受器接收输入，加工器执行控制与运算，记忆（含短时与长时）存储符号结构，效应器输出行为。信息在系统中以串行为主流动，但存在并行加工可能。该模型强调人脑是容量有限、分阶段、符号操作的系统，为后续记忆多级模型、注意瓶颈理论提供统一框架。',
    lifeCase:
      '1) 打字时眼睛接收字符（感受器）→识别字母（加工器+记忆）→手指按键（效应器）；2) 认路时视觉输入→与记忆中的地图比对→输出转向决策；3) 听写练习中耳朵接收语音→加工为词→手写输出。',
    practice:
      '分析自己完成一项复杂任务（如做饭、写报告）时的信息流向：哪些是输入、哪些是存储调用、哪些是输出，能帮你定位认知瓶颈并优化流程。',
    feynmanSummary: '把人脑当计算机：输入信息、运算加工、存储调用、输出行为，本质是靠操作符号来思考。',
    relatedPoints: ['cp-definition', 'cp-process-structure', 'cp-research-methods', 'cp-sensory-memory'],
    prerequisites: ['cp-process-structure'],
  },
  {
    id: 'cp-research-methods',
    name: '研究方法',
    module: 'cp-intro',
    moduleName: '认知心理学导论',
    icon: '⏱️',
    definition:
      '认知心理学主要采用反应时记录法、口语记录法和计算机模拟法研究内部心理过程，其中反应时法是推断内部加工阶段的核心工具。',
    coreLogic:
      '反应时法基于"心理过程耗时"假设。Donders（1868）减法法：插入额外心理过程的两个任务反应时之差，估算该过程耗时。Sternberg（1969）加法法：改变多个独立因素，若反应时增量可加，则推断各因素作用于不同加工阶段（如刺激编码、比较、决策、反应组织）。开窗实验则直接"打开窗口"观察单阶段。口语记录法（出声思考）揭示问题解决策略；计算机模拟用程序复现心理过程以验证理论模型。',
    lifeCase:
      '1) Stroop 效应中读颜色词与命名墨色反应时差异，揭示自动化阅读对注意的干扰；2) 心算 7×8 时记录被试出声内容可了解其策略；3) 用程序模拟下棋步骤以验证专家的启发式搜索。',
    practice:
      '学习新技能时计时测量、对比练习前后反应时变化，可量化自动化程度的提升；做复杂决策时刻意放慢并出声思考，能暴露隐藏的加工步骤与偏见。',
    feynmanSummary: '用反应时（做事快慢）反推脑子分几步加工信息，再配合出声思考和电脑模拟来验证心理过程。',
    relatedPoints: ['cp-definition', 'cp-attention-filter', 'cp-stm', 'cp-information-processing'],
    prerequisites: ['cp-definition'],
  },

  // ===== 模块 2：知觉与模式识别 =====
  {
    id: 'cp-perception-concept',
    name: '知觉的概念与特性',
    module: 'cp-perception',
    moduleName: '知觉与模式识别',
    icon: '👁️',
    definition:
      '知觉是人脑对直接作用于感官的客观事物整体属性的反映，区别于感觉对个别属性的反映，具有整体性、理解性和恒常性三大特性。',
    coreLogic:
      '整体性：知觉优先把握整体而非部分（格式塔"整体大于部分之和"）。理解性：知觉受过去经验与知识影响，带有主观诠释。恒常性：当知觉条件（距离、光照、角度）变化时，对物体大小、形状、颜色等属性的知觉保持相对稳定（如大小恒常性、颜色恒常性）。三大特性共同表明：知觉是主动建构而非被动接收，为后续模式识别与自上而下加工埋下伏笔。',
    lifeCase:
      '1) 远处的人看起来很小但仍被知觉为正常身高（大小恒常性）；2) 看到半遮的椅子仍识别为完整椅子（整体性）；3) 熟人换了发型一眼认出，陌生人则需细看（理解性）。',
    practice:
      '观察一幅错觉图，体会知觉如何"脑补"缺失信息；在不同光线条件下观察同一物体颜色，觉察恒常性如何稳定你的识别——并留意何时它会被打破。',
    feynmanSummary: '知觉不是被动接收，而是脑子主动把感觉拼成有意义的整体，并用经验补全、保持稳定判断。',
    relatedPoints: ['cp-perception-organization', 'cp-pattern-recognition', 'cp-top-down-bottom-up'],
    prerequisites: [],
  },
  {
    id: 'cp-perception-organization',
    name: '知觉的组织原则',
    module: 'cp-perception',
    moduleName: '知觉与模式识别',
    icon: '🔷',
    definition:
      '格式塔心理学家提出知觉将刺激组织为有意义的整体，遵循接近律、相似律、连续律、封闭律、共同命运律等组织原则。',
    coreLogic:
      'Wertheimer 等人主张"整体大于部分之和"。接近律：空间或时间相近的元素被组合为一组；相似律：相似元素被归为一类；连续律：顺延光滑方向的元素被组织为整体；封闭律：缺口图形被补全为完整形状；共同命运律：朝同一方向运动的元素被视为整体。这些原则以刺激本身的物理特性为依据，属于自下而上加工，使纷繁刺激迅速结构化。',
    lifeCase:
      '1) 排队时相邻的人被视为一组（接近律）；2) 红绿灯中同色灯被识别为同一系统（相似律）；3) 看虚线圆仍知觉为完整圆（封闭律）；4) 飞鸟群朝同向飞被视为整体（共同命运）。',
    practice:
      '设计海报或 PPT 时利用接近律与相似律分组信息，可显著提升可读性；觉察广告如何用封闭律引导你"补全"品牌信息，增强记忆与参与感。',
    feynmanSummary: '脑子会自动按相近、相似、连续、封闭、同向运动把零散刺激归成有意义的整体，无需刻意。',
    relatedPoints: ['cp-perception-concept', 'cp-pattern-recognition', 'cp-top-down-bottom-up'],
    prerequisites: ['cp-perception-concept'],
  },
  {
    id: 'cp-pattern-recognition',
    name: '模式识别理论',
    module: 'cp-perception',
    moduleName: '知觉与模式识别',
    icon: '🔍',
    definition:
      '模式识别是将当前刺激与头脑中存储的信息进行匹配并赋予意义的过程，主要有模板说、原型说和特征分析理论，拓扑学理论提供了整体视角的补充。',
    coreLogic:
      '模板说：刺激需与预先存储的特定模板精确匹配才能识别，简单但缺乏灵活性、存储量大。原型说（Posner 等）：与一类事物的抽象原型比较，容许变异，解释为何能识别变形刺激。特征分析理论（Selfridge 的"鬼城"Pandemonium 模型）：先抽取刺激的几何特征（线段、角度等），再综合特征识别，符合自下而上加工且计算效率高，是主流观点。拓扑学理论（陈霖）：强调整体拓扑性质（如洞、内外关系）优先于局部特征被识别。',
    lifeCase:
      '1) 识别不同字体的"A"靠原型而非精确模板；2) 字母识别中先检测横线、斜线等特征再组合；3) 一眼区分"圆"与"方"是拓扑性质差异。',
    practice:
      '识别陌生人脸时觉察自己如何提取眼睛、鼻子等特征并组合；练习速读时体会特征分析如何加快字母识别——这正是阅读自动化的基础。',
    feynmanSummary: '认东西就是把眼前刺激跟脑子里存的模板、原型或特征对上号，从而赋予它意义。',
    relatedPoints: ['cp-perception-concept', 'cp-perception-organization', 'cp-top-down-bottom-up', 'cp-concept-formation'],
    prerequisites: ['cp-perception-organization'],
  },
  {
    id: 'cp-top-down-bottom-up',
    name: '自上而下与自下而上加工',
    module: 'cp-perception',
    moduleName: '知觉与模式识别',
    icon: '🔀',
    definition:
      '自下而上加工由刺激驱动，从感觉数据出发逐级向上整合；自上而下加工由经验、预期驱动，自高位概念向下影响知觉。两者通常协同作用。',
    coreLogic:
      '自下而上：数据驱动，从刺激特征→特征整合→模式识别，依赖外部输入。自上而下：概念驱动，依靠已有知识、语境、预期对感觉输入进行解释和补充。语境效应是经典证据：如"THE CAT"中同一字符在词首被读作 H、在词首被读作 A，说明语境自上而下改变了知觉。两者协同——自下而上提供约束，自上而下提供假设。这一框架也延伸到语言理解、记忆提取等更高级加工。',
    lifeCase:
      '1) 读有错别字的文章仍能理解——自上而下用语境纠正；2) 在嘈杂环境中听清朋友说话依赖预期；3) 阅读潦草字迹靠上下文猜测。',
    practice:
      '阅读时遮住部分文字仍能猜测内容，体会自上而下加工的作用；学习新领域时感到困难，往往正是因为缺少自上而下的背景知识支撑。',
    feynmanSummary: '自下而上是从刺激本身往上拼，自上而下是用经验和预期往下补，两者配合才能看懂世界。',
    relatedPoints: ['cp-perception-concept', 'cp-pattern-recognition', 'cp-attention-filter', 'cp-language-comprehension'],
    prerequisites: ['cp-pattern-recognition'],
  },

  // ===== 模块 3：注意 =====
  {
    id: 'cp-attention-filter',
    name: '选择性注意与过滤器理论',
    module: 'cp-attention',
    moduleName: '注意',
    icon: '🎯',
    definition:
      '选择性注意是在众多输入信息中选择部分进行加工的过程。Broadbent 的过滤器理论与 Treisman 的衰减理论解释了选择发生的机制与位置。',
    coreLogic:
      'Broadbent（1958）早期选择过滤器理论：信息经感觉登记后进入过滤器，按物理特征选择，未被选择者被完全阻断。但"鸡尾酒会效应"（能在嘈杂中注意到自己名字）与此矛盾。Treisman（1960）衰减理论修正：未注意信息并非完全阻断而是衰减，重要信息（如自己的名字）阈值低仍可被激活。二者都假设注意存在瓶颈，争议在于选择发生在加工早期还是晚期。双耳分听追随实验是经典范式。',
    lifeCase:
      '1) 派对上专注一个对话却突然听到有人提到你名字（鸡尾酒会效应）；2) 边看书边听音乐时只能跟上一个；3) 双耳分听实验中追随一只耳的信息，另一只耳内容多被遗忘。',
    practice:
      '觉察自己在嘈杂环境如何选择关注对象；需要深度专注时主动屏蔽干扰，理解"过滤"是有限资源——这正是高效学习环境的设计依据。',
    feynmanSummary: '脑子资源有限，像个过滤器只放一部分信息进来加工，其余被挡掉或减弱，但重要信息仍能漏进来。',
    relatedPoints: ['cp-attention-capacity', 'cp-automatic-processing', 'cp-sensory-memory', 'cp-top-down-bottom-up'],
    prerequisites: [],
  },
  {
    id: 'cp-attention-capacity',
    name: '注意容量与分配',
    module: 'cp-attention',
    moduleName: '注意',
    icon: '🔋',
    definition:
      'Kahneman（1973）的容量分配理论认为注意是有限的认知资源，可灵活分配给多个任务，分配取决于唤醒水平、任务难度与当前意图。',
    coreLogic:
      '可用容量由唤醒水平决定（适度唤醒最佳，过低或过高都会降低效率）。容量按任务难度和意图分配：任务难度高占用资源多，剩余资源少则难以同时执行其他任务。双任务范式（dual-task）证实：若两任务总需求未超容量则可并行，否则互相干扰。该理论与自动化加工互补——技能自动化后释放资源，使多任务成为可能。',
    lifeCase:
      '1) 一边走路一边聊天轻松，但走崎岖路时对话会变慢；2) 新手开车不能聊天，老司机则可以；3) 边做饭边听播客，遇到复杂步骤时播客内容会被忽略。',
    practice:
      '评估当前任务的注意负荷，避免在高负荷时叠加复杂操作（如开车时回消息）；利用多任务训练找到自己的资源分配边界，把高频任务练至自动化以释放资源。',
    feynmanSummary: '注意力像有限的电池，任务越难越耗电，剩余电量不够就干不了别的事，得靠练习省电。',
    relatedPoints: ['cp-attention-filter', 'cp-automatic-processing', 'cp-stm'],
    prerequisites: ['cp-attention-filter'],
  },
  {
    id: 'cp-automatic-processing',
    name: '自动化加工',
    module: 'cp-attention',
    moduleName: '注意',
    icon: '⚡',
    definition:
      'Shiffrin & Schneider（1977）区分控制性加工与自动化加工：前者需注意、容量有限、灵活可控；后者经大量练习形成、几乎不占资源、并行自动触发但难以改变。',
    coreLogic:
      '控制性加工：受意识控制、占用注意资源、串行、可灵活调整，用于新异或复杂任务。自动化加工：经反复练习形成、几乎不占资源、并行、自动触发，但难以改变甚至干扰意图。Schneider & Shiffrin 的视觉搜索实验表明：记忆集与背景项目来自同一类别时搜索困难（控制性），来自不同类别时练习后可自动化（弹出效应 pop-out）。过度自动化也会导致错误，如心不在焉地把盐加进咖啡。',
    lifeCase:
      '1) 阅读熟练后无需逐字注视即理解；2) 开车老手踩刹车是自动的；3) 习惯性走错去上班的路（自动化误触发）。',
    practice:
      '将高频重复技能刻意练习至自动化以释放认知资源；同时对自动化行为保持警觉，尤其在关键场景（如驾驶、医疗）避免"无意识出错"。',
    feynmanSummary: '反复练熟的事会变得不费脑子、自动触发，省下精力干别的，但太熟也可能下意识出错。',
    relatedPoints: ['cp-attention-filter', 'cp-attention-capacity', 'cp-research-methods', 'cp-pattern-recognition'],
    prerequisites: ['cp-attention-capacity'],
  },

  // ===== 模块 4：记忆 =====
  {
    id: 'cp-sensory-memory',
    name: '感觉记忆',
    module: 'cp-memory',
    moduleName: '记忆',
    icon: '📸',
    definition:
      '感觉记忆是刺激作用于感官后短暂保留其感觉特征的存储，容量大、保持极短（约 0.25–2 秒），是信息进入加工系统的第一站。',
    coreLogic:
      'Sperling（1960）部分报告法实验：3×4 字母矩阵呈现 50ms，全报告只能回忆 4–5 个，部分报告（提示某一行）能回忆该行全部，证明感觉记忆容量大但迅速衰退（约 250–500ms）。图像记忆（视觉）约 0.5 秒，声像记忆（听觉，Moray 等）约 2–4 秒。感觉记忆为后续加工提供原始素材，未被注意的信息迅速消失，未被复述者无法进入短时记忆。',
    lifeCase:
      '1) 闪电过后短暂看到完整景象；2) 别人说话没听清但能"回声"一下最后几个字；3) 快速翻页动画利用图像记忆形成连续感。',
    practice:
      '体会刚闭眼时残留的视觉影像；理解为何走神错过的话难以回忆——感觉记忆转瞬即逝，未及注意的信息根本无法留存。',
    feynmanSummary: '感官刚接收的信息会留个极短残影（约半秒），没被注意就立刻消失，是进入大脑的第一站。',
    relatedPoints: ['cp-attention-filter', 'cp-stm', 'cp-information-processing'],
    prerequisites: ['cp-information-processing'],
  },
  {
    id: 'cp-stm',
    name: '短时记忆与工作记忆',
    module: 'cp-memory',
    moduleName: '记忆',
    icon: '📝',
    definition:
      '短时记忆是信息暂时存储和加工的有限容量系统，容量约 7±2 个组块（Miller, 1956），保持约 15–30 秒；Baddeley 的工作记忆模型将其扩展为多成分加工系统。',
    coreLogic:
      'Miller 的"神奇的数字 7±2"：容量有限但可通过组块（chunking）扩展信息量。编码以听觉编码为主（Conrad 的字母混淆实验），Posner 实验证实短时记忆早期也存在视觉编码。Sternberg 的系列扫描实验（加法法）发现提取为系列全扫描而非平行扫描。Baddeley 工作记忆模型含中央执行系统、语音回路、视空工作簿、情景缓冲器，强调"存储+加工"双重功能。信息经复述可进入长时记忆。',
    lifeCase:
      '1) 记电话号码时按 3-4-4 分组（组块）；2) 心算时把中间结果暂存于工作记忆；3) 听到陌生单词在脑中复述以记住发音。',
    practice:
      '用组块策略记忆长串信息（如身份证号分段）；理解工作记忆是学习的核心瓶颈，避免同时执行多个消耗工作记忆的任务，能显著提升学习效率。',
    feynmanSummary: '脑子暂时存东西的小黑板，容量约7个组块，靠分组能多记，不反复背十几秒就忘。',
    relatedPoints: ['cp-sensory-memory', 'cp-ltm', 'cp-forgetting', 'cp-research-methods', 'cp-attention-capacity'],
    prerequisites: ['cp-sensory-memory'],
  },
  {
    id: 'cp-ltm',
    name: '长时记忆',
    module: 'cp-memory',
    moduleName: '记忆',
    icon: '📚',
    definition:
      '长时记忆是信息长期甚至永久存储的系统，容量巨大，以语义代码和表象代码为主，组织为语义网络、命题网络与图式，是知识与经验的根基。',
    coreLogic:
      '编码以语义为主（Craik & Lockhart 的加工层次说：深加工利于长时保持）。存储模型：语义网络模型（Collins & Quillian）将概念分层级存储、以关系链接；命题网络（Anderson）存储事实间关系；图式理论（Bartlett、Rumelhart）以图式组织关于事件、场景的一般知识，影响理解与记忆建构。提取依赖线索与重构，易受干扰和扭曲——记忆并非录像回放，而是基于图式的重构。',
    lifeCase:
      '1) 记住"巴黎是法国首都"以语义形式存储；2) 回忆童年生日场景用表象；3) 进餐厅自动激活"餐厅图式"指导点菜、付账等行为。',
    practice:
      '学习时主动构建语义联系（对比、归类、举例）以加深编码深度；觉察图式如何让你快速理解新场景，但也可能带来刻板预期与记忆偏差。',
    feynmanSummary: '长期甚至永久存放知识经验的大仓库，按意义和图式组织，提取靠线索，记忆是重构而非回放。',
    relatedPoints: ['cp-stm', 'cp-forgetting', 'cp-process-structure', 'cp-concept-formation', 'cp-language-comprehension'],
    prerequisites: ['cp-stm'],
  },
  {
    id: 'cp-forgetting',
    name: '遗忘理论',
    module: 'cp-memory',
    moduleName: '记忆',
    icon: '🌫️',
    definition:
      '遗忘的主要理论解释有衰退说（记忆痕迹随时间自然消退）和干扰说（前后学习内容相互干扰），此外还有提取失败说与动机性遗忘。',
    coreLogic:
      '衰退说：记忆痕迹不使用则消退，简单直观但难以严格验证。干扰说（主流）：分前摄抑制（先前学习干扰后来）与倒摄抑制（后来学习干扰先前）。Waugh & Norman（1965）的数字探查实验控制干扰项目数后，时间因素影响消失，支持干扰说。提取失败说：信息仍在但缺乏有效线索（如"话到嘴边"现象）。动机性遗忘（Freud 压抑）：痛苦记忆被主动压抑。短时记忆中的遗忘多归因于衰退与替代。',
    lifeCase:
      '1) 学了法语后说英语总混入法语词（前摄/倒摄抑制）；2) 想不起某人名字但记得首字母，提示后立刻想起（提取失败）；3) 旧手机号被新号"覆盖"（倒摄抑制）。',
    practice:
      '学习相似内容时分散时间并穿插不同学科以减少干扰；想不起信息时换用不同线索（情境、首字母、情绪状态）帮助提取，而非一味苦想。',
    feynmanSummary: '忘事主要不是时间久了自然消退，而是新旧知识互相干扰，或线索不够导致想不起来。',
    relatedPoints: ['cp-stm', 'cp-ltm', 'cp-sensory-memory'],
    prerequisites: ['cp-stm'],
  },

  // ===== 模块 5：思维与问题解决 =====
  {
    id: 'cp-concept-formation',
    name: '概念形成',
    module: 'cp-thinking',
    moduleName: '思维与问题解决',
    icon: '💡',
    definition:
      '概念是对一类事物共同本质属性的概括。概念形成是通过观察实例归纳出概念定义或原型的过程，概念结构则由原型理论与样例理论解释。',
    coreLogic:
      'Bruner 的概念形成实验：用卡片（颜色、形状、边框数）让被试通过样例反馈归纳概念，发现策略有保守聚焦、冒险聚焦、同时扫描、相继扫描。概念结构理论：原型理论（Rosch）——概念以最能代表该类的原型为核心，成员按相似度梯度组织，边界模糊；样例理论——概念由多个具体实例表征，判断新例时与样例比对。二者解释了自然概念为何边界不清晰、典型性有高低之分。',
    lifeCase:
      '1) 儿童通过见到各种狗形成"狗"的概念原型；2) 企鹅算不算"鸟"——与原型（麻雀）相似度低故反应慢；3) 学习医学诊断靠积累典型病例（样例）。',
    practice:
      '学习新概念时收集正例与反例，提炼共同属性；觉察自己对某类人或事物的判断是否过度依赖原型而忽视个体差异，警惕原型引发的刻板印象。',
    feynmanSummary: '从一堆例子里归纳出共同本质，形成"这类东西"的抽象认识，脑中以原型或具体样例存储。',
    relatedPoints: ['cp-ltm', 'cp-pattern-recognition', 'cp-reasoning', 'cp-problem-solving'],
    prerequisites: ['cp-ltm'],
  },
  {
    id: 'cp-reasoning',
    name: '推理',
    module: 'cp-thinking',
    moduleName: '思维与问题解决',
    icon: '🔢',
    definition:
      '推理是从已知命题推导新结论的认知过程，分为演绎推理（从一般到特殊，结论蕴含于前提）和归纳推理（从特殊到一般，结论具有或然性）。',
    coreLogic:
      '三段论推理：由两个前提推出结论（如所有人会死→苏格拉底是人→苏格拉底会死），人常受信念偏见影响——结论可信度干扰逻辑判断。条件推理：若 P 则 Q。Wason 选择任务（四卡片问题）揭示人擅长肯定前件（modus ponens）却难以否定后件（modus tollens），且验证假设时存在"确认偏差"——倾向选择能证实假设的卡片（P、Q）而忽视能证伪的卡片（非 Q）。这反映人类推理常偏离形式逻辑。',
    lifeCase:
      '1) "下雨就带伞，今天下雨"推出带伞（肯定前件）；2) Wason 任务中常选"P"与"Q"卡而漏选"非 Q"；3) 医生诊断时倾向寻找支持自己假设的证据（确认偏差）。',
    practice:
      '做判断时刻意寻找证伪证据（选"非 Q"卡片）以对抗确认偏差；用三段论检验自己推理的逻辑链是否成立，避免被结论可信度带偏。',
    feynmanSummary: '从已知推新结论：演绎从一般推特殊（结论必然），归纳从特殊推一般（结论或然）。',
    relatedPoints: ['cp-concept-formation', 'cp-problem-solving', 'cp-problem-barriers'],
    prerequisites: ['cp-concept-formation'],
  },
  {
    id: 'cp-problem-solving',
    name: '问题解决',
    module: 'cp-thinking',
    moduleName: '思维与问题解决',
    icon: '🧩',
    definition:
      '问题解决是运用已有知识克服障碍达到目标的认知活动，包括问题表征、搜索解空间和选择策略；Newell & Simon 将其形式化为问题空间中的搜索过程。',
    coreLogic:
      '问题表征决定解题方向：同一问题不同表征导致难度差异。问题空间含初始状态、目标状态、算子与中间状态。搜索策略：算法式——穷尽所有可能保证求解但效率低；启发式——凭借经验缩小搜索，包括手段-目的分析（Newell & Simon 的 GPS，不断减小当前与目标的差异）、逆向搜索（从目标倒推）、类比迁移（用源问题解法解决目标问题）。专家优势在于拥有丰富的组块化图式，能按深层结构而非表面特征识别问题模式。',
    lifeCase:
      '1) 解数学题先理解题意（表征）再选公式（搜索）；2) 迷路时从目的地反推路线（逆向搜索）；3) 用"水流类比电流"理解电路（类比迁移）。',
    practice:
      '遇难题先花时间重述问题（改变表征往往豁然开朗）；用手段-目的分析把目标拆解为子目标；积累典型案例以备类比迁移。',
    feynmanSummary: '把目标拆成子目标，在解法空间里搜索路径，用穷举算法或经验启发式一步步走到答案。',
    relatedPoints: ['cp-reasoning', 'cp-problem-barriers', 'cp-concept-formation', 'cp-ltm'],
    prerequisites: ['cp-reasoning'],
  },
  {
    id: 'cp-problem-barriers',
    name: '问题解决的障碍',
    module: 'cp-thinking',
    moduleName: '思维与问题解决',
    icon: '🚧',
    definition:
      '问题解决中的常见障碍包括功能固着（仅看到物体常规功能）和心向（习惯性思路的固着），以及专家/新手在知识结构上的差异带来的局限。',
    coreLogic:
      '功能固着（Duncker 的蜡烛问题）：物体常规功能固着阻碍其被用作新工具，如把火柴盒只当容器而非支架。心向/心向效应（Luchins 水壶问题）：先前成功的解题策略固化为定势，对可简化的新题仍套用复杂方法。专家与新手差异：专家拥有更多领域知识、组块化表征，能按深层结构分类问题、快速识别模式；新手依赖表面特征、逐一试错。但专家的强图式也可能陷入定势，对范式外的新问题反而不灵活。',
    lifeCase:
      '1) 需要撬钉子却想不到用尺子（功能固着）；2) 学了公式后所有题都套同一公式（心向）；3) 专家一眼看出题型，新手却从条件逐一尝试。',
    practice:
      '解题受挫时退一步问"还有什么其他用途/思路"；定期打破常规练习以弱化心向；学习新领域时既借鉴已有经验，也警惕过度套用旧框架。',
    feynmanSummary: '卡壳常因为只看到物体常规用途（功能固着），或习惯性套用过去成功的旧思路（心向）。',
    relatedPoints: ['cp-problem-solving', 'cp-reasoning', 'cp-automatic-processing', 'cp-concept-formation'],
    prerequisites: ['cp-problem-solving'],
  },

  // ===== 模块 6：语言 =====
  {
    id: 'cp-language-comprehension',
    name: '语言理解',
    module: 'cp-language',
    moduleName: '语言',
    icon: '👂',
    definition:
      '语言理解是从语音或文字输入中提取意义的过程，涉及句子理解和篇章理解，依赖自上而下与自下而上加工的协同，是一个主动建构的过程。',
    coreLogic:
      '句子理解：解析句法结构（音素→词素→句法）并构建命题表征；歧义句消解需语境支持（花园路径现象——先按常见结构解析再回溯修正）。篇章理解：建立句子间的连贯，依赖图式与脚本（如"餐厅脚本"指导理解）。理解是建构而非解码：读者用已有知识和语境对输入进行诠释与补全。表层结构迅速遗忘，保留的是意义命题。Garrod & Sanford 证明语境启动可加速代词指派。',
    lifeCase:
      '1) "我看见那个男人用望远镜"——句法歧义靠语境消解；2) 读小说时自动构建场景与人物关系；3) 听讲座记不住原话但记得要点。',
    practice:
      '阅读难文时先扫读建立语境（自上而下）再细读（自下而上）；觉察自己如何用背景知识填补文本省略的信息，并警惕这种"补全"可能造成误解。',
    feynmanSummary: '听懂话不是逐字解码，而是用句法分析加已有知识主动建构出意义，语境帮你消歧补全。',
    relatedPoints: ['cp-language-production', 'cp-ltm', 'cp-top-down-bottom-up', 'cp-perception-organization'],
    prerequisites: ['cp-ltm', 'cp-top-down-bottom-up'],
  },
  {
    id: 'cp-language-production',
    name: '语言产生',
    module: 'cp-language',
    moduleName: '语言',
    icon: '🗣️',
    definition:
      '语言产生是将思维转化为言语的过程。Levelt 的说话模型将其分为概念化、言语组织（Formulation）和发音三个相对独立的阶段。',
    coreLogic:
      'Levelt（1989）模型：① 概念化——形成要表达的意念（宏观计划确定说什么、微观计划确定表述方式）；② 言语组织——选择词汇、构建句法、进行语音编码；③ 发音——执行运动程序发出语音。Fromkin 的言语错误分析（如"话到嘴头"tip-of-the-tongue 现象、移位错误"风把灯吹得发抖"）揭示各阶段相对独立。语义错位（把"狗"说成"猫"）说明词汇选择发生在语音编码之前。语言产生与理解共享部分机制但不完全对称。',
    lifeCase:
      '1) 话到嘴头想不起词——概念已激活但语音编码失败；2) 口误"风把灯吹得发抖"说明思维超前于语音组织；3) 演讲前列要点即概念化阶段。',
    practice:
      '演讲或写作前先理清要表达的意念（概念化），再选词造句；分析自己的口误可了解言语产生各阶段如何运作，从而更有意识地组织表达。',
    feynmanSummary: '说话分三步：先想清楚说什么，再选词造句组织语言，最后发音说出来，口误能暴露各阶段。',
    relatedPoints: ['cp-language-comprehension', 'cp-problem-solving', 'cp-concept-formation'],
    prerequisites: ['cp-language-comprehension'],
  },
  // ===== 模块 7：具身认知 =====
  {
    id: 'cp-embodied-cognition',
    name: '具身认知',
    module: 'cp-embodied',
    moduleName: '具身认知',
    icon: '🫀',
    definition:
      '具身认知主张认知并非纯大脑内部的信息加工，而是大脑、身体与环境三者互动的产物。身体的感觉运动经验深刻塑造了抽象思维和概念结构，认知是"具身的"（embodied）、"情境的"（situated）。',
    coreLogic:
      '经典认知心理学把大脑比作计算机——输入信息、加工、输出，身体只是"容器"。具身认知挑战这一范式，提出三条核心主张：① 认知依赖身体的物理属性——身体的结构和感官体验直接参与思维；② 认知是情境的——认知发生在大脑-身体-环境的实时互动中，不能脱离环境单独研究；③ 认知是为行动的——思维的根本目的是指导身体行动，而非纯粹的抽象运算。概念隐喻理论（Lakoff & Johnson）是关键证据：人类几乎所有抽象概念都借身体经验构建——"温暖"源于体温体验、"沉重"源于肌肉感受、"高"源于空间方位。经典实验：捧热杯子的人评价他人更"温暖"（Williams & Bargh, 2008）；点头的人比摇头的人更容易被说服（Wells & Petty, 1980）；向前推身体时对中性图片评价更负面（推进=排斥）。',
    lifeCase:
      '1) 手捧热饮时觉得陌生人更友善——身体温度体验影响社会判断；2) 考试前坐直挺胸的人比蜷缩的人更有自信——身体姿态影响心理状态；3) 拿重物的人觉得议题更重要——重量感受影响重要性判断；4) "这个决定很沉重""他很高尚""关系很亲密"——抽象概念全部借用身体经验表达。',
    practice:
      '注意身体状态对判断的影响——做重要决策前调整身体姿态（挺胸、深呼吸），避免因身体不适做出偏误判断。理解"抽象概念来自身体经验"后，有意识地用身体体验辅助学习——比如动手操作比纯看更容易记住。警惕营销中的具身效应——咖啡店用暖色调和热饮让你觉得品牌更"温暖"。',
    feynmanSummary: '脑子不是在真空中思考的——你的身体感受（温度、重量、姿态）会直接影响你的判断和想法。',
    relatedPoints: ['cp-top-down-bottom-up', 'cp-perception-concept', 'cp-attention-capacity'],
    prerequisites: ['cp-perception-concept'],
  },
];

// ---------------------------------------------------------------------------
// 辅助校验（开发期可用）
// ---------------------------------------------------------------------------

/** 所有知识点 ID 集合，便于校验引用合法性 */
export const CP_POINT_IDS: string[] = CP_KNOWLEDGE_POINTS.map((p) => p.id);

/** 所有模块 ID 集合 */
export const CP_MODULE_IDS: string[] = CP_SKILL_MODULES.map((m) => m.id);

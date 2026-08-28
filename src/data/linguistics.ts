/**
 * 语言学 RPG 学习系统 - 知识点数据
 *
 * 领域：语言学（Linguistics）
 * 子领域数：2 个  模块数：4 个  知识点数：15 个
 *   - core-linguistics（核心语言学）：语音学 / 句法学 / 语义学  共 11 点
 *   - applied-linguistics（应用语言学）：语用学  共 4 点
 *
 * 导出：
 *   - LG_SKILL_MODULES      4 个模块定义
 *   - LG_KNOWLEDGE_POINTS   15 个知识点完整内容
 */

import type { ISkillModule, IKnowledgePoint } from "@/types"

// ---------------------------------------------------------------------------
// 模块定义
// ---------------------------------------------------------------------------

export const LG_SKILL_MODULES: ISkillModule[] = [
  {
    id: "phonetics",
    name: "语音学",
    icon: "🔊",
    color: "hsl(0 60% 50%)",
    description:
      "研究人类语音的产生、传播与感知，从发音器官、元音辅音到声调语调，揭示声音如何承载语言。",
    pointIds: ["phonetics-basics", "vowel-consonant", "toneintonation"],
    subdomain: "core-linguistics",
  },
  {
    id: "syntax",
    name: "句法学",
    icon: "🌳",
    color: "hsl(210 60% 50%)",
    description:
      "研究句子的结构规则与组合规律，从语素构词到短语结构、句法树与生成理论，揭示语言的形式骨架。",
    pointIds: ["word-formation", "phrase-structure", "syntactic-tree", "syntactic-theory"],
    subdomain: "core-linguistics",
  },
  {
    id: "semantics",
    name: "语义学",
    icon: "📖",
    color: "hsl(280 50% 55%)",
    description:
      "研究语言的意义，从词汇语义到组合语义、歧义分析与语义关系，揭示意义如何被表征与组合。",
    pointIds: ["lexical-semantics", "compositional-semantics", "ambiguity", "semantic-relations"],
    subdomain: "core-linguistics",
  },
  {
    id: "pragmatics",
    name: "语用学",
    icon: "💬",
    color: "hsl(150 55% 45%)",
    description:
      "研究语言在真实交际中的使用，从言语行为、会话含义到礼貌策略与话语分析，探索语境中的意义。",
    pointIds: ["speech-act", "implicature", "politeness-theory", "discourse-analysis"],
    subdomain: "applied-linguistics",
  },
]

// ---------------------------------------------------------------------------
// 知识点定义
// ---------------------------------------------------------------------------

export const LG_KNOWLEDGE_POINTS: IKnowledgePoint[] = [
  // ===== 模块 1：语音学 =====
  {
    id: "phonetics-basics",
    name: "语音学基础",
    module: "phonetics",
    moduleName: "语音学",
    icon: "🗣️",
    definition:
      "语音学研究人类语音的产生、传播与感知，关注语音的生理机制、物理属性与听觉感知三大环节，是语言研究的最底层基础。",
    coreLogic:
      "语音的产生依赖发音器官（声带、舌、唇、齿、口腔与鼻腔等）的协调运动：声带振动产生声源，声道形状调制出不同音质，声波经空气传播，最终由听觉系统感知解码。语音学分三个分支：发音语音学（articulatory，研究怎么发声）、声学语音学（acoustic，研究声音的物理频谱）、听觉语音学（auditory，研究耳朵怎么听）。国际音标（IPA）是其通用记音系统，用一套符号精确记录任何语言的可区分语音。",
    lifeCase:
      "1) 婴儿学说话总是先咿呀学语掌握语音，再逐步习得词汇和语法；2) 学外语时“口音重”本质是没能掌握目标语的语音特征；3) 录音软件能把人声转成频谱图，正是声学语音学的应用。",
    practice:
      "对着镜子练国际音标，观察自己舌位、唇形的变化；用手机录音对比母语者发音，定位差异并修正口型与气流控制。",
    boundaries:
      "语音学研究语音本身的物理与生理属性，不研究语音如何抽象成区别意义的音位系统（那是音系学/音位学范畴）。",
    feynmanSummary: "语音学就是研究人的嘴怎么发声、声音长什么样、耳朵怎么听的科学。",
    relatedPoints: ["vowel-consonant", "toneintonation"],
    prerequisites: [],
  },
  {
    id: "vowel-consonant",
    name: "元音与辅音",
    module: "phonetics",
    moduleName: "语音学",
    icon: "🔤",
    definition:
      "元音是气流通过声道时不受阻碍而形成的语音；辅音是气流受到发音器官阻碍或摩擦而形成的语音，二者是语音最基本的两分。",
    coreLogic:
      "元音的音质由声道形状决定，可按三个维度描述：舌位高低（高/中/低）、舌位前后（前/中/后）、唇形圆展（圆唇/展唇），如 i 是高前展唇元音。辅音的音质由发音部位（双唇、唇齿、舌尖、舌根等阻碍位置）和发音方法（塞音、擦音、塞擦音、鼻音、边音等）共同决定，再叠加清浊（声带是否振动）和送气与否区分。汉语拼音的 a/o/e/i/u/ü 是元音，b/p/m/f/d/t 是辅音。",
    lifeCase:
      "1) 英语“apple”里 a 是元音、p 是辅音；2) b 与 p 唯一区别是清浊（b 浊 p 清），d 与 t 同理；3) 发“啊”时嘴张开气流顺畅（元音），发“嘶”时气流被齿摩擦（辅音）。",
    practice:
      "用国际音标给一段话逐音标注，刻意练习分辨清浊辅音（手摸喉部感受声带振动）和送气与否（手放嘴前感受气流强弱）。",
    boundaries:
      "元音辅音是音段层面的分类，不涉及声调、重音、语调等依附于音段之上的超音段特征。",
    feynmanSummary: "嘴张着气流顺畅出去是元音，气流被牙齿舌头挡一下或蹭一下是辅音。",
    relatedPoints: ["phonetics-basics", "toneintonation"],
    prerequisites: ["phonetics-basics"],
  },
  {
    id: "toneintonation",
    name: "声调与语调",
    module: "phonetics",
    moduleName: "语音学",
    icon: "🎵",
    definition:
      "声调是词层面用以区别意义的音高变化，语调是句子层面表达语气与情感的音高起伏模式，二者都属超音段特征但作用于不同语言层级。",
    coreLogic:
      "声调语言（如汉语、越南语）中音高变化改变词义，属音位级：汉语四声“妈 mā／麻 má／马 mǎ／骂 mà”音节相同而意义不同。语调语言（如英语）中音高起伏不改变词义，只表达句子语气：升调表疑问（Really?）、降调表肯定（Really.）。汉语既有声调又有句末语调，二者会叠加（如“他去？”的“去”字调与疑问升调融合）。音高由声带振动频率决定，是声调与语调共同的物理基础。",
    lifeCase:
      "1) 老外说汉语声调不准闹笑话（“水饺”说成“睡觉”）；2) 英语“Let's go”升调表提议、降调表命令；3) 语气词“啊”用不同语调可表惊讶、疑问、敷衍等多种情绪。",
    practice:
      "录音对比自己的四声是否到位；用语调曲线软件（Praat 等）可视化一句话的音高走向，体会陈述与疑问的语调差异。",
    boundaries:
      "声调严格说属音系学（音位层面，因它区别意义），语调属韵律学（超音段层面），二者机制和归属不同，常被混为一谈。",
    feynmanSummary: "声调是让一个词意思变了的音高，语调是让一句话感情变了的音高起伏。",
    relatedPoints: ["phonetics-basics", "vowel-consonant"],
    prerequisites: ["vowel-consonant"],
  },

  // ===== 模块 2：句法学 =====
  {
    id: "word-formation",
    name: "构词法",
    module: "syntax",
    moduleName: "句法学",
    icon: "🧱",
    definition:
      "构词法研究词的内部结构与形成规则，包括词根、词缀、复合、派生与屈折等方式，揭示语素如何组合成词。",
    coreLogic:
      "语素（morpheme）是最小的有意义单位，分自由语素（可独立成词）和黏着语素（须依附）。词由词根承载核心意义，加词缀改变意义或语法功能。派生（derivation）创造新词、可能改变词类（happy→unhappy→unhappiness）；屈折（inflection）只变语法形式不改词类（英语动词加 -ed 表过去式）。复合（compounding）把两个词根组合成新词（如“黑板”、blackboard）。汉语构词以复合为主，英语派生与屈折丰富。",
    lifeCase:
      "1) “现代化”=“现代”（复合）+“化”（派生后缀）；2) 英语“unhappiness”=un-（前缀）+happy（词根）+-ness（后缀）；3) “孩子们”中“们”是表复数的屈折成分。",
    practice:
      "拆解生词的语素结构，标出词根与前后缀的功能；用词根词缀建立词族（如 act→action→active→activity），成串记忆词汇。",
    boundaries:
      "构词法研究词的内部结构，不研究词与词如何组合成短语和句子（那是短语结构与句法理论）。",
    feynmanSummary: "构词法就是研究字根字缀怎么拼装成一个完整词的规则。",
    relatedPoints: ["phrase-structure", "lexical-semantics"],
    prerequisites: [],
  },
  {
    id: "phrase-structure",
    name: "短语结构",
    module: "syntax",
    moduleName: "句法学",
    icon: "📐",
    definition:
      "短语结构研究词如何组合成短语及短语的内部层次，如名词短语、动词短语、介词短语等的构成规则与嵌套关系。",
    coreLogic:
      "短语由中心词（head）和附属成分构成，遵循“中心词决定短语类型”原则：以名词为中心的是名词短语（NP），以动词为中心的是动词短语（VP）。成分间存在层级嵌套——短语可层层套叠，如“非常努力地工作”是 VP，其中“非常努力地”修饰中心动词“工作”。短语结构规则用改写规则表示（如 NP→Det + N，VP→V + NP），描述语言允许的组合模式。",
    lifeCase:
      "1) “我的红苹果”是 NP，中心词“苹果”被“我的”“红”修饰；2) “在公园里跑步”是 VP，“在公园里”作状语修饰“跑步”；3) “这本书的封面”是 NP 内嵌 NP 的结构。",
    practice:
      "分析句子各短语的中心词与修饰成分；用括号法标注短语的层次结构（如 [我的 [红 [苹果]]]），检验组合是否符合结构规则。",
    boundaries:
      "短语结构关注短语内部的组织与层次，不涉及跨短语的句法移位、转换与变换规则（那是句法理论）。",
    feynmanSummary: "短语结构就是几个词抱团时谁是老大（中心词）、谁修饰谁的组合规则。",
    relatedPoints: ["word-formation", "syntactic-tree"],
    prerequisites: ["word-formation"],
  },
  {
    id: "syntactic-tree",
    name: "句法树",
    module: "syntax",
    moduleName: "句法学",
    icon: "🌳",
    definition:
      "句法树是用树形图表示句子层次结构与成分关系的图形工具，展示词如何逐层组合成短语和完整句子。",
    coreLogic:
      "树由节点（表示语法范畴如 S/NP/VP/N/V）和连接分支组成，遵循从叶节点（词）向上逐层组合到根节点（句子 S）的原则。短语结构语法的树常遵循二分分支（binary branching），如 S→NP + VP，VP→V + NP。句法树能直观揭示“谁修饰谁”“谁是中心”的层级关系，也能暴露结构歧义——同一串词因可作不同层次划分而对应不同树形，产生不同理解。",
    lifeCase:
      "1) “小明吃苹果”画成 S→NP（小明）+VP（吃苹果），VP→V（吃）+NP（苹果），直观显示主谓宾；2) “咬死了猎人的狗”可画两种树，分别意为“狗咬死猎人”或“猎人的狗被咬死”。",
    practice:
      "给简单句画句法树，逐节点标注语法范畴（NP/VP/PP 等）；用括号法先分层再转成树，检查分支是否符合结构规则。",
    boundaries:
      "句法树是结构表示工具，不同语法理论（生成语法、依存语法、范畴语法）画法与节点含义不同，没有唯一标准画法。",
    feynmanSummary: "句法树就是把一句话拆成主谓宾等成分，再画成一棵倒过来的树状图。",
    relatedPoints: ["phrase-structure", "syntactic-theory"],
    prerequisites: ["phrase-structure"],
  },
  {
    id: "syntactic-theory",
    name: "句法理论",
    module: "syntax",
    moduleName: "句法学",
    icon: "⚙️",
    definition:
      "句法理论是系统解释句子结构规律的理论框架，以乔姆斯基生成语法为代表，用短语结构规则与转换规则刻画句子从深层到表层的生成过程。",
    coreLogic:
      "生成语法主张语言能力由一套内在规则系统支撑，可用有限规则生成无限合语法的句子。深层结构（deep structure）经转换规则（移位、删除、插入、复指等）生成表层结构（surface structure）：如主动句“猫追老鼠”与被动句“老鼠被猫追”深层相同，经移位转换得到不同表层。递归性（recursion）使规则可无限嵌套套用，是语言创造力的形式根源。最简方案（Minimalist Program）是其后期发展，追问语言设计的最简必要运算。",
    lifeCase:
      "1) “The boy kicked the ball”与“The ball was kicked by the boy”深层结构相同，转换生成不同表层；2) 疑问句“他会来吗”由陈述句移位加疑问词生成；3) 嵌套句“我知道他觉得她很美”靠递归层层套叠。",
    practice:
      "用生成语法规则推导句子的深层到表层转换；对比主动/被动、陈述/疑问等句式的结构关系，体会同一意义如何被不同句法形式实现。",
    boundaries:
      "句法理论聚焦形式结构与生成规则，不解释意义（那是语义学）和语用（那是语用学），且各理论流派存在长期争议，无绝对定论。",
    feynmanSummary: "句法理论就是研究“句子凭什么这么说才合语法”的底层生成规则系统。",
    relatedPoints: ["syntactic-tree", "compositional-semantics"],
    prerequisites: ["syntactic-tree"],
  },

  // ===== 模块 3：语义学 =====
  {
    id: "lexical-semantics",
    name: "词汇语义",
    module: "semantics",
    moduleName: "语义学",
    icon: "📚",
    definition:
      "词汇语义学研究词的意义，包括词义的本质、词义关系（同义、反义、多义、同音）及词义如何在心理词库中被表征与组织。",
    coreLogic:
      "词义可通过语义特征（semantic features）分解，如“男人”=[+人类][+男性][+成年]。词与词之间形成系统的意义关系网络：同义（美丽/漂亮）、反义（大/小）、多义（“打”有击打、玩、买等多义）、同音（“期中/期终”）。词义按语义场（semantic field）组织——同属一个意义范畴的词相互关联（如颜色词、亲属词构成各自的语义场）。多义与同音的区别在于多个意义间是否有历史或逻辑联系。",
    lifeCase:
      "1) “大/小”是反义关系；2) “汽车”是“交通工具”的下义词；3) “打”在不同语境下是打人、打车、打游戏，属一词多义；4) “杜鹃”既指花又指鸟，是同音词。",
    practice:
      "用语义特征矩阵分析近义词的细微差异（如“看/见/望/瞪”的[+动作][+结果][+方向]特征）；绘制词义关系图区分多义与同音词。",
    boundaries:
      "词汇语义研究单个词的意义，不研究词组合成短语后整体意义如何产生（那是组合语义学）。",
    feynmanSummary: "词汇语义学就是研究一个词到底什么意思、跟其他词的意思有什么关系。",
    relatedPoints: ["compositional-semantics", "semantic-relations", "ambiguity", "word-formation"],
    prerequisites: [],
  },
  {
    id: "compositional-semantics",
    name: "组合语义",
    module: "semantics",
    moduleName: "语义学",
    icon: "🧩",
    definition:
      "组合语义学研究词和短语如何组合成更大的语义单位，遵循“整体意义由部分意义与组合方式共同决定”的组合性原则。",
    coreLogic:
      "弗雷格（Frege）的组合性原则是核心：复合表达式的意义系统性地由其组成部分的意义和组合规则决定。例如形容词修饰名词时，“红色的苹果”=“红色”的属性限定“苹果”的外延；副词修饰动词时，“很快地跑”中“很快地”规定“跑”的方式。组合方式（句法结构）与部分意义共同决定整体意义，因此同一组词不同结构会产生不同意义（结构歧义）。逻辑语义学用谓词逻辑、lambda 演算等形式化工具精确刻画组合过程。",
    lifeCase:
      "1) “红色的苹果”=“红色”+“苹果”按修饰关系组合；2) “不是所有鸟都会飞”与“所有鸟都不会飞”组合方式不同意义不同；3) “追猫的狗”与“追狗的猫”同词不同序，意义随组合方式而变。",
    practice:
      "用逻辑语义式表示短语的组合关系（如 red(apple)）；分析修饰语的作用范围——“很聪明的孩子和大人”中“很聪明”是只修饰“孩子”还是兼修饰“大人”。",
    boundaries:
      "组合语义处理字面意义的组合，不处理言外之意、语境暗示与说话人意图（那些属语用学范畴）。",
    feynmanSummary: "组合语义学就是研究几个词拼一起后整体意思怎么由部分算出来的规则。",
    relatedPoints: ["lexical-semantics", "ambiguity", "syntactic-theory"],
    prerequisites: ["lexical-semantics"],
  },
  {
    id: "ambiguity",
    name: "歧义",
    module: "semantics",
    moduleName: "语义学",
    icon: "❓",
    definition:
      "歧义指一个语言表达式可有两种或多种理解的现象，分为词汇歧义（源于一词多义）与结构歧义（源于句法结构可作多种层次划分）。",
    coreLogic:
      "词汇歧义：词本身多义导致整句多解，如“我要挂”中“挂”可指挂断电话、挂科、挂念。结构歧义：同一串词因句法层次可作不同划分而对应多种语义解读，是组合性的副作用。经典例“咬死了猎人的狗”可分析为“（咬死了）（猎人的狗）”（狗被咬）或“（咬死了猎人的）狗”（狗咬人）。歧义可用句法树或逻辑语义式区分不同解读，靠语境消解。歧义有别于含混（vagueness，边界不清）和笼统。",
    lifeCase:
      "1) “他借我一本书”——是他借给我还是我借给他（结构/方向歧义）；2) “Visiting relatives can be boring”——拜访亲戚烦或来访的亲戚烦（结构歧义）；3) 广告语故意利用歧义制造双关效果。",
    practice:
      "辨析一句话的歧义类型（词汇还是结构），用句法树或括号法画出不同解读；练习用重音、停顿或换词消解歧义使表达更清晰。",
    boundaries:
      "歧义是语义/句法层面的多解现象，与语用学中的会话含义（言外之意）不同——含义是推理出的隐含，歧义是字面本身的多解。",
    feynmanSummary: "歧义就是一句话能听出好几个意思，可能怪词多义，也可能怪结构没说清。",
    relatedPoints: ["compositional-semantics", "lexical-semantics", "semantic-relations", "implicature"],
    prerequisites: ["compositional-semantics"],
  },
  {
    id: "semantic-relations",
    name: "语义关系",
    module: "semantics",
    moduleName: "语义学",
    icon: "🕸️",
    definition:
      "语义关系研究语言单位之间系统性的意义关联，包括同义、反义、上下义、整体-部分等关系，构成词库的网络化组织。",
    coreLogic:
      "语义关系把孤立词义织成网络：同义（意义相同或相近，如美丽/漂亮）、反义（意义对立，分互补反义如男/女、渐级反义如冷/热、关系反义如夫/妻）、上下义（含属种关系，如“动物”是“猫”的上义词）、整体-部分（meronymy，如“手”是“手指”的整体）。这些关系构成语义场与心理词库的结构，支持近义替换、词汇推理与语言理解。多义既是语义关系也是歧义来源——一个词的多个意义间存在引申联系。",
    lifeCase:
      "1) 词典释义常借同义词（“漂亮：美丽”）；2) 用上下义做词义扩展（学“动物”再学“猫、狗”）；3) “热/冷”互补对立便于做对比推理；4) 问答“这是水果吗？”“不，是苹果”中“苹果”是“水果”的下义词。",
    practice:
      "建立目标词的语义关系网（同义、反义、上下义、整体部分）；用反义和上下义做词汇扩展与近义辨析，检验同义词的语义特征差异。",
    boundaries:
      "语义关系研究词汇层面的意义联系，不涉及句子之间的逻辑蕴含、推理与真值关系（那是句子语义学/逻辑语义学）。",
    feynmanSummary: "语义关系就是词和词之间意思上的亲戚关系，谁同义、谁反义、谁包含谁。",
    relatedPoints: ["lexical-semantics", "compositional-semantics", "ambiguity"],
    prerequisites: ["ambiguity"],
  },

  // ===== 模块 4：语用学 =====
  {
    id: "speech-act",
    name: "言语行为",
    module: "pragmatics",
    moduleName: "语用学",
    icon: "🎬",
    definition:
      "言语行为理论由奥斯汀（Austin）与塞尔（Searle）提出，认为说话即做事——言语不仅描述世界，还执行行为，分为言内、言外、言后三种行为。",
    coreLogic:
      "言内行为（locutionary）是说出有意义句子本身；言外行为（illocutionary）是说话时所执行的意图行为（承诺、命令、请求、宣告等），是理论核心；言后行为（perlocutionary）是话语对听者产生的实际效果（说服、吓唬、安慰）。塞尔将言外行为分为五类：阐述类（断言）、指令类（请求/命令）、承诺类（保证）、表达类（致谢/道歉）、宣告类（命名/开除）。直接言语行为是形式与功能一致（“关门！”是命令），间接言语行为是形式与功能错位（“能关门吗？”表面是疑问实为请求）。",
    lifeCase:
      "1) “我保证明天来”是承诺行为；2) “能递一下盐吗？”表面疑问实为请求（间接言语行为）；3) 婚礼上牧师说“我宣布你们结为夫妻”是宣告类施事行为，说完即改变现实；4) “这里好冷”实为“请关窗/开暖气”的间接请求。",
    practice:
      "分析日常话语的言外之力（说话人到底在做什么行为）；区分直接与间接言语行为，识别间接请求、暗示命令背后的真实意图。",
    boundaries:
      "言语行为关注说话人意图与所执行的行为，不关注话语内容的真假条件（那是语义学）。",
    feynmanSummary: "言语行为理论说“说话就是做事”，一句话不只是描述，还能请求、承诺、命令。",
    relatedPoints: ["implicature", "politeness-theory", "discourse-analysis"],
    prerequisites: [],
  },
  {
    id: "implicature",
    name: "会话含义",
    module: "pragmatics",
    moduleName: "语用学",
    icon: "💡",
    definition:
      "会话含义由格莱斯（Grice）提出，指听者根据合作原则与语境推导出的、超出字面意义的言外之意，是语用推理的核心现象。",
    coreLogic:
      "格莱斯合作原则含四准则：量准则（信息恰到好处）、质准则（说真话）、关联准则（说相关的话）、方式准则（简明有序）。当说话人表面上违反某准则，听者假定其仍合作，便通过推理得出言外之意即会话含义。如答“他不是没有脑子”暗示“他有点傻”（违反方式准则的冗余）。会话含义具有可取消性（can be cancelled）——加一句“我是说字面意思”即可取消，这是它与语义蕴含、预设等逻辑关系的根本区别。",
    lifeCase:
      "1) 问“她漂亮吗？”答“她人很好”——答非所问暗示“不漂亮”（违反关联准则）；2) “这菜有点咸”实为“麻烦加点水/换一道”；3) “他不是没去过”暗示“他去过”，但可被“我是字面意思”取消。",
    practice:
      "识别违反合作原则的话语并推导其会话含义；练习用合作原则解释间接表达——当别人拐弯抹角时，反推其真实意图与所违反的准则。",
    boundaries:
      "会话含义是可取消的语用推理，不同于语义学中的逻辑蕴含（entailment，必然为真、不可取消）和预设（presupposition）。",
    feynmanSummary: "会话含义就是听话人听出来的“话外音”，靠合作原则和脑子推理出来。",
    relatedPoints: ["speech-act", "politeness-theory", "ambiguity"],
    prerequisites: ["speech-act"],
  },
  {
    id: "politeness-theory",
    name: "礼貌理论",
    module: "pragmatics",
    moduleName: "语用学",
    icon: "🎭",
    definition:
      "礼貌理论由布朗与列文森（Brown & Levinson）提出，认为交际中为保护“面子”会使用礼貌策略；面子分积极面子（被认同喜爱）与消极面子（行动不受干涉）。",
    coreLogic:
      "面子威胁行为（Face-Threatening Act, FTA）的严重程度决定策略选择，由威慑的等级与措辞构成连续体：① 不做 FTA（沉默/回避）；② 委婉暗示（off record，如“这里好热”暗示开窗）；③ 消极礼貌（消极面子策略，给对方留余地，如“您方便的话能否...”）；④ 积极礼貌（积极面子策略，强调亲近认同，如“哥们帮个忙”）；⑤ 直言（bald on record，如“关门”）。威胁越大，策略越委婉、越靠近委婉暗示端。",
    lifeCase:
      "1) 请陌生人帮忙用“打扰一下，您方便的话能否...”（消极礼貌）；2) 求哥们帮忙用“兄弟搭把手呗”（积极礼貌）；3) 紧急时对下属直接下令“快关门！”（直言）；4) 批评他人用委婉暗示而非直说以保全面子。",
    practice:
      "分析不同场景的面子威胁程度与双方权力/距离关系，选择合适礼貌策略；调整措辞在效率与礼貌间取得平衡——正式场合多用消极礼貌，亲近关系多用积极礼貌。",
    boundaries:
      "礼貌理论有显著文化差异：东亚集体主义文化的面子观与西方个人主义的消极面子（强调不受干涉）并不完全相同，不能照搬。",
    feynmanSummary: "礼貌理论说人说话客气是为了保住自己和对方的面子，越伤面子越要拐弯说。",
    relatedPoints: ["speech-act", "implicature", "discourse-analysis"],
    prerequisites: ["implicature"],
  },
  {
    id: "discourse-analysis",
    name: "话语分析",
    module: "pragmatics",
    moduleName: "语用学",
    icon: "📜",
    definition:
      "话语分析研究超出单句的连贯语言使用，关注话语结构、衔接与连贯、信息流与交际语境，揭示一段话或一篇文如何成为有机整体。",
    coreLogic:
      "衔接（cohesion）是话语表层的语言联系手段，包括词汇衔接（照应、替代、省略、连接词、同义复现等）；连贯（coherence）是深层的语义关联，即句子命题间有逻辑意义联系。一段话可能衔接不明显但靠世界知识仍连贯，也可能表面衔接却语义不连贯。话语分析还研究信息结构（已知/新信息、主位/述位推进）、话题发展与话轮转换（对话中谁说多久何时切换），以及语境（参与者、场景、目的）对意义的影响。",
    lifeCase:
      "1) 文章用“因此”“然而”“总之”等连接词衔接句子；2) 对话“他怎么样？”“他挺好”——“他”照应前文保持连贯；3) 读到“它飞走了”能懂“它”指鸟，靠世界知识建立连贯；4) 主持访谈中话轮的顺畅转换是话语分析的对象。",
    practice:
      "分析一篇文章的衔接手段与连贯结构，识别话题如何推进、信息如何从已知推向新知；练习用照应与连接词改善自己文章的连贯性，避免句句断裂。",
    boundaries:
      "话语分析关注跨句、跨话轮的篇章层面，不研究单句内部的句法结构（那是句法学）。",
    feynmanSummary: "话语分析就是研究一段话或一篇文怎么连成整体、句子之间怎么接上的学问。",
    relatedPoints: ["politeness-theory", "speech-act", "implicature"],
    prerequisites: ["politeness-theory"],
  },
]

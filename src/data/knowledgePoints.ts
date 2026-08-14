import type { ISkillModule, IKnowledgePoint } from "@/types"
import { SP_SKILL_MODULES, SP_NEW_KNOWLEDGE_POINTS } from "@/data/socialPsychologyNew"
import { CP_SKILL_MODULES, CP_KNOWLEDGE_POINTS } from "@/data/cognitivePsychology"
import { PP_SKILL_MODULES, PP_KNOWLEDGE_POINTS } from "@/data/personalityPsychology"
import { EG_SKILL_MODULES, EG_KNOWLEDGE_POINTS } from "@/data/electronicGaming"
import { MK_SKILL_MODULES, MK_KNOWLEDGE_POINTS } from "@/data/muskCompanies"

// ============================================================
// 统一知识库 — 整合心理学 + 电子游戏 + 马斯克企业
// ============================================================

/** 所有技能模块（五大领域） */
export const SKILL_MODULES: ISkillModule[] = [
  ...SP_SKILL_MODULES,
  ...CP_SKILL_MODULES,
  ...PP_SKILL_MODULES,
  ...EG_SKILL_MODULES,
  ...MK_SKILL_MODULES,
]

/** 原有19个社会心理学知识点（模块ID已更新为新结构） */
const EXISTING_SP_POINTS: IKnowledgePoint[] = [
  // ── 社会影响 (sp-influence) ──
  {
    id: "conformity",
    name: "从众",
    module: "sp-influence",
    moduleName: "社会影响",
    icon: "👥",
    definition: "个体在群体压力下，改变自己的行为或信念以与群体保持一致的现象。由所罗门·阿希的经典线段实验首次系统验证。",
    coreLogic: "从众动机有二：信息性影响（认为群体掌握更准确的信息）和规范性影响（渴望被群体接纳、避免排斥）。群体规模越大、凝聚力越强、个体自信越低，从众压力越大。",
    lifeCase: "会议上所有人都赞同某个方案，你虽然觉得有问题但还是跟着举了手；聚餐时别人都点了辣菜，你明明不能吃辣却没好意思说。",
    practice: "觉察自己在群体中的沉默时刻——问自己'我同意是因为对，还是因为怕被孤立？'。在小事上练习表达不同意见，逐步建立独立判断的勇气。",
    boundaries: "1）文化差异显著——阿希实验在个人主义文化（美国）中从众率约37%，但在集体主义文化（如日本、中国）中更高，不能简单将结论跨文化推广；2）时代局限——1950年代的实验结论在当今社会可能不同，互联网时代的信息获取方式和社会压力形式已发生巨大变化；3）实验室 ≠ 现实——阿希实验是人工构造的明确判断任务（线段长短），现实中的从众涉及复杂的不确定性，从众有时是合理的（如专家共识）；4）从众不等于盲从——信息性从众（相信他人更准确）在很多情况下是理性的认知策略，不能一概视为消极；5）个体差异被忽略——从众率从来不是100%，部分人始终不从众，理论对「为什么不从众」的解释不足。",
    feynmanSummary: "别人都这么做，你也会不自觉跟着做——怕被孤立，或觉得大家都对。",
    relatedPoints: ["obedience", "group-polarization", "sp-compliance"],
    prerequisites: [],
  },
  {
    id: "obedience",
    name: "服从",
    module: "sp-influence",
    moduleName: "社会影响",
    icon: "🎖️",
    definition: "在权威人物的直接命令下，个体做出自己原本不会做的行为。米尔格拉姆的电击实验揭示了普通人在权威指令下可能做出极端行为。",
    coreLogic: "服从的关键机制是'代理状态'(agentic state)——个体将自己视为权威意志的执行工具，从而将责任转移给权威。权威的合法性、与受害者的距离、是否有同伴反抗都会影响服从程度。",
    lifeCase: "上司要求你做明显不合规的操作，你虽然不安但还是照做了；医生开了你怀疑过量的药，你没有质疑就服用了。",
    practice: "面对权威指令时启动'服从防御三问'：这个要求的目的是什么？如果不服从最坏后果是什么？有没有第三种选择？将'我不能'替换为'我选择不'。",
    feynmanSummary: "权威让你做什么你就做什么，哪怕心里不愿——因为你把责任交给了他。",
    relatedPoints: ["conformity", "foot-in-door", "sp-compliance"],
    prerequisites: ["conformity"],
  },
  {
    id: "foot-in-door",
    name: "登门槛效应",
    module: "sp-influence",
    moduleName: "社会影响",
    icon: "🚪",
    definition: "先提出一个小请求被接受后，再提出一个大请求，对方更可能答应。因为小请求让人建立了'乐于助人者'的自我形象。",
    coreLogic: "机制基于自我认知理论：答应小请求后，个体将自己归因为'慷慨/配合的人'，为保持自我一致性，更倾向于答应后续更大的请求。",
    lifeCase: "销售先让你免费试用，再推荐付费版；慈善机构先请你签个名支持，再请求捐款；同事先让你帮个小忙，再让你承担整个项目。",
    practice: "当别人对你'得寸进尺'时，检查是否被登门槛建立了'好人'人设。学会在小请求阶段就判断：如果后续有更大请求，我是否愿意？说不'不'不需要理由。",
    feynmanSummary: "先答应小请求，就更容易答应大请求——因为你已给自己贴上了'好人'标签。",
    relatedPoints: ["reciprocity", "obedience", "sp-compliance"],
    prerequisites: ["obedience"],
  },
  {
    id: "reciprocity",
    name: "互惠原则",
    module: "sp-influence",
    moduleName: "社会影响",
    icon: "🔄",
    definition: "当他人给予我们好处时，我们感到有义务回报。罗伯特·西奥迪尼在《影响力》中将其列为六大说服原则之一。",
    coreLogic: "互惠是人类社会的根基规范——它确保合作循环得以维持。即使是不请自来的恩惠也会触发回报义务感，且回报的价值往往大于收到的给予。",
    lifeCase: "超市免费试吃后你不好意思不买；同事帮你一个忙后找你帮忙你很难拒绝；商家先送你小礼品再推销产品。",
    practice: "区分'真诚的互惠'与'被操纵的互惠'。当感到'欠了人情'的压力时，问自己：如果没有这个礼物，我本会做这个选择吗？接受不等于负债。",
    feynmanSummary: "别人给了你好处，你就觉得欠了人情，非得还回去心里才舒服。",
    relatedPoints: ["foot-in-door", "central-route", "sp-social-exchange"],
    prerequisites: ["foot-in-door"],
  },

  // ── 社会认知 (sp-cognition) ──
  {
    id: "stereotype",
    name: "刻板印象",
    module: "sp-cognition",
    moduleName: "社会认知",
    icon: "🏷️",
    definition: "对某一群体成员的固定、概括化的信念。它是认知节省机制——用类别快速处理信息，但往往过度简化且不准确。",
    coreLogic: "刻板印象是认知吝啬鬼的产物：大脑倾向于用最少的认知资源处理信息，将个体归入预设类别。它通过社会化、媒体强化和群体接触经验形成，一旦激活就会影响对个体的判断。",
    lifeCase: "认为'理科生不善交际'；看到纹身就觉得对方不靠谱；听到某个地域的人就联想到特定性格标签。",
    practice: "觉察自动浮现的群体标签。当你对一个人做出判断时，问自己：这个判断基于我观察到的他/她，还是基于他/她所属的群体？用个体信息覆盖类别信息。",
    feynmanSummary: "大脑偷懒，用群体标签快速判断一个人，而不是去看他真实的模样。",
    relatedPoints: ["prejudice", "discrimination", "fae", "sp-schema"],
    prerequisites: [],
  },
  {
    id: "prejudice",
    name: "偏见",
    module: "sp-cognition",
    moduleName: "社会认知",
    icon: "⚖️",
    definition: "基于群体成员身份对个体产生的负面态度或情感反应。偏见是认知（刻板印象）与情感的结合，往往先于行为发生。",
    coreLogic: "偏见比刻板印象多了情感成分——不仅是'认为'，更是'感到'。它的形成涉及内群体偏爱、现实冲突（资源竞争）和社会认同需要。偏见可以是外显的（意识到的）或内隐的（无意识的）。",
    lifeCase: "对某类人莫名感到不舒服或不信任；听到不同口音就不自觉降低对对方能力的预期；在招聘中对某些背景的候选人产生说不清的排斥。",
    practice: "识别自己的'本能不适反应'——当你对某人产生说不清的负面情绪时，追问：这份不适来自他/她做了什么，还是他/她'是'什么？用具体行为替代模糊感受。",
    feynmanSummary: "对某类人莫名反感，不是因为他做了什么，而是因为他'是'什么人。",
    relatedPoints: ["stereotype", "discrimination", "sp-person-perception"],
    prerequisites: ["stereotype"],
  },
  {
    id: "discrimination",
    name: "歧视",
    module: "sp-cognition",
    moduleName: "社会认知",
    icon: "🚫",
    definition: "基于群体成员身份对个体做出的不公平行为。歧视是偏见的行为表现——从微观的冷待到制度性的系统性排斥。",
    coreLogic: "歧视是'认知-情感-行为'链条的终端：刻板印象（想）→ 偏见（感）→ 歧视（做）。它可以是人际层面的（个人行为），也可以是结构性的（制度规则造成的系统性不利）。",
    lifeCase: "出租房屋时拒绝特定群体；职场晋升中对某些性别或年龄的不成文限制；服务行业对不同外貌顾客的差别对待。",
    practice: "审视自己是否有差别对待的行为：我对不同'类型'的人是否提供同等质量的服务/机会/关注？如果发现自己有差别行为，练习'行为矫正'——刻意平等对待来反向重塑认知。",
    feynmanSummary: "偏见变成了行动——因为对方属于某个群体，就区别对待、不公平对待。",
    relatedPoints: ["stereotype", "prejudice", "self-serving"],
    prerequisites: ["prejudice"],
  },

  // ── 归因理论 (sp-attribution) ──
  {
    id: "fae",
    name: "基本归因错误",
    module: "sp-attribution",
    moduleName: "归因理论",
    icon: "🎯",
    definition: "在解释他人行为时，倾向于高估个人特质因素、低估情境因素的认知偏差。由李·罗斯正式命名。",
    coreLogic: "观察他人时，行为者本身是焦点（突显），情境是背景（被忽视），所以我们将行为归因于突显的人。而解释自己行为时，我们清楚感知到情境压力，所以更倾向情境归因。这种观察者-行为者差异是FAE的核心。",
    lifeCase: "看到别人迟到觉得'他不守时'，自己迟到觉得'路上堵车'；同事犯错觉得'他能力不行'，自己犯错觉得'任务太难'。",
    practice: "判断他人行为时，刻意插入'情境暂停'：他/她这么做，可能面临什么我看不到的压力或限制？将'他就是这样的人'改写为'在这种情境下，很多人都会这样'。",
    feynmanSummary: "别人犯错你觉得是他人的问题，自己犯错你觉得是环境的错。",
    relatedPoints: ["stereotype", "self-serving", "sp-attribution-basics"],
    prerequisites: ["stereotype"],
  },
  {
    id: "self-serving",
    name: "自我服务偏差",
    module: "sp-attribution",
    moduleName: "归因理论",
    icon: "🪞",
    definition: "将成功归因于自身能力或努力，将失败归因于外部因素的倾向。这种偏差保护自尊，但可能阻碍成长。",
    coreLogic: "自我服务偏差服务于两个动机：自我提升（维护正面自我形象）和自我呈现（在他人面前保持好形象）。它让我们在成功时感到掌控，在失败时免于崩溃，但代价是降低了从错误中学习的能力。",
    lifeCase: "考试考好觉得'我聪明'，考差觉得'题目偏'；项目成功觉得'我的功劳'，失败觉得'团队拖后腿'；人际关系好觉得'我人缘好'，冲突觉得'对方有问题'。",
    practice: "建立'逆向归因'习惯：成功时主动找外部助力因素（提醒自己别骄傲），失败时主动找自身可控因素（提取教训）。用'这次我做对了X，但Y可以改进'替代非此即彼的归因。",
    feynmanSummary: "成功了是我厉害，失败了是运气差——大脑这样保护你的自尊。",
    relatedPoints: ["fae", "cognitive-dissonance", "sp-attribution-basics"],
    prerequisites: ["fae"],
  },

  // ── 内心机制 (sp-inner) ──
  {
    id: "abc-theory",
    name: "ABC理论",
    module: "sp-inner",
    moduleName: "内心机制",
    icon: "🔑",
    definition: "阿尔伯特·埃利斯的理性情绪行为疗法核心：A（Activating event 诱发事件）→ B（Belief 信念）→ C（Consequence 情绪结果）。不是事件直接导致情绪，而是我们对事件的信念（解释）决定了情绪。",
    coreLogic: "人们直觉上认为是'事件→情绪'(A→C)，但ABC理论揭示中间有一个关键变量B（信念）。同样的事件，不同的信念产生不同的情绪。非理性信念（绝对化要求、灾难化、以偏概全）是负面情绪的根源。改变B就能改变C。",
    lifeCase: "同事没回消息(A)：信念1='他看不起我'→ 愤怒焦虑(C)；信念2='他可能在忙'→ 平静理解(C)。被批评(A)：信念1='我一无是处'→ 抑郁(C)；信念2='这是改进机会'→ 动力(C)。",
    practice: "用ABC情绪记录器拆解情绪：写下A(发生了什么-事实)、B(我自动想了什么-信念)、C(我的情绪和反应)。然后追问B：这个信念有证据吗？有没有其他解释？用更合理的B'替换非理性B。",
    feynmanSummary: "让你难过的不是事情本身，而是你怎么看这件事。换个想法，情绪就变了。",
    relatedPoints: ["cognitive-dissonance", "effort-justification", "sp-attitude-definition"],
    prerequisites: [],
  },
  {
    id: "cognitive-dissonance",
    name: "认知失调",
    module: "sp-inner",
    moduleName: "内心机制",
    icon: "🧩",
    definition: "当个体同时持有相互矛盾的信念，或行为与信念不一致时产生的心理不适感。由利昂·费斯汀格提出。为了消除不适，人会改变信念、改变行为或添加合理化认知。",
    coreLogic: "失调的动力来自对认知一致性的需要。认知失调有三种基本形式：①信念与信念冲突、②行为与信念冲突、③新信息与既有信念冲突。消除失调有四条路径：改变行为、改变信念、添加新认知、降低重要性。人最常选第三条——因为前两条更痛苦。",
    lifeCase: "知道吸烟有害健康但继续吸→ '吸烟能减压'（添加合理化）；花大价钱买了不实用的东西 → '其实它很值得'（改变评价）；公开表态后即使证据反驳也坚持。",
    practice: "当感到内心矛盾或'不得不合理化'时，识别失调信号。用'认知失调自检清单'：我的什么行为和什么信念冲突？我在用什么方式消除不适？这种消除方式是真正解决问题还是只是自我安慰？",
    boundaries: "1）不是所有态度改变都是认知失调——态度改变的原因很多（新信息说服、情境压力、社会学习等），不能把所有「改主意」都归因为失调，需排除其他解释；2）失调强度因文化和自我概念而异——西方文化中个人一致性被高度重视，失调感更强；东亚文化中情境适应性被看重，对言行不一的容忍度更高；3）「合理化」不等于「非理性」——通过添加新认知来消除失调有时是合理的认知更新，不能一概视为自我欺骗；4）实验生态效度有争议——费斯汀格的经典实验（如1美元/20美元实验）在实验室人为构造，现实中失调的持续时间、强度和消除方式可能不同；5）理论难以证伪——几乎任何行为和态度的不一致都可以用「失调」解释，缺乏明确的预测力，被批评为「事后解释」。",
    feynmanSummary: "行为和想法矛盾时你会难受，于是骗自己让它们看起来一致。",
    relatedPoints: ["abc-theory", "effort-justification", "self-serving", "sp-self-attribution"],
    prerequisites: ["abc-theory"],
  },
  {
    id: "effort-justification",
    name: "努力辩护效应",
    module: "sp-inner",
    moduleName: "内心机制",
    icon: "💪",
    definition: "人们倾向于为自己付出巨大努力才能获得的事物赋予更高价值。这是认知失调的一个特例：'我付出了这么多→它一定值得'。",
    coreLogic: "如果一件事很辛苦却回报不高，会产生'付出与回报不匹配'的失调。为消除失调，人通过提升对目标的主观评价来'匹配'付出的努力。这就是为什么入会仪式越苛刻，成员忠诚度越高。",
    lifeCase: "花了三天排队买的限量款，即使质量一般也觉得特别好；经历了严苛面试的公司，入职后忠诚度更高；自己辛苦做的饭觉得比外卖好吃。",
    practice: "警惕'沉没成本陷阱'：当发现自己因为'已经付出太多'而不愿放弃时，问——如果没有这些付出，我现在会选择它吗？学会区分'真的有价值'和'因为辛苦所以觉得有价值'。",
    feynmanSummary: "一件事你付出越多，就越觉得它值——哪怕其实没那么好。",
    relatedPoints: ["cognitive-dissonance", "foot-in-door", "sp-self-attribution"],
    prerequisites: ["cognitive-dissonance"],
  },

  // ── 态度与说服 (sp-attitude) ──
  {
    id: "central-route",
    name: "中心路径",
    module: "sp-attitude",
    moduleName: "态度与说服",
    icon: "🔬",
    definition: "说服的中心路径：受众深度加工信息内容，基于论据质量和逻辑做出判断。由佩蒂和卡西奥波在精细加工可能性模型(ELM)中提出。",
    coreLogic: "当受众有动机和能力仔细思考时，走中心路径。说服效果取决于论据的强度——强论据产生持久的态度改变，弱论据反而降低说服力。中心路径形成的态度更持久、更抗干扰、更可能转化为行为。",
    lifeCase: "购买电脑前仔细研究参数对比、看专业评测；选择学校时比较课程设置、师资、就业数据；面对健康建议时查阅医学文献。",
    practice: "在重要决策上刻意走中心路径：列出正反论据、检查证据来源质量、区分事实与观点。面对说服时，问自己：我的判断是基于论据质量还是表面印象？",
    feynmanSummary: "你认真听道理、看证据再做判断，这样形成的想法更靠谱、更持久。",
    relatedPoints: ["peripheral-route", "reciprocity", "sp-persuasion-factors"],
    prerequisites: [],
  },
  {
    id: "peripheral-route",
    name: "外周路径",
    module: "sp-attitude",
    moduleName: "态度与说服",
    icon: "✨",
    definition: "说服的外周路径：受众不深度加工信息，而是依赖表面线索（专家头衔、吸引力、数据多少、熟悉度）做判断。是认知吝啬鬼的默认模式。",
    coreLogic: "当受众缺乏动机或能力仔细思考时，走外周路径。此时说服力来自'线索'而非'内容'——穿白大褂的'专家'、大量精确数字、名人代言、重复曝光。外周路径形成的态度较弱、易变、不一定转化为行为。",
    lifeCase: "因为'专家推荐'就买保健品；因为广告里有很多精确数字就觉得产品靠谱；因为明星代言就选择品牌；因为反复看到某个名字就觉得它好。",
    practice: "识别自己何时在外周路径上：'我是因为这个人的头衔/外貌/语调信了他，还是因为他说的内容有道理？'在面对高风险说服时，刻意从外周切换到中心路径——追问论据本身。",
    feynmanSummary: "你懒得细想，就看表面线索做决定——谁说的、好不好看、数字多不多。",
    relatedPoints: ["central-route", "reciprocity", "sp-persuasion-factors"],
    prerequisites: ["central-route"],
  },

  // ── 利他与侵犯 (sp-altruism-aggression) ──
  {
    id: "altruism",
    name: "利他行为",
    module: "sp-altruism-aggression",
    moduleName: "利他与侵犯",
    icon: "💗",
    definition: "以他人利益为目的、不期望回报的行为。心理学争论焦点：真正的利他是否存在，还是一切利他本质上是间接自利。",
    coreLogic: "解释利他的三种理论：社会交换理论（助人收益>成本时助人）、社会规范理论（社会责任规范驱动）、移情-利他假说（当对他人产生移情时，助人动机纯粹利他）。移情是区分利己与利他的关键变量。",
    lifeCase: "为陌生人指路；向灾区捐款；在公交车上让座；花时间倾听朋友倾诉而不求回报。",
    practice: "觉察助人动机：我是在帮人还是在让自己感觉好？练习'无回报期待'的助人——帮了就走，不求感谢。同时也要学会接受帮助，打破'只能给予不能接受'的不对等。",
    feynmanSummary: "不求回报地帮别人。争议在于：是真心为他人，还是让自己心里舒服。",
    relatedPoints: ["bystander", "reciprocity", "sp-prosocial-theory"],
    prerequisites: [],
  },
  {
    id: "aggression",
    name: "攻击行为",
    module: "sp-altruism-aggression",
    moduleName: "利他与侵犯",
    icon: "⚔️",
    definition: "意图伤害他人的行为。可分为工具性攻击（以伤害为手段达成目的）和敌意性攻击（以伤害本身为目的）。",
    coreLogic: "攻击的成因多层：生物因素（睾酮、杏仁核、5-HT）、挫折-攻击假说（目标受阻→挫折→攻击）、社会学习（观察攻击行为获得攻击脚本）、General Aggression Model（情境输入+内在状态→评估→决策）。",
    lifeCase: "路怒症；网络暴力；职场排挤；孩子模仿游戏中的暴力行为；因压力而对亲近的人发火。",
    practice: "识别自己的'攻击触发器'：什么情境让我想攻击他人？在触发与反应之间插入暂停（深呼吸10秒）。用'非暴力沟通'替代攻击：观察→感受→需要→请求。区分'表达愤怒'与'攻击他人'。",
    feynmanSummary: "故意伤害别人的行为。有时是为达目的的手段，有时就是单纯想伤害。",
    relatedPoints: ["altruism", "bystander", "sp-prosocial-theory"],
    prerequisites: ["altruism"],
  },
  {
    id: "bystander",
    name: "旁观者效应",
    module: "sp-altruism-aggression",
    moduleName: "利他与侵犯",
    icon: "👀",
    definition: "在紧急情境中，在场人数越多，个体提供帮助的可能性越低。由达利和拉塔内通过经典实验揭示， Kitty Genovese案推动了研究。",
    coreLogic: "三个机制：责任分散（'别人会帮的'）、多元无知（'别人没慌，可能不是紧急情况'）、评价恐惧（'如果我反应过度会丢脸'）。帮助的决定需五步：注意到→解释为紧急→承担责任→知道怎么做→实施帮助，任何一步受阻都会终止助人。",
    lifeCase: "人群中有人摔倒无人扶；群里有人求助但没人回复；听到隔壁争吵但'多一事不如少一事'。",
    practice: "如果你是求助者：指定具体的人（'穿红衣服的，帮我叫救护车'）打破责任分散。如果你是旁观者：假设自己是唯一责任人，直接行动——哪怕'搞错了'也好过漠视。培养'第一反应者'意识。",
    feynmanSummary: "人越多越没人帮忙，因为每个人都觉得'总会有人出手的'。",
    relatedPoints: ["altruism", "conformity", "sp-prosocial-theory"],
    prerequisites: ["altruism"],
  },

  // ── 群体行为 (sp-group) ──
  {
    id: "group-polarization",
    name: "群体极化",
    module: "sp-group",
    moduleName: "群体行为",
    icon: "📈",
    definition: "群体讨论后，成员的观点向原有倾向的极端方向移动。保守的更保守，激进的更激进。",
    coreLogic: "两个机制：信息影响（讨论中听到更多支持自己立场的论据，更确信）和社会比较（为了在群体中显得'够格'，表达比原观点更极端的立场）。网络回音室放大了极化效应。",
    lifeCase: "团队头脑风暴后方案变得更激进；网络社区中观点越来越极端；陪审团讨论后判决更严苛或更宽容；投资群中越来越乐观或悲观。",
    practice: "在群体讨论中刻意引入异见：'有没有反方观点？'。避免只和同温层交流——主动接触不同立场的信息。在做出群体决定前，指定一个人扮演'魔鬼代言人'。",
    feynmanSummary: "一群相似的人聊完后观点更极端——保守的更保守，激进的更激进。",
    relatedPoints: ["groupthink", "conformity", "sp-group-influence"],
    prerequisites: [],
  },
  {
    id: "groupthink",
    name: "群体思维",
    module: "sp-group",
    moduleName: "群体行为",
    icon: "🌀",
    definition: "高凝聚力群体为维持和谐而压制异见，导致决策质量下降的现象。由欧文·詹尼斯分析猪湾事件等历史决策后提出。",
    coreLogic: "触发条件：高凝聚力+强领导+外部威胁+低程序规范。症状包括无懈可击幻觉、集体合理化、道德幻觉、对异见者施压、自我审查、一致性幻觉。结果是未充分评估替代方案、忽视风险信息。",
    lifeCase: "创业团队过度乐观忽视风险；公司高管会议没人敢指出CEO方案的漏洞；朋友圈里没人敢质疑'政治正确'的观点。",
    practice: "领导最后发言（避免锚定）；鼓励'魔鬼代言人'角色；分组讨论后再汇总（减少从众压力）；邀请外部人士参与；建立'畅所欲言无后果'的讨论规则。",
    feynmanSummary: "团队为了表面和气不敢说真话，最后做出糟糕决定，还没人敢反对。",
    relatedPoints: ["group-polarization", "conformity", "sp-leadership"],
    prerequisites: ["group-polarization"],
  },
]

/** 所有知识点（五大领域统一） */
export const KNOWLEDGE_POINTS: IKnowledgePoint[] = [
  ...EXISTING_SP_POINTS,
  ...SP_NEW_KNOWLEDGE_POINTS,
  ...CP_KNOWLEDGE_POINTS,
  ...PP_KNOWLEDGE_POINTS,
  ...EG_KNOWLEDGE_POINTS,
  ...MK_KNOWLEDGE_POINTS,
]

/** 根据ID获取知识点 */
export function getPointById(id: string): IKnowledgePoint | undefined {
  return KNOWLEDGE_POINTS.find((p) => p.id === id)
}

/** 根据模块ID获取该模块的知识点列表 */
export function getPointsByModule(moduleId: string): IKnowledgePoint[] {
  return KNOWLEDGE_POINTS.filter((p) => p.module === moduleId)
}

/** 根据子领域ID获取模块列表 */
export function getModulesBySubdomain(subdomainId: string): ISkillModule[] {
  return SKILL_MODULES.filter((m) => m.subdomain === subdomainId)
}

/** 根据子领域ID获取知识点列表 */
export function getPointsBySubdomain(subdomainId: string): IKnowledgePoint[] {
  const modules = getModulesBySubdomain(subdomainId)
  const moduleIds = new Set(modules.map((m) => m.id))
  return KNOWLEDGE_POINTS.filter((p) => moduleIds.has(p.module))
}

/** 根据子领域ID获取知识点总数 */
export function getTotalPointsBySubdomain(subdomainId: string): number {
  return getPointsBySubdomain(subdomainId).length
}

/** 知识点总数 */
export const TOTAL_POINTS = KNOWLEDGE_POINTS.length

/** 子领域配置 */
export const SUBDOMAINS = [
  {
    id: "social-psychology",
    name: "社会心理学",
    icon: "🌐",
    description: "理解他人与社会如何塑造我们的行为、认知与情感",
    color: "hsl(265 85% 62%)",
    route: "/psychology",
  },
  {
    id: "cognitive-psychology",
    name: "认知心理学",
    icon: "🧠",
    description: "研究记忆、注意力、语言与决策等认知过程",
    color: "hsl(195 85% 55%)",
    route: "/cognitive",
  },
  {
    id: "personality-psychology",
    name: "人格心理学",
    icon: "🎭",
    description: "六大理论流派解读人格结构、发展与差异",
    color: "hsl(210 70% 55%)",
    route: "/personality",
  },
  {
    id: "game-industry-history",
    name: "游戏行业史",
    icon: "🕹️",
    description: "从真空管光点到万亿级产业——电子游戏80年发展历程",
    color: "hsl(45 80% 55%)",
    route: "/gaming",
  },
  {
    id: "game-industry-structure",
    name: "游戏产业结构",
    icon: "🎮",
    description: "主机、PC、移动三大赛道格局与竞争策略",
    color: "hsl(220 75% 58%)",
    route: "/gaming",
  },
  {
    id: "emerging-tech",
    name: "新兴技术赛道",
    icon: "🚀",
    description: "云游戏、AI游戏、VR/AR空间计算——行业第二增长曲线",
    color: "hsl(195 80% 55%)",
    route: "/gaming",
  },
  {
    id: "industry-laws-trends",
    name: "行业规律与趋势",
    icon: "📐",
    description: "三大核心规律与未来十年五大演进方向",
    color: "hsl(35 80% 55%)",
    route: "/gaming",
  },
] as const

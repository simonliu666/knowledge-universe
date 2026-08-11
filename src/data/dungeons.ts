import type { IDungeon } from "@/types"

/** 3个实战副本及题目 */
export const DUNGEONS: IDungeon[] = [
  {
    id: "anti-scam",
    name: "杀猪盘攻防战",
    description: "识别情感操纵与社会影响技术，守住心理防线",
    difficulty: "中等",
    icon: "🐷",
    color: "hsl(350 8% 50%)",
    rewardExp: 100,
    firstClearBonus: 50,
    subdomain: "social-psychology",
    questions: [
      {
        id: "q1",
        scenario: "你在社交软件上认识了一位'成功人士'，对方每天嘘寒问暖，很快表白'遇到真爱'，随后提到一个'稳赚不赔'的投资项目，让你先投小额试试。",
        question: "对方使用了哪些社会心理学技术？",
        options: [
          { key: "A", text: "互惠原则——先给予情感温暖，触发回报义务感", correct: true, explanation: "互惠原则：对方的情感投入让你产生'欠了人情'的压力，更难以拒绝其后续要求。" },
          { key: "B", text: "中心路径说服——用逻辑严密的投资分析打动你", correct: false, explanation: "骗子很少提供可验证的深度论据，他们依赖的是情感而非逻辑，这属于外周路径而非中心路径。" },
          { key: "C", text: "旁观者效应——利用你身边没人提醒的处境", correct: false, explanation: "旁观者效应描述的是群体中的责任分散，与一对一的诈骗情境不直接相关。" },
          { key: "D", text: "自我服务偏差——利用你高估自己判断力的倾向", correct: true, explanation: "受害者常认为'我不会被骗'，这种自我服务偏差让人放松警惕，拒绝承认自己可能受害。" },
        ],
        relatedPointId: "reciprocity",
        multiSelect: true,
      },
      {
        id: "q2",
        scenario: "对方说'先投500试试，赚到钱你就信我了'，你投了500果然赚了100并成功提现。随后对方建议加大到5万。",
        question: "这利用了什么心理学效应？",
        options: [
          { key: "A", text: "登门槛效应——小请求建立承诺后，大请求更容易被接受", correct: true, explanation: "先让你投入小额并获得回报，建立了'信任者'的自我形象，后续大额投入更难拒绝——经典的登门槛技术。" },
          { key: "B", text: "群体极化——在群体讨论中观点走向极端", correct: false, explanation: "群体极化需要群体讨论环境，这里是一对一的操纵。" },
          { key: "C", text: "认知失调——你的行为与信念不一致产生不适", correct: true, explanation: "已经投入了500并'赚了钱'，如果现在退出，意味着承认前面的信任可能是错的——这种失调推动你继续投入来'证明'自己是对的。" },
          { key: "D", text: "基本归因错误——高估个人特质、低估情境因素", correct: false, explanation: "FAE与这个情境不直接相关。" },
        ],
        relatedPointId: "foot-in-door",
        multiSelect: true,
      },
      {
        id: "q3",
        scenario: "你开始怀疑，但对方说'你看看这个群，大家都在赚钱'，并发来一个充满盈利截图的群聊截图。",
        question: "这种'群体证据'利用了什么心理机制？",
        options: [
          { key: "A", text: "从众——看到'他人'都在做，降低了自己的警惕", correct: true, explanation: "信息性从众：当不确定时，我们会参考他人的行为来判断。伪造的群体盈利截图制造了'大家都在赚'的假象。" },
          { key: "B", text: "外周路径说服——用截图数量而非投资逻辑来说服", correct: true, explanation: "大量截图是典型的外周线索——你被'这么多人在赚钱'这个表面信息说服，而非真正分析投资项目的合理性。" },
          { key: "C", text: "利他行为——群成员无私分享赚钱机会", correct: false, explanation: "真正的利他不期望回报，但骗子'分享'的目的是引你入局。" },
          { key: "D", text: "自我服务偏差——认为'别人能赚我也能'", correct: false, explanation: "虽然可能有这个因素，但这个场景核心利用的是从众和外周线索。" },
        ],
        relatedPointId: "conformity",
        multiSelect: true,
      },
    ],
  },
  {
    id: "workplace-obedience",
    name: "职场服从困境",
    description: "面对权威的不合理要求，如何守住底线",
    difficulty: "困难",
    icon: "💼",
    color: "hsl(35 8% 50%)",
    rewardExp: 100,
    firstClearBonus: 50,
    subdomain: "social-psychology",
    questions: [
      {
        id: "q1",
        scenario: "你的直属领导要求你在一个数据报告中'微调'几个数字，让季度业绩看起来更好。他说'去年也是这么做的，没事'。",
        question: "以下哪个心理机制最能解释你可能会服从的原因？",
        options: [
          { key: "A", text: "代理状态——你将自己视为领导意志的工具，责任转移给权威", correct: true, explanation: "米尔格拉姆发现的代理状态：在权威指令下，个体不再觉得自己是行为的主体，将责任推给权威，从而做出本不会做的事。" },
          { key: "B", text: "旁观者效应——你期待同事会举报", correct: false, explanation: "旁观者效应是紧急助人情境中的现象，与服从权威不直接相关。" },
          { key: "C", text: "群体思维——团队讨论后一致决定造假", correct: false, explanation: "群体思维需要群体讨论过程，这里是个人面对权威指令。" },
          { key: "D", text: "登门槛效应——从小改动开始逐步加大", correct: true, explanation: "'微调几个数字'是小请求，一旦你做了，后续更大的造假请求更难拒绝——登门槛效应。" },
        ],
        relatedPointId: "obedience",
        multiSelect: true,
      },
      {
        id: "q2",
        scenario: "你内心不安，但想到'拒绝领导可能会被穿小鞋'，于是说服自己'反正只是小数字，不影响大局'。",
        question: "你的内心过程体现了什么？",
        options: [
          { key: "A", text: "认知失调——行为(造假)与信念(诚实)冲突，通过合理化消除不适", correct: true, explanation: "你知道造假不对但还是做了，产生失调。'只是小数字不影响大局'是添加新认知来合理化行为的典型表现。" },
          { key: "B", text: "ABC理论——你的情绪C由事件A直接引起", correct: false, explanation: "ABC理论强调是信念B而非事件A直接引起情绪C。你的不安来自'我在做错事'这个信念，不是事件本身。" },
          { key: "C", text: "自我服务偏差——将可能的后果归因于外部", correct: false, explanation: "自我服务偏差是关于成功/失败的归因，与这里的道德冲突情境不匹配。" },
          { key: "D", text: "服从——在权威压力下做出违反自己信念的行为", correct: true, explanation: "你正在服从一个不合理的要求，这正是服从的定义。" },
        ],
        relatedPointId: "cognitive-dissonance",
        multiSelect: true,
      },
      {
        id: "q3",
        scenario: "你经过思考，决定拒绝领导的不合理要求。",
        question: "以下哪种拒绝方式最符合'服从防御三问'的思路？",
        options: [
          { key: "A", text: "直接大骂领导一顿然后辞职", correct: false, explanation: "虽然拒绝了他，但这种方式过于极端，不利于维护自身权益。服从防御三问强调的是理性判断而非情绪对抗。" },
          { key: "B", text: "问自己：这个要求的目的是什么？如果不服从最坏后果是什么？有没有第三种选择？然后基于判断决定回应方式", correct: true, explanation: "这正是'服从防御三问'的核心：先评估目的、后果和替代方案，再做出理性的、保护自己的回应。" },
          { key: "C", text: "默默照做，但在私下向同事抱怨", correct: false, explanation: "这不是拒绝，而是服从加合理化。私下抱怨无法改变行为，反而可能带来更多风险。" },
          { key: "D", text: "假装答应然后偷偷不执行", correct: false, explanation: "消极抵抗可能暂时缓解压力，但不是成熟的做法，且可能带来信任危机。" },
        ],
        relatedPointId: "obedience",
        multiSelect: false,
      },
    ],
  },
  {
    id: "bias-breaking",
    name: "人际偏见破除",
    description: "识别并挑战日常生活中的刻板印象与偏见",
    difficulty: "简单",
    icon: "🤝",
    color: "hsl(195 8% 50%)",
    rewardExp: 100,
    firstClearBonus: 50,
    subdomain: "social-psychology",
    questions: [
      {
        id: "q1",
        scenario: "面试中，你看到一位40岁的候选人应聘初级开发岗位。你心里冒出'这个年纪还能加班吗'的想法。",
        question: "这个想法属于什么？",
        options: [
          { key: "A", text: "刻板印象——对'40岁'这个群体的固定信念", correct: true, explanation: "刻板印象是对群体的固定概括。'40岁=不能加班'是一个典型的年龄刻板印象，忽略了个体的实际能力和意愿。" },
          { key: "B", text: "基本归因错误——高估个人特质、低估情境因素", correct: false, explanation: "FAE是关于行为归因的偏差，这里是关于群体特征的预设。" },
          { key: "C", text: "偏见——对特定群体的负面情感反应", correct: false, explanation: "刻板印象是认知层面的，偏见是情感层面的。这里更多是认知判断而非情感排斥。" },
          { key: "D", text: "歧视——对特定群体的不公平行为", correct: false, explanation: "歧视是行为层面。如果因为这个想法而拒绝面试，那才是歧视。现在还停留在认知阶段。" },
        ],
        relatedPointId: "stereotype",
        multiSelect: false,
      },
      {
        id: "q2",
        scenario: "你决定录用这位候选人后，同事说'他都40了还来做初级岗，肯定能力不行，你别后悔'。你开始怀疑自己的决定。",
        question: "你的自我怀疑中，哪个因素最值得关注？",
        options: [
          { key: "A", text: "从众压力——同事的质疑让你动摇，这可能是规范性影响", correct: true, explanation: "规范性从众：你渴望被同事认可，他的质疑让你担心'选错了会被嘲笑'，这种压力可能让你偏离自己的专业判断。" },
          { key: "B", text: "群体极化——讨论后观点变得更极端", correct: false, explanation: "目前只是两个人的对话，尚未形成群体讨论后的极化。" },
          { key: "C", text: "自我服务偏差——你倾向于将成功归因于自己", correct: false, explanation: "自我服务偏差是关于成功/失败的归因，与当前的决策动摇不直接相关。" },
          { key: "D", text: "旁观者效应——你期待其他人来替你做决定", correct: false, explanation: "旁观者效应发生在紧急助人情境，与招聘决策无关。" },
        ],
        relatedPointId: "prejudice",
        multiSelect: false,
      },
      {
        id: "q3",
        scenario: "入职后，这位候选人表现出色。你回忆起面试时的犹豫，意识到自己确实存在年龄偏见。",
        question: "以下哪种反思最有助于减少未来的偏见？",
        options: [
          { key: "A", text: "'我以后再也不看年龄了'——彻底忽略所有群体信息", correct: false, explanation: "彻底忽略不现实也不必要。关键不是不看，而是不被群体标签替代对个体的观察。" },
          { key: "B", text: "'我的判断可能受刻板印象影响，需要用个体信息来校准'——觉察并用事实覆盖标签", correct: true, explanation: "这是减少偏见的核心策略：觉察自动化的刻板印象，然后刻意用个体层面的信息来修正和覆盖。" },
          { key: "C", text: "'这次是运气好，下次还是不要冒险了'——强化原有偏见", correct: false, explanation: "这是确认偏差——将反证归因为'运气'，反而强化了原有偏见。" },
          { key: "D", text: "'偏见是人性，改不了的'——放弃改变", correct: false, explanation: "虽然内隐偏见难以完全消除，但通过觉察和练习可以显著减少其影响。" },
        ],
        relatedPointId: "discrimination",
        multiSelect: false,
      },
    ],
  },

  // ════════════════════════════════════════════
  // 认知心理学副本
  // ════════════════════════════════════════════
  {
    id: "memory-maze",
    name: "记忆迷宫",
    description: "在遗忘的迷宫中找回丢失的记忆碎片",
    difficulty: "中等",
    icon: "🧩",
    color: "hsl(155 70% 50%)",
    rewardExp: 100,
    firstClearBonus: 50,
    subdomain: "cognitive-psychology",
    questions: [
      {
        id: "q1",
        scenario: "期末考试前，你需要记住100个专业术语。你决定从头到尾反复朗读，希望靠重复来记住它们。",
        question: "以下哪种记忆策略最有效？",
        options: [
          { key: "A", text: "机械重复朗读——重复次数越多记得越牢", correct: false, explanation: "机械重复（维持性复述）只能将信息短暂保持在短时记忆中，难以有效转入长时记忆。" },
          { key: "B", text: "精加工复述——将术语与已有知识建立意义联系", correct: true, explanation: "精加工复述（ elaborative rehearsal）通过将新信息与已有知识建立语义联系，显著提高长时记忆编码效率。" },
          { key: "C", text: "只看一遍然后祈祷——靠运气", correct: false, explanation: "没有编码 effort 的信息几乎不可能进入长时记忆。" },
          { key: "D", text: "把术语编成歌曲——利用听觉编码", correct: true, explanation: "将信息编成歌曲利用了组块化和多重编码（听觉+语义），是有效的记忆增强策略。" },
        ],
        relatedPointId: "cp-ltm",
        multiSelect: true,
      },
      {
        id: "q2",
        scenario: "你记住了电话号码准备拨打，但有人跟你说了句话，你回头发现号码忘了。",
        question: "这体现了什么记忆机制？",
        options: [
          { key: "A", text: "短时记忆容量有限且持续时间短，干扰导致信息丢失", correct: true, explanation: "短时记忆容量约7±2个组块，持续时间约15-30秒，新的言语输入会干扰原有信息。" },
          { key: "B", text: "长时记忆衰退——记忆自然消退", correct: false, explanation: "电话号码还未进入长时记忆，不存在长时记忆衰退。" },
          { key: "C", text: "前摄抑制——旧记忆干扰新记忆", correct: false, explanation: "前摄抑制是旧信息干扰新信息，这里恰好相反——新信息干扰了刚记住的号码。" },
          { key: "D", text: "倒摄抑制——新输入的信息干扰了之前的信息", correct: true, explanation: "别人的话作为新输入干扰了你刚记住的号码，这是典型的倒摄抑制。" },
        ],
        relatedPointId: "cp-stm",
        multiSelect: true,
      },
      {
        id: "q3",
        scenario: "你想提高学习效率，以下哪种方法最符合认知心理学的记忆研究？",
        question: "选择最佳学习策略：",
        options: [
          { key: "A", text: "集中一天高强度学习10小时", correct: false, explanation: "集中练习容易产生疲劳且记忆保持效果差，分散练习效果更好。" },
          { key: "B", text: "分散学习+间隔重复+自我测试", correct: true, explanation: "分散练习效应、间隔效应和测试效应都是经过大量研究验证的有效记忆策略。" },
          { key: "C", text: "只读不练——看多了自然记住", correct: false, explanation: "单纯阅读产生'学习错觉'，自我测试（提取练习）才能真正巩固记忆。" },
          { key: "D", text: "边听音乐边学习——多重编码", correct: false, explanation: "背景音乐可能分散注意资源，对需要深度加工的学习材料通常有负面影响。" },
        ],
        relatedPointId: "cp-forgetting",
        multiSelect: false,
      },
    ],
  },
  {
    id: "attention-challenge",
    name: "注意力试炼",
    description: "在信息洪流中守住你的认知资源",
    difficulty: "简单",
    icon: "🎯",
    color: "hsl(35 85% 60%)",
    rewardExp: 100,
    firstClearBonus: 50,
    subdomain: "cognitive-psychology",
    questions: [
      {
        id: "q1",
        scenario: "你在咖啡厅看书，周围有人聊天、音乐播放、手机不断弹出消息。你发现自己反复读同一段话。",
        question: "你的注意力出了什么问题？",
        options: [
          { key: "A", text: "注意资源被多源信息分散，超出认知容量", correct: true, explanation: "注意是有限的认知资源，多个信息源竞争注意资源，导致分配给阅读的资源不足。" },
          { key: "B", text: "短时记忆容量不够", correct: false, explanation: "问题出在注意分配而非记忆容量。" },
          { key: "C", text: "长时记忆没有激活", correct: false, explanation: "反复读同一段话是注意涣散的表现，与长时记忆无关。" },
          { key: "D", text: "模式识别失败——看不懂文字", correct: false, explanation: "你能读懂文字，问题是注意力被分散，不是识别障碍。" },
        ],
        relatedPointId: "cp-attention-capacity",
        multiSelect: false,
      },
      {
        id: "q2",
        scenario: "你开车多年，已经可以一边开车一边聊天。但遇到复杂路况时，你会自动停止聊天专注驾驶。",
        question: "这体现了什么认知机制？",
        options: [
          { key: "A", text: "自动化加工——熟练驾驶已自动化，不占注意资源", correct: true, explanation: "经过大量练习，驾驶的基本操作变为自动化加工，释放了注意资源给对话。" },
          { key: "B", text: "注意过滤——聊天信息被完全过滤", correct: false, explanation: "正常驾驶时你没有过滤聊天，而是能同时进行，说明不是过滤机制。" },
          { key: "C", text: "控制加工向自动化转换——复杂路况需要重新投入注意", correct: true, explanation: "复杂路况时，驾驶从自动化加工回到控制加工，需要更多注意资源，因此停止聊天。" },
          { key: "D", text: "感觉适应——你对路况变化不敏感", correct: false, explanation: "恰恰相反，你对路况变化很敏感，才会自动切换回专注模式。" },
        ],
        relatedPointId: "cp-automatic-processing",
        multiSelect: true,
      },
    ],
  },

  // ════════════════════════════════════════════
  // 人格心理学副本
  // ════════════════════════════════════════════
  {
    id: "personality-portrait",
    name: "人格画像",
    description: "用六大流派解读一个人的性格密码",
    difficulty: "中等",
    icon: "🎭",
    color: "hsl(265 85% 62%)",
    rewardExp: 100,
    firstClearBonus: 50,
    subdomain: "personality-psychology",
    questions: [
      {
        id: "q1",
        scenario: "小张做事追求完美，常常因达不到自己设定的高标准而焦虑。他喜欢列计划，严格遵守规则，朋友说他'太死板'。",
        question: "用大五人格模型分析，小张在哪个维度上得分最高？",
        options: [
          { key: "A", text: "尽责性——自律、有序、追求成就", correct: true, explanation: "追求完美、列计划、遵守规则都是高尽责性的典型表现。" },
          { key: "B", text: "神经质——情绪不稳定、容易焦虑", correct: true, explanation: "因达不到标准而焦虑反映了较高的神经质倾向。一个人可以在多个维度上都有显著特征。" },
          { key: "C", text: "开放性——想象力丰富、喜欢变化", correct: false, explanation: "小张喜欢规则和计划，不太符合高开放性的特征。" },
          { key: "D", text: "外向性——善于社交、精力充沛", correct: false, explanation: "描述中没有提及社交活跃或精力充沛的特征。" },
        ],
        relatedPointId: "pp-big-five",
        multiSelect: true,
      },
      {
        id: "q2",
        scenario: "同一个人——小张追求完美。如果用精神分析流派分析，分析师会关注什么？",
        question: "精神分析视角最可能关注的解释是：",
        options: [
          { key: "A", text: "童年时期父母过高的期望内化为超我，导致追求完美的强迫倾向", correct: true, explanation: "精神分析强调童年经验和潜意识动力，超我过强会导致完美主义和焦虑。" },
          { key: "B", text: "他观察到了完美主义被社会奖励，通过模仿习得", correct: false, explanation: "这是行为主义/社会学习理论的解释，不是精神分析。" },
          { key: "C", text: "他天生具有追求秩序的气质倾向", correct: false, explanation: "这是生物流派/气质理论的解释。" },
          { key: "D", text: "他的完美主义是为了达到自我实现的需要", correct: false, explanation: "这是人本主义的解释框架，与人本主义更相关。" },
        ],
        relatedPointId: "pp-unconscious",
        multiSelect: false,
      },
      {
        id: "q3",
        scenario: "你发现不同流派对同一行为的解释完全不同。这让你困惑：到底哪个是对的？",
        question: "关于人格六大流派的关系，以下理解最准确的是：",
        options: [
          { key: "A", text: "只有一个流派是正确的，其他都是错的", correct: false, explanation: "六大流派并非互相排斥，而是从不同角度解释人格。" },
          { key: "B", text: "不同流派从不同层面解释人格——生物、潜意识、行为、认知、特质、自我实现，互补而非互斥", correct: true, explanation: "这正是人格心理学'六大流派'理论的核心观点：如同盲人摸象，每个流派揭示了人格的一个侧面。" },
          { key: "C", text: "新流派出现后旧流派就被淘汰了", correct: false, explanation: "精神分析虽最古老但仍有影响力，各流派并存至今。" },
          { key: "D", text: "所有流派本质上是同一个理论的不同说法", correct: false, explanation: "各流派有根本不同的理论假设、研究方法和治疗取向。" },
        ],
        relatedPointId: "pp-six-schools",
        multiSelect: false,
      },
    ],
  },
  {
    id: "theory-detective",
    name: "流派侦探",
    description: "从行为线索追溯人格理论根源",
    difficulty: "困难",
    icon: "🔍",
    color: "hsl(195 85% 55%)",
    rewardExp: 100,
    firstClearBonus: 50,
    subdomain: "personality-psychology",
    questions: [
      {
        id: "q1",
        scenario: "一个学生在多次考试失败后，开始认为'无论怎么努力都没用'，逐渐放弃了学习。",
        question: "这体现了哪个流派的核心概念？",
        options: [
          { key: "A", text: "行为主义——习得性无助", correct: true, explanation: "塞利格曼的习得性无助理论：反复经历不可控的失败后，个体学会了'无助'，即使后续可以改变也不再尝试。" },
          { key: "B", text: "精神分析——自我防御机制", correct: false, explanation: "防御机制是潜意识的心理保护策略，与这里的'习得'行为模式不同。" },
          { key: "C", text: "人本主义——自我实现受阻", correct: false, explanation: "人本主义关注成长需要被阻断，但'习得性无助'是行为主义概念。" },
          { key: "D", text: "认知流派——归因风格", correct: true, explanation: "后续研究将习得性无助与悲观归因风格联系——将失败归因为内部、稳定、普遍的因素。" },
        ],
        relatedPointId: "pp-learned-helplessness",
        multiSelect: true,
      },
      {
        id: "q2",
        scenario: "罗杰斯认为，一个人要健康成长，需要'无条件积极关注'。以下哪个场景最体现了这一点？",
        question: "选择最符合'无条件积极关注'的例子：",
        options: [
          { key: "A", text: "父母说'考100分才是好孩子'", correct: false, explanation: "这是'有条件'积极关注——爱和认可附带了条件。" },
          { key: "B", text: "朋友说'不管你做什么决定，我都支持你做真实的自己'", correct: true, explanation: "无条件积极关注的核心：接纳这个人本身，而非因其行为或成就才给予认可。" },
          { key: "C", text: "老板说'完成项目就给你升职'", correct: false, explanation: "这是条件性奖赏，与无条件积极关注相反。" },
          { key: "D", text: "老师说'犯错就罚站'", correct: false, explanation: "这是惩罚机制，完全不同于无条件接纳。" },
        ],
        relatedPointId: "pp-rogers",
        multiSelect: false,
      },
    ],
  },

  // ════════════════════════════════════════════
  // 游戏行业史副本
  // ════════════════════════════════════════════
  {
    id: "gaming-history-quiz",
    name: "游戏史时空之旅",
    description: "穿越80年游戏发展史，识别关键转折点",
    difficulty: "中等",
    icon: "🕹️",
    color: "hsl(280 60% 50%)",
    rewardExp: 100,
    firstClearBonus: 50,
    subdomain: "game-industry-history",
    questions: [
      {
        id: "q1",
        scenario: "1983年，北美游戏市场突然崩盘，大量游戏公司倒闭。这次事件被称为'雅达利崩盘'。",
        question: "导致雅达利崩盘的核心原因是什么？",
        options: [
          { key: "A", text: "硬件性能不足，无法满足玩家需求", correct: false, explanation: "硬件性能并非主因，当时的主机性能足以运行当时的游戏。" },
          { key: "B", text: "劣质游戏泛滥导致消费者信任崩塌——缺乏质量审核机制", correct: true, explanation: "雅达利2600平台缺乏质量把控，《E.T.》等劣质游戏大量涌入，导致玩家信任崩塌、库存积压。" },
          { key: "C", text: "日本游戏公司的竞争", correct: false, explanation: "任天堂的崛起是在崩盘之后，不是崩盘的原因。" },
          { key: "D", text: "个人电脑普及取代了游戏机", correct: false, explanation: "PC游戏大规模普及是后来的事，当时PC尚未对游戏机构成直接威胁。" },
        ],
        relatedPointId: "eg-atari-crash",
        multiSelect: false,
      },
      {
        id: "q2",
        scenario: "任天堂在1985年进入北美市场时，采取了与雅达利不同的策略来重建消费者信心。",
        question: "任天堂的关键策略包括哪些？",
        options: [
          { key: "A", text: "实行严格的第三方游戏授权制度——控制游戏质量", correct: true, explanation: "任天堂引入了'品质印章'和授权制度，只有通过审核的游戏才能在平台上发布。" },
          { key: "B", text: "以低价倾销策略抢占市场", correct: false, explanation: "任天堂并非靠低价取胜，而是靠质量控制和IP创新。" },
          { key: "C", text: "将游戏机重新定位为'家庭娱乐系统'而非玩具", correct: true, explanation: "任天堂将NES包装为'娱乐系统'，附带机器人等配件，消除了零售商对'游戏机'品类的恐惧。" },
          { key: "D", text: "完全放弃第三方游戏，只做自研游戏", correct: false, explanation: "任天堂没有放弃第三方，而是通过授权制度管理质量。" },
        ],
        relatedPointId: "eg-nintendo-rise",
        multiSelect: true,
      },
      {
        id: "q3",
        scenario: "2000年代后，Steam平台的出现改变了PC游戏的分发方式。",
        question: "Steam对游戏行业最大的影响是什么？",
        options: [
          { key: "A", text: "建立了数字分发平台的主导模式，改变了实体光盘销售格局", correct: true, explanation: "Steam开创了数字游戏商店的成功范式，成为PC游戏分发的实际垄断者。" },
          { key: "B", text: "发明了3D图形技术", correct: false, explanation: "3D图形技术早于Steam存在，与Steam无关。" },
          { key: "C", text: "推动了独立游戏生态的繁荣——降低发行门槛", correct: true, explanation: "Steam的Greenlight/Direct机制让独立开发者能直接发布游戏，极大推动了独立游戏生态。" },
          { key: "D", text: "开创了免费游戏模式", correct: false, explanation: "免费模式主要在移动端兴起，Steam最初以付费下载为主。" },
        ],
        relatedPointId: "eg-pc-steam",
        multiSelect: true,
      },
    ],
  },

  // ════════════════════════════════════════════
  // 游戏产业结构副本
  // ════════════════════════════════════════════
  {
    id: "industry-track-analysis",
    name: "赛道分析师",
    description: "解析主机、PC、移动三大赛道的差异化策略",
    difficulty: "中等",
    icon: "📊",
    color: "hsl(220 80% 60%)",
    rewardExp: 100,
    firstClearBonus: 50,
    subdomain: "game-industry-structure",
    questions: [
      {
        id: "q1",
        scenario: "索尼、微软、任天堂三家主机厂商采取了截然不同的竞争策略。",
        question: "以下关于三巨头策略的描述，哪些是正确的？",
        options: [
          { key: "A", text: "索尼靠高品质独占大作和硬件性能优势占据高端市场", correct: true, explanation: "PlayStation策略核心是3A独占大作+高性能硬件，吸引核心玩家。" },
          { key: "B", text: "微软通过Xbox Game Pass订阅制和生态系统锁定用户", correct: true, explanation: "微软转向'服务优先'，Game Pass成为核心竞争力，跨平台生态布局。" },
          { key: "C", text: "任天堂靠IP创新和家庭娱乐定位走差异化路线", correct: true, explanation: "任天堂不拼硬件性能，靠马里奥、塞尔达等顶级IP和创新玩法取胜。" },
          { key: "D", text: "三家公司策略完全相同，都是拼硬件性能", correct: false, explanation: "三家公司策略截然不同，这正是主机赛道竞争的精彩之处。" },
        ],
        relatedPointId: "eg-console-strategy",
        multiSelect: true,
      },
      {
        id: "q2",
        scenario: "移动游戏市场近年来增长迅猛，中国厂商在全球市场占据了重要位置。",
        question: "中国移动游戏厂商成功全球化的关键因素是什么？",
        options: [
          { key: "A", text: "在国内激烈竞争中磨练出的商业化能力和运营经验", correct: true, explanation: "国内市场的激烈竞争锻造了极强的长线运营和商业化能力，成为出海的核心竞争力。" },
          { key: "B", text: "完全靠低价策略抢占海外市场", correct: false, explanation: "成功出海靠的是产品质量和运营能力，不是简单的低价。" },
          { key: "C", text: "全球化本地化运营——针对不同市场做深度本地化", correct: true, explanation: "米哈游、腾讯等成功案例都体现了深度本地化运营的重要性。" },
          { key: "D", text: "只做休闲游戏避开竞争", correct: false, explanation: "中国厂商在重度游戏（原神、PUBG Mobile等）领域同样取得全球成功。" },
        ],
        relatedPointId: "eg-mobile-global",
        multiSelect: true,
      },
    ],
  },

  // ════════════════════════════════════════════
  // 新兴技术赛道副本
  // ════════════════════════════════════════════
  {
    id: "tech-frontier",
    name: "技术前沿挑战",
    description: "云游戏、AI、VR/AR——你能看清技术趋势吗？",
    difficulty: "困难",
    icon: "🚀",
    color: "hsl(195 85% 55%)",
    rewardExp: 100,
    firstClearBonus: 50,
    subdomain: "emerging-tech",
    questions: [
      {
        id: "q1",
        scenario: "云游戏被宣传为'不需要买硬件就能玩3A大作'，但至今未完全取代本地游戏。",
        question: "云游戏面临的核心挑战是什么？",
        options: [
          { key: "A", text: "网络延迟——操作到画面响应的延迟影响体验", correct: true, explanation: "云游戏的核心瓶颈是网络延迟，对动作类、竞技类游戏影响尤其大。" },
          { key: "B", text: "游戏画面质量不够好", correct: false, explanation: "云端服务器渲染质量通常高于家用设备，不是画面质量问题。" },
          { key: "C", text: "带宽成本高——大规模并行渲染需要巨额服务器投入", correct: true, explanation: "为每个用户分配云端GPU渲染资源的成本极高，是商业模式的重大挑战。" },
          { key: "D", text: "玩家不喜欢订阅制", correct: false, explanation: "Xbox Game Pass证明玩家接受订阅制，这不是核心障碍。" },
        ],
        relatedPointId: "eg-cloud-principle",
        multiSelect: true,
      },
      {
        id: "q2",
        scenario: "AI技术在游戏中的应用越来越广泛，从NPC对话到内容生成都开始使用AI。",
        question: "AI对游戏行业最大的潜在影响是什么？",
        options: [
          { key: "A", text: "降低研发成本——AI辅助美术、代码、测试等环节", correct: true, explanation: "AI工具能显著降低游戏研发的人力成本和时间周期，尤其对中小团队意义重大。" },
          { key: "B", text: "让NPC拥有真正的智能和情感——创造动态叙事", correct: true, explanation: "AI驱动的智能NPC能实现真正意义上的动态交互和个性化叙事体验。" },
          { key: "C", text: "完全取代游戏设计师", correct: false, explanation: "AI是工具而非替代品，创意和设计判断仍需人类。" },
          { key: "D", text: "只对大公司有用，小公司用不起", correct: false, explanation: "恰恰相反，AI工具降低了研发门槛，对中小团队的帮助可能更大。" },
        ],
        relatedPointId: "eg-ai-rd",
        multiSelect: true,
      },
      {
        id: "q3",
        scenario: "Meta、索尼、苹果都在布局VR/AR设备，但市场渗透率远低于预期。",
        question: "VR/AR普及面临的核心障碍是什么？",
        options: [
          { key: "A", text: "硬件成本高且佩戴体验不够好——重量、续航、舒适度", correct: true, explanation: "当前VR头显普遍偏重、续航短，长时间佩戴不舒适，是普及的主要障碍。" },
          { key: "B", text: "缺乏杀手级应用内容", correct: true, explanation: "除了少数游戏外，缺乏让消费者'必须拥有'VR设备的杀手级应用。" },
          { key: "C", text: "VR技术原理有根本缺陷", correct: false, explanation: "VR技术本身可行，问题在于工程实现和内容生态，而非原理性障碍。" },
          { key: "D", text: "玩家不喜欢沉浸式体验", correct: false, explanation: "沉浸感是游戏玩家的核心追求之一，问题不在需求而在体验和价格。" },
        ],
        relatedPointId: "eg-vr-trend",
        multiSelect: true,
      },
    ],
  },

  // ════════════════════════════════════════════
  // 行业规律与趋势副本
  // ════════════════════════════════════════════
  {
    id: "trend-predictor",
    name: "趋势预言家",
    description: "从80年历史规律中预见未来十年走向",
    difficulty: "困难",
    icon: "📈",
    color: "hsl(155 70% 50%)",
    rewardExp: 100,
    firstClearBonus: 50,
    subdomain: "industry-laws-trends",
    questions: [
      {
        id: "q1",
        scenario: "回顾游戏行业80年历史，你会发现一些反复出现的规律。",
        question: "以下哪些是游戏行业的核心发展规律？",
        options: [
          { key: "A", text: "技术迭代驱动——每次硬件升级都带来新的游戏形态", correct: true, explanation: "从2D到3D、从本地到在线、从手柄到触屏，技术迭代始终是行业变革的第一推动力。" },
          { key: "B", text: "内容为王——优质IP和创意始终是核心竞争力", correct: true, explanation: "任天堂靠IP穿越硬件周期，米哈游靠内容品质全球突围——内容始终是根本。" },
          { key: "C", text: "商业模式演变——从买断到免费再到订阅", correct: true, explanation: "从街机投币→卡带买断→免费+内购→订阅制，商业模式不断进化。" },
          { key: "D", text: "大公司永远是赢家，小公司没有机会", correct: false, explanation: "独立游戏和中小工作室始终有机会——《我的世界》《星露谷》等都是反例。" },
        ],
        relatedPointId: "eg-tech-iteration",
        multiSelect: true,
      },
      {
        id: "q2",
        scenario: "你是一家游戏公司的战略分析师，需要预测未来十年的行业趋势。",
        question: "以下哪些趋势最有可能在未来十年成为主流？",
        options: [
          { key: "A", text: "AI深度渗透游戏研发全流程——从美术到叙事到测试", correct: true, explanation: "AI工具将像Unity/Unreal一样成为游戏研发的基础设施。" },
          { key: "B", text: "订阅制成为主流消费模式", correct: true, explanation: "参考影视行业的Netflix化趋势，游戏订阅制将持续增长。" },
          { key: "C", text: "实体游戏完全消失", correct: false, explanation: "实体游戏会萎缩但不会完全消失，收藏市场和网络基础设施不足的地区仍有需求。" },
          { key: "D", text: "游戏监管趋严——未成年人保护和合规化成为常态", correct: true, explanation: "中国版号政策、欧美隐私法规等表明合规化是不可逆的趋势。" },
        ],
        relatedPointId: "eg-future-trends",
        multiSelect: true,
      },
      {
        id: "q3",
        scenario: "当前全球游戏市场呈现'中美双极'格局，但很多人忽视了马太效应的影响。",
        question: "游戏行业的马太效应体现在哪里？",
        options: [
          { key: "A", text: "头部游戏吸走大部分收入和玩家时间", correct: true, explanation: "少数爆款游戏占据绝大部分收入份额，长尾游戏的生存空间被挤压。" },
          { key: "B", text: "大厂通过收购整合资源，壁垒越来越高", correct: true, explanation: "微软收购动视暴雪等案例表明，大厂通过并购强化壁垒。" },
          { key: "C", text: "新玩家无法进入游戏行业", correct: false, explanation: "虽然马太效应强，但独立游戏和新技术赛道（如AI）仍为新玩家提供机会。" },
          { key: "D", text: "只有中美两国能做游戏", correct: false, explanation: "日本、波兰、韩国等都有强盛的游戏产业，双极格局不代表其他国家没有机会。" },
        ],
        relatedPointId: "eg-matthew-effect",
        multiSelect: true,
      },
    ],
  },
]

/** 副本总数 */
export const TOTAL_DUNGEONS = DUNGEONS.length

/** 根据子领域获取副本 */
export function getDungeonsBySubdomain(subdomainId: string): IDungeon[] {
  return DUNGEONS.filter((d) => !d.subdomain || d.subdomain === subdomainId)
}

/** 根据ID获取副本 */
export function getDungeonById(id: string): IDungeon | undefined {
  return DUNGEONS.find((d) => d.id === id)
}

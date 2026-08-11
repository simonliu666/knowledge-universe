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
]

/** 副本总数 */
export const TOTAL_DUNGEONS = DUNGEONS.length

/** 根据ID获取副本 */
export function getDungeonById(id: string): IDungeon | undefined {
  return DUNGEONS.find((d) => d.id === id)
}

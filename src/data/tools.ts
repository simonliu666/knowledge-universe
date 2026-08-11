/** 工具箱模板数据 */

/** ABC情绪记录器引导 */
export const ABC_TEMPLATE = {
  id: "abc-recorder",
  name: "ABC情绪记录器",
  icon: "🔑",
  description: "用埃利斯ABC理论拆解情绪：A(事件) → B(信念) → C(结果)，识别并挑战非理性信念",
  fields: [
    {
      key: "event",
      label: "A — 诱发事件",
      placeholder: "客观描述发生了什么（只写事实，不加评价）...",
      hint: "例：同事在会议上打断了我的发言",
    },
    {
      key: "belief",
      label: "B — 我的信念/想法",
      placeholder: "当时你脑子里自动浮现的想法是什么？...",
      hint: "例：他觉得我的意见不重要 / 我不应该被这样对待",
    },
    {
      key: "consequence",
      label: "C — 情绪/行为结果",
      placeholder: "你的情绪感受和行为反应是什么？...",
      hint: "例：愤怒、委屈，之后沉默不参与讨论",
    },
  ],
  challengeQuestions: [
    "这个信念有充分的证据支持吗？",
    "有没有其他可能的解释？",
    "最坏的情况是什么？我能承受吗？",
    "如果是朋友遇到同样情况，我会怎么劝他/她？",
  ],
}

/** 认知失调自检清单 */
export const DISSONANCE_TEMPLATE = {
  id: "dissonance-check",
  name: "认知失调自检清单",
  icon: "🧩",
  description: "识别自己是否处于认知失调状态，选择健康的消除策略",
  steps: [
    {
      key: "behavior",
      label: "我正在做（或刚做了）什么行为？",
      placeholder: "描述你的行为...",
      hint: "例：继续购买明知不环保的产品",
    },
    {
      key: "belief",
      label: "这个行为与我什么信念冲突？",
      placeholder: "你同时持有什么矛盾的信念？...",
      hint: "例：我相信应该保护环境",
    },
    {
      key: "conflict",
      label: "这种冲突让你有什么感受？",
      placeholder: "描述内心的不适感...",
      hint: "例：内疚、焦虑、自我否定",
    },
  ],
  strategies: [
    {
      value: "change-behavior",
      label: "改变行为",
      description: "让行为符合信念（最彻底但最难）",
      example: "停止购买不环保产品，寻找替代品",
    },
    {
      value: "change-belief",
      label: "改变信念",
      description: "重新评估信念是否合理（诚实自省）",
      example: "也许我之前的标准过于严苛了？",
    },
    {
      value: "add-cognition",
      label: "添加新认知（合理化）",
      description: "加入新信息来减少冲突（需警惕自我欺骗）",
      example: "我一个人不买也改变不了什么",
    },
    {
      value: "trivialize",
      label: "降低重要性",
      description: "认为这个冲突没那么重要（最省力但最危险）",
      example: "环保其实没那么紧急",
    },
  ],
}

/** 服从防御三问 */
export const OBEDIENCE_TEMPLATE = {
  id: "obedience-defense",
  name: "服从防御三问",
  icon: "🛡️",
  description: "面对权威要求时，用三个问题进行独立判断",
  fields: [
    {
      key: "authority",
      label: "谁在向你提出要求？",
      placeholder: "描述权威人物及其身份...",
      hint: "例：我的直属领导",
    },
    {
      key: "request",
      label: "具体要求是什么？",
      placeholder: "客观描述对方要求你做的事...",
      hint: "例：要我修改数据报告中的几个数字",
    },
  ],
  threeQuestions: [
    {
      label: "第一问：这个要求的目的是什么？",
      placeholder: "思考对方的真实意图——是为了公共利益、个人利益，还是推卸责任？...",
      hint: "区分合理的管理决策和不合理的要求",
    },
    {
      label: "第二问：如果不服从，最坏后果是什么？",
      placeholder: "客观评估不服从的真实后果——往往没有想象中那么可怕...",
      hint: "考虑短期后果和长期后果",
    },
    {
      label: "第三问：有没有第三种选择？",
      placeholder: "除了'完全服从'和'完全拒绝'，还有没有折中或替代方案？...",
      hint: "创造性思考：延迟、条件性服从、部分执行等",
    },
  ],
}

/** 偏见觉察练习 */
export const BIAS_TEMPLATE = {
  id: "bias-practice",
  name: "偏见觉察练习",
  icon: "🔍",
  description: "通过场景化练习，识别自己的刻板印象并记录觉察心得",
  scenarios: [
    "在地铁上，一位穿着破旧的年轻人坐到你旁边，你不自觉地收紧了包",
    "看到一则新闻标题提到某地区的人犯罪，你立刻联想到'果然是他们'",
    "面试时看到候选人简历上的性别信息，你对其能力产生了预设判断",
    "在餐厅，服务员口音很重，你下意识降低了对其服务质量的预期",
    "孩子的老师很年轻，你担心'太年轻没经验'",
    "社交聚会上遇到一个沉默寡言的人，你判断他'不好相处'",
  ],
  fields: [
    {
      key: "scenario",
      label: "选择的场景",
      placeholder: "选择或描述一个让你产生预设判断的场景...",
    },
    {
      key: "stereotype",
      label: "你识别到的刻板印象",
      placeholder: "你自动浮现了什么想法？...",
      hint: "诚实面对——觉察是改变的第一步",
    },
    {
      key: "reflection",
      label: "觉察心得",
      placeholder: "这个刻板印象从何而来？个体信息如何能覆盖它？...",
      hint: "练习用具体观察替代群体标签",
    },
  ],
}

export const TOOL_TEMPLATES = [ABC_TEMPLATE, DISSONANCE_TEMPLATE, OBEDIENCE_TEMPLATE, BIAS_TEMPLATE]

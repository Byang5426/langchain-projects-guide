// Design Philosophy: Modern Technical Documentation with Progressive Information Design
// Color: Deep blue for reliability, purple for AI innovation, amber for emphasis

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'basic' | 'intermediate' | 'advanced';
  difficulty: 1 | 2 | 3 | 4 | 5;
  duration: string;
  tags: string[];
  keyPoints: string[];
  learningValue: string[];
  resources: {
    name: string;
    url: string;
  }[];
  icon?: string;
}

export const projects: Project[] = [
  // Basic Projects
  {
    id: 'sql-agent',
    title: '智能 SQL 查询代理',
    description: '构建一个能够理解自然语言并自动生成 SQL 查询的智能代理，让非技术用户也能轻松查询数据库。',
    category: 'basic',
    difficulty: 2,
    duration: '1-2 周',
    tags: ['LangGraph', 'Tool Calling', 'SQL', 'Agent'],
    keyPoints: [
      'LangGraph 的节点式架构设计',
      '数据库模式（Schema）自动探索',
      '自然语言处理与 SQL 生成',
      '工具调用（Tool Calling）机制'
    ],
    learningValue: [
      '掌握 LangGraph 的基本工作流构建',
      '理解 Agent 与外部工具的集成方式',
      '学习如何处理结构化数据查询'
    ],
    resources: [
      {
        name: 'ProjectPro 教程',
        url: 'https://www.projectpro.io/article/langgraph-projects-and-examples/1124'
      },
      {
        name: 'LangChain SQL Agent 文档',
        url: 'https://python.langchain.com/docs/tutorials/sql_qa/'
      }
    ]
  },
  {
    id: 'rag-qa',
    title: '个人知识库问答系统',
    description: '使用 RAG（检索增强生成）技术构建一个能够回答个人文档问题的智能问答系统。',
    category: 'basic',
    difficulty: 2,
    duration: '1-2 周',
    tags: ['RAG', 'FAISS', 'Embeddings', 'Vector DB'],
    keyPoints: [
      '文档加载与预处理（PDF、Markdown、TXT）',
      '文本分块策略（Chunking）',
      '向量嵌入（Embeddings）',
      '向量数据库（FAISS）',
      '检索与生成流程'
    ],
    learningValue: [
      '掌握 RAG 的完整工作流程',
      '理解向量检索的原理与实践',
      '学习文档处理的最佳实践'
    ],
    resources: [
      {
        name: 'Datawhale All-in-RAG',
        url: 'https://github.com/datawhalechina/all-in-rag'
      },
      {
        name: 'LangChain RAG 教程',
        url: 'https://python.langchain.com/docs/tutorials/rag/'
      }
    ],
    icon: '/images/rag-visual.png'
  },
  {
    id: 'chatbot',
    title: '客户支持聊天机器人',
    description: '构建一个有状态的客户服务机器人，能够记住对话历史并提供连贯的回复。',
    category: 'basic',
    difficulty: 2,
    duration: '1-2 周',
    tags: ['LangGraph', 'State Management', 'Memory', 'Streaming'],
    keyPoints: [
      'LangGraph 状态管理（State Management）',
      '对话历史追踪',
      '记忆机制（Memory）',
      '流式输出（Streaming）'
    ],
    learningValue: [
      '理解有状态对话系统的设计',
      '掌握 LangGraph 的状态持久化',
      '学习对话流程控制'
    ],
    resources: [
      {
        name: 'LC-StudyLab 项目',
        url: 'https://github.com/hefeng6500/lc-studylab'
      },
      {
        name: 'LangGraph 官方教程',
        url: 'https://langchain-ai.github.io/langgraph/'
      }
    ]
  },
  
  // Intermediate Projects
  {
    id: 'web-research',
    title: 'Web 研究与文章生成代理',
    description: '构建一个能够自动进行网络研究、收集信息并生成结构化文章的智能代理系统。',
    category: 'intermediate',
    difficulty: 3,
    duration: '2-3 周',
    tags: ['Multi-Agent', 'Web Search', 'Content Generation', 'Fact Checking'],
    keyPoints: [
      '多阶段工作流设计',
      '网络搜索工具集成',
      '内容提取与清洗',
      '多视角问题生成',
      '事实核查与来源验证',
      '结构化内容生成'
    ],
    learningValue: [
      '掌握复杂工作流的设计与实现',
      '理解多步骤任务的协调机制',
      '学习内容质量控制方法'
    ],
    resources: [
      {
        name: 'ProjectPro Web Research Agent',
        url: 'https://www.projectpro.io/article/langgraph-projects-and-examples/1124'
      },
      {
        name: 'LangGraph 多节点工作流',
        url: 'https://langchain-ai.github.io/langgraph/tutorials/multi_agent/'
      }
    ]
  },
  {
    id: 'code-generation',
    title: '代码生成与自我纠错系统',
    description: '构建一个能够根据文档生成代码、自动测试并迭代改进的智能代码助手。',
    category: 'intermediate',
    difficulty: 3,
    duration: '2-3 周',
    tags: ['RAG', 'Code Generation', 'Self-Correction', 'Testing'],
    keyPoints: [
      'RAG 文档摄取',
      '代码生成与格式化',
      'Python exec() 自动测试',
      '错误检测与迭代改进',
      'Human-in-the-Loop 审核机制',
      '条件边与任务队列'
    ],
    learningValue: [
      '理解自我纠错系统的设计模式',
      '掌握迭代反馈循环的实现',
      '学习代码质量保证方法'
    ],
    resources: [
      {
        name: 'LangGraph Self-Correction',
        url: 'https://langchain-ai.github.io/langgraph/tutorials/rag/langgraph_adaptive_rag/'
      },
      {
        name: 'ProjectPro Code Generation',
        url: 'https://www.projectpro.io/article/langgraph-projects-and-examples/1124'
      }
    ]
  },
  {
    id: 'financial-analyst',
    title: '金融数据分析代理',
    description: '构建一个能够自动获取股票数据、计算技术指标并生成分析报告的金融分析代理。',
    category: 'intermediate',
    difficulty: 3,
    duration: '2-3 周',
    tags: ['API Integration', 'Data Analysis', 'Visualization', 'JSON Output'],
    keyPoints: [
      'yfinance API 集成',
      '技术指标计算（ta 库）',
      '数据分析与可视化',
      'GPT-4 模型分析',
      'JSON 结构化输出',
      '交互式问答'
    ],
    learningValue: [
      '掌握外部 API 的集成方法',
      '理解数据驱动的 Agent 设计',
      '学习结构化输出的最佳实践'
    ],
    resources: [
      {
        name: 'ProjectPro Financial Analyst',
        url: 'https://www.projectpro.io/article/langgraph-projects-and-examples/1124'
      },
      {
        name: 'LangChain 工具集成',
        url: 'https://python.langchain.com/docs/how_to/custom_tools/'
      }
    ]
  },
  {
    id: 'social-media',
    title: '社交媒体内容生成系统',
    description: '构建一个能够自动生成、审核和发布多平台社交媒体内容的智能系统。',
    category: 'intermediate',
    difficulty: 3,
    duration: '2-3 周',
    tags: ['Content Generation', 'Human-in-the-Loop', 'Multi-Platform', 'Quality Control'],
    keyPoints: [
      '内容提取与改写',
      '多平台内容适配',
      'Human-in-the-Loop 审核',
      '身份验证流程',
      '内容质量控制',
      '品牌一致性保证'
    ],
    learningValue: [
      '理解人机协作的工作流设计',
      '掌握多平台适配策略',
      '学习内容审核机制'
    ],
    resources: [
      {
        name: 'ProjectPro Social Media Agent',
        url: 'https://www.projectpro.io/article/langgraph-projects-and-examples/1124'
      },
      {
        name: 'LangGraph Human-in-the-Loop',
        url: 'https://langchain-ai.github.io/langgraph/how-tos/human_in_the_loop/'
      }
    ]
  },
  
  // Advanced Projects
  {
    id: 'lc-studylab',
    title: 'LC-StudyLab 完整生态系统',
    description: '构建一个包含五个渐进式阶段的完整 LangChain 生态系统学习平台，涵盖从基础 Agent 到安全机制的所有核心特性。',
    category: 'advanced',
    difficulty: 5,
    duration: '8-12 周',
    tags: ['Full Stack', 'LangChain', 'LangGraph', 'RAG', 'Multi-Agent', 'Security'],
    keyPoints: [
      '阶段一：基础 Agent 与工具调用',
      '阶段二：RAG 知识库系统',
      '阶段三：LangGraph 工作流',
      '阶段四：DeepAgents 深度研究',
      '阶段五：Guardrails 安全机制'
    ],
    learningValue: [
      '系统掌握 LangChain 1.0 完整生态',
      '理解生产级应用的设计模式',
      '学习安全性与可靠性保障'
    ],
    resources: [
      {
        name: 'LC-StudyLab GitHub',
        url: 'https://github.com/hefeng6500/lc-studylab'
      },
      {
        name: 'LangChain 官方文档',
        url: 'https://python.langchain.com/'
      }
    ],
    icon: '/images/langchain-visual.png'
  },
  {
    id: 'graph-rag',
    title: 'Graph RAG 知识图谱系统',
    description: '构建一个基于知识图谱的高级 RAG 系统，支持复杂关系查询和推理。',
    category: 'advanced',
    difficulty: 4,
    duration: '4-6 周',
    tags: ['Knowledge Graph', 'Neo4J', 'Graph RAG', 'Hybrid Retrieval', 'Multi-Modal'],
    keyPoints: [
      '知识图谱构建（Neo4J）',
      '图数据建模',
      '图检索算法',
      '混合检索（向量+图）',
      '智能查询路由',
      '多模态嵌入'
    ],
    learningValue: [
      '掌握知识图谱与 RAG 的结合',
      '理解图数据库的应用场景',
      '学习复杂查询的优化策略'
    ],
    resources: [
      {
        name: 'Datawhale All-in-RAG 第九章',
        url: 'https://github.com/datawhalechina/all-in-rag'
      },
      {
        name: 'LangChain Graph RAG',
        url: 'https://python.langchain.com/docs/use_cases/graph/'
      }
    ],
    icon: '/images/langgraph-visual.png'
  },
  {
    id: 'multi-agent',
    title: '多智能体协作研究系统',
    description: '构建一个由多个专门化智能体协作完成复杂研究任务的系统。',
    category: 'advanced',
    difficulty: 4,
    duration: '4-6 周',
    tags: ['Multi-Agent', 'Collaboration', 'Task Decomposition', 'Parallel Execution'],
    keyPoints: [
      '多智能体架构设计',
      '智能体角色分工（研究员、分析师、写作者）',
      '智能体间通信协议',
      '任务分解与分配',
      '结果聚合与整合',
      '并行工作流执行'
    ],
    learningValue: [
      '掌握多智能体系统的设计原则',
      '理解智能体协作机制',
      '学习复杂任务的分解策略'
    ],
    resources: [
      {
        name: 'LC-StudyLab DeepAgents',
        url: 'https://github.com/hefeng6500/lc-studylab'
      },
      {
        name: 'LangGraph 多智能体教程',
        url: 'https://langchain-ai.github.io/langgraph/tutorials/multi_agent/'
      }
    ]
  },
  {
    id: 'self-correcting',
    title: '自我纠错的研究助手',
    description: '构建一个能够自主规划、执行、验证和改进的企业级研究助手系统。',
    category: 'advanced',
    difficulty: 5,
    duration: '6-8 周',
    tags: ['Self-Correction', 'Fact Checking', 'Quality Assurance', 'Enterprise'],
    keyPoints: [
      '查询理解与意图识别',
      '研究计划自动生成',
      '文档检索与验证',
      '事实核查机制',
      '自我纠错循环',
      'Human-in-the-Loop 反馈',
      '可信度评估'
    ],
    learningValue: [
      '理解自主 Agent 的设计模式',
      '掌握质量保证机制',
      '学习企业级应用的可靠性保障'
    ],
    resources: [
      {
        name: 'ProjectPro Self-Correcting Assistant',
        url: 'https://www.projectpro.io/article/langgraph-projects-and-examples/1124'
      },
      {
        name: 'LangGraph 高级工作流',
        url: 'https://langchain-ai.github.io/langgraph/tutorials/'
      }
    ]
  },
  {
    id: 'healthcare',
    title: '医疗患者交互系统',
    description: '构建一个能够处理医疗场景复杂需求的智能对话系统，包括预约管理、病历追踪和紧急响应。',
    category: 'advanced',
    difficulty: 4,
    duration: '4-6 周',
    tags: ['Healthcare', 'Domain-Specific', 'Privacy', 'Emergency Response'],
    keyPoints: [
      '医疗领域知识建模',
      '患者历史追踪',
      '多任务处理（预约、咨询、紧急）',
      '敏感信息保护',
      '紧急情况检测',
      '上下文连续性维护',
      '合规性保障'
    ],
    learningValue: [
      '理解垂直领域应用的特殊需求',
      '掌握敏感数据的处理方法',
      '学习复杂业务逻辑的实现'
    ],
    resources: [
      {
        name: 'ProjectPro Healthcare Agent',
        url: 'https://www.projectpro.io/article/langgraph-projects-and-examples/1124'
      },
      {
        name: 'LangChain 垂直领域应用',
        url: 'https://python.langchain.com/docs/use_cases/'
      }
    ]
  }
];

export const categories = [
  { id: 'all', label: '全部项目', count: projects.length },
  { id: 'basic', label: '基础巩固', count: projects.filter(p => p.category === 'basic').length },
  { id: 'intermediate', label: '进阶实践', count: projects.filter(p => p.category === 'intermediate').length },
  { id: 'advanced', label: '高级挑战', count: projects.filter(p => p.category === 'advanced').length }
];

export const allTags = Array.from(new Set(projects.flatMap(p => p.tags))).sort();

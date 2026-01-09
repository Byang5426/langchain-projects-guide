/**
 * 用户案例展示数据
 * 展示用户通过学习 LangChain 项目生成的精彩案例
 */

export interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

export interface Showcase {
  id: string;
  title: string;
  description: string;
  fullContent?: string;
  author: string;
  authorAvatar?: string;
  projectType: 'basic' | 'advanced' | 'expert';
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  date: string;
  likes: number;
  views: number;
  comments: Comment[];
  featured?: boolean;
  difficulty?: number;
  learningTime?: string;
}

export const showcases: Showcase[] = [
  {
    id: 'showcase-1',
    title: '智能 SQL 查询代理 - 电商数据分析平台',
    description: '基于 LangChain 和 LangGraph 构建的智能 SQL 查询代理，支持自然语言查询电商数据库，自动生成优化的 SQL 语句，实现了 95% 的查询准确率。',
    fullContent: `## 项目背景

在电商数据分析中，传统的 SQL 查询方式对非技术用户来说过于复杂。本项目通过 LangChain 和 LangGraph 构建了一个智能 SQL 查询代理，让用户可以用自然语言直接查询数据库。

## 核心功能

- **自然语言理解**：支持中英文混合查询
- **智能 SQL 生成**：自动生成优化的 SQL 语句
- **查询结果可视化**：支持表格、图表等多种展示方式
- **查询历史记录**：保存用户的查询历史
- **权限控制**：基于角色的数据访问控制

## 技术亮点

1. **LangGraph 状态管理**：使用 LangGraph 管理复杂的查询流程
2. **Tool Calling**：集成数据库工具进行实时查询
3. **Prompt Engineering**：精心设计的提示词确保高准确率
4. **错误处理**：完善的错误捕获和纠正机制

## 项目成果

- 查询准确率达到 95%
- 平均响应时间 < 2 秒
- 支持 10+ 种常见查询模式
- 已在 3 家电商企业成功部署`,
    author: '张三',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang',
    projectType: 'basic',
    technologies: ['LangChain', 'SQL', 'LangGraph', 'PostgreSQL'],
    date: '2026-01-05',
    likes: 234,
    views: 1200,
    comments: [
      {
        id: 'c1',
        author: '李明',
        content: '这个项目非常实用，我也在做类似的东西。能否分享一下 Prompt 的设计思路？',
        date: '2026-01-06',
        likes: 12,
      },
      {
        id: 'c2',
        author: '王刚',
        content: '95% 的准确率很不错！请问是如何处理复杂的 JOIN 查询的？',
        date: '2026-01-07',
        likes: 8,
      },
    ],
    featured: true,
    demoUrl: 'https://sql-agent-demo.example.com',
    githubUrl: 'https://github.com/example/sql-agent',
    difficulty: 2,
    learningTime: '1-2 周',
  },
  {
    id: 'showcase-2',
    title: '个人知识库问答系统 - 企业文档智能助手',
    description: '利用 RAG 技术构建的企业文档智能问答系统，支持上传 PDF、Word、Markdown 等多种格式文档，实现了实时知识库搜索和精准答案生成。',
    fullContent: `## 项目背景

企业内部文档众多且分散，员工查找信息效率低下。本项目通过 RAG 技术构建了一个智能文档问答系统，让员工可以快速获取所需信息。

## 核心功能

- **多格式文档支持**：PDF、Word、Markdown、TXT 等
- **实时搜索**：毫秒级的文档检索
- **精准答案生成**：基于检索结果生成准确的回答
- **知识库管理**：支持文档上传、删除、更新
- **使用统计**：记录热门问题和用户行为

## 技术亮点

1. **向量数据库**：使用 FAISS 进行高效的向量检索
2. **嵌入模型**：集成多种语言模型进行文本嵌入
3. **RAG 管道**：优化的检索增强生成流程
4. **缓存机制**：减少重复计算，提升响应速度

## 项目成果

- 支持 1000+ 份企业文档
- 答案准确率 92%
- 平均检索时间 < 500ms
- 已为 500+ 员工提供服务`,
    author: '李四',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Li',
    projectType: 'basic',
    technologies: ['RAG', 'LangChain', 'Embedding', 'Vector DB'],
    date: '2026-01-03',
    likes: 189,
    views: 950,
    comments: [
      {
        id: 'c3',
        author: '张三',
        content: '很棒的项目！请问如何处理多语言文档？',
        date: '2026-01-04',
        likes: 15,
      },
    ],
    featured: true,
    demoUrl: 'https://rag-qa-demo.example.com',
    githubUrl: 'https://github.com/example/rag-qa',
    difficulty: 2,
    learningTime: '1-2 周',
  },
  {
    id: 'showcase-3',
    title: '多轮对话客服机器人 - 金融行业应用',
    description: '基于 LangGraph 的多轮对话客服机器人，支持复杂的对话流程管理，集成了情感分析和意图识别，在金融客服领域实现了 88% 的自动化率。',
    fullContent: `## 项目背景

金融行业客服需要处理复杂的业务流程和敏感的客户信息。本项目构建了一个智能客服机器人，能够理解用户意图并提供专业的金融咨询。

## 核心功能

- **多轮对话管理**：支持长对话上下文
- **意图识别**：准确识别用户的业务需求
- **情感分析**：实时监测客户情绪
- **人工转接**：复杂问题自动转接人工客服
- **合规检查**：确保回答符合金融监管要求

## 技术亮点

1. **LangGraph 状态机**：复杂对话流程管理
2. **情感分析模型**：实时情绪检测
3. **意图分类**：多分类模型进行意图识别
4. **上下文管理**：优化的对话历史管理

## 项目成果

- 自动化处理率 88%
- 客户满意度 4.5/5
- 日均处理 5000+ 对话
- 成本降低 60%`,
    author: '王五',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wang',
    projectType: 'advanced',
    technologies: ['LangGraph', 'NLP', 'State Management', 'LLM'],
    date: '2026-01-02',
    likes: 156,
    views: 780,
    comments: [],
    featured: true,
    demoUrl: 'https://finance-chatbot-demo.example.com',
    githubUrl: 'https://github.com/example/finance-chatbot',
    difficulty: 3,
    learningTime: '2-3 周',
  },
];

export function getShowcaseById(id: string): Showcase | undefined {
  return showcases.find(s => s.id === id);
}

export const getFeaturedShowcases = (): Showcase[] => {
  return showcases.filter(s => s.featured).slice(0, 3);
};

export const getShowcasesByType = (type: 'basic' | 'advanced' | 'expert'): Showcase[] => {
  return showcases.filter(s => s.projectType === type);
};

export const getShowcasesByPopularity = (): Showcase[] => {
  return [...showcases].sort((a, b) => b.likes - a.likes);
};

export const getShowcasesByDate = (): Showcase[] => {
  return [...showcases].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

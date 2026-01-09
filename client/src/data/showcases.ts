/**
 * 用户案例展示数据
 * 展示用户通过学习 LangChain 项目生成的精彩案例
 */

export interface Showcase {
  id: string;
  title: string;
  description: string;
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
  featured?: boolean;
}

export const showcases: Showcase[] = [
  {
    id: 'showcase-1',
    title: '智能 SQL 查询代理 - 电商数据分析平台',
    description: '基于 LangChain 和 LangGraph 构建的智能 SQL 查询代理，支持自然语言查询电商数据库，自动生成优化的 SQL 语句，实现了 95% 的查询准确率。',
    author: '张三',
    projectType: 'basic',
    technologies: ['LangChain', 'SQL', 'LangGraph', 'PostgreSQL'],
    date: '2026-01-05',
    likes: 234,
    views: 1200,
    featured: true,
  },
  {
    id: 'showcase-2',
    title: '个人知识库问答系统 - 企业文档智能助手',
    description: '利用 RAG 技术构建的企业文档智能问答系统，支持上传 PDF、Word、Markdown 等多种格式文档，实现了实时知识库搜索和精准答案生成。',
    author: '李四',
    projectType: 'basic',
    technologies: ['RAG', 'LangChain', 'Embedding', 'Vector DB'],
    date: '2026-01-03',
    likes: 189,
    views: 950,
    featured: true,
  },
  {
    id: 'showcase-3',
    title: '多轮对话客服机器人 - 金融行业应用',
    description: '基于 LangGraph 的多轮对话客服机器人，支持复杂的对话流程管理，集成了情感分析和意图识别，在金融客服领域实现了 88% 的自动化率。',
    author: '王五',
    projectType: 'advanced',
    technologies: ['LangGraph', 'NLP', 'State Management', 'LLM'],
    date: '2026-01-02',
    likes: 156,
    views: 780,
    featured: true,
  },
  {
    id: 'showcase-4',
    title: 'Web 研究代理 - 实时信息聚合平台',
    description: '构建的 Web 研究代理能够自动搜索、抓取和总结互联网信息，支持多源数据融合，为用户提供实时的信息聚合和分析报告。',
    author: '赵六',
    projectType: 'advanced',
    technologies: ['Web Scraping', 'LangChain', 'Multi-Agent', 'Data Aggregation'],
    date: '2025-12-28',
    likes: 142,
    views: 650,
  },
  {
    id: 'showcase-5',
    title: '代码生成与自我纠错系统 - 开发效率工具',
    description: '利用 LangGraph 的自我纠错机制，构建的代码生成系统能够自动修复生成的代码错误，支持多种编程语言，提高了代码生成的成功率到 92%。',
    author: '孙七',
    projectType: 'advanced',
    technologies: ['Code Generation', 'Self-Correction', 'LangGraph', 'AST'],
    date: '2025-12-25',
    likes: 198,
    views: 890,
  },
  {
    id: 'showcase-6',
    title: '金融数据分析代理 - 投资决策支持系统',
    description: '集成了实时股票数据、财务报表分析和市场情报的 AI 代理，支持自然语言查询和智能分析，为投资者提供数据驱动的决策支持。',
    author: '周八',
    projectType: 'advanced',
    technologies: ['Financial Data', 'LangChain', 'Time Series', 'API Integration'],
    date: '2025-12-22',
    likes: 167,
    views: 720,
  },
  {
    id: 'showcase-7',
    title: '社交媒体内容生成系统 - 创意营销平台',
    description: '基于 Human-in-the-Loop 的社交媒体内容生成系统，支持多平台内容定制，集成了用户反馈机制，内容质量评分达到 8.5/10。',
    author: '吴九',
    projectType: 'advanced',
    technologies: ['Content Generation', 'Human-in-the-Loop', 'Multi-Platform', 'LLM'],
    date: '2025-12-20',
    likes: 134,
    views: 580,
  },
  {
    id: 'showcase-8',
    title: 'Graph RAG 知识图谱系统 - 医学知识库',
    description: '构建的医学知识图谱系统结合了 Graph RAG 技术，支持复杂的医学关系查询和推理，为医疗专业人士提供了精准的知识检索和决策支持。',
    author: '郑十',
    projectType: 'expert',
    technologies: ['Graph RAG', 'Knowledge Graph', 'Medical NLP', 'Neo4j'],
    date: '2025-12-18',
    likes: 156,
    views: 640,
    featured: true,
  },
  {
    id: 'showcase-9',
    title: '多智能体协作研究系统 - 学术论文分析',
    description: '利用多智能体协作机制构建的学术论文分析系统，支持论文自动分类、关键观点提取和研究趋势分析，已应用于多个学术机构。',
    author: '刘十一',
    projectType: 'expert',
    technologies: ['Multi-Agent', 'Collaboration', 'Academic NLP', 'LangGraph'],
    date: '2025-12-15',
    likes: 189,
    views: 850,
    featured: true,
  },
  {
    id: 'showcase-10',
    title: '自我纠错研究助手 - 论文质量检查工具',
    description: '基于自我纠错机制的研究助手，支持自动检查论文的逻辑、语法和学术规范，提供改进建议，已帮助 500+ 研究人员提升论文质量。',
    author: '陈十二',
    projectType: 'expert',
    technologies: ['Self-Correction', 'Academic Writing', 'Quality Assurance', 'LLM'],
    date: '2025-12-12',
    likes: 145,
    views: 720,
  },
];

/**
 * 获取精选案例（置顶）
 */
export const getFeaturedShowcases = (): Showcase[] => {
  return showcases.filter(s => s.featured).slice(0, 3);
};

/**
 * 按类型获取案例
 */
export const getShowcasesByType = (type: 'basic' | 'advanced' | 'expert'): Showcase[] => {
  return showcases.filter(s => s.projectType === type);
};

/**
 * 按热度排序
 */
export const getShowcasesByPopularity = (): Showcase[] => {
  return [...showcases].sort((a, b) => b.likes - a.likes);
};

/**
 * 按最新排序
 */
export const getShowcasesByDate = (): Showcase[] => {
  return [...showcases].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

# LangChain 项目推荐指南

一个交互式网页应用，为 LangChain 1.0 和 LangGraph 学习者精选了 12 个实战项目，帮助您从基础到高级系统地掌握 AI 应用开发技术。

![LangChain 项目推荐指南](./client/public/images/hero-bg.png)

## 🎯 项目概述

本项目是一个**现代化的学习资源导航平台**，整合了 LangChain 和 LangGraph 生态中最具代表性的实战项目。通过交互式界面、智能筛选和进度追踪，帮助开发者找到适合自己学习阶段的项目，并系统地提升 AI 应用开发能力。

### 核心特性

- **12 个精选项目**：从基础巩固到高级挑战，覆盖 RAG、Multi-Agent、LangGraph 等核心技术
- **智能筛选系统**：按难度、技术标签、关键词快速查找项目
- **代码可用性指标**：清晰展示每个项目的代码参考程度（0-100%）
- **学习进度追踪**：标记已完成项目，自动保存进度到本地存储
- **完整资源链接**：官方文档、代码示例、在线课程一站式获取
- **响应式设计**：完美适配桌面、平板和移动设备

## 📊 项目结构

```
langchain-projects-guide/
├── client/                          # 前端应用
│   ├── public/
│   │   └── images/                  # 项目视觉资产
│   │       ├── hero-bg.png          # 首页背景
│   │       ├── langchain-visual.png # LangChain 可视化
│   │       ├── langgraph-visual.png # LangGraph 可视化
│   │       ├── rag-visual.png       # RAG 可视化
│   │       └── learning-path-bg.png # 学习路径背景
│   ├── src/
│   │   ├── components/              # React 组件库
│   │   │   ├── ProjectCard.tsx      # 项目卡片组件（支持完成标记）
│   │   │   ├── ProgressStats.tsx    # 进度统计面板（可收起）
│   │   │   ├── CodeAvailabilityBadge.tsx # 代码可用性指示器
│   │   │   └── ui/                  # shadcn/ui 组件
│   │   ├── hooks/
│   │   │   └── useProgressTracker.ts # 进度追踪 Hook（localStorage）
│   │   ├── pages/
│   │   │   ├── Home.tsx             # 主页面
│   │   │   └── NotFound.tsx         # 404 页面
│   │   ├── data/
│   │   │   └── projects.ts          # 12 个项目数据定义
│   │   ├── lib/                     # 工具函数
│   │   ├── contexts/                # React Context
│   │   ├── App.tsx                  # 应用入口
│   │   ├── main.tsx                 # React 入口点
│   │   └── index.css                # 全局样式（深蓝紫色主题）
│   └── index.html                   # HTML 模板
├── server/                          # 后端占位符（web-static 项目）
├── shared/                          # 共享类型定义
├── package.json                     # 项目依赖
├── tsconfig.json                    # TypeScript 配置
├── vite.config.ts                   # Vite 构建配置
├── tailwind.config.ts               # Tailwind CSS 配置
├── Dockerfile                       # Docker 镜像配置
├── docker-compose.yml               # Docker 容器编排
├── nginx.conf                       # Nginx 服务器配置
├── .htaccess                        # Apache 服务器配置
├── deploy.sh                        # 自动部署脚本
├── DEPLOYMENT_GUIDE.md              # 详细部署指南
├── DEPLOYMENT_CHECKLIST.md          # 部署快速参考
└── README.md                        # 本文件
```

## 🎓 12 个精选项目

### 🔵 基础巩固（3 个项目）

| 项目 | 难度 | 时长 | 代码可用性 | 核心技术 |
|------|------|------|----------|---------|
| 智能 SQL 查询代理 | ⭐⭐ | 1-2 周 | 70% | LangGraph、Tool Calling、SQL Agent |
| 个人知识库问答系统 | ⭐⭐ | 1-2 周 | 90% | RAG、FAISS、Embeddings、Vector DB |
| 客户支持聊天机器人 | ⭐⭐ | 1-2 周 | 55% | LangGraph、State Management、Memory |

### 🟣 进阶实践（4 个项目）

| 项目 | 难度 | 时长 | 代码可用性 | 核心技术 |
|------|------|------|----------|---------|
| Web 研究与文章生成代理 | ⭐⭐⭐ | 2-3 周 | 45% | Multi-Agent、Web Search、Content Generation |
| 代码生成与自我纠错系统 | ⭐⭐⭐ | 2-3 周 | 60% | RAG、Code Generation、Self-Correction |
| 金融数据分析代理 | ⭐⭐⭐ | 2-3 周 | 65% | API Integration、Data Analysis、Visualization |
| 社交媒体内容生成系统 | ⭐⭐⭐ | 2-3 周 | 50% | Content Generation、Human-in-the-Loop |

### 🟡 高级挑战（5 个项目）

| 项目 | 难度 | 时长 | 代码可用性 | 核心技术 |
|------|------|------|----------|---------|
| Graph RAG 知识图谱系统 | ⭐⭐⭐⭐ | 4-6 周 | 75% | Knowledge Graph、Neo4J、Graph RAG |
| 多智能体协作研究系统 | ⭐⭐⭐⭐ | 4-6 周 | 60% | Multi-Agent、Collaboration、Task Decomposition |
| 医疗患者交互系统 | ⭐⭐⭐⭐⭐ | 4-6 周 | 35% | Healthcare、Domain-Specific、Privacy |
| LC-StudyLab 完整生态系统 | ⭐⭐⭐⭐⭐ | 8-12 周 | 95% | Full Stack、LangChain、LangGraph、Security |
| 自我纠错的研究助手 | ⭐⭐⭐⭐ | 6-8 周 | 50% | Self-Correction、Fact Checking、Quality Assurance |

## 🚀 快速开始

### 前置要求

- Node.js 18+ 和 pnpm 10+
- 现代浏览器（Chrome、Firefox、Safari、Edge）

### 本地开发

```bash
# 1. 克隆项目
git clone https://github.com/yourusername/langchain-projects-guide.git
cd langchain-projects-guide

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm dev

# 4. 打开浏览器访问
# http://localhost:3000
```

### 构建生产版本

```bash
# 构建项目
pnpm build

# 本地预览生产版本
pnpm preview
```

## 📦 部署指南

本项目提供了三种部署方案，详细说明请参考 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)。

### Docker 部署（推荐，最简单）

```bash
# 启动容器
docker-compose up -d

# 访问应用
# http://localhost:3000
```

### Nginx 部署

```bash
# 1. 构建项目
pnpm build

# 2. 配置 Nginx
sudo cp nginx.conf /etc/nginx/sites-available/langchain-guide
sudo ln -s /etc/nginx/sites-available/langchain-guide /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 3. 配置 HTTPS（Let's Encrypt）
sudo certbot certonly --webroot -w /var/www/langchain-guide -d yourdomain.com
```

### 自动部署脚本

```bash
# 一键部署到服务器
./deploy.sh <server-ip> <domain-name> <username>

# 示例
./deploy.sh 123.45.67.89 langchain-guide.com ubuntu
```

详见 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) 和 [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)。

## 🎨 技术栈

### 前端框架

- **React 19**：现代 UI 框架
- **TypeScript 5.6**：类型安全的 JavaScript
- **Vite 7**：极速构建工具
- **Tailwind CSS 4**：原子化 CSS 框架
- **shadcn/ui**：高质量 React 组件库

### 状态管理与数据

- **React Hooks**：内置状态管理
- **localStorage**：客户端数据持久化
- **Wouter**：轻量级客户端路由

### 开发工具

- **ESLint**：代码质量检查
- **Prettier**：代码格式化
- **TypeScript**：静态类型检查
- **Vitest**：单元测试框架

## 🎯 核心功能详解

### 1. 项目筛选与搜索

用户可以通过以下方式快速找到感兴趣的项目：

- **按难度分类**：基础巩固、进阶实践、高级挑战
- **按技术标签**：RAG、Multi-Agent、LangGraph、API Integration 等
- **全文搜索**：搜索项目名称、描述或技术关键词

### 2. 代码可用性指标

每个项目都标注了代码可用性百分比，帮助用户快速判断学习方式：

- **90-100%（完整代码）**：可直接克隆运行，最小化定制
- **70-89%（部分代码）**：有官方示例和教程，需要适当定制
- **50-69%（教程参考）**：有详细教程和代码片段，需要自己实现
- **0-49%（最小示例）**：有基础框架，需要从零开始实现

### 3. 学习进度追踪

用户可以标记已完成的项目，系统会自动：

- 计算完成进度百分比
- 保存进度到浏览器 localStorage
- 支持导出进度为 JSON 文件
- 支持从 JSON 文件导入进度
- 提供一键重置功能

### 4. 响应式设计

- **桌面版**：右侧固定侧栏显示进度统计
- **平板版**：进度统计可收起，节省屏幕空间
- **移动版**：进度统计显示在内容顶部

## 📚 学习路径建议

### 初学者路径（1-2 个月）

1. **第 1 周**：智能 SQL 查询代理 - 掌握 LangGraph 基础和工具调用
2. **第 2 周**：个人知识库问答 - 深入理解 RAG 工作流
3. **第 3 周**：客户支持机器人 - 学习状态管理和对话历史
4. **第 4-8 周**：选择 2-3 个进阶项目继续学习

### 进阶者路径（2-3 个月）

1. **阶段一**：完成 2-3 个进阶项目，掌握多智能体和复杂工作流
2. **阶段二**：挑战 LC-StudyLab 完整生态系统
3. **阶段三**：深入高级主题，如知识图谱、自我纠错等

### 高级开发者路径（持续学习）

- 系统可靠性与性能优化
- 安全性与权限控制
- 可扩展性与模块化设计
- 生产级应用部署

## 🔗 学习资源

### 官方文档

- [LangChain 官方文档](https://python.langchain.com/)
- [LangGraph 官方文档](https://langchain-ai.github.io/langgraph/)
- [LangChain Academy](https://academy.langchain.com/)

### 开源项目

- [LC-StudyLab](https://github.com/hefeng6500/lc-studylab) - 完整的 LangChain 生态系统示例
- [All-in-RAG](https://github.com/datawhalechina/all-in-rag) - RAG 技术完整教程
- [LangChain Examples](https://github.com/langchain-ai/langchain/tree/master/examples)

### 社区资源

- [LangChain Discord](https://discord.gg/langchain)
- [LangChain GitHub Discussions](https://github.com/langchain-ai/langchain/discussions)
- [Datawhale](https://www.datawhale.com/) - 开源学习社区

## 🛠️ 开发指南

### 项目数据结构

所有项目数据定义在 `client/src/data/projects.ts` 中：

```typescript
interface Project {
  id: string;                    // 唯一标识符
  title: string;                 // 项目名称
  description: string;           // 项目描述
  category: 'basic' | 'intermediate' | 'advanced'; // 难度分类
  difficulty: number;            // 难度等级（1-5）
  duration: string;              // 预计学习时长
  tags: string[];                // 技术标签
  keyPoints: string[];           // 核心技术点
  learningValue: string[];       // 学习价值
  codeAvailability: number;      // 代码可用性（0-100%）
  codeAvailabilityLabel: string; // 可用性标签
  codeExamples: Array<{          // 代码示例
    name: string;
    description: string;
    url: string;
  }>;
  resources: Array<{             // 学习资源
    name: string;
    url: string;
  }>;
  icon?: string;                 // 项目图标
}
```

### 添加新项目

1. 编辑 `client/src/data/projects.ts`
2. 在 `projects` 数组中添加新项目对象
3. 更新 `categories` 和 `allTags` 数据
4. 重新启动开发服务器

### 自定义主题

全局样式定义在 `client/src/index.css` 中，使用 OKLCH 色彩空间和 CSS 变量：

```css
:root {
  --primary: oklch(0.623 0.214 259.815);      /* 深蓝色 */
  --accent: oklch(0.967 0.001 286.375);       /* 紫色 */
  --background: oklch(1 0 0);                 /* 白色 */
  --foreground: oklch(0.235 0.015 65);        /* 深灰色 */
}
```

## 📊 性能优化

- **代码分割**：使用 Vite 的动态导入实现代码分割
- **图片优化**：所有图片使用 WebP 格式和响应式加载
- **缓存策略**：生产版本使用内容哈希命名，支持长期缓存
- **CSS 优化**：Tailwind CSS 自动清除未使用的样式

## 🔒 安全性

- **XSS 防护**：React 自动转义所有输出
- **CSP 头**：Nginx 配置包含 Content Security Policy
- **HTTPS**：支持 Let's Encrypt 自动证书更新
- **CORS**：配置适当的跨域资源共享策略

## 📝 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📧 联系方式

- **GitHub Issues**：提交 bug 和功能请求
- **GitHub Discussions**：讨论和提问
- **Email**：通过 GitHub 联系项目维护者

## 🙏 致谢

感谢以下开源项目和社区的支持：

- [LangChain](https://github.com/langchain-ai/langchain) - AI 应用开发框架
- [Datawhale](https://www.datawhale.com/) - 开源学习社区
- [shadcn/ui](https://ui.shadcn.com/) - React 组件库
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架

---

**最后更新**：2026 年 1 月 8 日

**维护者**：Manus AI

**项目状态**：✅ 活跃维护中

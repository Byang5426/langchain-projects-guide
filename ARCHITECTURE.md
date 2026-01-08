# LangChain 项目推荐指南 - 架构设计文档

## 📐 系统架构概览

本项目采用**现代前端单页应用（SPA）架构**，使用 React + TypeScript + Tailwind CSS 构建，所有数据存储在客户端本地，无需后端服务器。

```
┌─────────────────────────────────────────────────────────────┐
│                     浏览器（Client）                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              React 应用（client/src）                │   │
│  │                                                      │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────┐  │   │
│  │  │   Pages      │  │ Components   │  │  Hooks   │  │   │
│  │  │              │  │              │  │          │  │   │
│  │  │ • Home       │  │ • ProjectCard│  │ useProgress│  │   │
│  │  │ • NotFound   │  │ • Progress   │  │ Tracker  │  │   │
│  │  │              │  │ • CodeAvail  │  │          │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────┘  │   │
│  │                                                      │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────┐  │   │
│  │  │   Data       │  │   Contexts   │  │   Lib    │  │   │
│  │  │              │  │              │  │          │  │   │
│  │  │ • projects   │  │ • Theme      │  │ • utils  │  │   │
│  │  │ • constants  │  │              │  │          │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────┘  │   │
│  │                                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Styling & UI Framework                       │   │
│  │                                                      │   │
│  │  • Tailwind CSS 4 (原子化 CSS)                      │   │
│  │  • shadcn/ui (React 组件库)                         │   │
│  │  • Framer Motion (动画库)                           │   │
│  │  • Lucide React (图标库)                            │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Storage & State Management                   │   │
│  │                                                      │   │
│  │  • localStorage (进度数据持久化)                    │   │
│  │  • React Hooks (组件状态)                           │   │
│  │  • Context API (全局状态)                           │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    构建 & 部署                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   Vite       │  │   TypeScript │  │   Tailwind CSS   │  │
│  │  (构建工具)  │  │   (类型检查) │  │   (CSS 处理)     │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│           │                │                   │             │
│           └────────────────┼───────────────────┘             │
│                            │                                 │
│                      ┌─────▼──────┐                          │
│                      │  dist/     │                          │
│                      │  public/   │                          │
│                      └────────────┘                          │
│                            │                                 │
│           ┌────────────────┼───────────────────┐             │
│           │                │                   │             │
│      ┌────▼────┐    ┌─────▼──────┐    ┌──────▼────┐        │
│      │ Docker  │    │   Nginx    │    │  Apache   │        │
│      │ 容器    │    │  服务器    │    │  服务器   │        │
│      └────┬────┘    └─────┬──────┘    └──────┬────┘        │
│           │                │                   │             │
│           └────────────────┼───────────────────┘             │
│                            │                                 │
│                      ┌─────▼──────────┐                      │
│                      │  互联网 / CDN  │                      │
│                      └────────────────┘                      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 🗂️ 文件结构详解

### 核心目录

#### `client/src/pages/`

页面级组件，对应应用的不同路由：

- **Home.tsx**：主页面，包含项目列表、筛选器、进度统计面板
- **NotFound.tsx**：404 错误页面

#### `client/src/components/`

可复用的 React 组件：

| 组件 | 职责 | 依赖 |
|------|------|------|
| **ProjectCard.tsx** | 单个项目卡片，显示项目信息、代码示例、资源链接 | useProgressTracker |
| **ProgressStats.tsx** | 进度统计面板，显示完成进度、导出/导入/重置按钮 | useProgressTracker |
| **CodeAvailabilityBadge.tsx** | 代码可用性指示器，显示百分比和标签 | 无 |
| **ui/** | shadcn/ui 组件库（Button、Card、Dialog 等） | @radix-ui |

#### `client/src/hooks/`

自定义 React Hooks，封装业务逻辑：

- **useProgressTracker.ts**：管理项目完成状态，提供 CRUD 操作和 localStorage 持久化

```typescript
// Hook 提供的接口
{
  progress,                      // 当前进度数据
  toggleProjectCompletion,       // 切换项目完成状态
  isProjectCompleted,            // 检查项目是否完成
  getCompletionPercentage,       // 获取完成百分比
  resetProgress,                 // 重置所有进度
  exportProgress,                // 导出为 JSON
  importProgress,                // 从 JSON 导入
}
```

#### `client/src/data/`

应用数据和常量：

- **projects.ts**：12 个项目的完整定义，包括标题、描述、难度、代码示例、资源链接等

```typescript
// 项目数据结构
interface Project {
  id: string;
  title: string;
  description: string;
  category: 'basic' | 'intermediate' | 'advanced';
  difficulty: number;            // 1-5 星
  duration: string;              // "1-2 周"
  tags: string[];                // 技术标签
  keyPoints: string[];           // 核心技术点
  learningValue: string[];       // 学习价值
  codeAvailability: number;      // 0-100%
  codeAvailabilityLabel: string; // "完整代码" | "部分代码" | ...
  codeExamples: Array<{
    name: string;
    description: string;
    url: string;
  }>;
  resources: Array<{
    name: string;
    url: string;
  }>;
  icon?: string;
}
```

#### `client/src/lib/`

工具函数和辅助方法：

- 字符串处理
- 日期格式化
- 数据验证
- 其他通用工具

#### `client/src/contexts/`

React Context 提供全局状态：

- **ThemeContext.tsx**：管理深色/浅色主题切换

#### `client/src/index.css`

全局样式定义：

- Tailwind CSS 配置
- CSS 变量（颜色、间距、圆角等）
- 自定义组件样式
- 动画定义

## 🔄 数据流

### 1. 项目列表加载

```
应用启动
  ↓
Home.tsx 挂载
  ↓
导入 projects 数据
  ↓
初始化筛选状态（分类、标签、搜索）
  ↓
计算过滤和排序后的项目列表
  ↓
渲染 ProjectCard 组件列表
```

### 2. 进度追踪流程

```
用户点击"标记完成"按钮
  ↓
ProjectCard 调用 toggleProjectCompletion(projectId)
  ↓
useProgressTracker Hook 更新状态
  ↓
保存到 localStorage
  ↓
触发重新渲染
  ↓
ProgressStats 显示更新的进度
  ↓
ProjectCard 显示"已完成"状态
```

### 3. 进度导出/导入

```
用户点击"导出"按钮
  ↓
exportProgress() 序列化进度数据为 JSON
  ↓
创建下载链接
  ↓
浏览器下载 JSON 文件

用户点击"导入"按钮
  ↓
选择 JSON 文件
  ↓
importProgress() 解析文件内容
  ↓
验证数据格式
  ↓
更新 localStorage
  ↓
刷新 UI 显示导入的进度
```

## 🎨 设计系统

### 色彩体系

采用**深蓝紫色主题**，使用 OKLCH 色彩空间：

| 用途 | 浅色模式 | 深色模式 | 说明 |
|------|---------|---------|------|
| 主色 | oklch(0.623 0.214 259.815) | oklch(0.623 0.214 259.815) | 深蓝色，用于按钮、链接 |
| 背景 | oklch(1 0 0) | oklch(0.141 0.005 285.823) | 白色 / 深灰色 |
| 前景 | oklch(0.235 0.015 65) | oklch(0.85 0.005 65) | 深灰色 / 浅灰色 |
| 强调 | oklch(0.967 0.001 286.375) | oklch(0.274 0.006 286.033) | 紫色，用于次要操作 |
| 成功 | #10b981 | #10b981 | 绿色，用于"已完成"状态 |
| 警告 | #f59e0b | #f59e0b | 琥珀色，用于代码可用性 |

### 排版系统

- **标题字体**：Inter（sans-serif），权重 700-900
- **正文字体**：Inter（sans-serif），权重 400-500
- **代码字体**：JetBrains Mono（monospace），权重 400

### 间距系统

基于 8px 的倍数：

- 超小：4px（`p-1`）
- 小：8px（`p-2`）
- 中：16px（`p-4`）
- 大：24px（`p-6`）
- 超大：32px（`p-8`）

### 圆角系统

- 小：4px（`rounded-sm`）
- 中：8px（`rounded-md`）
- 大：12px（`rounded-lg`）
- 超大：16px（`rounded-xl`）

## 🔌 状态管理

### localStorage 数据结构

```typescript
// 键：'langchain_progress'
{
  "completedProjects": ["project-1", "project-3"],
  "totalCompleted": 2,
  "lastUpdated": "2026-01-08T12:34:56.789Z"
}
```

### React 组件状态

| 组件 | 状态 | 用途 |
|------|------|------|
| Home | selectedCategory | 选中的项目分类 |
| Home | selectedTag | 选中的技术标签 |
| Home | searchQuery | 搜索关键词 |
| Home | sortBy | 排序方式 |
| ProjectCard | isOpen | 详情展开/收起 |
| ProjectCard | completed | 项目完成状态 |
| ProgressStats | isCollapsed | 进度面板收起/展开 |

## 🚀 性能优化策略

### 1. 代码分割

- 使用 Vite 的动态导入实现路由级代码分割
- 组件级代码分割（如果需要）

### 2. 图片优化

- 所有图片使用 WebP 格式
- 实现响应式图片加载（srcset）
- 使用 CDN 加速

### 3. CSS 优化

- Tailwind CSS 自动清除未使用的样式
- 生产版本 CSS 体积 < 50KB

### 4. JavaScript 优化

- 使用 Tree Shaking 移除未使用的代码
- 使用 Terser 压缩 JavaScript
- 生产版本 JS 体积 < 200KB

### 5. 缓存策略

- 生产版本使用内容哈希命名（如 `app.3fa9b2e4.js`）
- 设置长期缓存头（Cache-Control: max-age=31536000）
- HTML 文件不缓存（Cache-Control: no-cache）

## 🔒 安全性考虑

### XSS 防护

- React 自动转义所有输出
- 使用 `dangerouslySetInnerHTML` 时谨慎处理
- 验证外部链接来源

### CSRF 防护

- 本项目为纯前端应用，无后端 API，不需要 CSRF 令牌

### 数据安全

- 进度数据存储在本地 localStorage，不上传到服务器
- 用户可以导出和备份自己的进度数据

### 内容安全策略（CSP）

Nginx 配置中包含：

```
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';" always;
```

## 📱 响应式设计

### 断点定义

| 设备 | 宽度 | 布局调整 |
|------|------|---------|
| 移动 | < 640px | 进度面板隐藏，单列布局 |
| 平板 | 640px - 1024px | 进度面板可收起，两列布局 |
| 桌面 | > 1024px | 进度面板固定侧栏，三列布局 |

### 移动优先设计

- 基础样式针对移动设备
- 使用 `md:` 和 `lg:` 前缀添加桌面样式

## 🧪 测试策略

### 单元测试

- 使用 Vitest 框架
- 测试 Hook（useProgressTracker）
- 测试工具函数

### 集成测试

- 测试页面级组件
- 测试数据流和状态更新

### 端到端测试

- 测试完整的用户交互流程
- 验证进度追踪功能

## 📦 构建和部署

### 开发构建

```bash
pnpm dev
# 启动 Vite 开发服务器，支持 HMR（热模块替换）
```

### 生产构建

```bash
pnpm build
# 输出到 dist/ 目录
# - dist/public/ 包含静态资源
# - dist/index.js 包含服务器代码（如果需要）
```

### 部署流程

1. **本地构建**：`pnpm build`
2. **上传文件**：将 `dist/public/` 上传到服务器
3. **配置服务器**：配置 Nginx/Apache 处理 SPA 路由
4. **配置 HTTPS**：使用 Let's Encrypt 配置 SSL 证书
5. **启动服务**：启动 Web 服务器

详见 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)。

## 🔄 更新和维护

### 添加新项目

1. 编辑 `client/src/data/projects.ts`
2. 在 `projects` 数组中添加新项目
3. 更新 `categories` 和 `allTags`
4. 重启开发服务器

### 更新依赖

```bash
# 检查过时的依赖
pnpm outdated

# 更新依赖
pnpm update

# 更新主版本
pnpm update -i
```

### 性能监控

- 使用 Lighthouse 检查性能
- 使用 WebPageTest 进行深度分析
- 监控 Core Web Vitals

## 📚 参考资源

- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Vite 文档](https://vitejs.dev/)
- [shadcn/ui 文档](https://ui.shadcn.com/)

---

**最后更新**：2026 年 1 月 8 日

**维护者**：Manus AI

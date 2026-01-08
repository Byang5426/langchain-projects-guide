# 快速开始指南

5 分钟内快速启动 LangChain 项目推荐指南。

## ⚡ 30 秒快速启动

```bash
# 1. 克隆项目
git clone https://github.com/yourusername/langchain-projects-guide.git
cd langchain-projects-guide

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm dev

# 4. 打开浏览器
# http://localhost:3000
```

完成！您现在可以看到完整的项目推荐指南。

## 📖 基本使用

### 浏览项目

1. **查看所有项目**：首页展示 12 个精选项目
2. **按难度筛选**：点击"基础"、"进阶"、"高级"标签
3. **按技术筛选**：点击技术标签（RAG、Multi-Agent 等）
4. **搜索项目**：在搜索框输入关键词

### 追踪学习进度

1. **标记完成**：点击项目卡片右下角的"标记完成"按钮
2. **查看进度**：右侧进度面板显示完成百分比
3. **收起面板**：点击进度面板的收起按钮节省屏幕空间
4. **导出进度**：点击"导出"下载进度为 JSON 文件
5. **导入进度**：点击"导入"从 JSON 文件恢复进度

### 查看项目详情

1. **展开项目**：点击项目卡片展开详情
2. **查看代码示例**：点击代码示例链接访问 GitHub
3. **查看学习资源**：点击资源链接访问官方文档

## 🛠️ 开发命令

```bash
# 启动开发服务器（支持热重载）
pnpm dev

# 构建生产版本
pnpm build

# 本地预览生产版本
pnpm preview

# 类型检查
pnpm check

# 代码格式化
pnpm format

# 运行测试（如果有）
pnpm test
```

## 📁 项目结构

```
langchain-projects-guide/
├── client/src/
│   ├── pages/Home.tsx          # 主页面
│   ├── components/
│   │   ├── ProjectCard.tsx     # 项目卡片
│   │   └── ProgressStats.tsx   # 进度统计
│   ├── hooks/
│   │   └── useProgressTracker.ts # 进度追踪
│   ├── data/
│   │   └── projects.ts         # 项目数据
│   └── index.css               # 全局样式
├── README.md                   # 项目说明
├── ARCHITECTURE.md             # 架构设计
├── DEPLOYMENT_GUIDE.md         # 部署指南
└── package.json                # 项目配置
```

## 🎯 常见任务

### 添加新项目

编辑 `client/src/data/projects.ts`：

```typescript
const projects: Project[] = [
  // 现有项目...
  {
    id: 'new-project',
    title: '新项目名称',
    description: '项目描述',
    category: 'basic',
    difficulty: 2,
    duration: '1-2 周',
    tags: ['RAG', 'LangChain'],
    keyPoints: ['关键点 1', '关键点 2'],
    learningValue: ['价值 1', '价值 2'],
    codeAvailability: 70,
    codeAvailabilityLabel: '部分代码',
    codeExamples: [
      {
        name: '示例名称',
        description: '示例描述',
        url: 'https://github.com/...'
      }
    ],
    resources: [
      {
        name: '官方文档',
        url: 'https://...'
      }
    ]
  }
];
```

### 修改主题颜色

编辑 `client/src/index.css`：

```css
:root {
  --primary: oklch(0.623 0.214 259.815);  /* 主色 */
  --accent: oklch(0.967 0.001 286.375);   /* 强调色 */
  --background: oklch(1 0 0);              /* 背景色 */
  --foreground: oklch(0.235 0.015 65);    /* 前景色 */
}
```

### 部署到服务器

**Docker 部署（推荐）**：

```bash
# 1. 构建镜像
docker build -t langchain-guide .

# 2. 运行容器
docker run -d -p 3000:80 langchain-guide

# 3. 访问应用
# http://localhost:3000
```

**使用自动脚本部署**：

```bash
./deploy.sh <server-ip> <domain> <username>
```

详见 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)。

## 🐛 常见问题

### Q: 页面刷新后 404 错误

**A**: 这是 SPA 路由问题。确保您的 Web 服务器配置正确：

- **Nginx**：使用 `try_files $uri /index.html;`
- **Apache**：启用 `.htaccess` 配置

详见 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)。

### Q: 进度数据丢失

**A**: 进度数据存储在浏览器 localStorage 中。如果数据丢失，可能是：

1. 浏览器隐私模式（localStorage 不可用）
2. 浏览器缓存被清除
3. 浏览器存储空间已满

**解决方案**：
- 定期导出进度（点击"导出"按钮）
- 使用非隐私模式浏览
- 清理浏览器缓存

### Q: 样式显示不正确

**A**: 可能是 Tailwind CSS 未正确加载。尝试：

```bash
# 清除构建缓存
rm -rf dist/

# 重新构建
pnpm build

# 重启开发服务器
pnpm dev
```

### Q: 性能缓慢

**A**: 尝试以下优化：

1. 清除浏览器缓存
2. 禁用浏览器扩展
3. 使用 Chrome DevTools 检查性能
4. 检查网络连接

## 📚 更多资源

- [README.md](./README.md) - 完整项目说明
- [ARCHITECTURE.md](./ARCHITECTURE.md) - 架构设计文档
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - 详细部署指南
- [CONTRIBUTING.md](./CONTRIBUTING.md) - 贡献指南

## 🆘 获取帮助

- **GitHub Issues**：报告 bug 和功能请求
- **GitHub Discussions**：讨论和提问
- **查看文档**：大多数问题都有文档说明

---

**祝您使用愉快！** 🎉

# 贡献指南

感谢您对 LangChain 项目推荐指南的兴趣！本文档将指导您如何为项目做出贡献。

## 🤝 贡献方式

### 1. 报告 Bug

如果您发现了 bug，请通过 GitHub Issues 报告：

1. 点击 **Issues** 标签
2. 点击 **New Issue**
3. 选择 **Bug report** 模板
4. 填写以下信息：
   - **标题**：简明扼要地描述问题
   - **描述**：详细说明问题、复现步骤、预期行为和实际行为
   - **环境**：浏览器版本、操作系统等
   - **截图**：如果可能，附加截图或视频

### 2. 提出功能建议

如果您有新功能的想法，请提交 Feature Request：

1. 点击 **Issues** 标签
2. 点击 **New Issue**
3. 选择 **Feature request** 模板
4. 填写以下信息：
   - **标题**：简明扼要地描述功能
   - **动机**：为什么需要这个功能？
   - **建议的解决方案**：您的实现思路
   - **替代方案**：是否有其他解决方案？

### 3. 提交代码

#### 前置要求

- Node.js 18+
- pnpm 10+
- Git

#### 开发流程

1. **Fork 仓库**
   ```bash
   # 在 GitHub 上点击 Fork 按钮
   ```

2. **克隆您的 Fork**
   ```bash
   git clone https://github.com/yourusername/langchain-projects-guide.git
   cd langchain-projects-guide
   ```

3. **创建特性分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或修复 bug
   git checkout -b fix/bug-description
   ```

4. **安装依赖并启动开发服务器**
   ```bash
   pnpm install
   pnpm dev
   ```

5. **进行更改**
   - 编辑相关文件
   - 确保代码风格一致（运行 `pnpm format`）
   - 添加或更新测试（如果适用）

6. **运行检查**
   ```bash
   # 类型检查
   pnpm check
   
   # 代码格式化
   pnpm format
   
   # 运行测试（如果有）
   pnpm test
   ```

7. **提交更改**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   # 或
   git commit -m "fix: resolve issue with something"
   ```

   **提交信息格式**：
   - `feat:` 新功能
   - `fix:` bug 修复
   - `docs:` 文档更新
   - `style:` 代码风格（不影响功能）
   - `refactor:` 代码重构
   - `perf:` 性能优化
   - `test:` 测试相关
   - `chore:` 构建、依赖等

8. **推送到您的 Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

9. **创建 Pull Request**
   - 在 GitHub 上点击 **Compare & pull request**
   - 填写 PR 描述
   - 等待审核

#### PR 检查清单

在提交 PR 前，请确保：

- [ ] 代码遵循项目的代码风格
- [ ] 已运行 `pnpm format` 格式化代码
- [ ] 已运行 `pnpm check` 进行类型检查
- [ ] 添加或更新了相关测试
- [ ] 更新了文档（如果需要）
- [ ] PR 描述清晰明了
- [ ] 没有合并冲突

## 📝 代码风格指南

### TypeScript

- 使用 TypeScript 编写所有代码
- 为所有函数和组件添加类型注解
- 避免使用 `any` 类型

```typescript
// ✅ 好的做法
interface Props {
  title: string;
  count: number;
  onUpdate: (value: number) => void;
}

function Counter({ title, count, onUpdate }: Props) {
  return <div>{title}: {count}</div>;
}

// ❌ 避免
function Counter(props: any) {
  return <div>{props.title}: {props.count}</div>;
}
```

### React 组件

- 使用函数组件和 Hooks
- 为组件添加 JSDoc 注释
- 使用描述性的变量和函数名

```typescript
// ✅ 好的做法
/**
 * 项目卡片组件
 * @param project - 项目数据
 * @param index - 卡片索引（用于动画延迟）
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const { isProjectCompleted, toggleProjectCompletion } = useProgressTracker();
  
  return (
    <Card>
      {/* 组件内容 */}
    </Card>
  );
}
```

### CSS 和样式

- 优先使用 Tailwind CSS 工具类
- 避免编写自定义 CSS（除非必要）
- 使用 CSS 变量处理主题颜色

```typescript
// ✅ 好的做法
<div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
  {/* 内容 */}
</div>

// ❌ 避免
<div style={{ display: 'flex', gap: '16px', padding: '16px' }}>
  {/* 内容 */}
</div>
```

### 文件命名

- React 组件：PascalCase（如 `ProjectCard.tsx`）
- Hook：camelCase 前缀 `use`（如 `useProgressTracker.ts`）
- 工具函数：camelCase（如 `formatDate.ts`）
- 常量：UPPER_SNAKE_CASE（如 `STORAGE_KEY.ts`）

## 🎯 优先级贡献

以下贡献优先级最高：

### 高优先级

1. **Bug 修复**：修复已报告的 bug
2. **文档改进**：改进 README、部署指南等
3. **性能优化**：减少包体积、提升加载速度
4. **可访问性**：改进无障碍支持

### 中优先级

1. **新项目推荐**：添加更多 LangChain 项目
2. **功能增强**：改进现有功能
3. **测试覆盖**：添加单元测试和集成测试
4. **国际化**：添加多语言支持

### 低优先级

1. **样式调整**：微调 UI 外观
2. **代码重构**：重构不影响功能的代码
3. **依赖更新**：更新非关键依赖

## 📚 项目结构速览

```
langchain-projects-guide/
├── client/                    # 前端应用
│   ├── src/
│   │   ├── components/        # React 组件
│   │   ├── pages/             # 页面组件
│   │   ├── hooks/             # 自定义 Hook
│   │   ├── data/              # 数据和常量
│   │   ├── lib/               # 工具函数
│   │   └── index.css          # 全局样式
│   └── public/                # 静态资源
├── server/                    # 后端占位符
├── docs/                      # 文档
├── README.md                  # 项目说明
├── ARCHITECTURE.md            # 架构设计
├── CONTRIBUTING.md            # 本文件
└── package.json               # 项目配置
```

## 🔍 代码审查流程

当您提交 PR 时，维护者将：

1. **检查代码质量**：确保代码遵循项目标准
2. **运行自动检查**：TypeScript、Prettier、ESLint
3. **测试功能**：在本地测试您的更改
4. **提供反馈**：如果需要改进，会提出建议

## 💬 沟通

- **GitHub Issues**：讨论 bug 和功能请求
- **GitHub Discussions**：讨论想法和最佳实践
- **Pull Request 评论**：讨论代码更改

## 📋 常见贡献

### 添加新项目推荐

1. 编辑 `client/src/data/projects.ts`
2. 在 `projects` 数组中添加新项目
3. 确保包含所有必需字段
4. 更新 `categories` 和 `allTags`
5. 提交 PR

### 修复 bug

1. 创建 Issue 描述 bug
2. 创建特性分支
3. 修复问题
4. 添加测试（如果适用）
5. 提交 PR 并引用 Issue

### 改进文档

1. 编辑相关文档文件
2. 确保内容准确和清晰
3. 检查链接有效性
4. 提交 PR

## 🎓 学习资源

- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Git 学习指南](https://git-scm.com/book/zh/v2)

## 🏆 贡献者

感谢所有为本项目做出贡献的人！

## 📞 联系方式

- **GitHub Issues**：提交 bug 和功能请求
- **GitHub Discussions**：讨论和提问

---

**感谢您的贡献！** 🙏

**维护者**：Manus AI

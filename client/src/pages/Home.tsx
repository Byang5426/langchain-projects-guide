// Design Philosophy: Modern Technical Documentation with Progressive Information Design
// Layout: Hero banner with gradient background, filterable project grid, learning path section

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCard } from "@/components/ProjectCard";
import { ProgressStats } from "@/components/ProgressStats";
import { allTags, categories, projects } from "@/data/projects";
import { BookOpen, ExternalLink, Filter, Github, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'difficulty' | 'duration'>('difficulty');

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Tag filter
    if (selectedTag !== 'all') {
      filtered = filtered.filter(p => p.tags.includes(selectedTag));
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'difficulty') {
        return a.difficulty - b.difficulty;
      }
      return 0;
    });

    return filtered;
  }, [selectedCategory, selectedTag, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Progress Stats - Fixed Sidebar */}
      <div className="fixed right-4 top-24 w-72 max-w-[calc(100vw-2rem)] z-40 max-h-[calc(100vh-8rem)] overflow-y-auto hidden lg:block">
        <ProgressStats totalProjects={projects.length} />
      </div>
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white overflow-hidden"
        style={{
          backgroundImage: 'url(/images/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/90 to-blue-800/90" />
        <div className="container relative py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                LangChain 1.0 & LangGraph
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              LangChain 项目推荐指南
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              从基础到高级，12 个精选项目助你系统掌握 LangChain 1.0 和 LangGraph 技术
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-blue-50 font-semibold"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                开始探索
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                onClick={() => window.open('https://github.com/langchain-ai/langchain', '_blank')}
              >
                <Github className="w-5 h-5 mr-2" />
                LangChain GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b bg-card">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">精选项目</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-600">3</div>
              <div className="text-sm text-muted-foreground">难度层次</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-amber-600">1-12</div>
              <div className="text-sm text-muted-foreground">周学习时长</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-muted-foreground">实战导向</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container py-16">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">项目推荐</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              根据您的学习阶段和兴趣，选择适合的项目开始实践
            </p>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
                {categories.map(cat => (
                  <TabsTrigger key={cat.id} value={cat.id} className="gap-2">
                    {cat.label}
                    <Badge variant="secondary" className="ml-1">
                      {cat.id === 'all' ? filteredProjects.length : cat.count}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="搜索项目名称、描述或技术标签..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="技术标签" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部标签</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(v) => setSortBy(v as 'difficulty' | 'duration')}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="difficulty">按难度排序</SelectItem>
                  <SelectItem value="duration">按时长排序</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="text-6xl">🔍</div>
              <h3 className="text-xl font-semibold">未找到匹配的项目</h3>
              <p className="text-muted-foreground">
                尝试调整筛选条件或搜索关键词
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedTag('all');
                  setSearchQuery('');
                }}
              >
                重置筛选
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Learning Path Section */}
      <section 
        className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 text-white overflow-hidden"
        style={{
          backgroundImage: 'url(/images/learning-path-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90" />
        <div className="container relative py-20">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">学习路径建议</h2>
              <p className="text-xl text-purple-100">
                根据您的经验水平，选择适合的学习路径
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Beginner Path */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 space-y-4 border border-white/20">
                <div className="text-2xl font-bold">初学者路径</div>
                <div className="text-sm text-purple-100">1-2 个月</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">→</span>
                    <span>第 1 周：智能 SQL 查询代理</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">→</span>
                    <span>第 2 周：个人知识库问答</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">→</span>
                    <span>第 3 周：客户支持机器人</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">→</span>
                    <span>第 4-8 周：选择进阶项目</span>
                  </li>
                </ul>
              </div>

              {/* Intermediate Path */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 space-y-4 border border-white/20">
                <div className="text-2xl font-bold">进阶者路径</div>
                <div className="text-sm text-purple-100">2-3 个月</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">→</span>
                    <span>阶段一：完成 2-3 个进阶项目</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">→</span>
                    <span>阶段二：挑战 LC-StudyLab</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">→</span>
                    <span>阶段三：深入高级主题</span>
                  </li>
                </ul>
              </div>

              {/* Advanced Path */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 space-y-4 border border-white/20">
                <div className="text-2xl font-bold">高级开发者</div>
                <div className="text-sm text-purple-100">持续学习</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">→</span>
                    <span>系统可靠性与性能优化</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">→</span>
                    <span>安全性与权限控制</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">→</span>
                    <span>可扩展性与模块化设计</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">→</span>
                    <span>生产级应用部署</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="container py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">学习资源</h2>
            <p className="text-lg text-muted-foreground">
              精选的官方文档、开源项目和在线课程
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border rounded-xl p-6 space-y-4 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold">官方资源</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://python.langchain.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>LangChain 官方文档</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://academy.langchain.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>LangChain Academy</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://langchain-ai.github.io/langgraph/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>LangGraph 官方文档</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-card border rounded-xl p-6 space-y-4 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold">开源项目</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://github.com/hefeng6500/lc-studylab" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>LC-StudyLab 完整示例</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/datawhalechina/all-in-rag" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>All-in-RAG 技术指南</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/langchain-ai/langchain-academy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>LangChain Academy 项目</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-8">
        <div className="container text-center text-sm text-muted-foreground space-y-2">
          <p>基于 LangChain 1.0 和 LangGraph 技术构建</p>
          <p>© 2026 LangChain 项目推荐指南 · 助力 AI 应用开发学习</p>
        </div>
      </footer>
    </div>
  );
}

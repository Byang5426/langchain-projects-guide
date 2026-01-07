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
    <div className="min-h-screen bg-background">
      {/* Progress Stats - Desktop Sidebar - Optimized positioning */}
      <div className="fixed right-4 top-24 w-72 max-w-[calc(100vw-2rem)] z-40 max-h-[calc(100vh-8rem)] overflow-y-auto hidden lg:block">
        <ProgressStats totalProjects={projects.length} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-purple-500/10 py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-20" />
        </div>
        
        <div className="container relative z-10">
          <div className="text-center space-y-6">
            <Badge className="mx-auto gap-2 bg-primary/20 text-primary hover:bg-primary/30 border-primary/30">
              <Sparkles className="w-4 h-4" />
              <span>LangChain 1.0 & LangGraph</span>
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              LangChain 项目推荐指南
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              从基础到高级，12 个精选项目助你系统掌握 LangChain 1.0 和 LangGraph 技术
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="gap-2">
                <BookOpen className="w-5 h-5" />
                开始探索
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Github className="w-5 h-5" />
                LangChain GitHub
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-12 border-t border-border/50">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{projects.length}</p>
              <p className="text-sm text-muted-foreground mt-1">精选项目</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent">{categories.length - 1}</p>
              <p className="text-sm text-muted-foreground mt-1">难度层次</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-500">1-12</p>
              <p className="text-sm text-muted-foreground mt-1">周学习时长</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">100%</p>
              <p className="text-sm text-muted-foreground mt-1">实战导向</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12 md:py-16">
        <div className="container lg:pr-96">
          <div className="space-y-8">
            {/* Section Title */}
            <div>
              <h2 className="text-3xl font-bold mb-2">项目推荐</h2>
              <p className="text-muted-foreground">
                根据您的学习阶段和兴趣，选择适合的项目开始实践
              </p>
            </div>

            {/* Filters */}
            <div className="space-y-4">
              {/* Category Tabs */}
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-secondary/50">
                  {categories.map(cat => (
                    <TabsTrigger key={cat.id} value={cat.id} className="text-xs sm:text-sm">
                      <span>{cat.label}</span>
                      <Badge variant="secondary" className="ml-2 text-xs">{cat.count}</Badge>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索项目名称、描述或技术标签..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedTag} onValueChange={setSelectedTag}>
                  <SelectTrigger className="w-full sm:w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="全部标签" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部标签</SelectItem>
                    {allTags.map(tag => (
                      <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(val) => setSortBy(val as 'difficulty' | 'duration')}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="按难度排序" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="difficulty">按难度排序</SelectItem>
                    <SelectItem value="duration">按时长排序</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground mb-4">未找到匹配的项目</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTag('all');
                      setSelectedCategory('all');
                    }}
                  >
                    清除筛选
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Progress Stats */}
      <section className="py-8 lg:hidden">
        <div className="container">
          <ProgressStats totalProjects={projects.length} />
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">学习路径建议</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Beginner Path */}
            <div className="space-y-4 p-6 rounded-lg bg-background border border-border/50 hover:border-primary/50 transition-colors">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400">初学者</Badge>
              </h3>
              <p className="text-sm text-muted-foreground">1-2 个月</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>第 1 周：智能 SQL 查询代理</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>第 2 周：个人知识库问答</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>第 3 周：客户支持机器人</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">→</span>
                  <span>第 4-8 周：选择进阶项目</span>
                </li>
              </ul>
            </div>

            {/* Intermediate Path */}
            <div className="space-y-4 p-6 rounded-lg bg-background border border-border/50 hover:border-accent/50 transition-colors">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Badge className="bg-purple-500/20 text-purple-600 dark:text-purple-400">进阶者</Badge>
              </h3>
              <p className="text-sm text-muted-foreground">2-3 个月</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">→</span>
                  <span>阶段一：完成 2-3 个进阶项目</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">→</span>
                  <span>阶段二：挑战 LC-StudyLab</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">→</span>
                  <span>阶段三：深入高级主题</span>
                </li>
              </ul>
            </div>

            {/* Advanced Path */}
            <div className="space-y-4 p-6 rounded-lg bg-background border border-border/50 hover:border-green-500/50 transition-colors">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-600 dark:text-green-400">高级开发者</Badge>
              </h3>
              <p className="text-sm text-muted-foreground">持续学习</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">→</span>
                  <span>系统可靠性与性能优化</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">→</span>
                  <span>安全性与权限控制</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">→</span>
                  <span>可扩展性与模块化设计</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 mt-1">→</span>
                  <span>生产级应用部署</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">学习资源</h2>
          <p className="text-muted-foreground mb-8">精选的官方文档、开源项目和在线课程</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'LangChain 官方文档', url: 'https://python.langchain.com/' },
              { name: 'LangChain Academy', url: 'https://academy.langchain.com/' },
              { name: 'LangGraph 官方文档', url: 'https://langchain-ai.github.io/langgraph/' },
              { name: 'LC-StudyLab 完整示例', url: 'https://github.com/hefeng6500/lc-studylab' },
              { name: 'All-in-RAG 技术指南', url: 'https://github.com/datawhalechina/all-in-rag' },
              { name: 'LangChain Academy 项目', url: 'https://academy.langchain.com/courses' },
            ].map((resource, i) => (
              <a
                key={i}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <ExternalLink className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                <span className="font-medium group-hover:text-primary transition-colors">{resource.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 bg-secondary/30">
        <div className="container text-center text-sm text-muted-foreground">
          <p>LangChain 项目推荐指南 © 2024 | 助力您系统掌握 LangChain 1.0 和 LangGraph 技术</p>
        </div>
      </footer>
    </div>
  );
}

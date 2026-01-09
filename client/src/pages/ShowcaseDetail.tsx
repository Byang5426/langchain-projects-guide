import { useState } from 'react';
import { useRoute } from 'wouter';
import { Heart, MessageCircle, Share2, ExternalLink, Github, Calendar, Eye, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Streamdown } from 'streamdown';
import { getShowcaseById } from '@/data/showcases';
import CommentSection from '@/components/CommentSection';

/**
 * 案例详情页面
 * 展示单个用户案例的详细信息、评论和点赞
 */
export default function ShowcaseDetail() {
  const [match, params] = useRoute('/showcase/:id');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  if (!match) return null;

  const showcase = getShowcaseById(params.id);

  if (!showcase) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">案例未找到</h1>
          <Button onClick={() => window.history.back()}>返回</Button>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const difficultyText = {
    1: '入门',
    2: '初级',
    3: '中级',
    4: '高级',
    5: '专家',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 返回按钮 */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="container py-4">
          <Button variant="ghost" onClick={() => window.history.back()}>
            ← 返回
          </Button>
        </div>
      </div>

      {/* 主内容 */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧主内容 */}
          <div className="lg:col-span-2">
            {/* 标题和基本信息 */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">{showcase.title}</h1>
              
              {/* 作者信息 */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={showcase.authorAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                  alt={showcase.author}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-foreground">{showcase.author}</p>
                  <p className="text-sm text-muted-foreground">{showcase.date}</p>
                </div>
              </div>

              {/* 统计信息 */}
              <div className="flex flex-wrap gap-6 py-4 border-y border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Eye className="w-4 h-4" />
                  <span>{showcase.views} 次浏览</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Heart className="w-4 h-4" />
                  <span>{showcase.likes + likeCount} 次点赞</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageCircle className="w-4 h-4" />
                  <span>{showcase.comments.length} 条评论</span>
                </div>
              </div>
            </div>

            {/* 技术标签 */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">技术栈</h2>
              <div className="flex flex-wrap gap-2">
                {showcase.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 项目详情 */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">项目详情</h2>
              <div className="prose prose-invert max-w-none">
                <Streamdown>{showcase.fullContent || showcase.description}</Streamdown>
              </div>
            </div>

            {/* 评论区 */}
            <div className="mt-12">
              <h2 className="text-lg font-semibold text-foreground mb-6">评论</h2>
              <CommentSection comments={showcase.comments} />
            </div>
          </div>

          {/* 右侧侧栏 */}
          <div className="lg:col-span-1">
            {/* 操作按钮 */}
            <div className="sticky top-20 space-y-4">
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">操作</h3>
                
                <div className="space-y-3">
                  <Button
                    onClick={handleLike}
                    variant={liked ? 'default' : 'outline'}
                    className="w-full"
                  >
                    <Heart className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                    {liked ? '已点赞' : '点赞'} ({showcase.likes + likeCount})
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    分享
                  </Button>
                </div>
              </div>

              {/* 项目信息卡片 */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">项目信息</h3>
                
                <div className="space-y-4 text-sm">
                  {showcase.difficulty && (
                    <div>
                      <p className="text-muted-foreground mb-1">难度等级</p>
                      <Badge variant="secondary">
                        {difficultyText[showcase.difficulty as keyof typeof difficultyText] || '中级'}
                      </Badge>
                    </div>
                  )}

                  {showcase.learningTime && (
                    <div>
                      <p className="text-muted-foreground mb-1">学习时长</p>
                      <p className="text-foreground">{showcase.learningTime}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-muted-foreground mb-1">项目类型</p>
                    <Badge variant="secondary">
                      {showcase.projectType === 'basic' ? '基础项目' : showcase.projectType === 'advanced' ? '进阶项目' : '高级项目'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* 外部链接 */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">相关链接</h3>
                
                <div className="space-y-2">
                  {showcase.demoUrl && (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <a href={showcase.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        查看演示
                      </a>
                    </Button>
                  )}

                  {showcase.githubUrl && (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <a href={showcase.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub 仓库
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

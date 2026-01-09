/**
 * 用户案例卡片组件
 * 展示单个用户案例的信息，支持链接到详情页面
 */

import { Heart, Eye, Github, ExternalLink, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';
import { Showcase } from '@/data/showcases';

interface ShowcaseCardProps {
  showcase: Showcase;
}

export default function ShowcaseCard({ showcase }: ShowcaseCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(showcase.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    } else {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    }
  };

  const getDifficultyColor = (type: string) => {
    switch (type) {
      case 'basic':
        return 'bg-blue-500/10 text-blue-500';
      case 'advanced':
        return 'bg-purple-500/10 text-purple-500';
      case 'expert':
        return 'bg-amber-500/10 text-amber-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getDifficultyLabel = (type: string) => {
    switch (type) {
      case 'basic':
        return '基础';
      case 'advanced':
        return '进阶';
      case 'expert':
        return '高级';
      default:
        return '未知';
    }
  };

  return (
    <Link href={`/showcase/${showcase.id}`}>
      <div className="group relative bg-card rounded-lg border border-border overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
        {/* 背景图片或颜色 */}
        <div className="relative h-40 bg-gradient-to-br from-primary/20 to-purple-500/20 overflow-hidden">
          {showcase.imageUrl ? (
            <img
              src={showcase.imageUrl}
              alt={showcase.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 opacity-80" />
          )}
          
          {/* 精选标签 */}
          {showcase.featured && (
            <div className="absolute top-3 right-3 bg-amber-500 text-amber-950 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <span>⭐</span> 精选
            </div>
          )}

          {/* 难度标签 */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(showcase.projectType)}`}>
            {getDifficultyLabel(showcase.projectType)}
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-4">
          {/* 标题 */}
          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {showcase.title}
          </h3>

          {/* 描述 */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {showcase.description}
          </p>

          {/* 技术标签 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {showcase.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="inline-block bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {showcase.technologies.length > 3 && (
              <span className="inline-block bg-muted text-muted-foreground px-2 py-1 rounded text-xs font-medium">
                +{showcase.technologies.length - 3}
              </span>
            )}
          </div>

          {/* 作者信息和统计 */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              {showcase.authorAvatar ? (
                <img
                  src={showcase.authorAvatar}
                  alt={showcase.author}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-primary-foreground text-xs font-bold">
                  {showcase.author.charAt(0)}
                </div>
              )}
              <div className="text-sm">
                <p className="font-semibold text-foreground">{showcase.author}</p>
                <p className="text-muted-foreground text-xs">{new Date(showcase.date).toLocaleDateString('zh-CN')}</p>
              </div>
            </div>
          </div>

          {/* 操作按钮和统计 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-muted-foreground">
              {/* 点赞 */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 transition-colors ${
                  isLiked ? 'text-red-500' : 'hover:text-red-500'
                }`}
              >
                <Heart
                  size={18}
                  className={isLiked ? 'fill-current' : ''}
                />
                <span className="text-sm font-medium">{likeCount}</span>
              </button>

              {/* 浏览量 */}
              <div className="flex items-center gap-1">
                <Eye size={18} />
                <span className="text-sm font-medium">{showcase.views}</span>
              </div>

              {/* 评论数 */}
              <div className="flex items-center gap-1">
                <MessageCircle size={18} />
                <span className="text-sm font-medium">{showcase.comments.length}</span>
              </div>
            </div>

            {/* 链接按钮 */}
            <div className="flex items-center gap-2">
              {showcase.demoUrl && (
                <a
                  href={showcase.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  title="查看演示"
                >
                  <ExternalLink size={18} />
                </a>
              )}
              {showcase.githubUrl && (
                <a
                  href={showcase.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  title="查看代码"
                >
                  <Github size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

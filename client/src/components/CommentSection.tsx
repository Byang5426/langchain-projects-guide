import { useState } from 'react';
import { Heart, Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Comment } from '@/data/showcases';

interface CommentSectionProps {
  comments: Comment[];
}

/**
 * 评论区组件
 * 展示评论列表和评论输入框
 */
export default function CommentSection({ comments }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const handleLike = (commentId: string) => {
    const newLiked = new Set(likedComments);
    if (newLiked.has(commentId)) {
      newLiked.delete(commentId);
    } else {
      newLiked.add(commentId);
    }
    setLikedComments(newLiked);
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    // 这里应该调用 API 提交评论
    console.log('提交评论:', newComment);
    setNewComment('');
    setReplyingTo(null);
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div
      key={comment.id}
      className={`${isReply ? 'ml-8' : ''} pb-6 border-b border-border last:border-b-0`}
    >
      <div className="flex gap-4">
        {/* 头像 */}
        <img
          src={comment.authorAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
          alt={comment.author}
          className="w-10 h-10 rounded-full flex-shrink-0"
        />

        {/* 评论内容 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <p className="font-semibold text-foreground text-sm">{comment.author}</p>
            <p className="text-xs text-muted-foreground">{comment.date}</p>
          </div>

          <p className="text-foreground text-sm mb-3">{comment.content}</p>

          {/* 操作按钮 */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLike(comment.id)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  likedComments.has(comment.id) ? 'fill-current text-red-500' : ''
                }`}
              />
              <span>{comment.likes + (likedComments.has(comment.id) ? 1 : 0)}</span>
            </button>

            {!isReply && (
              <button
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Reply className="w-4 h-4" />
                <span>回复</span>
              </button>
            )}
          </div>

          {/* 回复输入框 */}
          {replyingTo === comment.id && (
            <div className="mt-4 space-y-2">
              <Textarea
                placeholder={`回复 ${comment.author}...`}
                className="min-h-20 resize-none"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSubmitComment}>
                  发送
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setReplyingTo(null)}
                >
                  取消
                </Button>
              </div>
            </div>
          )}

          {/* 递归渲染回复 */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => renderComment(reply, true))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 评论输入框 */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4">发表评论</h3>
        
        <div className="space-y-3">
          <Textarea
            placeholder="分享您的想法..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-24 resize-none"
          />
          
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setNewComment('')}
              disabled={!newComment.trim()}
            >
              清空
            </Button>
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
            >
              发表评论
            </Button>
          </div>
        </div>
      </div>

      {/* 评论列表 */}
      {comments.length > 0 ? (
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-semibold text-foreground mb-6">
            {comments.length} 条评论
          </h3>
          
          <div className="space-y-4">
            {comments.map((comment) => renderComment(comment))}
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border p-6 text-center">
          <p className="text-muted-foreground">暂无评论，成为第一个评论者吧！</p>
        </div>
      )}
    </div>
  );
}

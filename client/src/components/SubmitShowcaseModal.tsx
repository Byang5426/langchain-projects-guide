/**
 * 案例提交模态框组件
 * 允许用户提交他们的精彩案例
 */

import { useState } from 'react';
import { X, Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface SubmitShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitShowcaseModal({ isOpen, onClose }: SubmitShowcaseModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    email: '',
    projectType: 'basic',
    technologies: '',
    demoUrl: '',
    githubUrl: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      projectType: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 验证必填字段
    if (!formData.title.trim()) {
      toast.error('请输入案例标题');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('请输入案例描述');
      return;
    }
    if (!formData.author.trim()) {
      toast.error('请输入您的名字');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('请输入您的邮箱');
      return;
    }
    if (!formData.technologies.trim()) {
      toast.error('请输入使用的技术');
      return;
    }

    setIsSubmitting(true);

    try {
      // 模拟提交（实际应该发送到后端）
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 这里应该调用实际的 API 端点
      // const response = await fetch('/api/showcases', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      toast.success('案例提交成功！感谢您的分享。我们会尽快审核您的案例。');
      
      // 重置表单
      setFormData({
        title: '',
        description: '',
        author: '',
        email: '',
        projectType: 'basic',
        technologies: '',
        demoUrl: '',
        githubUrl: '',
      });

      onClose();
    } catch (error) {
      toast.error('提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-white">
          <h2 className="text-2xl font-bold text-gray-900">提交您的精彩案例</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Info Box */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 flex gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">提交指南</p>
              <p>请确保您的案例是真实的、有趣的，并能为社区提供价值。我们会在 1-3 个工作日内审核您的提交。</p>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              案例标题 <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="例如：智能 SQL 查询代理 - 电商数据分析平台"
              className="w-full"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              案例描述 <span className="text-red-500">*</span>
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="详细描述您的案例，包括项目背景、核心功能、技术亮点等（至少 100 字）"
              rows={5}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length} / 最少 100 字
            </p>
          </div>

          {/* Author Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                您的名字 <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="请输入您的名字"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                邮箱地址 <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="您的邮箱"
                className="w-full"
              />
            </div>
          </div>

          {/* Project Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              项目难度 <span className="text-red-500">*</span>
            </label>
            <Select value={formData.projectType} onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">基础项目（1-2 周）</SelectItem>
                <SelectItem value="advanced">进阶项目（3-4 周）</SelectItem>
                <SelectItem value="expert">高级项目（6+ 周）</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              使用的技术 <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="例如：LangChain, RAG, Vector DB, PostgreSQL（用逗号分隔）"
              className="w-full"
            />
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                演示链接
              </label>
              <Input
                type="url"
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                GitHub 链接
              </label>
              <Input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
                className="w-full"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              取消
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? '提交中...' : '提交案例'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * 用户案例展示区域组件
 * 展示用户通过学习生成的精彩案例
 */

import { useState } from 'react';
import { Sparkles, TrendingUp, Clock, Filter } from 'lucide-react';
import ShowcaseCard from './ShowcaseCard';
import SubmitShowcaseModal from './SubmitShowcaseModal';
import { Button } from '@/components/ui/button';
import {
  showcases,
  getFeaturedShowcases,
  getShowcasesByType,
  getShowcasesByPopularity,
  getShowcasesByDate,
} from '@/data/showcases';

type FilterType = 'all' | 'featured' | 'basic' | 'advanced' | 'expert' | 'popular' | 'latest';

export default function ShowcaseSection() {
  const [filterType, setFilterType] = useState<FilterType>('featured');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getFilteredShowcases = () => {
    switch (filterType) {
      case 'featured':
        return getFeaturedShowcases();
      case 'basic':
        return getShowcasesByType('basic');
      case 'advanced':
        return getShowcasesByType('advanced');
      case 'expert':
        return getShowcasesByType('expert');
      case 'popular':
        return getShowcasesByPopularity();
      case 'latest':
        return getShowcasesByDate();
      case 'all':
      default:
        return showcases;
    }
  };

  const filteredShowcases = getFilteredShowcases();

  const filterButtons = [
    { id: 'featured', label: '精选案例', icon: Sparkles },
    { id: 'all', label: '全部案例', icon: null },
    { id: 'basic', label: '基础项目', icon: null },
    { id: 'advanced', label: '进阶项目', icon: null },
    { id: 'expert', label: '高级项目', icon: null },
    { id: 'popular', label: '热门案例', icon: TrendingUp },
    { id: 'latest', label: '最新案例', icon: Clock },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        {/* 标题区域 */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-amber-500" size={28} />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              用户精彩案例
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl">
            看看其他学习者如何通过 LangChain 和 LangGraph 构建了令人印象深刻的项目。
            这些案例展示了从基础到高级的各种应用场景。
          </p>
        </div>

        {/* 筛选按钮 */}
        <div className="mb-8 flex flex-wrap gap-3">
          {filterButtons.map((btn) => {
            const Icon = btn.icon;
            return (
              <button
                key={btn.id}
                onClick={() => setFilterType(btn.id as FilterType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  filterType === btn.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {Icon && <Icon size={18} />}
                {btn.label}
              </button>
            );
          })}
        </div>

        {/* 案例统计 */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-blue-600">{filteredShowcases.length}</span> 个案例 • 
            <span className="font-semibold text-blue-600 ml-2">
              {filteredShowcases.reduce((sum, s) => sum + s.likes, 0)}
            </span> 个赞 • 
            <span className="font-semibold text-blue-600 ml-2">
              {filteredShowcases.reduce((sum, s) => sum + s.views, 0).toLocaleString()}
            </span> 次浏览
          </p>
        </div>

        {/* 案例网格 */}
        {filteredShowcases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShowcases.map((showcase) => (
              <ShowcaseCard key={showcase.id} showcase={showcase} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Filter size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 text-lg">
              暂无该分类的案例，请选择其他筛选条件
            </p>
          </div>
        )}

        {/* 底部提示 */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            💡 想分享您的案例？
          </h3>
          <p className="text-gray-700 mb-4">
            如果您通过学习这些项目创建了精彩的应用，我们很想看到！
            提交您的案例，与社区分享您的成就。
          </p>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            提交案例
          </Button>
        </div>
      </div>

      {/* Submit Modal */}
      <SubmitShowcaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

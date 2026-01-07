// Design Philosophy: Modern Technical Documentation with Progressive Information Design
// Shows learning progress overview with completion stats - Optimized for better layout and readability

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgressTracker } from "@/hooks/useProgressTracker";
import { AlertCircle, Download, RotateCcw, Upload } from "lucide-react";
import { useRef } from "react";

interface ProgressStatsProps {
  totalProjects: number;
}

export function ProgressStats({ totalProjects }: ProgressStatsProps) {
  const { progress, getCompletionPercentage, resetProgress, exportProgress, importProgress } = useProgressTracker();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const completionPercentage = getCompletionPercentage(totalProjects);
  const completedCount = progress?.totalCompleted ?? 0;

  const handleExport = () => {
    const json = exportProgress();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json));
    element.setAttribute('download', `langchain-progress-${new Date().toISOString().split('T')[0]}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (importProgress(content)) {
          alert('进度导入成功！');
        } else {
          alert('进度导入失败，请检查文件格式');
        }
      };
      reader.readAsText(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    if (window.confirm('确定要重置所有学习进度吗？此操作无法撤销。')) {
      resetProgress();
    }
  };

  return (
    <Card className="border-border/50 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          📊 学习进度
        </CardTitle>
        <CardDescription className="text-xs">
          追踪您的项目完成情况
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-5">
        {/* Completion Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground leading-tight">完成进度</p>
              <p className="text-xs text-muted-foreground mt-1 leading-tight">
                已完成 {completedCount}/{totalProjects} 个项目
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-2xl font-bold text-primary leading-tight">{completionPercentage}%</p>
            </div>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        {/* Progress Tips - Optimized for better readability */}
        {completionPercentage === 0 && (
          <div className="flex gap-2 p-3 bg-secondary/50 rounded-lg">
            <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              点击项目卡片右下角的"标记完成"按钮来追踪学习进度
            </p>
          </div>
        )}

        {completionPercentage > 0 && completionPercentage < 100 && (
          <div className="flex gap-2 p-3 bg-accent/10 rounded-lg">
            <AlertCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-xs text-foreground leading-relaxed">
              继续加油！还有 {totalProjects - completedCount} 个项目等待挑战
            </p>
          </div>
        )}

        {completionPercentage === 100 && (
          <div className="flex gap-2 p-3 bg-green-100/50 dark:bg-green-900/20 rounded-lg">
            <AlertCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-green-700 dark:text-green-300 font-semibold leading-relaxed">
              🎉 恭喜！您已完成所有项目！
            </p>
          </div>
        )}

        {/* Action Buttons - Improved Layout */}
        <div className="space-y-2 pt-2">
          {/* First Row - Export and Import */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="gap-2 h-9 text-xs sm:text-sm"
              title="导出学习进度为 JSON 文件"
            >
              <Download className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">导出</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="gap-2 h-9 text-xs sm:text-sm"
              title="从 JSON 文件导入学习进度"
            >
              <Upload className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">导入</span>
            </Button>
          </div>
          
          {/* Second Row - Reset */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="w-full gap-2 h-9 text-xs sm:text-sm text-destructive hover:text-destructive"
            title="重置所有学习进度"
          >
            <RotateCcw className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">重置进度</span>
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
            aria-label="导入进度文件"
          />
        </div>

        {/* Last Updated */}
        {progress?.lastUpdated && (
          <p className="text-xs text-muted-foreground text-center pt-2 border-t border-border/50 leading-tight">
            最后更新：{new Date(progress.lastUpdated).toLocaleString('zh-CN')}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

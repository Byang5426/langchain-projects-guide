// Design Philosophy: Modern Technical Documentation with Progressive Information Design
// Collapsible progress tracker - can be minimized to save space

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgressTracker } from "@/hooks/useProgressTracker";
import { ChevronDown, ChevronUp, Download, RotateCcw, Upload } from "lucide-react";
import { useRef, useState } from "react";

interface ProgressStatsProps {
  totalProjects: number;
}

export function ProgressStats({ totalProjects }: ProgressStatsProps) {
  const { progress, getCompletionPercentage, resetProgress, exportProgress, importProgress } = useProgressTracker();
  const [isCollapsed, setIsCollapsed] = useState(false);
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
      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-lg">📊 学习进度</CardTitle>
          <CardDescription className="text-xs">
            追踪您的项目完成情况
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
          title={isCollapsed ? "展开" : "收起"}
        >
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronUp className="w-4 h-4" />
          )}
        </Button>
      </CardHeader>
      
      {!isCollapsed && (
        <CardContent className="space-y-4">
          {/* Completion Stats */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">完成进度</span>
              <span className="text-sm font-bold text-primary">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              已完成 {completedCount}/{totalProjects} 个项目
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="flex-1 gap-2 h-8 text-xs"
              title="导出学习进度为 JSON 文件"
            >
              <Download className="w-3 h-3" />
              导出
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 gap-2 h-8 text-xs"
              title="从 JSON 文件导入学习进度"
            >
              <Upload className="w-3 h-3" />
              导入
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="flex-1 gap-2 h-8 text-xs text-destructive hover:text-destructive"
              title="重置所有学习进度"
            >
              <RotateCcw className="w-3 h-3" />
              重置
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
        </CardContent>
      )}
    </Card>
  );
}

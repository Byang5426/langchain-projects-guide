// Design Philosophy: Modern Technical Documentation with Progressive Information Design
// Toggle project completion status with visual feedback

import { Button } from "@/components/ui/button";
import { useProgressTracker } from "@/hooks/useProgressTracker";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

interface ProjectCompletionButtonProps {
  projectId: string;
}

export function ProjectCompletionButton({ projectId }: ProjectCompletionButtonProps) {
  const { isProjectCompleted, toggleProjectCompletion, isLoading } = useProgressTracker();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsCompleted(isProjectCompleted(projectId));
  }, [projectId, isProjectCompleted]);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleProjectCompletion(projectId);
    setIsCompleted(!isCompleted);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" disabled>
        加载中...
      </Button>
    );
  }

  return (
    <Button
      variant={isCompleted ? "default" : "outline"}
      size="sm"
      onClick={handleToggle}
      className={`gap-2 transition-all duration-300 ${
        isCompleted 
          ? 'bg-green-600 hover:bg-green-700 text-white' 
          : ''
      } ${isAnimating ? 'scale-95' : 'scale-100'}`}
      title={isCompleted ? '点击标记为未完成' : '点击标记为已完成'}
    >
      <Check 
        className={`w-4 h-4 transition-all ${
          isCompleted ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <span>
        {isCompleted ? '已完成' : '标记完成'}
      </span>
    </Button>
  );
}

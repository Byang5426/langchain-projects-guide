// Design Philosophy: Modern Technical Documentation with Progressive Information Design
// Shows code availability at a glance with visual indicators

import { Badge } from "@/components/ui/badge";
import { codeAvailabilityColors, codeAvailabilityLabels } from "@/data/projects";
import { Code2, FileText, Zap } from "lucide-react";

interface CodeAvailabilityBadgeProps {
  availability: number;
  label: 'complete' | 'partial' | 'tutorial' | 'minimal';
}

export function CodeAvailabilityBadge({ availability, label }: CodeAvailabilityBadgeProps) {
  const getIcon = () => {
    switch (label) {
      case 'complete':
        return <Zap className="w-3 h-3" />;
      case 'partial':
        return <Code2 className="w-3 h-3" />;
      case 'tutorial':
        return <FileText className="w-3 h-3" />;
      case 'minimal':
        return <FileText className="w-3 h-3" />;
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-muted-foreground">代码可用性</span>
          <span className="text-xs font-bold text-foreground">{availability}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
            style={{ width: `${availability}%` }}
          />
        </div>
      </div>
      <Badge className={`${codeAvailabilityColors[label]} gap-1 whitespace-nowrap`}>
        {getIcon()}
        <span>{codeAvailabilityLabels[label]}</span>
      </Badge>
    </div>
  );
}

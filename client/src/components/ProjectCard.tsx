// Design Philosophy: Modern Technical Documentation with Progressive Information Design
// Interaction: Hover lift effect, expandable details, smooth transitions

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CodeAvailabilityBadge } from "@/components/CodeAvailabilityBadge";
import type { Project } from "@/data/projects";
import { ChevronDown, Clock, ExternalLink, Star, Check } from "lucide-react";
import { useProgressTracker } from "@/hooks/useProgressTracker";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isProjectCompleted, toggleProjectCompletion } = useProgressTracker();
  const completed = isProjectCompleted(project.id);
  
  const categoryColors = {
    basic: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    intermediate: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    advanced: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
  };
  
  const categoryLabels = {
    basic: '基础',
    intermediate: '进阶',
    advanced: '高级'
  };

  return (
    <Card 
      className="group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-slide-in-up border-border/50"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={categoryColors[project.category]}>
                {categoryLabels[project.category]}
              </Badge>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < project.difficulty
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
          </div>
          {project.icon && (
            <img 
              src={project.icon} 
              alt={project.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{project.duration}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="font-mono text-xs bg-secondary/50"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Code Availability Indicator */}
        <div className="pt-2 border-t border-border/50">
          <CodeAvailabilityBadge 
            availability={project.codeAvailability}
            label={project.codeAvailabilityLabel}
          />
        </div>
        
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between text-sm"
            >
              <span>{isOpen ? '收起详情' : '展开详情'}</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4 pt-4">
            <div>
              <h4 className="font-semibold text-sm mb-2 text-foreground">核心技术点</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {project.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm mb-2 text-foreground">学习价值</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {project.learningValue.map((value, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Examples */}
            {project.codeExamples.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm mb-2 text-foreground">💻 代码示例</h4>
                <div className="space-y-2">
                  {project.codeExamples.map((example, i) => (
                    <a
                      key={i}
                      href={example.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors group/link"
                    >
                      <ExternalLink className="w-4 h-4 text-primary mt-0.5 flex-shrink-0 group-hover/link:translate-x-0.5 transition-transform" />
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-xs font-semibold text-primary group-hover/link:underline">
                          {example.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {example.description}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h4 className="font-semibold text-sm mb-2 text-foreground">📚 学习资源</h4>
              <div className="space-y-2">
                {project.resources.map((resource, i) => (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>{resource.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      
      <CardFooter className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '收起详情' : '查看详情'}
        </Button>
        <Button
          variant={completed ? "default" : "outline"}
          size="sm"
          className={`gap-2 ${
            completed
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'hover:bg-primary/10'
          }`}
          onClick={() => toggleProjectCompletion(project.id)}
          title={completed ? "点击标记为未完成" : "点击标记为已完成"}
        >
          {completed ? (
            <>
              <Check className="w-4 h-4" />
              已完成
            </>
          ) : (
            '标记完成'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

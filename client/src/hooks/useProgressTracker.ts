// Design Philosophy: Modern Technical Documentation with Progressive Information Design
// Progress tracking with localStorage persistence

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'langchain-projects-progress';

export interface ProjectProgress {
  projectId: string;
  completed: boolean;
  completedAt?: number;
  notes?: string;
}

export interface ProgressData {
  projects: Record<string, ProjectProgress>;
  lastUpdated: number;
  totalCompleted: number;
}

export function useProgressTracker() {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      } else {
        setProgress({
          projects: {},
          lastUpdated: Date.now(),
          totalCompleted: 0,
        });
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
      setProgress({
        projects: {},
        lastUpdated: Date.now(),
        totalCompleted: 0,
      });
    }
    setIsLoading(false);
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: ProgressData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  // Toggle project completion status
  const toggleProjectCompletion = (projectId: string) => {
    if (!progress) return;

    const updatedProgress = { ...progress };
    const projectProgress = updatedProgress.projects[projectId];

    if (projectProgress?.completed) {
      // Mark as incomplete
      updatedProgress.projects[projectId] = {
        ...projectProgress,
        completed: false,
        completedAt: undefined,
      };
      updatedProgress.totalCompleted = Math.max(0, updatedProgress.totalCompleted - 1);
    } else {
      // Mark as complete
      updatedProgress.projects[projectId] = {
        projectId,
        completed: true,
        completedAt: Date.now(),
        notes: projectProgress?.notes,
      };
      updatedProgress.totalCompleted += 1;
    }

    updatedProgress.lastUpdated = Date.now();
    saveProgress(updatedProgress);
  };

  // Check if a project is completed
  const isProjectCompleted = (projectId: string): boolean => {
    return progress?.projects[projectId]?.completed ?? false;
  };

  // Get completion percentage
  const getCompletionPercentage = (totalProjects: number): number => {
    if (!progress || totalProjects === 0) return 0;
    return Math.round((progress.totalCompleted / totalProjects) * 100);
  };

  // Reset all progress
  const resetProgress = () => {
    const newProgress: ProgressData = {
      projects: {},
      lastUpdated: Date.now(),
      totalCompleted: 0,
    };
    saveProgress(newProgress);
  };

  // Export progress as JSON
  const exportProgress = (): string => {
    if (!progress) return '';
    return JSON.stringify(progress, null, 2);
  };

  // Import progress from JSON
  const importProgress = (jsonString: string) => {
    try {
      const imported = JSON.parse(jsonString) as ProgressData;
      saveProgress(imported);
      return true;
    } catch (error) {
      console.error('Failed to import progress:', error);
      return false;
    }
  };

  return {
    progress,
    isLoading,
    toggleProjectCompletion,
    isProjectCompleted,
    getCompletionPercentage,
    resetProgress,
    exportProgress,
    importProgress,
  };
}

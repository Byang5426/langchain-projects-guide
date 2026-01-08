// Design Philosophy: Modern Technical Documentation with Progressive Information Design
// Hook for managing project completion progress with localStorage persistence

import { useCallback, useEffect, useState } from 'react';

interface ProgressData {
  completedProjects: string[];
  totalCompleted: number;
  lastUpdated: string;
}

const STORAGE_KEY = 'langchain_progress';

export function useProgressTracker() {
  const [progress, setProgress] = useState<ProgressData | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch {
        setProgress({
          completedProjects: [],
          totalCompleted: 0,
          lastUpdated: new Date().toISOString(),
        });
      }
    } else {
      setProgress({
        completedProjects: [],
        totalCompleted: 0,
        lastUpdated: new Date().toISOString(),
      });
    }
  }, []);

  const saveProgress = useCallback((data: ProgressData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setProgress(data);
  }, []);

  const toggleProjectCompletion = useCallback((projectId: string) => {
    if (!progress) return;

    const isCompleted = progress.completedProjects.includes(projectId);
    const updated: ProgressData = {
      ...progress,
      completedProjects: isCompleted
        ? progress.completedProjects.filter(id => id !== projectId)
        : [...progress.completedProjects, projectId],
      totalCompleted: isCompleted ? progress.totalCompleted - 1 : progress.totalCompleted + 1,
      lastUpdated: new Date().toISOString(),
    };
    saveProgress(updated);
  }, [progress, saveProgress]);

  const isProjectCompleted = useCallback((projectId: string) => {
    return progress?.completedProjects.includes(projectId) ?? false;
  }, [progress]);

  const getCompletionPercentage = useCallback((totalProjects: number) => {
    if (!progress || totalProjects === 0) return 0;
    return Math.round((progress.totalCompleted / totalProjects) * 100);
  }, [progress]);

  const resetProgress = useCallback(() => {
    const reset: ProgressData = {
      completedProjects: [],
      totalCompleted: 0,
      lastUpdated: new Date().toISOString(),
    };
    saveProgress(reset);
  }, [saveProgress]);

  const exportProgress = useCallback(() => {
    return JSON.stringify(progress, null, 2);
  }, [progress]);

  const importProgress = useCallback((jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.completedProjects && Array.isArray(data.completedProjects)) {
        const imported: ProgressData = {
          completedProjects: data.completedProjects,
          totalCompleted: data.completedProjects.length,
          lastUpdated: new Date().toISOString(),
        };
        saveProgress(imported);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [saveProgress]);

  return {
    progress,
    toggleProjectCompletion,
    isProjectCompleted,
    getCompletionPercentage,
    resetProgress,
    exportProgress,
    importProgress,
  };
}

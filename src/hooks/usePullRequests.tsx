import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export interface PullRequest {
  id: number;
  title: string;
  repo: string;
  description: string;
  status: 'open' | 'merged' | 'closed';
  stats: {
    commits: number;
    comments: number;
    additions: number;
    deletions: number;
  };
  date: string;
  url?: string;
  author?: string;
  labels?: string[];
}

interface UsePullRequestsReturn {
  pullRequests: PullRequest[];
  isLoading: boolean;
  error: string | null;
  selectedPRs: number[];
  selectPR: (id: number) => void;
  refreshPRs: () => Promise<void>;
  generatePortfolio: () => Promise<string>;
}

// Mock data for development
const mockPRs: PullRequest[] = [
  {
    id: 1,
    title: "Fix discount calculation in shopping cart",
    repo: "e-commerce/shopping-cart",
    description: "Fixed a critical bug in the discount calculation logic that was causing incorrect order totals when promotions were applied.",
    status: "merged",
    stats: { commits: 3, comments: 5, additions: 45, deletions: 12 },
    date: "4 days ago",
    url: "https://github.com/e-commerce/shopping-cart/pull/123",
    author: "johndoe",
    labels: ["bug", "critical", "frontend"]
  },
  {
    id: 2,
    title: "Add dark mode support",
    repo: "design-system/ui-components",
    description: "Implemented a comprehensive dark mode theme for all UI components, with support for user theme preferences and system-level settings.",
    status: "open",
    stats: { commits: 8, comments: 12, additions: 156, deletions: 23 },
    date: "2 days ago",
    url: "https://github.com/design-system/ui-components/pull/456",
    author: "johndoe",
    labels: ["enhancement", "ui", "accessibility"]
  },
  {
    id: 3,
    title: "Improve API response caching",
    repo: "api/client-sdk",
    description: "Added intelligent caching for API responses to reduce redundant network requests and improve application performance under high load conditions.",
    status: "merged",
    stats: { commits: 5, comments: 3, additions: 87, deletions: 35 },
    date: "2 weeks ago",
    url: "https://github.com/api/client-sdk/pull/789",
    author: "johndoe",
    labels: ["performance", "backend", "optimization"]
  },
  {
    id: 4,
    title: "Fix accessibility issues in form components",
    repo: "design-system/ui-components",
    description: "Addressed multiple accessibility issues in form components including keyboard navigation, screen reader support, and ARIA attributes compliance.",
    status: "merged",
    stats: { commits: 4, comments: 7, additions: 92, deletions: 41 },
    date: "1 month ago",
    url: "https://github.com/design-system/ui-components/pull/321",
    author: "johndoe",
    labels: ["accessibility", "forms", "a11y"]
  },
  {
    id: 5,
    title: "Implement authentication middleware",
    repo: "backend/auth-service",
    description: "Created a modular authentication middleware that supports multiple authentication strategies including OAuth, JWT, and API keys.",
    status: "closed",
    stats: { commits: 10, comments: 15, additions: 213, deletions: 76 },
    date: "1 month ago",
    url: "https://github.com/backend/auth-service/pull/654",
    author: "johndoe",
    labels: ["security", "backend", "middleware"]
  },
  {
    id: 6,
    title: "Optimize database queries for user dashboard",
    repo: "backend/dashboard-service",
    description: "Refactored database queries to improve dashboard loading performance by 300% through query optimization and selective data loading strategies.",
    status: "merged",
    stats: { commits: 7, comments: 9, additions: 124, deletions: 98 },
    date: "3 months ago",
    url: "https://github.com/backend/dashboard-service/pull/987",
    author: "johndoe",
    labels: ["performance", "database", "optimization"]
  },
];

export const usePullRequests = (): UsePullRequestsReturn => {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPRs, setSelectedPRs] = useState<number[]>([]);

  const fetchPullRequests = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would be a GitHub API call
      // const response = await fetch('/api/github/pull-requests');
      // const data = await response.json();
      
      setPullRequests(mockPRs);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch pull requests';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectPR = (id: number) => {
    setSelectedPRs(prev => 
      prev.includes(id) 
        ? prev.filter(prId => prId !== id) 
        : [...prev, id]
    );
  };

  const refreshPRs = async () => {
    await fetchPullRequests();
  };

  const generatePortfolio = async (): Promise<string> => {
    if (selectedPRs.length === 0) {
      throw new Error('Please select at least one pull request');
    }

    setIsLoading(true);
    try {
      // Simulate portfolio generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const portfolioId = `portfolio-${Date.now()}`;
      const portfolioUrl = `https://prshowcase.dev/portfolio/${portfolioId}`;
      
      toast({
        title: "Portfolio Generated",
        description: "Your portfolio has been successfully created!",
      });

      return portfolioUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate portfolio';
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPullRequests();
  }, []);

  return {
    pullRequests,
    isLoading,
    error,
    selectedPRs,
    selectPR,
    refreshPRs,
    generatePortfolio,
  };
};
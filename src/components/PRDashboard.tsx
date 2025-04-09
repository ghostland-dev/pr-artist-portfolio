
import React, { useState } from 'react';
import PullRequestCard from './PullRequestCard';
import PortfolioPreview from './PortfolioPreview';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock PR data
const mockPRs = [
  {
    id: 1,
    title: "Fix discount calculation in shopping cart",
    repo: "e-commerce/shopping-cart",
    description: "Fixed a critical bug in the discount calculation logic that was causing incorrect order totals when promotions were applied.",
    status: "merged" as const,
    stats: { commits: 3, comments: 5, additions: 45, deletions: 12 },
    date: "4 days ago"
  },
  {
    id: 2,
    title: "Add dark mode support",
    repo: "design-system/ui-components",
    description: "Implemented a comprehensive dark mode theme for all UI components, with support for user theme preferences and system-level settings.",
    status: "open" as const,
    stats: { commits: 8, comments: 12, additions: 156, deletions: 23 },
    date: "2 days ago"
  },
  {
    id: 3,
    title: "Improve API response caching",
    repo: "api/client-sdk",
    description: "Added intelligent caching for API responses to reduce redundant network requests and improve application performance under high load conditions.",
    status: "merged" as const,
    stats: { commits: 5, comments: 3, additions: 87, deletions: 35 },
    date: "2 weeks ago"
  },
  {
    id: 4,
    title: "Fix accessibility issues in form components",
    repo: "design-system/ui-components",
    description: "Addressed multiple accessibility issues in form components including keyboard navigation, screen reader support, and ARIA attributes compliance.",
    status: "merged" as const,
    stats: { commits: 4, comments: 7, additions: 92, deletions: 41 },
    date: "1 month ago"
  },
  {
    id: 5,
    title: "Implement authentication middleware",
    repo: "backend/auth-service",
    description: "Created a modular authentication middleware that supports multiple authentication strategies including OAuth, JWT, and API keys.",
    status: "closed" as const,
    stats: { commits: 10, comments: 15, additions: 213, deletions: 76 },
    date: "1 month ago"
  },
  {
    id: 6,
    title: "Optimize database queries for user dashboard",
    repo: "backend/dashboard-service",
    description: "Refactored database queries to improve dashboard loading performance by 300% through query optimization and selective data loading strategies.",
    status: "merged" as const,
    stats: { commits: 7, comments: 9, additions: 124, deletions: 98 },
    date: "3 months ago"
  },
];

const PRDashboard = () => {
  const [prs, setPrs] = useState(mockPRs);
  const [selectedPRs, setSelectedPRs] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const handleSelectPR = (id: number) => {
    setSelectedPRs(prev => 
      prev.includes(id) 
        ? prev.filter(prId => prId !== id) 
        : [...prev, id]
    );
  };
  
  const filteredPRs = prs.filter(pr => {
    const matchesSearch = pr.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         pr.repo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || pr.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container py-8">
      <h2 className="text-2xl font-bold mb-6">Select Pull Requests for Your Portfolio</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search PRs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            
            <Select 
              value={filterStatus} 
              onValueChange={setFilterStatus}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All PRs</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="merged">Merged</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPRs.map(pr => (
              <PullRequestCard 
                key={pr.id}
                pr={{...pr, selected: selectedPRs.includes(pr.id)}}
                onSelect={handleSelectPR}
              />
            ))}
          </div>
          
          {filteredPRs.length === 0 && (
            <div className="text-center py-20 border rounded-lg">
              <p className="text-muted-foreground">No pull requests found matching your criteria</p>
            </div>
          )}
          
          {selectedPRs.length > 0 && (
            <div className="mt-6 sticky bottom-4 bg-primary text-white p-4 rounded-md shadow-lg flex justify-between items-center">
              <span>{selectedPRs.length} PRs selected</span>
              <Button variant="secondary">Generate Portfolio</Button>
            </div>
          )}
        </div>
        
        <div className="bg-card rounded-lg border">
          <PortfolioPreview />
        </div>
      </div>
    </div>
  );
};

export default PRDashboard;

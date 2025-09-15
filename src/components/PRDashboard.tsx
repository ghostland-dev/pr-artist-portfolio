
import React, { useState } from 'react';
import PullRequestCard from './PullRequestCard';
import PortfolioPreview from './PortfolioPreview';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PRCardSkeleton } from "@/components/ui/loading-skeleton";
import { usePullRequests } from "@/hooks/usePullRequests";
import { RefreshCw, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PRDashboard = () => {
  const navigate = useNavigate();
  const { pullRequests, isLoading, error, selectedPRs, selectPR, refreshPRs, generatePortfolio } = usePullRequests();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePortfolio = async () => {
    try {
      setIsGenerating(true);
      const portfolioUrl = await generatePortfolio();
      // In a real app, we'd navigate to the actual portfolio
      navigate('/portfolio');
    } catch (err) {
      console.error('Failed to generate portfolio:', err);
    } finally {
      setIsGenerating(false);
    }
  };
  const filteredPRs = pullRequests.filter(pr => {
    const matchesSearch = pr.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         pr.repo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || pr.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  if (error) {
    return (
      <div className="container py-8">
        <div className="text-center py-20 border rounded-lg border-destructive bg-destructive/5">
          <p className="text-destructive mb-4">Failed to load pull requests</p>
          <Button onClick={refreshPRs} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Select Pull Requests for Your Portfolio</h2>
        <Button 
          onClick={refreshPRs} 
          variant="outline" 
          size="sm"
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search PRs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            
            <Select 
              value={filterStatus} 
              onValueChange={setFilterStatus}
              disabled={isLoading}
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
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <PRCardSkeleton key={i} />
              ))
            ) : (
              filteredPRs.map(pr => (
                <PullRequestCard 
                  key={pr.id}
                  pr={{...pr, selected: selectedPRs.includes(pr.id)}}
                  onSelect={selectPR}
                />
              ))
            )}
          </div>
          
          {!isLoading && filteredPRs.length === 0 && (
            <div className="text-center py-20 border rounded-lg">
              <p className="text-muted-foreground">No pull requests found matching your criteria</p>
            </div>
          )}
          
          {selectedPRs.length > 0 && (
            <div className="mt-6 sticky bottom-4 bg-primary text-primary-foreground p-4 rounded-md shadow-lg flex justify-between items-center">
              <span>{selectedPRs.length} PR{selectedPRs.length === 1 ? '' : 's'} selected</span>
              <Button 
                variant="secondary" 
                onClick={handleGeneratePortfolio}
                disabled={isGenerating}
                className="flex items-center gap-2"
              >
                {isGenerating ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {isGenerating ? 'Generating...' : 'Generate Portfolio'}
              </Button>
            </div>
          )}
        </div>
        
        <div className="bg-card rounded-lg border">
          <PortfolioPreview selectedCount={selectedPRs.length} />
        </div>
      </div>
    </div>
  );
};

export default PRDashboard;

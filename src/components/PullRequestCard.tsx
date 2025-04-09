
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, GitCommit, GitPullRequest, MessageSquare } from 'lucide-react';

interface PullRequestCardProps {
  pr: {
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
    selected?: boolean;
  };
  onSelect: (id: number) => void;
}

const PullRequestCard = ({ pr, onSelect }: PullRequestCardProps) => {
  const statusColors = {
    open: 'bg-yellow-500',
    merged: 'bg-purple-500',
    closed: 'bg-red-500'
  };

  return (
    <Card className={`border-2 hover:shadow-md transition-all ${pr.selected ? 'border-primary' : 'border-border'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <GitPullRequest className="h-4 w-4" />
              <span>{pr.repo}</span>
              <span>•</span>
              <span>{pr.date}</span>
            </div>
            <CardTitle className="text-base sm:text-lg">{pr.title}</CardTitle>
          </div>
          <Badge variant={pr.status === 'merged' ? 'default' : 'outline'} className={pr.status === 'merged' ? 'bg-primary' : ''}>
            {pr.status.charAt(0).toUpperCase() + pr.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2 mb-4">{pr.description}</CardDescription>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1 text-xs">
            <GitCommit className="h-4 w-4" />
            <span>{pr.stats.commits} commits</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <MessageSquare className="h-4 w-4" />
            <span>{pr.stats.comments} comments</span>
          </div>
          <div className="text-xs">
            <span className="text-green-500">+{pr.stats.additions}</span>
            <span> / </span>
            <span className="text-red-500">-{pr.stats.deletions}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant={pr.selected ? "default" : "outline"} 
          onClick={() => onSelect(pr.id)}
          className="w-full flex items-center gap-2"
        >
          {pr.selected && <Check className="h-4 w-4" />}
          {pr.selected ? 'Selected' : 'Select for Portfolio'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PullRequestCard;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, GitPullRequest, Share2 } from 'lucide-react';

const features = [
  {
    icon: <GitPullRequest className="h-10 w-10 text-primary" />,
    title: "Select Your Best PRs",
    description: "Connect your GitHub account and choose the pull requests that showcase your skills and contributions."
  },
  {
    icon: <Code2 className="h-10 w-10 text-primary" />,
    title: "Automatic Portfolio Generation",
    description: "We extract relevant information, code diffs, and context to create a professional portfolio page."
  },
  {
    icon: <Share2 className="h-10 w-10 text-primary" />,
    title: "Share Your Expertise",
    description: "Get a shareable link to your portfolio that you can include in your resume, LinkedIn, or job applications."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            PRShowcase helps developers highlight their technical contributions with just a few clicks
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 border-border bg-card">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

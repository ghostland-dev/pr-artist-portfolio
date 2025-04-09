
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, GithubIcon } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="py-20 px-4">
      <div className="container max-w-4xl mx-auto text-center">
        <div className="mb-6 inline-flex items-center gap-2 bg-secondary px-3 py-1 rounded-full text-sm">
          <span className="flex h-2 w-2 rounded-full bg-primary"></span>
          <span className="text-foreground/80 font-medium">Transform your open-source contributions into a portfolio</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Showcase your best <span className="text-primary font-mono relative">
            <span className="typing-effect">
              pull requests
            </span>
          </span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 mx-auto max-w-2xl">
          Automatically generate beautiful portfolio pages from your GitHub pull requests. 
          Highlight your technical contributions and share your expertise with the world.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="flex items-center gap-2"
          >
            <GithubIcon size={18} />
            <span>Connect with GitHub</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="flex items-center gap-2"
          >
            <span>View Examples</span>
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;


import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import PRDashboard from '@/components/PRDashboard';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/loading-skeleton';

const Index = () => {
  const { isLoggedIn, isLoading, login } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur">
          <div className="container flex items-center justify-between h-16">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
        <div className="container py-20">
          <div className="text-center space-y-4">
            <Skeleton className="h-12 w-96 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto" />
            <div className="flex gap-4 justify-center">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <>
      <SEOHead 
        title="PRShowcase - Transform GitHub PRs into Professional Portfolios"
        description="Connect your GitHub account and automatically generate beautiful portfolio pages from your best pull requests. Showcase your technical skills and open-source contributions."
        keywords="GitHub portfolio, pull request showcase, developer portfolio, open source contributions, technical portfolio"
      />
      <div className="min-h-screen flex flex-col">
        <Header isLoggedIn={isLoggedIn} onLogin={login} />
        
        {!isLoggedIn ? (
          <>
            <Hero onGetStarted={login} />
            <FeatureSection />
          </>
        ) : (
          <PRDashboard />
        )}
        
        <Footer />
      </div>
    </>
  );
};

export default Index;

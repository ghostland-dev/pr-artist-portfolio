
import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import PRDashboard from '@/components/PRDashboard';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    // Mock GitHub authentication flow
    setIsLoggedIn(true);
    toast({
      title: "GitHub Connected",
      description: "Your GitHub account has been successfully connected.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} />
      
      {!isLoggedIn ? (
        <>
          <Hero onGetStarted={handleLogin} />
          <FeatureSection />
        </>
      ) : (
        <PRDashboard />
      )}
      
      <Footer />
    </div>
  );
};

export default Index;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Github, Share2, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { useToast } from '@/hooks/use-toast';

const CodeDiff = () => {
  return (
    <div className="code-block bg-github-dark rounded-md p-4 text-white text-sm font-mono overflow-x-auto">
      <div className="flex">
        <div className="text-gray-400 pr-4 select-none border-r border-gray-700">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div className="bg-green-900/30">4</div>
          <div className="bg-green-900/30">5</div>
          <div>6</div>
          <div className="bg-red-900/30">7</div>
          <div>8</div>
        </div>
        <div className="pl-4 flex-1">
          <div><span className="text-blue-400">function</span> <span className="text-yellow-300">calculateTotal</span>{'(items) {'}</div>
          <div>  <span className="text-blue-400">const</span> total = items.<span className="text-yellow-300">reduce</span>{'((acc, item) => {'}</div>
          <div>    <span className="text-blue-400">return</span> acc + item.price</div>
          <div className="bg-green-900/30">    <span className="text-gray-400">// Apply discount if applicable</span></div>
          <div className="bg-green-900/30">    <span className="text-blue-400">if</span> {'(item.discount) {'} <span className="text-blue-400">return</span> acc + item.price * (1 - item.discount) {'}'}</div>
          <div>    <span className="text-blue-400">return</span> acc + item.price</div>
          <div className="bg-red-900/30">  {'}, 0)'}</div>
          <div>  {'}, 0.0)'}</div>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const handleShare = async () => {
    const portfolioUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "John Doe's Technical Portfolio",
          text: "Check out my technical contributions and pull requests",
          url: portfolioUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(portfolioUrl);
        toast({
          title: "Link copied",
          description: "Portfolio URL has been copied to clipboard",
        });
      } catch (err) {
        toast({
          title: "Failed to copy",
          description: "Could not copy the URL to clipboard",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <SEOHead 
        title="John Doe - Technical Portfolio | PRShowcase"
        description="Explore John Doe's technical contributions including bug fixes, feature implementations, and performance optimizations across multiple open-source projects."
        keywords="John Doe portfolio, software developer, open source contributions, GitHub pull requests"
        url={`https://prshowcase.dev/portfolio/${id || 'john-doe'}`}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <header className="border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 mr-8 hover:opacity-80 transition-opacity">
                <span className="text-primary font-bold">PR</span>
                <span className="font-bold">Showcase</span>
              </Link>
              <h1 className="text-lg font-medium hidden md:block">
                John Doe's Technical Portfolio
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                asChild
              >
                <a 
                  href="https://github.com/johndoe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="View John Doe's GitHub profile"
                >
                  <Github size={16} />
                  <span className="hidden sm:inline">View on GitHub</span>
                </a>
              </Button>
              <Button 
                size="sm" 
                className="flex items-center gap-2"
                onClick={handleShare}
              >
                <Share2 size={16} />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 container py-8">
          <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
            <Button variant="ghost" size="sm" asChild className="flex items-center gap-2">
              <Link to="/">
                <ArrowLeft size={16} />
                <span>Back to Dashboard</span>
              </Link>
            </Button>
          </nav>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/3">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src="https://i.pravatar.cc/100" 
                      alt="John Doe profile picture" 
                      className="rounded-full w-16 h-16" 
                      loading="lazy"
                    />
                    <div>
                      <h2 className="font-bold text-xl">John Doe</h2>
                      <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-2">About</h3>
                    <p className="text-sm text-muted-foreground">
                      Passionate developer focused on creating maintainable, scalable web applications
                      with a strong emphasis on user experience and performance.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Technical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'MongoDB'].map(skill => (
                        <span 
                          key={skill} 
                          className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>
            
            <section className="lg:w-2/3">
              <h2 className="text-2xl font-bold mb-6">Technical Contributions</h2>
              
              <div className="space-y-8">
                {/* First PR */}
                <article className="border rounded-lg p-6 bg-card">
                  <header className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>e-commerce/shopping-cart</span>
                      <span>•</span>
                      <span>Merged 4 days ago</span>
                      <Button variant="ghost" size="sm" className="ml-auto p-1 h-auto" asChild>
                        <a 
                          href="https://github.com/e-commerce/shopping-cart/pull/123" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label="View pull request on GitHub"
                        >
                          <ExternalLink size={14} />
                        </a>
                      </Button>
                    </div>
                    <h3 className="text-xl font-bold">Fix discount calculation in shopping cart</h3>
                  </header>
                  
                  <p className="text-muted-foreground mb-4">
                    Fixed a critical bug in the discount calculation logic that was causing incorrect order totals when promotions were applied.
                  </p>
                </article>
              </div>
            </section>
          </div>
        </main>
        
        <footer className="border-t py-6 mt-12">
          <div className="container flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Created with <a href="/" className="text-primary hover:underline">PRShowcase</a>
            </p>
            <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
              Last updated {new Date().toLocaleDateString()}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};
                
                <Tabs defaultValue="overview" className="mb-4">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="code">Code Changes</TabsTrigger>
                    <TabsTrigger value="impact">Impact</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-4">
                    <p className="text-muted-foreground mb-4">
                      Fixed a critical bug in the discount calculation logic that was causing incorrect order totals 
                      when promotions were applied. The fix ensures that discounts are properly applied to each item
                      before calculating the total.
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="border rounded-md p-3">
                        <div className="text-2xl font-bold">3</div>
                        <div className="text-xs text-muted-foreground">Commits</div>
                      </div>
                      <div className="border rounded-md p-3">
                        <div className="text-2xl font-bold">5</div>
                        <div className="text-xs text-muted-foreground">Comments</div>
                      </div>
                      <div className="border rounded-md p-3">
                        <div className="text-2xl font-bold text-green-500">+45</div>
                        <div className="text-2xl font-bold text-red-500">-12</div>
                        <div className="text-xs text-muted-foreground">Changes</div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="code" className="mt-4">
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Implementation Details</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        The bug was in the calculation logic where discounts were applied incorrectly. 
                        I added a conditional check to apply the discount calculation per item.
                      </p>
                      <CodeDiff />
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold mb-2">Key Improvements</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        <li>Added conditional logic for discount application</li>
                        <li>Improved type safety with better number handling</li>
                        <li>Added comments for future developers</li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="impact" className="mt-4">
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-2">Business Impact</h4>
                      <p className="text-sm text-muted-foreground">
                        This fix directly resolved a critical issue affecting revenue calculations. Before the fix, 
                        order totals were incorrectly calculated, leading to discrepancies in financial reporting 
                        and customer billing.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Technical Growth</h4>
                      <p className="text-sm text-muted-foreground">
                        This PR demonstrates my ability to:
                      </p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                        <li>Debug complex calculation issues</li>
                        <li>Implement financial logic with precision</li>
                        <li>Provide clear documentation in code</li>
                        <li>Write effective unit tests for edge cases</li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Second PR */}
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex justify-between flex-wrap gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <span>api/client-sdk</span>
                      <span>•</span>
                      <span>Merged 2 weeks ago</span>
                    </div>
                    <h3 className="text-xl font-bold">Improve API response caching</h3>
                  </div>
                </div>
                
                <div className="text-muted-foreground mb-4">
                  <p>
                    Added intelligent caching for API responses to reduce redundant network requests 
                    and improve application performance under high load conditions.
                  </p>
                </div>
                
                <Button variant="outline">View Details</Button>
              </div>
              
              {/* Third PR */}
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex justify-between flex-wrap gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <span>design-system/ui-components</span>
                      <span>•</span>
                      <span>Merged 1 month ago</span>
                    </div>
                    <h3 className="text-xl font-bold">Fix accessibility issues in form components</h3>
                  </div>
                </div>
                
                <div className="text-muted-foreground mb-4">
                  <p>
                    Addressed multiple accessibility issues in form components including keyboard navigation, 
                    screen reader support, and ARIA attributes compliance.
                  </p>
                </div>
                
                <Button variant="outline">View Details</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 mt-12">
        <div className="container flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Created with <a href="/" className="text-primary hover:underline">PRShowcase</a>
          </p>
          <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
            Last updated April 8, 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;

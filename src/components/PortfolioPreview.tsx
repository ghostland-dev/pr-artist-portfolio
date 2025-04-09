
import React from 'react';
import { Card, CardContent } from "@/components/ui/card"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

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

const PortfolioPreview = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Portfolio Preview</h2>
      
      <Tabs defaultValue="content">
        <TabsList className="mb-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="publish">Publish</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Feature: Implement Discount Calculation</h3>
              
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-2">Project Description</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  E-commerce platform with focus on scalable architecture and responsive design.
                </p>
                
                <h4 className="text-sm font-semibold mb-2">My Contribution</h4>
                <p className="text-sm text-muted-foreground">
                  Implemented a discount calculation feature that properly handles percentage discounts 
                  on individual items. Fixed a critical bug in the total calculation that was causing
                  incorrect order totals when discounts were applied.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-2">Code Changes</h4>
                <CodeDiff />
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2">Impact</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Fixed a critical calculation bug affecting order totals</li>
                  <li>Improved code maintainability with better comments</li>
                  <li>Enhanced test coverage for edge cases</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="design">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Choose a theme for your portfolio</p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-6">
              <div className="border-2 border-primary p-4 rounded-md cursor-pointer">
                <div className="h-20 bg-github-dark rounded mb-2"></div>
                <p className="text-sm font-medium">GitHub Dark</p>
              </div>
              <div className="border border-border p-4 rounded-md cursor-pointer">
                <div className="h-20 bg-white rounded mb-2"></div>
                <p className="text-sm font-medium">Light</p>
              </div>
              <div className="border border-border p-4 rounded-md cursor-pointer">
                <div className="h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded mb-2"></div>
                <p className="text-sm font-medium">Gradient</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="publish">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">Ready to Publish</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your portfolio is ready to be published. Share it with the world!
            </p>
            
            <div className="mt-6 max-w-md mx-auto">
              <div className="flex items-center border rounded-md overflow-hidden">
                <input 
                  type="text" 
                  value="https://prshowcase.dev/portfolio/john-doe" 
                  className="flex-1 p-2 bg-background border-none focus:outline-none" 
                  readOnly
                />
                <Button variant="ghost">Copy</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioPreview;

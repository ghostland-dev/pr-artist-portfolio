
import React from 'react';
import { Button } from "@/components/ui/button";
import { GithubIcon } from 'lucide-react';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogin: () => void;
}

const Header = ({ isLoggedIn, onLogin }: HeaderProps) => {
  return (
    <header className="border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center">
          <h1 className="font-bold text-xl flex items-center gap-2">
            <span className="text-primary">PR</span>
            <span>Showcase</span>
            <span className="hidden sm:inline text-sm bg-secondary text-secondary-foreground px-2 py-1 rounded-md">Beta</span>
          </h1>
        </div>
        <div>
          {!isLoggedIn ? (
            <Button onClick={onLogin} className="flex items-center gap-2">
              <GithubIcon size={18} />
              <span>Connect with GitHub</span>
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <Button variant="outline">My Portfolios</Button>
              <Button variant="outline">Settings</Button>
              <Button variant="ghost" size="icon">
                <img 
                  src="https://i.pravatar.cc/32" 
                  alt="User Avatar" 
                  className="rounded-full w-8 h-8"
                />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

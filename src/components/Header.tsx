
import React from 'react';
import { Button } from "@/components/ui/button";
import { GithubIcon, LogOut } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogin: () => void;
}

const Header = ({ isLoggedIn, onLogin }: HeaderProps) => {
  const { user, logout } = useAuth();

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
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {!isLoggedIn ? (
            <Button onClick={onLogin} className="flex items-center gap-2">
              <GithubIcon size={18} />
              <span className="hidden sm:inline">Connect with GitHub</span>
              <span className="sm:hidden">Connect</span>
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden md:flex">
                My Portfolios
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="flex items-center gap-2"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
              {user && (
                <div className="flex items-center gap-2 ml-2">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="rounded-full w-8 h-8"
                  />
                  <span className="hidden md:inline text-sm font-medium">{user.name}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Cookie } from 'lucide-react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('pr-showcase-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShowConsent(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('pr-showcase-cookie-consent', 'accepted');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('pr-showcase-cookie-consent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto lg:left-auto lg:right-4 lg:mx-0">
      <Card className="shadow-lg border-2">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Cookie className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1">We use cookies</h3>
              <p className="text-xs text-muted-foreground mb-3">
                We use cookies to improve your experience and analyze site usage. 
                By continuing to use our site, you agree to our use of cookies.
              </p>
              <div className="flex gap-2">
                <Button size="sm" onClick={acceptCookies} className="text-xs">
                  Accept
                </Button>
                <Button size="sm" variant="outline" onClick={declineCookies} className="text-xs">
                  Decline
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={declineCookies}
              className="h-6 w-6 p-0 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;
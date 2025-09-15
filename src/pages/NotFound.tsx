import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="p-8 bg-gradient-card border-border/50 text-center max-w-md w-full">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-primary">404</h1>
            <h2 className="text-xl font-semibold text-foreground">Page Not Found</h2>
            <p className="text-mobile-sm text-muted-foreground">
              Oops! The page you're looking for doesn't exist in the Citrea ecosystem.
            </p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button asChild className="w-full">
              <a href="/">
                <Home className="h-4 w-4 mr-2" />
                Go to Discovery Hub
              </a>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()} className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;

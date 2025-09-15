import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, TrendingUp } from "lucide-react";
import discoveryBoxDark from "@/assets/discovery-box-dark.png";
import discoveryBoxLight from "@/assets/discovery-box-light.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

export const HeroCard = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className="p-4 -mt-2 relative">
      <Card className="relative bg-gradient-card border-border/50 h-64">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10" />
        
        {/* Large floating image with breakthrough effect - behind text */}
        <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 z-0">
          <div className="relative">
            <div className="w-96 h-96 relative">
              <img 
                src={theme === 'light' ? discoveryBoxLight : discoveryBoxDark} 
                alt="Discovery Box" 
                className="w-full h-full object-contain drop-shadow-2xl"
              />
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl -z-10 scale-150 animate-pulse-glow" />
            </div>
          </div>
        </div>
        
        {/* Content - in front of image */}
        <div className="relative p-6 pt-8 text-center space-y-3 h-full flex flex-col justify-end z-10">
          <div>
            <h1 className="text-xl font-bold text-foreground mb-1">
              {t('discoverDApps')}
            </h1>
            <p className="text-mobile-sm text-muted-foreground">
              {t('exploreCitrea')}
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex items-center justify-center space-x-4 pt-2">
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3 text-accent" />
              <span className="text-mobile-xs text-muted-foreground">2.1M+ {t('users')}</span>
            </div>
            <div className="w-1 h-1 bg-border rounded-full" />
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span className="text-mobile-xs text-muted-foreground">150+ {t('dApps')}</span>
            </div>
            <div className="w-1 h-1 bg-border rounded-full" />
            <Badge variant="secondary" className="text-mobile-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              {t('active')}
            </Badge>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-accent/10 rounded-full animate-pulse-glow" />
        <div className="absolute -left-6 top-1/2 w-12 h-12 bg-primary/10 rounded-full animate-pulse-glow" />
      </Card>
    </div>
  );
};
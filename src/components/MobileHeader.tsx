import { Wallet, Sun, Moon, Globe, Home, Vote, BookOpen, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    name: "discover",
    path: "/",
    icon: Home,
  },
  {
    name: "vote", 
    path: "/vote",
    icon: Vote,
  },
  {
    name: "learn",
    path: "/learn",
    icon: BookOpen,
  },
  {
    name: "rewards",
    path: "/rewards",
    icon: Trophy,
  },
];

export const MobileHeader = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isConnected, setIsConnected] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const connectWallet = () => {
    setIsConnected(!isConnected);
  };

  const languages = [
    { code: "EN", name: "English" },
    { code: "ID", name: "Bahasa Indonesia" },
    { code: "CN", name: "中文" },
    { code: "FR", name: "Français" },
  ] as const;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-card/95 backdrop-blur-lg border-b border-border/50' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-mobile-sm font-bold text-primary-foreground">C</span>
          </div>
          <span className="text-mobile-base font-semibold text-foreground">Citrea</span>
        </div>
        
        {/* Desktop/Tablet Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span className="hidden lg:inline">{t(item.name)}</span>
              </NavLink>
            );
          })}
        </nav>
        
        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              >
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              {languages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`text-mobile-xs cursor-pointer ${language === lang.code ? 'bg-accent/20 text-accent font-medium' : ''}`}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
            <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleTheme}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Wallet Connect */}
            <Button 
            onClick={connectWallet}
            size="sm"
            className={`text-mobile-xs px-3 h-8 ${
              isConnected 
                ? 'bg-success/20 text-success hover:bg-success/30' 
                : 'bg-gradient-primary text-primary-foreground hover:opacity-90'
            }`}
          >
            <Wallet className="h-3 w-3 mr-1" />
            {isConnected ? t('connected') : t('connect')}
          </Button>
        </div>
      </div>
    </header>
  );
};
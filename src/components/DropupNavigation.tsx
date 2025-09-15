import { useState } from "react";
import { Settings, HelpCircle, Info, LogOut, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

export const DropupNavigation = () => {
  const { t } = useLanguage();

  const menuItems = [
    { icon: User, label: "Profile", action: () => console.log("Profile") },
    { icon: Settings, label: "Settings", action: () => console.log("Settings") },
    { icon: Shield, label: "Security", action: () => console.log("Security") },
    { icon: HelpCircle, label: "Help & Support", action: () => console.log("Help") },
    { icon: Info, label: "About", action: () => console.log("About") },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="nav-tab min-w-0 flex-1 cursor-pointer">
          <div className="flex flex-col items-center justify-center p-2">
            <div className="grid grid-cols-2 gap-0.5 h-5 w-5 mb-1">
              <div className="w-2 h-2 bg-current rounded-sm"></div>
              <div className="w-2 h-2 bg-current rounded-sm"></div>
              <div className="w-2 h-2 bg-current rounded-sm"></div>
              <div className="w-2 h-2 bg-current rounded-sm"></div>
            </div>
            <span className="text-mobile-xs font-medium truncate">
              {t('more')}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="center" 
        side="top" 
        className="w-56 mb-2 bg-card/95 backdrop-blur-lg border border-border/50"
        sideOffset={8}
      >
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <DropdownMenuItem 
              key={index}
              onClick={item.action}
              className="text-mobile-sm cursor-pointer"
            >
              <Icon className="h-4 w-4 mr-2" />
              {item.label}
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-mobile-sm text-destructive cursor-pointer">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
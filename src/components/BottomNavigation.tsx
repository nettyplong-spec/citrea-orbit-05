import { Home, Vote, BookOpen, Trophy } from "lucide-react";
import { NavLink } from "react-router-dom";
import { DropupNavigation } from "./DropupNavigation";
import { useLanguage } from "@/contexts/LanguageContext";

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

export const BottomNavigation = () => {
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/30 z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `nav-tab min-w-0 flex-1 ${isActive ? "active" : ""}`
              }
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-mobile-xs font-medium truncate">
                {t(item.name)}
              </span>
            </NavLink>
          );
        })}
        <DropupNavigation />
      </div>
    </nav>
  );
};
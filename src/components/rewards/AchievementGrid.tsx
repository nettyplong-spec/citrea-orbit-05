import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Users, 
  BookOpen, 
  Vote, 
  Zap, 
  Calendar,
  Crown,
  Star
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: typeof Target;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  reward: number;
  category: "social" | "learning" | "voting" | "daily" | "special";
}

const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "First Vote",
    description: "Cast your first vote on any dApp",
    icon: Vote,
    progress: 1,
    maxProgress: 1,
    isCompleted: true,
    reward: 100,
    category: "voting"
  },
  {
    id: "2", 
    title: "Social Butterfly",
    description: "Refer 10 friends to Citrea",
    icon: Users,
    progress: 3,
    maxProgress: 10,
    isCompleted: false,
    reward: 500,
    category: "social"
  },
  {
    id: "3",
    title: "Knowledge Seeker", 
    description: "Complete 5 learning modules",
    icon: BookOpen,
    progress: 2,
    maxProgress: 5,
    isCompleted: false,
    reward: 250,
    category: "learning"
  },
  {
    id: "4",
    title: "Daily Champion",
    description: "Maintain a 30-day streak",
    icon: Calendar,
    progress: 15,
    maxProgress: 30,
    isCompleted: false,
    reward: 1000,
    category: "daily"
  },
];

const categoryIcons = {
  social: Users,
  learning: BookOpen,
  voting: Vote,
  daily: Calendar,
  special: Crown
};

export const AchievementGrid = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-mobile-base font-semibold text-foreground">
          Achievements
        </h3>
        <Badge variant="secondary" className="text-mobile-xs">
          {mockAchievements.filter(a => a.isCompleted).length}/{mockAchievements.length}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {mockAchievements.map((achievement) => {
          const Icon = achievement.icon;
          const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;
          
          return (
            <Card 
              key={achievement.id}
              className={`p-4 border-border/50 interactive-scale cursor-pointer transition-all
                ${achievement.isCompleted 
                  ? 'bg-gradient-primary glow-primary border-primary/30' 
                  : 'bg-gradient-card'
                }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center
                  ${achievement.isCompleted 
                    ? 'bg-white/20 text-white' 
                    : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-mobile-sm font-semibold
                      ${achievement.isCompleted ? 'text-white' : 'text-foreground'}
                    `}>
                      {achievement.title}
                    </h4>
                    {achievement.isCompleted && (
                      <Star className="h-4 w-4 text-accent animate-pulse-glow" />
                    )}
                  </div>
                  
                  <p className={`text-mobile-xs
                    ${achievement.isCompleted ? 'text-white/80' : 'text-muted-foreground'}
                  `}>
                    {achievement.description}
                  </p>
                  
                  {!achievement.isCompleted && (
                    <div className="space-y-1">
                      <Progress value={progressPercentage} className="h-1.5" />
                      <div className="flex items-center justify-between text-mobile-xs text-muted-foreground">
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
                        <span className="text-accent font-medium">+{achievement.reward} CP</span>
                      </div>
                    </div>
                  )}
                  
                  {achievement.isCompleted && (
                    <Badge className="bg-white/20 text-white text-mobile-xs border-0">
                      +{achievement.reward} CP Earned
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
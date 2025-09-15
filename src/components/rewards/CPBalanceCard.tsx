import { TrendingUp, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CPBalanceCardProps {
  balance: number;
  dailyEarned: number;
  streak: number;
}

export const CPBalanceCard = ({ balance, dailyEarned, streak }: CPBalanceCardProps) => {
  return (
    <Card className="bg-gradient-rewards p-4 border-0 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      
      <div className="relative space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-mobile-xs text-white/80 font-medium">CP Balance</p>
            <p className="text-2xl font-bold text-white">
              {balance.toLocaleString()}
            </p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Zap className="h-6 w-6 text-white" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4 pt-2">
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-3 w-3 text-white/80" />
            <span className="text-mobile-xs text-white/80">
              +{dailyEarned} today
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-white/80 rounded-full" />
            <span className="text-mobile-xs text-white/80">
              {streak} day streak
            </span>
          </div>
        </div>
      </div>
      
      <div className="absolute -right-8 -bottom-8 w-16 h-16 bg-white/10 rounded-full animate-pulse-glow" />
    </Card>
  );
};